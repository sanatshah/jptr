import { makeObservable, observable } from "mobx";
import Core from "../../Core";
import Social from "../../modules/social/Social";
import Web3 from "../../modules/web3/Web3";
import App from "../App";
import { BlocbookEnv, getFarcasterDataConverter } from "./converters/converter";


interface Config {
  blocbookEnv: BlocbookEnv
}

export enum SectionTypes {
  TXN,
  ADDRESS,
  TEXT,
  GIF
}

export type Txn  ={
  address: string
}

export type Address = {
  address: string
}

export type Text = {
  text: string
}

export type Gif  ={
  url: string
}

export interface Section {
  id: string,
  type: SectionTypes, 
  data: Txn | Address | Text | Gif
}

export interface SocialActivity {
  likes?: number;
  reposts?: number;
  comments?: number;
}

export interface Page {
  id?: string,
  transactions?: string[],
  addresses?: string[],
  sections?: Section[]
  socialActivity?: SocialActivity
}

export default class BlockBook extends App {
  private web3: Web3 | undefined;
  private social: Social | undefined;

  private converter: any;

  public pages: { [key: string]: Page } = {};
  public historicalList: string[] = []
  public newList: string[] = []
  public topList: string[] = []

  constructor(core : Core<{}>, private config : Config) {
    super(core)
    makeObservable(this, {
      pages: observable,
      historicalList: observable,
      newList: observable,
      topList: observable,
    })

    this.converter = getFarcasterDataConverter()
  }

  protected async start(){
    this.social = this.core.modules.social
    this.web3 = this.core.modules.web3

    this.search()
  }

  public getPage(id: string){
    return this.pages[id]
  }

  public async publish(page: Page){
    const count = page.sections?.length ?? 0
    if (!count) {
      return 
    }

    const casts = page.sections?.map((section, i) => {
      switch (section.type) {
        case SectionTypes.TXN:
          return this.converter.appendCastCounter(this.converter.createCastTXN((section.data as any).address), count, i+1) 

        case SectionTypes.ADDRESS:
          return this.converter.appendCastCounter(this.converter.createCastADDR((section.data as any).address), count, i+1) 

        case SectionTypes.TEXT:
          return this.converter.appendCastCounter((section.data as any).text, count, i+1) 
      }

      return ''
    }).filter(casts => !casts)


    if (casts) {
      casts[0] = this.converter.prependBlockbookTag(casts[0])

      await this.social?.network?.postMany(casts)

    }
  }


  private async search(){
    console.log("searching!!")
    const casts = await this.social?.network?.search('@blocbook')
    console.log("casts: ", casts)

    const _historicalList: string[] = [] 

    casts?.forEach((cast) => {
      const sectionData = this.converter.createSectionData(cast.body.data.text)

      if (!sectionData) {
        return
      }

      this.pages[cast.merkleRoot] = {
        id: cast.merkleRoot,
        socialActivity: {
          likes: cast.meta.reactions.count,
          reposts: cast.meta.recasts.count,
          comments: cast.meta.numReplyChildren
        },
        sections: [
          {
            type: this.converter.getSectionType(cast.body.data.text),
            data: sectionData,
            id: cast.merkleRoot
          }
        ]
      }

      _historicalList.push(cast.merkleRoot)
    })

    this.historicalList = [ ..._historicalList]
  }

  private history(){



  }
}