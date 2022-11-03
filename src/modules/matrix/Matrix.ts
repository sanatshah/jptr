import Module from "../Module";
import Core from "../../Core";

//const sdk = require("./lib/browser-matrix");
declare var matrixcs;

enum Environments {
    dev = "dev",
    prod = "prod"
}

interface Config {
    home: string;
}

interface DependencyInjection {}

export default class Matrix extends Module {
    public client;

    public isSynced: boolean = false 

    constructor(
        core : Core<{}>,
        private config : Config,
        _dependencyInjection: DependencyInjection
    ) {
        super(core);
    }

    async start(){

        // ToDo: Move this to a jscore storage wrapper
        const userInfo = window.localStorage.getItem("matrix");

        let user = {};
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            user = {
                accessToken: parsedUserInfo.access_token,
                userId: parsedUserInfo.user_id,
                deviceId: parsedUserInfo.device_id,
            }
        }
        user = {}
        let opts = { localStorage: window.localStorage };
        let store = new matrixcs.IndexedDBStore({
            indexedDB: window.indexedDB
        });
        await store.startup();

        this.client = matrixcs.createClient({
            baseUrl: this.config.home,
            store,
            ...user         
        });

        if (Object.keys(user).length > 0) {
            this.core.modules.clientContext?.auth.checkLocalAuth()
        }

    }

    async sync(){
        this.client.startClient();
        return new Promise((resolve, reject) => this.client.once('sync', (state, prevState, res) => {
            this.isSynced = true;
            resolve(state);
        }));
    }
}
