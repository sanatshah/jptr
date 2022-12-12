import express from "express";
import bodyParser from "body-parser";
import * as Core from "@homenode/jscore";
const config = {
    name: "rpc",
    rpcType: "SERVER",
    version: "1.0.0",
    env: "production",
    modules: {
        web3: {
            localAuth: false
        },
        social: {
            network: 'FARCASTER',
            isRPCServer: true
        }
    },
};
(async () => {
    new Core.default.default(config);
    await Core._.m().start();
    const app = express();
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        console.log("req, : ", req);
        console.log("res, : ", res);
        Core._.m().modules.web3.setSigner();
        next();
    });
    app.post("/rpc", (req, res) => {
        const jsonRPCRequest = req.body;
        const server = Core._.m().rpc.getServer();
        server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
            if (jsonRPCResponse) {
                res.json(jsonRPCResponse);
            }
            else {
                res.sendStatus(204);
            }
        });
    });
    app.listen(9000);
})();
//# sourceMappingURL=main.js.map