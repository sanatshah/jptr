import { usePlatform, getEnv } from "./App.config";
export default {
    appManager: {
        version: "1.0.0",
        platform: usePlatform()
    },
    log: {
        version: "1.0.0",
        env: getEnv()
    },
    matrix: {
        version: "1.0.0",
        home: 'https://matrix.org',
        handleStoreLoading: true,
        encryptionEnabled: false,
        platform: usePlatform(),
        dependencies: [
            {
                package: "storage",
                version: "1.0.0"
            }
        ],
    },
    clientContext: {
        version: "1.0.0",
        dependencies: [
            {
                package: "matrix",
                version: "1.0.0"
            }
        ],
        auth: {
            type: 'Matrix'
        }
    },
    storage: {
        version: "1.0.0",
        platform: usePlatform(),
        env: getEnv()
    }
};
//# sourceMappingURL=Modules.config.js.map