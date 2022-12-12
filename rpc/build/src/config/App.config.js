import * as Core from "@homenode/jscore";
const _ = Core._;
export const config = {
    name: "blocbook",
    child: false,
    version: "1.0.0",
    env: "production",
    modules: {
        appManager: {
            platforms: "web"
        },
        web3: {
            localAuth: true
        },
        social: {
            network: 'FARCASTER',
            localAuth: true
        }
    },
    apps: [
        {
            name: 'blockbook',
            dependencies: ["web3", "social"],
            blockbookEnv: _.m().apps.blockbook.converters.converter.BlocbookEnv.PRE_ALPHA,
            allowRPC: false
        }
    ]
};
//# sourceMappingURL=App.config.js.map