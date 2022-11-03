import Feathers from "@feathersjs/feathers";
import io from "socket.io-client";
const socketio = require('@feathersjs/socketio-client');
const rest = require('@feathersjs/rest-client');

import ax from "axios";

//import { AsyncStorage } from 'react-native'

import Server from "../Server";

export enum SOCKET{
    CONNECT = "CONNECT",
    RECONNECT = "RECONNECT",
    RECONNECT_FAILURE = "RECONNECT_FAILURE",
    SERVER_DISCONNECT = "SERVER_DISCONNECT",
    CLIENT_DISCONNECT = "CLIENT_DISCONNECT",
    PING_TIMEOUT = "PING_TIMEOUT ",
    ERROR = "ERROR ",
    CONNECT_ERROR = "CONNECT_ERROR "
}


interface FeathersOpts {
    url : string,
    useSocket  : boolean,
    headers? : any
}

export default class FeathersClass{

    private client : Feathers.Application;
    private socket : any;
    
    constructor(private opts : FeathersOpts) {
        this.client = Feathers();
        this.socket = {};
    }

    async setupClient() {

        const { url, useSocket} = this.opts;
        //const jwt = await AsyncStorage.getItem("feathers-jwt"); 
        const jwt= "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjI4LCJzb21la2V5Ijoic29tZXZhbHVlIiwiaWF0IjoxNTY3MjA3MDE5LCJleHAiOjE1Njc4MTE4MTksImF1ZCI6Imh0dHBzOi8va3JpcGEuY29tIiwiaXNzIjoiZmVhdGhlcnMiLCJzdWIiOiJhbm9ueW1vdXMiLCJqdGkiOiI3NTQyNDAxOC01ZTY0LTQ4NmEtODVmMS1lMjU1MDdkYTE3ZGMifQ.B0nnFGOwDmcQ4cl4_ytZ_rEh4BKnmVDEKYRpkQmdWbg"

        if (useSocket) {

            if (!jwt)  {
                return;
            }

            const socket = io.connect(url, {
                query : {
                    token :  "Bearer " + jwt
                }
            });
           
            socket.on("connect", () => {
                console.log("Socket connected.")
            });

            socket.on("connect_timeout", (e : string) => {
                console.log("Socket connection timeout : ", e)
            })

            socket.on("connect_error", (e : string) => {
                console.log("Socket connect error : ", e)
            })

            socket.on("reconnect_failed", (e : string) => {
                console.log("Socket reconnect failed : ", e)
                //CoreManager.reset();
            })

            socket.on("reconnect", (e : string) => {
                console.log("Socket reconnected.", e);
            })

            socket.on("reconnect_error", (e : string) => {
                console.log("Socket reconnect error : ", e)
            })

            socket.on("disconnect", (reason : string) => {
                console.log("Socket disconnected : " + reason);

                const disconnectString = "Uanble to connected..."

                switch (reason) {

                    case "io server disconnect" : 
                        break;
                    
                    case "io client disonnect" : 
                        break;

                    case "ping timeout" : 
                        break; 

                    default : 
                        break;
                }
                
            })

            socket.on("error", (e: string) => {
                console.log("Connection Error to Server : ", url, e);
            })


            this.client.configure(socketio(socket));
            this.socket = socket;


        } else {

            const restClient = rest(url);
            const axios = ax.create({ 
                withCredentials: true, 
            });

            const interceptor = (config : any) => {
                config.headers.Authorization =  jwt ? `Bearer ${jwt}` : '';
                return config;
            }

            axios.interceptors.request.use(interceptor);

            this.client.configure(restClient.axios(axios));

        }

    }

    async setup(rawData : any) {
        const { service, method, args: { id, data, params } = {} as any } = rawData;
        const proxy = this.client.service(service);
        const methodMap : any = {
            find: () => proxy.find(params),
            get: () => proxy.get(id, params),
            create: () => proxy.create(data, params),
            update: () => proxy.update(id, data, params),
            patch: () => proxy.patch(id, data, params),
            remove: () => proxy.remove(id, params)
        };

        try {
            const res = await methodMap[method]();
            return res;
        } catch (e) {
            console.log("Error : ", e)
        }

    }

    configure(conf : any) {
        return this.client.configure(conf);
    }

    getClient() {
        return this.client;
    }

    proxyService(service : any) {
        const proxyService = this.client.service(service);
        return proxyService;
    }


}
