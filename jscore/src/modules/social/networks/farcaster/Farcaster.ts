import Web3 from "../../../web3/Web3";
import { Farcaster as FarcasterJs } from "@standard-crypto/farcaster-js";
import { makeObservable, observable } from "mobx";

import { authHeader, signCast } from "./util";

export default class Farcaster {
  private farcaster: FarcasterJs;
  public posts: string[] = [] 

  constructor(private web3: Web3) {
    this.open(web3.provider)
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

    const user = await this.farcaster.userRegistry.lookupByUsername('llhungrub');

    if (user == null) {
      throw new Error(`no username registered for address ${this.web3.address}`);
    }

    this.web3.setUserProfile(user.avatar.url)
  }

	public async post(message: string): Promise<void> {
  
    const user = await this.farcaster.userRegistry.lookupByUsername('llhungrub');

    if (user == null) {
      throw new Error(`no username registered for address ${this.web3.address}`);
    }

    this.web3.setUserProfile(user.avatar.url)

    const unsignedCast = await this.farcaster.prepareCast({
      fromUsername: user.username,
      text: message,
    });

    console.log("unsignedCast: ", unsignedCast)
    console.log("unsignedCast: ", this.web3.signer)

    const auth = await authHeader(this.web3.address, this.web3.signer);

    console.log("auth: ", auth)

    const signedCast = signCast(unsignedCast, this.web3.signer)

    console.log("signedCast: ", signedCast)

    /*
    return await this.axiosInstance.post("/indexer/activity", cast, {
      headers: { authorization: authHeader },
      validateStatus: (status: number) => true,
    });*/

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