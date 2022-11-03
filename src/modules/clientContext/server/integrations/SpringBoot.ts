import Server from "../Server";
import HTTP from "../libs/HTTP";
import { ServerConfig, CommunicationTypes } from "../../ClientContext";
import Socket from "../libs/Socket";
import PubSub, { PubSubTypes } from "../libs/PubSub";

export interface SpringBootOpts { 
  config : ServerConfig
  idToken: string,
  accessToken: string
}

export interface Tokens {
  idToken : string, 
  accessToken : string
}

export default class SpringBoot extends Server {

  private tokens : Tokens;

  public http: HTTP; 
  public pubsub: PubSub;

  constructor(private opts : SpringBootOpts) {
    super();

    this.tokens = {
      idToken : opts.idToken,
      accessToken : opts.accessToken
    }

  }

  public async setup() {

    this.pubsub = new PubSub();

    if (!this.opts || !this.opts.config || !this.opts.config.communicationTypes) {
        return;
    }

    await Promise.all(this.opts.config.communicationTypes.map((type) : any => {

      switch (type) {

        case CommunicationTypes.http :
          this.http = new HTTP(this.opts.config, this.tokens.accessToken);
          return 'Success' 
        
        case CommunicationTypes.sse :
          return 'Success';

        case CommunicationTypes.socket :
          return this.pubsub.newPubsub(PubSubTypes.Socket, new Socket(this.opts, this.tokens.accessToken));
        default :
          break;

      }

    }))

    await this.sanityCheck();
  }

  /**
   * We only do sanity checks for HTTP for now.
   */
  protected async sanityCheck() {
    if (this.http) {
      try {
        await this.http.get("/ping")
      } catch (e) {
        console.log("# ClientContext : sanity check failed ", e);
      }
    }
  }

}