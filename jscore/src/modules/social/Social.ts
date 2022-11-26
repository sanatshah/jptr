import Module from "../Module";
import Core from "../../Core";
import Network from "./Network";
import Farcaster from "./networks/farcaster/Farcaster";


/**
 *
 */

interface Config {
}

interface DependencyInjection {

}

export enum NetworkTypes {
  FARCASTER,
}

export default class Social extends Module {
  public selectedNetwork: NetworkTypes;
  public network: Network;

  constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
    super(core);
  }

  async start(){
    // Load anything from storage 
  }

  public async setup(network: NetworkTypes){
    this.selectedNetwork = NetworkTypes.FARCASTER
    if (!this.core.modules.web3) {
      throw new Error("Missing Module!")
    }
    this.network = new Farcaster(this.core.modules.web3)
  }



}
