import Module from "../Module";
import Core from "../../Core";

enum Environments {
    dev = "dev",
    prod = "prod"
}

interface Config {
    env: Environments
}

interface DependencyInjection {

}

export default class Log extends Module {

    constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
        super(core);
    }

    async start(){
        await this.setup();
    }

    private setup(){

        if (this.config.env) {
            return;
        }

        const devLog = (type: string, msg: string) => {
            if (this.config.env) {
                console.log(`[${type.toUpperCase()}] : ${msg}`)
            }
        }

        console.debug = (msg: string) => {
            devLog(msg, "debug");
        }

        console.warn = (msg: string) => {
            devLog(msg, "warn");
        }

        console.error = (msg: string) => {
            devLog(msg, "error");
        }
    }
}
