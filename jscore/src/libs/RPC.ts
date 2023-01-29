import Core from ".."
import { JSONRPCServer, JSONRPCClient } from "json-rpc-2.0";
import axios from 'axios';

export enum RPCTYPE {
  SERVER = "SERVER",
  CLIENT = "CLIENT",
  NONE = "NONE"
}

interface Resolver<T,R>  {
  instancePointer: any,
  method: (args: T) =>  R
}


const procedureFunctionMap: Map<string, string[]> = new Map<string, string[]>()
export default class RPC {
  private axiosInstance: any;
  private static instance: RPC;
  private core: Core;

  private server: JSONRPCServer;
  private client: JSONRPCClient;

  public static isRPCServer: boolean = false

  public static getInstance(core?: Core, rpcType?: RPCTYPE): RPC {
    if (!RPC.instance) {
      if (!core && !rpcType) {
        throw new Error("RPC instance needs core and rpc type")
      }

      RPC.instance = new RPC();
      RPC.instance.core = core!;

      switch (rpcType){

        case RPCTYPE.SERVER:
          RPC.isRPCServer = true
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
    /*
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:9000",
      headers:{
        'Content-Type': 'application/json',
      }
    });

    this.client = new JSONRPCClient((jsonRPCRequest) => {
      return this.axiosInstance.post("/rpc", JSON.stringify(jsonRPCRequest)).then((response: any) => {
        if (response.status === 200) {
          // Use client.receive when you received a JSON-RPC response.
          return response
            .json()
            .then((jsonRPCResponse) => this.client.receive(jsonRPCResponse));
        } else if (jsonRPCRequest.id !== undefined) {
          return Promise.reject(new Error(response.statusText));
        }
      })
    } 
    );*/
  }

  static call(path, args?: any) {
    return RPC.instance.client.request(path, args)
  }

  get rpcServer() {
    return this.server
  }
}

export class IRPC {
  constructor(){}
  protected setupRPC( localConstructor?: () => void, rpcServerConstructor?: () => void ){
    if (RPC.isRPCServer) {

      if (procedureFunctionMap.has((this as any)._rpcPath)) {
        const path = (this as any)._rpcPath
        procedureFunctionMap.get(path)?.forEach(procedure => {
          RPC.getInstance().rpcServer.addMethod(`${path}.${procedure}`, this[procedure])
        })
      }

      if (rpcServerConstructor) {
        rpcServerConstructor()

      }
    } else {
      if (localConstructor) {
        localConstructor()
      }
    }
  }
}

export function enableRPC(path, procedures: string[]): any {
  return (target: any) => {
    target.prototype._rpcPath = path
    procedures.forEach((procedure) => {
      if (procedureFunctionMap.has(path)) {
        procedureFunctionMap.get(path)?.push(procedure)
      } else {
        procedureFunctionMap.set(path, [procedure])

      }
    })
  }

}