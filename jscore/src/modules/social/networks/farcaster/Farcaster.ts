import Web3 from "../../../web3/Web3";
import { Farcaster as FarcasterJs, UserRegistry } from "@standard-crypto/farcaster-js";
import { makeObservable, observable } from "mobx";

import { authHeader, signCast } from "./util";
import axios, { AxiosInstance } from "axios";

export default class Farcaster {
  private user;
  private farcaster: FarcasterJs;
  private readonly axiosInstance: AxiosInstance;
  public posts: string[] = [] 
  static readonly HOST = "api.farcaster.xyz";

  constructor(private web3: Web3) {
    this.open(web3.provider)

    this.axiosInstance = axios.create({
      baseURL: `https://${Farcaster.HOST}`,
      validateStatus: (status) => status >= 200 && status < 300,
    });
  }

  public async open(provider: any): Promise<void> {
    this.farcaster = new FarcasterJs(provider);

    makeObservable(this, {
      posts: observable
    })

    this.getUser()
    this.usersPosts()
  }

  public async getUser() {
    const user = await this.farcaster.userRegistry.lookupByAddress(this.web3.address);

    if (user == null) {
      throw new Error(`no username registered for address ${this.web3.address}`);
    }

    this.user = user
    this.web3.setUserProfile(user.avatar.url)
  }

	public async post(message: string): Promise<void> {
    if (this.user == undefined) {
      throw new Error(`no username registered for address ${this.web3.address}`);
    }

    const unsignedCast = await this.farcaster.prepareCast({
      fromUsername: this.user.username,
      text: message,
    });

    const auth = await authHeader(this.web3.address, this.web3.signer.signMessage.bind(this.web3.signer));
    const signedCast = await signCast(unsignedCast, this.web3.signer)

    return await this.axiosInstance.post("/indexer/activity", signedCast, {
      headers: { authorization: auth },
      validateStatus: (status: number) => true,
    });
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

}