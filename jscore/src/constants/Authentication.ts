import { action, makeObservable, observable } from "mobx";
import Constant from "./libs/Constant";

export enum AuthenticationState {
  SUCCESS, 
  EMAIL_CONFIRMATION,
  EMAIL_CONFIRMATION_FAILED,
  ERROR,
  UNKNOWN
}

export default class Authentication extends Constant<AuthenticationState> {
    constructor(){
        super();
        makeObservable(this);
    }
    @observable public state: AuthenticationState = AuthenticationState.UNKNOWN; 
    @action public update(state : AuthenticationState){
        console.log("updating state!")
      this.state = state;
    }
}