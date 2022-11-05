import SSE from "./SSE";
import Socket, { MessageData } from "./Socket";

export enum PubSubTypes {
  SSE,
  Socket
}

const MAX_SSE_CONNECTIONS = 6;

/**
 * Wraps sse and sockets, to be able to just use one class;
 */
export default class PubSub { 
  private sse : SSE;
  private socket : Socket;

  private numberOfSSEConnections = 0;

  constructor() {

  }

  public async newPubsub(type : PubSubTypes, obj : SSE | Socket) {
    if (type === PubSubTypes.SSE) {
      this.sse = obj as SSE;
    } else {
      this.socket = obj as Socket;
      await this.socket.setup();
    }

  }

  /**
   * For SSE.
   * @param args 
   */
  public async newEventSource(path? : string) {
    if (this.numberOfSSEConnections === MAX_SSE_CONNECTIONS) {
      throw new Error("Max number of sse connections being used!");
    }

    if (!path) {
        throw new Error("Path not provided")
        return;
    }

    let es = new SSE();
    await es.newSource(path);
    this.numberOfSSEConnections++;
    return es;
  }

  /**
   * Listen on the specificed event. 
   * 
   * Returns a function to unsubscribe the given listener. 
   * @param event 
   * @param cb 
   */
  public on(event : string, cb : () => void) {
    if (!this.socket) {
        console.error("Sockets are not setup!")
        return () => {};
    }

    return this.socket.onMessage(event, cb);
  }

  /**
   * Sends data in MessageData format to server. 
   * @param event 
   * @param data 
   */
  public send(event : string, data : any) {
    if (!this.socket) {
      throw new Error("Sockets are not setup!")
    }
    this.socket.send(event, data);
  }


}