import { action, observable } from "mobx";
import Constant from "./libs/Constant";

export enum ConnectionState {
    ERROR,
    CONNECTED,
    DISCONNECTED,
    UNKNOWN
}

export default class Connection extends Constant<ConnectionState> {
    @observable public state: ConnectionState = ConnectionState.UNKNOWN;
    @action public update(state : ConnectionState){
      this.state = state;
    }
}