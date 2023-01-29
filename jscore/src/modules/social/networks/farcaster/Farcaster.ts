import Web3 from "../../../web3/Web3";
import { Farcaster as FarcasterJs } from "@standard-crypto/farcaster-js";
import { makeObservable, observable } from "mobx";

import { authHeader, signCast } from "./util";
import axios, { AxiosInstance } from "axios";
import RPC, { enableRPC, IRPC } from "../../../../libs/RPC";

interface FarcasterRPC {
  postMany: () => void,
  search: (filter: string) => any[] 
}

export type Farcaster_RPC = Farcaster | FarcasterRPC

@enableRPC("modules.social.network", ["post"])
export default class Farcaster extends IRPC {

  static readonly HOST = "api.farcaster.xyz";
  private axiosInstance: AxiosInstance;
  private farcaster: FarcasterJs;

  public isLoading: boolean = false; 

  constructor(
    private web3: Web3,
  ) {
    super()

    this.setupRPC(
      () => {
        this.open(web3.provider)
        this.axiosInstance = axios.create({
          baseURL: `https://${Farcaster.HOST}`,
          withCredentials: false,
          validateStatus: (status) => status >= 200 && status < 300,
        });
      }
    )
  }

  public async open(provider: any): Promise<void> {
    this.isLoading = true
    this.farcaster = new FarcasterJs(provider);

    makeObservable(this, {
      isLoading: observable,
    })

    this.isLoading = false;
  }


	public async post(user: any, message: string, replyTo?: string): Promise<string> {
    const unsignedCast = await this.farcaster.prepareCast({
      fromUsername: user.username,
      replyTo,
      text: message,
    });

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
      const reply = await this.post({}, cast, replyTo)
      replyTo = reply
    }
	}

  public async reply(): Promise<void> {
      
  }

  public async repost(): Promise<void> {
      
  }

  public async react(): Promise<void> {
      
  }

  public async search(textSearch: string): Promise<any[]> {
    const response = await this.axiosInstance.get(`https://searchcaster.xyz/api/search?text=${textSearch}`) 
    return response.data.casts 
  }

  public async getUser() {
    //const user = await this.farcaster.userRegistry.lookupByAddress(this.web3.address);
    const user = await this.farcaster.userRegistry.lookupByUsername("llhungrub");

    if (user == null) {
      throw new Error(`no username registered for address ${this.web3.address}`);
    }

    this.web3.setUserProfile(user.avatar.url)
  }

}