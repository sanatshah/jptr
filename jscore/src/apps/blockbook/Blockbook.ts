import { CAST_CHARACTER_LIMIT } from "@standard-crypto/farcaster-js";
import { makeObservable, observable } from "mobx";
import Core from "../../Core";
import Social from "../../modules/social/Social";
import Web3 from "../../modules/web3/Web3";
import App from "../App";

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

type Txn  ={
  address: string
}

type Address = {
  address: string
}
type Text = {
  text: string
}

type Gif  ={
  url: string
}

export interface Section {
  id: string,
  type: SectionTypes, 
  data: Txn | Address | Text | Gif
}

export interface Page {
  id?: string,
  transactions?: string[],
  addresses?: string[],
  sections?: Section[]
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
          return `Looking at transaction : ${(section.data as any).address} [${i+1}/${count}]`

        case SectionTypes.ADDRESS:
          return `Looking at address : ${(section.data as any).address} [${i+1}/${count}]`

        case SectionTypes.TEXT:
          return `${(section.data as any).text} [${i+1}/${count}]`
      }

      return ''
    })

    const prependBlockbookTag = (text) => {
      return `@blocbook ${text}`
    }

    if (casts) {
      casts[0] = prependBlockbookTag(casts[0])
      await this.social?.network?.postMany(casts)
    }
  }


  private async search(){
    const casts = await this.social?.network?.search('@blockbook')

    const _historicalList: string[] = [] 

    casts?.forEach((cast) => {
      this.pages[cast.merkleRoot] = {
        id: cast.merkleRoot,
        //text: cast.data ? cast.data.text : ''
      }
      _historicalList.push(cast.merkleRoot)
    })

    this.historicalList = [ ..._historicalList]
  }

  private history(){



  }
}