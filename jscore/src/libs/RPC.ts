import Core from ".."
import { JSONRPCServer, JSONRPCClient } from "json-rpc-2.0";
import axios from 'axios';

export enum RPCTYPE {
  SERVER = "SERVER",
  CLIENT = "CLIENT",
  NONE = "NONE"
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
          RPC.isRPCServer = false
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
    this.client = new JSONRPCClient((jsonRPCRequest) => {
      return axios.post("http://localhost:9000/rpc", jsonRPCRequest).then((response: any) => {
        if (response.status === 200) {
          return this.client.receive(response.data)
        } else if (jsonRPCRequest.id !== undefined) {
          return Promise.reject(new Error(response.statusText));
        }
      })
    } 
    );
  }

  get rpcServer() {
    return this.server
  }

  get rpcClient() {
    return this.client
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
        if (procedureFunctionMap.has((this as any)._rpcPath)) {
          const path = (this as any)._rpcPath
          procedureFunctionMap.get(path)?.forEach(procedure => {
            (this as any)[procedure]= (args) => {
              return RPC.getInstance().rpcClient.request(`${path}.${procedure}`, args)
            }
          })
        }
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