import Web3 from "../../../web3/Web3";
import { Farcaster as FarcasterJs, UserRegistry } from "@standard-crypto/farcaster-js";
import { makeObservable, observable } from "mobx";

import { authHeader, signCast } from "./util";
import axios, { AxiosInstance } from "axios";

export default class Farcaster {

  static readonly HOST = "api.farcaster.xyz";
  private readonly axiosInstance: AxiosInstance;

  private farcaster: FarcasterJs;

  public user;
  public posts: string[] = [] 
  public casts: string[] = [] 

  public isLoading: boolean = false; 

  constructor(private web3: Web3) {
    this.open(web3.provider)

    this.axiosInstance = axios.create({
      baseURL: `https://${Farcaster.HOST}`,
      validateStatus: (status) => status >= 200 && status < 300,
    });
  }

  public async open(provider: any): Promise<void> {
    this.isLoading = true
    this.farcaster = new FarcasterJs(provider);

    makeObservable(this, {
      posts: observable,
      isLoading: observable,
      casts: observable,
    })

    await this.getUser()

    this.isLoading = false;
    this.usersPosts()
  }

  public hasUser() {
    return !!this.user
  }

  public async getUser() {
    //const user = await this.farcaster.userRegistry.lookupByAddress(this.web3.address);
    const user = await this.farcaster.userRegistry.lookupByUsername("llhungrub");

    if (user == null) {
      throw new Error(`no username registered for address ${this.web3.address}`);
    }

    this.user = user
    this.web3.setUserProfile(user.avatar.url)
  }

	public async post(message: string, replyTo?: string): Promise<string> {
    if (this.user == undefined) {
      throw new Error(`no username registered for address ${this.web3.address}`);
    }

    const unsignedCast = await this.farcaster.prepareCast({
      fromUsername: this.user.username,
      replyTo,
      text: message,
    });

    throw new Error("Posting failed!")

    const auth = await authHeader(this.web3.address, this.web3.signer.signMessage.bind(this.web3.signer));
    const signedCast = await signCast(unsignedCast, this.web3.signer)

    const response = await this.axiosInstance.post("/indexer/activity", signedCast, {
      headers: { authorization: auth },
      validateStatus: (status: number) => true,
    });

    return response.data
	}

	public async postMany(casts: string[]): Promise<void> {
    let replyTo: string | undefined = undefined
    for (let cast of casts) {
      const reply = await this.post(cast, replyTo)
      replyTo = reply
    }
	}

  public async reply(): Promise<void> {
      
  }

  public async repost(): Promise<void> {
      
  }

  public async react(): Promise<void> {
      
  }

  public async usersPosts(): Promise<never[]> {
    for await (const activity of this.farcaster.getAllActivityForUser("llhungrub", {
      includeRecasts: false,
    })) {
      this.posts = [ ...this.posts, activity.body.data.text]
    }
    return []
  }

  public async search(textSearch: string): Promise<any[]> {
    const response = await fetch(`https://searchcaster.xyz/api/search?text=${textSearch}`) 
    const data = await response.json()
    return data.casts 
  }

}