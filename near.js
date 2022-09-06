import * as nearAPI from "../lib/near-api-js.js"
const { connect, keyStores, WalletConnection, Contract, utils, providers, KeyPair, transactions } = nearApi;

const config = {
      networkId: 'testnet',
      keyStore: typeof window === "undefined"
      ? new keyStores.InMemoryKeyStore()
      : new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org'
}
const near = await connect(config);
const wallet = new WalletConnection(near, 'ncd-ii');

const contract_id_burritos = "dev-1662497209670-35450562637719";

const contract_burritos = new Contract(wallet.account(), contract_id_burritos, {
    viewMethods: [  ],
    changeMethods: [ "nft_tokens" ],
    sender: wallet.account()
});
export function Login() {
    wallet.requestSignIn(
        contract_id_burritos,
        "Burrito Battle",
        window.location.origin,
    );
}
export function LogOut() {
    wallet.signOut();
}
export function IsConnected() {
    return wallet.isSignedIn();
}
export function GetAccountId(){
    return wallet.getAccountId()
}
export async function NFTTokens(){
    let result = await contract_burritos.nft_tokens({from_index: "0", limit:50, account_id: GetAccountId(),}, 300000000000000, 0 );
    console.log(result);
    return result;
}