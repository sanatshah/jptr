import Module from "../Module";
import Core from "../../Core";


/**
 *
 * Abstraction of wallet management 
 * 
 * 
 */

enum Environments {
    dev = "dev",
    prod = "prod"
}

interface Config {
    env: Environments
}

interface DependencyInjection {

}

export default class Web3 extends Module {

    constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
        super(core);
    }

    async start(){

    }

    private setup(){

    }
}