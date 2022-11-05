//import sock from "../../../../../sockjs-client";
import { SpringBootOpts } from "../integrations/SpringBoot";

export enum SOCKET {
  CONNECT = "CONNECT",
  RECONNECT = "RECONNECT",
  RECONNECT_FAILURE = "RECONNECT_FAILURE",
  SERVER_DISCONNECT = "SERVER_DISCONNECT",
  CLIENT_DISCONNECT = "CLIENT_DISCONNECT",
  PING_TIMEOUT = "PING_TIMEOUT ",
  ERROR = "ERROR ",
  CONNECT_ERROR = "CONNECT_ERROR "
}

export interface SocketOptions {
  prefix : string
}

export interface MessageData {
  event : string,
  data : any
}

export default class Socket {
  private sock : any;
  private header;

  constructor(private opts : SpringBootOpts, private token : string) {
    this.header = {'X-Authorization': 'bearer ' + token};
  }

  public async setup() {

    /*
    if (!this.token) {
        //FIXME: actually handle errors
        return;
    }
    const path = this.opts.config.path + this.opts.config.socket.prefix + "/gs-guide-websocket?token=" + this.token;

    this.sock = new Stomp.Client({
      webSocketFactory : () => new sock(path),
      debug: function (str) {
        //console.log(str);
      },
      header : {
        Authorization: this.token, //this doesn't work for some reason
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.sock.connectHeaders = {
        Authorization: this.token,
    };

    this.sock.activate();

    return new Promise((resolve, reject) => {
      this.sock.onConnect = () => {
        resolve();
      }
      this.sock.onStompError = () => {
        console.error("# ClientContext : websocket connection failed");
        resolve(); //FIXME: actually handle errors
        //reject();
      }
    });*/

  }

  public onMessage(event, cb){
    if (!this.sock) {
        return () => {};
    }

    const listenerFunction = (incomingData : any) => {
      cb(JSON.parse(incomingData.body))
    }

    const sub = this.sock.subscribe(event, listenerFunction);
    return sub.unsubscribe; 
  }

  public send(path, data){
    if (!this.sock) {
        return;
    }
    this.sock.publish({
      destination : this.opts.config.apiVersion + path, 
      body : typeof data === 'string' ? data : JSON.stringify(data)
    });
  }
}