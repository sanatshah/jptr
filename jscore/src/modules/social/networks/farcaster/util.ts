
// Implements the Signer API 
interface SignerWallet { 
  provider: any
  getAddress : () => Promise<any>
  signMessage: (message) => Promise<any>
  sendTransaction: (transaction) => Promise<any>
}


const getSigningWallet = (): any => {

  return {}

}

