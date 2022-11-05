
import Core from "../Core";
import { makeAutoObservable, makeObservable, observable } from "mobx";
import HTTP from "../modules/clientContext/server/libs/HTTP";
import PubSub from "../modules/clientContext/server/libs/PubSub";

export default class Store {

    @observable public isLoading: boolean = false;
    private isRendered : boolean = false;

    private initCallbacks : Array<any> = new Array<any>();
    private foregroundCallbacks : Array<any> = new Array<any>();
    private backgroundCallbacks : Array<any> = new Array<any>();

    protected http : HTTP | undefined;
    protected pubsub : PubSub;

    constructor(protected core : Core<any>, children? : any[]) {
        if (children)
            children.forEach(c => {
                this[c.name] = new c(core)
            })

        this.connectionObjects();

        const foreground = () => {
            let self = this;

            return function foreground() {
                if (!self.isRendered) return;
                self.foregroundCallbacks.forEach(cb => cb());
            }
        }

        this.foreground(foreground(), true);

        const background = () => {
            let self = this;

            return function background() {
                if (!self.isRendered) return;
                self.backgroundCallbacks.forEach(cb => cb());
            }
        }

        this.background(background(), true);
    }

    protected createStore(Store, ...args){
        const c = new Store(this.core, ...args)
        return c;
    }

    protected connectionObjects(){
        try {
            if (
                !this.core.modules.clientContext || 
                !this.core.modules.clientContext.home
            ) {
                return;
            }

            this.http = this.core.modules?.clientContext?.home.http;   
            this.pubsub = this.core.modules?.clientContext?.home.pubsub;
        } catch (e) {
            console.warn("Failed creating connection objects")
        }
    }

    protected onRender(){
        if (this.isRendered) return;
        this.foregroundCallbacks.forEach(cb => cb());
        this.isRendered = true;
    }

    protected onDeRender(){
        this.isRendered = false;
    }

    protected init(...funcs){
        funcs.forEach(f => {
            if (this.core.modules.appManager) {
                this.core.modules?.appManager.lifecycle.addInitCallback(f.bind(this));
            }
            this.initCallbacks.push(f.bind(this));
        })
    }

    protected foreground(...args){
        if (typeof args[args.length-1] !== "boolean") {
            args.push(false);
        }
        const funcs = args.slice(0, args.length-1);
        const global = args[args.length-1]; 

        if (global) {
                funcs.forEach(f => {
                    if (this.core.modules.appManager) {
                        this.core.modules.appManager.lifecycle.addForegroundCallback(f.bind(this))
                    }
                });
        } else {
            funcs.forEach(f => this.foregroundCallbacks.push(f.bind(this)));
        }

    }

    protected background(...args){
        if (typeof args[args.length-1] !== "boolean") {
            args.push(false);
        }
        const funcs = args.slice(0, args.length-1);
        const global = args[args.length-1]; 

        if (global) {
                funcs.forEach(f => {
                    if (this.core.modules.appManager) {
                        this.core.modules.appManager.lifecycle.addBackgroundCallback(f.bind(this))
                    }
                });
        } else {
            funcs.forEach(f => this.backgroundCallbacks.push(f.bind(this)));
        }

    }


}