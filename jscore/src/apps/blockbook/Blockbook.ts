import Core from "../../Core";
import App from "../App";

interface Config {

}

interface DependencyInjection {


}


export default class BlockBook extends App {
  constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
    super(core)
  }
  protected async start(){

  }

  private publish(){

  }

  private search(){


  }

  private history(){



  }
}