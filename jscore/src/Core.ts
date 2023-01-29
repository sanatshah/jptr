
import { reaction, observable, makeAutoObservable, autorun } from "mobx";

/**
 * Modules 
 */
import MapConfig from "./modules/Map.config";
import Module from "./modules/Module";
import ModuleManager from "./modules/ModuleManager";

/**
 * App
 */
import AppConfig from "./apps/App.config";
import AppManager from "./apps/AppManager";

/**
 * Constants
 */
import ConstantsManager from "./constants/ConstantsManager";
import { AuthenticationState } from "./constants/Authentication";
import RPC, { RPCTYPE } from "./libs/RPC";
export let coreConstants: ConstantsManager;

let mainCore: Core;

/**
 * TODO: Future support for multiple javascript
 * contexts. m being the main/parent process
 */
let _ = {
    m<T=any,L=any>(): Core<T,L> {
        return mainCore
    },
    c : () => {

    }
};


export { _ };

export default class Core<T=any,L=any> { 

    @observable public constants: ConstantsManager;
    @observable public modules: ModuleManager = {};
    @observable public apps: AppManager = {};
    @observable public stores: T = {} as T;

    public rpc: any;
    public libs: L = {} as L;

    private delayedInit : any = [];
    public started: boolean = false;
    public isRPCServer : false

    constructor(private config : any) {
      mainCore = this;
      makeAutoObservable(this);

      this.constants = new ConstantsManager();
      coreConstants = this.constants
      this.addConstantListeners();

      this.rpc = RPC.getInstance(this, this.config.rpcType)
      this.isRPCServer = config.isRPCServer
      console.log("# jscore config : ", config);
    }

    /*************************
     * Jscore Constant Reactors
     *************************/

    private addConstantListeners(){
      this.onAuthChanged();
    }

    private async onAuthChanged(){
      reaction(
        () => this.constants.authentication.state,
        async (arg: AuthenticationState) => {
          if (!this.started){
            return; 
          }

          if (arg === AuthenticationState.SUCCESS) {
            await (this.modules.clientContext as any).start();
            await this.resetStores();
            (this.modules.appManager?.lifecycle as any).initCallbacks.forEach(i => i());

          }
        }
      )
    } 

    /*************************
     * Module Lifecycle Methods 
     *************************/

    /**
     * Initializes and starts the modules requested by the client. 
     * Then,
     * Instatiates and creates the client stores.
     *  
     * @param dependencyInjection 
     */
    public async start(dependencyInjection? : any): Promise<Core<T>> {

      //default in case its loaded with require
      const requestedModules = this.config.modules;

      // FIXME: Module dependency stuff is VERY barbones
      // talk to sunny for more info 

      //Check our dependencies across our modules
      try { 
        const independentModules: Array<String> = []
        const dependentModules: Array<String> = []
        const missingModuleDepdendencies = (modules) => {
          return Array.from(Object.keys(modules)).find(moduleName => {
            const dependencies = modules[moduleName].dependencies;
            if (!dependencies) {
              independentModules.push(moduleName)
              return false;
            }

            return !!dependencies.find((dependency) => {
              if (!modules[dependency.package])
                return true
              else {
                if (modules[dependency.package].version !== dependency.version) 
                  return true

                dependentModules.push(moduleName) 
                return false
              }
            })
          })
        }

        if (missingModuleDepdendencies(requestedModules))
          throw new Error("Bad Module Configuration! Missing dependencies");

        // TODO: Load and start dependent modules first!!
        const modules = independentModules.concat(dependentModules)

        //load and start all of our modules
        const loadedModules: Array<Promise<void>> = [];
        const errors: Array<any> = []
        modules.forEach((moduleName: any) => {

          //Get the module from the map
          const moduleConfig = requestedModules[moduleName];
          const Module = MapConfig[moduleName];

          //grab any injected dependencies
          let dependencies;
          if (dependencyInjection) {
            dependencies = dependencyInjection[moduleName];
          }
          
          //Initialize the module and add to core
          Module.init(this, moduleName, moduleConfig, dependencies);
   
          //Start the Module, the module name is camelCased
            loadedModules.push((async () => {
              try {
                await this.modules[moduleName].start(this.config.isRPCServer)
                console.log(`# ${moduleName} : started`)
              } catch (e) {
                errors.push({
                  type : "critical",
                })
                console.log(`# ${moduleName} : failed to start`, "color:red", e);
              }
            })());
        })

        await Promise.all(loadedModules);

        await this.startStores();
        await this.startLibs();
        await this.startApps();

        //Run callbacks for anyone who is waiting for everything to start up.
        await this.postStart();
        this.delayedInit.forEach((func : any) => func())

        console.log("# jscore : successfully started")
        this.started = true;
      } catch (e) {
          throw e;
      }

      return this;
    }

