import React from 'react';
import { Button } from '@chakra-ui/react';

import { _ } from "@homenode/jscore/dist/Core"

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { chain, configureChains, createClient, WagmiConfig, useProvider, useAccount, useConnect, useClient, useSigner, useSignMessage } from "wagmi";
import { Signer, Wallet } from 'ethers';

import { fetchEnsName } from "@wagmi/core"

import { Farcaster, MessageBody, MessageBodyType, serializeMessageBody, SignedCast } from "@standard-crypto/farcaster-js";

import { createJWT, ES256KSigner, Signer as JWTSigner } from "did-jwt";
import { keccak256, toUtf8Bytes } from 'ethers/lib/utils.js';




const projectID = '53f57bac7dd366a79f4083f23b2b773b' 

  /** Signs a cast. @see {@link FarcasterContentHost.publishCast} for publishing signed casts */
  const signCast = async (
    cast: MessageBody,
    signer: Signer
  ): Promise<SignedCast> => {
    if (cast.address !== (await signer.getAddress())) {
      throw new Error(
        `The address ${cast.address} for user ${
          cast.username
        } does not match the address of the provided signer: ${await signer.getAddress()}`
      );
    }
    const serializedCast = serializeMessageBody(cast);
    const merkleRoot = keccak256(toUtf8Bytes(serializedCast));
    const signature = await signer.signMessage(merkleRoot);
    return {
      body: cast,
      merkleRoot,
      signature,
    };
  }

/**
   * @param cast A signed cast. @see {@link Farcaster.signCast} for building this parameter
   * @param wallet The same wallet used to sign the cast
   */

const authHeader = async (address, jwtSigner): Promise<string> => {
  const timeInEpochSeconds = Math.floor(Date.now() / 1000);
  const expiry = timeInEpochSeconds + 60;
  const jwt = await createJWT(
    { exp: expiry },
    {
      // cspell:disable-next-line
      issuer: `did:ethr:rinkeby:${address}`, // still 'rinkeby' not 'goerli,' despite the migration
      signer: jwtSigner,
    },
    { alg: "ES256K" }
  );
  return `Bearer ${jwt}`;
}

/*
const publishCast =  async (cast: SignedCast, wallet: Wallet): Promise<void> => {
  const authHeader = await authHeader(wallet);
  return await this.axiosInstance.post("/indexer/activity", cast, {
    headers: { authorization: authHeader },
    validateStatus: (status: number) => true,
  });
}(*/


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

export const Account = () => {
  const { address  } = useAccount()
  const client = useClient()
  const { connect, connectors } = useConnect()
    const { data: signer, isError, isLoading } = useSigner()
    const { signMessage} = useSignMessage({ message : "Happy Thanksgiving!"})
    const provider = useProvider()

  const [isSent, setIsSent ] = React.useState(false)

  React.useEffect(() => {

      if (address && provider && signer) {
        const farcasterTest = async () => {
          console.log("address: ", address)
          console.log("signer: ")
          if (!isSent && signer) {
            //await publishCast(signer as any, provider, "Hello, from Blocktales!");
          
            const farcaster = new Farcaster(provider);
            const user = await farcaster.userRegistry.lookupByUsername('llhungrub');
            console.log("user: ", user)
              if (user == null) {
              throw new Error(`no username registered for address ${address}`);
              }

              const unsignedCast = await farcaster.prepareCast({
                fromUsername: user.username,
                text: 'Hello from Blocktales',
              });

            const signedCast = signCast(unsignedCast, signer)

            console.log("signedCast: ", signedCast)

            //const auth = await authHeader(address, signMessage)

            //console.log("auth: ", auth)

            setIsSent(true)
          for await (const activity of farcaster.getAllActivityForUser("llhungrub", {
            includeRecasts: false,
          })) {
            console.log(activity.body.data.text);
          }

        }
        }



      farcasterTest()
    }


  }, [ address, signer ])

  if (!address) {
    return null
  }

  console.log("ethers signer: ", signer)
  console.log("ethers provider: ", provider)

  return (
    <div style={{
      position: 'absolute',
      top: "16px",
      right: "80px",
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

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Account />
        {children}
      </WagmiConfig>
      <div style={{
        position: 'absolute',
        top: "16px",
        right: "40px"
      }}>
        <Web3Button />
      </div>
      <Web3Modal
        projectId={projectID}
        ethereumClient={ethereumClient}
      />
    </>
  )

}
