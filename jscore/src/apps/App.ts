import { makeAutoObservable, makeObservable, observable } from "mobx";
import Core from "..";

interface Dependencies {
  package : string,
  version : string
}

export interface ModuleConfig {
  version : string,
  dependencies : Dependencies
}

export default class App {
  constructor(protected core: Core<{}>) {}

  static async init(core: Core<{}>, name, config, dependencies) {
    const AppClass = this;
    core.apps[name] = new (AppClass as any)(core, config, dependencies);
    return core.apps[name];
  }
  protected async start() {}
  protected async restart() {}
  protected async stop() {}
}
