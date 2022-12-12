import { BlocbookEnv } from "@homenode/jscore/dist/apps/blockbook/converters/converter";
import { PlatformState } from "@homenode/jscore/dist/constants/Platform";

export const config = {
	name: "blocbook",
  rpcType: "CLIENT",
  version: "1.0.0",
  env: "production",
  modules: {
    appManager: {
      platforms: PlatformState.Web
    },
    web3: {
      localAuth: true
    },
    social: {
      network: 'FARCASTER',
      useRemote: true
    }
  },
  apps: [
    {
      name: 'blockbook',
      dependencies: [ "web3", "social" ],
      blockbookEnv: BlocbookEnv.PRE_ALPHA,
    }
  ]
}