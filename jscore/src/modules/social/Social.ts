import Module from "../Module";
import Core from "../../Core";
import Network from "./Network";
import Farcaster from "./networks/farcaster/Farcaster";
import { makeObservable, observable } from "mobx";
import RPC from "../../libs/RPC";


/**
 *
 */

interface Config {
  useRemote: boolean
  isRPCServer: boolean
}

interface DependencyInjection {

}

export enum NetworkTypes {
  FARCASTER,
}

interface FarcasterRPC {
  postMany: () => void,
  search: (filter: string) => any[] 
}

export default class Social extends Module {
  public selectedNetwork: NetworkTypes;
  public network: Farcaster | FarcasterRPC | undefined = undefined;

  constructor(
    core : Core<{}>,
    private config : Config,
    private dependencyInjection: DependencyInjection
  ) {
    super(core);
    makeObservable(this, {
      network: observable
    })
  }

  async start(){
    // Load anything from storage 
  }

  public async setup(){
    this.selectedNetwork = NetworkTypes.FARCASTER
    if (!this.core.modules.web3) {
      throw new Error("Missing Module!")
    }

    if (this.config.isRPCServer) {
      this.network = new Farcaster(this.core.modules.web3, this.config)
      this.isReady = true
      return
    }

    if (this.config.useRemote) {
      console.log("using remote!!")
      this.network = {
        postMany: () => {
          return RPC.call("modules.farcaster.postMany")
        },
        search: (filter: string): any => {
          console.log("searching!!")
          return RPC.call("modules.farcaster.search", filter)
        }
      }
    }

  }

  async restart(): Promise<void> {
    this.network = undefined    
  }

}
