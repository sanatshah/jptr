import express from "express";
import bodyParser from "body-parser";

import * as Core from "@homenode/jscore"
import cors from 'cors'


const config = {
	name: "rpc",
  rpcType: "SERVER",
  version: "1.0.0",
  env: "production",
  modules: {
    web3: {},
    social: {
      network: 'FARCASTER',
    }
  },
};

(async () => {
  
  const app = express();
  app.use(bodyParser.json());
  app.use(cors())

  new Core.default.default(config)
  await Core._.m().start()
  await Core._.m().modules.social.setup()

  app.post("/rpc", async (req, res) => {
    const jsonRPCRequest = req.body;
    const server = Core._.m().rpc.server

    console.log(`> Recieved RPC request for [${jsonRPCRequest.method}]`)

    server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
      if (jsonRPCResponse) {
        res.json(jsonRPCResponse);
      } else {
        res.sendStatus(204);
      }
    });

  });

  app.listen(9000);

})()

