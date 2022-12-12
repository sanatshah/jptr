import Core from ".."
import { JSONRPCServer } from "json-rpc-2.0";

interface Resolver<T,R>  {
  instancePointer: any,
  method: (args: T) =>  R
}

export default class RPC {
  private static instance: RPC;
  private core: Core;

  private server: JSONRPCServer;
  private resolvers: {[key: string]: Resolver<any, any>}

  public static getInstance(core: Core): RPC {
      if (!RPC.instance) {
        RPC.instance = new RPC();
        RPC.instance.server = new JSONRPCServer();
        RPC.instance.core = core;
      }

      return RPC.instance;
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