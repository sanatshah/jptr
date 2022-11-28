import { CAST_CHARACTER_LIMIT } from "@standard-crypto/farcaster-js";
import { makeObservable, observable } from "mobx";
import Core from "../../Core";
import Social from "../../modules/social/Social";
import Web3 from "../../modules/web3/Web3";
import App from "../App";
import { appendCastCounter, BLOCBOOK_TAG, createCastADDR, createCastTXN, createSectionData, getSectionType, prependBlockbookTag, unpendBlockbookTag } from "./utils";

interface Config {

}

interface DependencyInjection {


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

  public pages: { [key: string]: Page } = {};
  public historicalList: string[] = []
  public newList: string[] = []
  public topList: string[] = []

  constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
    super(core)
    makeObservable(this, {
      pages: observable,
      historicalList: observable,
      newList: observable,
      topList: observable,
    })
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
          return appendCastCounter(createCastTXN((section.data as any).address), count, i+1) 

        case SectionTypes.ADDRESS:
          return appendCastCounter(createCastADDR((section.data as any).address), count, i+1) 

        case SectionTypes.TEXT:
          return appendCastCounter((section.data as any).text, count, i+1) 
      }

      return ''
    }).filter(casts => !casts)


    if (casts) {
      casts[0] = prependBlockbookTag(casts[0])
      await this.social?.network?.postMany(casts)
    }
  }


  private async search(){
    const casts = await this.social?.network?.search('@blocbook')

    const _historicalList: string[] = [] 

    casts?.forEach((cast) => {
      this.pages[cast.merkleRoot] = {
        id: cast.merkleRoot,
        socialActivity: {
          likes: cast.meta.reactions.count,
          reposts: cast.meta.recasts.count,
          comments: cast.meta.numReplyChildren
        },
        sections: [
          {
            type: getSectionType(cast.body.data.text),
            data: createSectionData(cast.body.data.text),
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