import React from 'react';

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { chain, configureChains, createClient, WagmiConfig, useProvider, useAccount, useConnect, useClient, useSigner, useSignMessage } from "wagmi";

import { _ } from "@homenode/jscore/dist/Core"

const projectID = '53f57bac7dd366a79f4083f23b2b773b' 

// Wagmi client
const chains = [chain.goerli];
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectID }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

interface WalletConnectProps {
  children: React.ReactNode
}

export const Account = ({
  onAccountSetup
}: {
  onAccountSetup: () => void
}) => {
  const { address } = useAccount()
  const { data: signer, isSuccess } = useSigner()
  const provider = useProvider()


  React.useEffect(() => {
      if (_.m().modules.web3?.isConnected) {
        return 
      }

      const connect = async () => {
        if ( isSuccess && address && provider && signer) {
          await _.m().modules.web3?.setUser(address, signer, provider)
          await _.m().modules.social?.setup()
          onAccountSetup()
        }
      }

      connect()

  }, [ address, signer, provider, isSuccess ])

  if (!address || !_.m().modules.web3?.user) {
    return null
  }

  const web3 = _.m().modules.web3

  if (web3?.user.profileURL) {
    return <div style={{
      position: 'absolute',
      top: "30px",
      right: "250px",
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <img src={web3?.user.profileURL} width="40px" height="40px" style={{borderRadius: '10px'}} />
    </div>
  }

  return (
    <div style={{
      position: 'absolute',
      top: "30px",
      right: "250px",
      width: "40px",
      height: "40px",
      backgroundColor: "#cb5b4f",
      borderRadius: "10px",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <p style={{ fontSize: "12px", color: "white"}}>{address.substring(0, 5)}</p>
    </div>
  )
}

export const WalletConnect = ({ children }: WalletConnectProps) => {
  const [ isReady, setIsReady ] = React.useState(false)

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        {isReady ? children : null}
        <Account onAccountSetup={() => setIsReady(true)}/>
      </WagmiConfig>
      <div style={{
        position: 'absolute',
        top: "30px",
        right: "100px"
      }}>
        <Web3Button />
      </div>
      <Web3Modal
        projectId={projectID}
        ethereumClient={ethereumClient}
        themeColor={'purple'}
      />
    </>
  )

}
