import Core from ".."
import { JSONRPCServer, JSONRPCClient } from "json-rpc-2.0";
import axios, { AxiosInstance } from "axios";

export enum RPCTYPE {
  SERVER = "SERVER",
  CLIENT = "CLIENT",
  NONE = "NONE"
}

interface Resolver<T,R>  {
  instancePointer: any,
  method: (args: T) =>  R
}

export default class RPC {
  private axiosInstance: AxiosInstance;
  private static instance: RPC;
  private core: Core;

  private server: JSONRPCServer;
  private client: JSONRPCClient;
  private resolvers: {[key: string]: Resolver<any, any>}

  public static getInstance(core: Core, rpcType: RPCTYPE): RPC {
    if (!RPC.instance) {
      RPC.instance = new RPC();
      RPC.instance.core = core;

      switch (rpcType){

        case RPCTYPE.SERVER:
          RPC.instance.createServer()
          break;

        case RPCTYPE.CLIENT:
          RPC.instance.createClient()
          break;

        case RPCTYPE.NONE:
          break;
      }
    }

    return RPC.instance;
  }

  private createServer() {
    RPC.instance.server = new JSONRPCServer();
  }

  private createClient() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:9000",
    });

    // JSONRPCClient needs to know how to send a JSON-RPC request.
    // Tell it by passing a function to its constructor. The function must take a JSON-RPC request and send it.
    this.client = new JSONRPCClient((jsonRPCRequest) =>
      this.axiosInstance.post("/rpc").then((response: any) => {
        if (response.status === 200) {
          // Use client.receive when you received a JSON-RPC response.
          return response
            .json()
            .then((jsonRPCResponse) => this.client.receive(jsonRPCResponse));
        } else if (jsonRPCRequest.id !== undefined) {
          return Promise.reject(new Error(response.statusText));
        }
      })
    );

    // Use client.notify to make a JSON-RPC notification call.
    // By definition, JSON-RPC notification does not respond.
    /*
    this.client.notify("log", { message: "Hello, World!" });
    */
  }

  static call(path, args?: any) {
    return RPC.instance.client.request(path, args)
  }

  private createRPC(instance, method, path) {
    RPC.instance.server.addMethod(path, method.bind(this))
  }

  get rpcServer() {
    return this.server
  }

  static enableRPC(instance, method, path) {
    RPC.instance.resolvers[path] = {
      instancePointer: instance,
      method
    }
    RPC.instance.createRPC(instance, method, path)
  }
}