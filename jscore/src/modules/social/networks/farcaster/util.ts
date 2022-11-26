import { createJWT, ES256KSigner, Signer as JWTSigner } from "did-jwt";
import { keccak256, toUtf8Bytes } from 'ethers/lib/utils.js';
import { Farcaster, MessageBody, MessageBodyType, serializeMessageBody, SignedCast } from "@standard-crypto/farcaster-js";
import { Signer} from 'ethers';



export const authHeader = async (address, jwtSigner): Promise<string> => {
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
  /** Signs a cast. @see {@link FarcasterContentHost.publishCast} for publishing signed casts */
  export const signCast = async (
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

