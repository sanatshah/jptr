import { PlatformState } from "@homenode/jscore/dist/constants/Platform";

export const config = {
	name: "blocktales",
  child: false,
  version: "1.0.0",
  env: "production",
  modules: {
    appManager: {
      platforms: PlatformState.Web
    },
    web3: {},
    social: {
      network: 'FARCASTER'
    }
  },
  apps: [
    {
      name: 'blockbook',
      dependencies: [ "web3", "social" ]
    }
  ]
}