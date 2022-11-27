import Web3 from "../../../web3/Web3";
import Network from "../../Network";
import { Farcaster as FarcasterJs, MessageBody, MessageBodyType, serializeMessageBody, SignedCast } from "@standard-crypto/farcaster-js";
import { Signer } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { makeObservable, observable } from "mobx";


const signCast = async (
  cast: MessageBody,
  signer: Signer
): Promise<SignedCast> => {
  if (cast.address !== (await signer.getAddress())) {
    throw new Error(
      `The address ${cast.address} for user ${
        cast.username
      } does not match the address of the provided signer: ${await signer.getAddress()}`
    );
  }
  const serializedCast = serializeMessageBody(cast);
  const merkleRoot = keccak256(toUtf8Bytes(serializedCast));
  const signature = await signer.signMessage(merkleRoot);
  return {
    body: cast,
    merkleRoot,
    signature,
  };
}


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

    this.usersPosts()
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

    //const authHeader = await authHeader(wallet);
    //const signedCast = signCast(unsignedCast, signer)

    //console.log("signedCast: ", signedCast)
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