    /**
     * Called after all modules started and stores instantiated.
     */
    private async postStart(){
      return Promise.all(this.liveModules.map(m => {
        if((m as any).postStart)
          (m as any).postStart()
      }));
    }

    public async reset(){
      return Promise.all(this.liveModules.map(m => (m as any).restart()));
    }

    /*************************
     * Module Helper Methods
     *************************/

    /**
     * Returns current modules on the core.
     */
    private get liveModules(){
      return Array.from(Object.keys(this.config.modules)).map((moduleName) => {
        return (this.modules[moduleName] as Module);
      })
    }

    /*************************
     * Store Lifecycle Methods 
     *************************/

    private async startStores(){
      if (this.config.child) {
        throw new Error("Jscore children should not contain stores!");
      }

      const stores: T = {} as T;

      //start our stores or any injected class (classes that are using the @jscore)
      (Core as any).storeInjections.forEach((inject : any) => {
          if (inject.name) {
              this.stores[inject.name] = new inject.constructor(this);
              this.stores[inject.name]._();
          } else {
              this.stores[inject.constructor.name] = new inject.constructor(this);
              this.stores[inject.constructor.name]._();
          }
      })

    }

    private async resetStores(){
      (Core as any).storeInjections.forEach((inject : any) => {

        if (!inject) {
            return;
        }

        this.stores[inject.constructor.name.toLowerCase()]._();
      })
    }

    /*************************
     * App Lifecycle Methods 
     *************************/

    private async startApps(){
      if (!this.config.apps) {
        return
      }

      this.config.apps.forEach(async (appConfig) => {
        const app = AppConfig[appConfig.name]

        if (!app) {
          console.log(`# No app found - ${appConfig.name}`)
        }

        if (appConfig.dependencies && appConfig.dependencies.length > 0) {
          const isReadyModules: Module[] = appConfig.dependencies
            .filter((dependencyName) => this.modules[dependencyName])
            .map((dependencyName) => this.modules[dependencyName]
          )

          const initializedApp = await app.init(this, appConfig.name, appConfig.config, appConfig.dependencies);

          autorun(async () => {
            let isReady = true
            for (let module of isReadyModules) {
              isReady = isReady && module.isReady
            }

            if (isReady) {
              await initializedApp.start()
              console.log(`# ${appConfig.name} - started`)
            }

          })

          console.log(`# ${appConfig.name} - waiting for module(s) ready state`)
        } else {
          //Initialize the module and add to core
          const initializedApp = await app.init(this, appConfig.name, appConfig.config, appConfig.dependencies);
          await initializedApp.start()

          console.log(`# ${appConfig.name} - started`)
        }

      })
    }

    /*************************
     * Lib Lifecycle Methods 
     *************************/

    private async startLibs(){

      //start our stores or any injected class (classes that are using the @jscore)
      (Core as any).libInjections.forEach((inject : any) => {
          if (inject.name) {
              this.libs[inject.name] = new inject.constructor(this)
          } else {
              this.libs[inject.constructor.name] = new inject.constructor(this);
          }
      })
    }

    private async resetLibs() {
      this.startStores();
    }

    private _rpcMethods = {}
    public get rpcMethods() {
      return this._rpcMethods
    }

}

/**
 * @jscore decorator functionality 
 */
(Core as any).storeInjections = [];
(Core as any).libInjections = [];

const jscore = {
  store : function (name : string){
    return (constructor) => {
        (Core as any).storeInjections.push({
            constructor : constructor,
            name : name
        })
    }
  },
  lib : function (name : string){
    return (constructor) => {
        (Core as any).libInjections.push({
            constructor : constructor,
            name : name
        })
    }
  },
}

export { jscore }
