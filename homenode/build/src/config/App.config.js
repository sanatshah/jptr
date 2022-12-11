export function getEnv() {
    try {
        if (process.env.env) {
            return process.env.env;
        }
        else {
            return __ENV__;
        }
    }
    catch (e) {
        return "prod";
    }
}
export function useEnv(local, prod) {
    try {
        if (process.env.env) {
            return process.env.env === "Local" ? local : prod;
        }
        else {
            return __ENV__ === "Local" ? local : prod;
        }
    }
    catch (e) {
        return prod;
    }
}
export function usePlatform() {
    try {
        if (__PLATFORM__) {
            return __PLATFORM__;
        }
    }
    catch (e) {
        return "MOBILE";
    }
}
let config = {
    name: "osi",
    version: "1.0.0",
    child: false,
    env: (() => {
        try {
            return process.env.env ? process.env.env : __ENV__;
        }
        catch (e) {
            return "Prod";
        }
    })(),
    modules: {
        ...require("./Modules.config").default
    }
};
export default config;
//# sourceMappingURL=App.config.js.map