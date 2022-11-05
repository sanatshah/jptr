import Module from "../Module";
import Core from "../../Core";
import { createEventBus } from 'ts-event-bus'
import CSComm from "./slots/client-server";
import ClientServerInit from "./setup/client-server";

export enum Channels {
    'CLIENT_SERVER'
}

interface Config {
    client_server: boolean
    channels: [Channels] 
}

interface DependencyInjection {}

let comm;
export { comm, CSComm }
export default class Comm extends Module {
    private disposers: Map<number, () => void> = new Map<number, () => void>();

    constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
        super(core);
        comm = createEventBus({
            events: CSComm
        })
    }

    async start(){
        if (this.config.client_server) {
            ClientServerInit(this.core, comm);
        }
    }
}
