import Module from "../Module";
import Core from "../../Core";


/**
 *
 */

enum Environments {
    dev = "dev",
    prod = "prod"
}

interface Config {
}

interface DependencyInjection {

}

interface User {
  profileURL?: string
}

export default class Web3 extends Module {
  private _address: any;
  private _signer: any;
  private _provider: any;

  public user: User;

  public isConnected: boolean = false;

  constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
    super(core);
  }

  get address() {
    return this._address
  } 

  get signer() {
    return this._signer
  } 

  get provider() {
    return this._provider
  } 

  async start(){
    // Load anything from storage 
  }

  public setUser(address, signer, provider){
    this._address = address;
    this._signer = signer;
    this._provider = provider
  }

  public setUserProfile(profileURL){
    this.user = {
      profileURL: profileURL
    }
  }

  private setup(){

  }
}
