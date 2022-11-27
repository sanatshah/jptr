import Core from "../../Core";
import Social from "../../modules/social/Social";
import Web3 from "../../modules/web3/Web3";
import App from "../App";

interface Config {

}

interface DependencyInjection {


}


export default class BlockBook extends App {
  private web3: Web3 | undefined;
  private social: Social | undefined;

  constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
    super(core)
  }
  protected async start(){
    this.social = this.core.modules.social
    this.web3 = this.core.modules.web3

    this.social?.network?.search()
  }

  private publish(){

  }

  private search(){


  }

  private history(){



  }
}