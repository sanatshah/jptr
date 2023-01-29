import { makeObservable, observable } from "mobx";
import Core from "..";

interface Dependencies {
  package : string,
  version : string
}

export interface ModuleConfig {
  version : string,
  dependencies : Dependencies
}

export default class Module {
  public isReady: boolean = false
  constructor(protected core: Core<{}>) {
    makeObservable(this, {
      isReady: observable
    })
  }
  static async init(core: Core<{}>, name, config, dependencies) {
    const ModuleClass = this;
    core.modules[name] = new (ModuleClass as any)(core, config, dependencies);
  }
  protected async start(isRPCServer: boolean) {}
  protected async postStart() {}
  protected async restart() {}
  protected async stop() {}
}
