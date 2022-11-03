import { useEnv, usePlatform, getEnv } from "./App.config";

export default {

  AppManager : {
    version : "1.0.0",
    platform : usePlatform() 
  },

  Log : {
    version : "1.0.0",
    env: getEnv() 
  },

  Comm : {
    version : "1.0.0"
  }

}