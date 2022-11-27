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

interface Page {
  id: string,
  transactions?: string[],
  addresses?: string[],
  editorJson?: any,
  text: string
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

  public getPage(id: string){
    return this.pages[id]
  }

  protected async start(){
    this.social = this.core.modules.social
    this.web3 = this.core.modules.web3

    this.search()
  }

  private async publish(editorJson){
    await this.social?.network?.postMany([])
  }

  private async search(){
    const casts = await this.social?.network?.search()

    const _historicalList: string[] = [] 

    casts?.forEach((cast) => {
      this.pages[cast.merkleRoot] = {
        id: cast.merkleRoot,
        text: cast.data ? cast.data.text : ''
      }
      _historicalList.push(cast.merkleRoot)
    })

    this.historicalList = [ ..._historicalList]
  }

  private history(){



  }
}