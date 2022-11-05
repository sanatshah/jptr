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
  constructor(protected core: Core<{}>) {}
  static async init(core: Core<{}>, name, config, dependencies) {
    const ModuleClass = this;
    core.modules[name] = new (ModuleClass as any)(core, config, dependencies);
  }
  protected async start() {}
  protected async postStart() {}
  protected async restart() {}
  protected async stop() {}
}
