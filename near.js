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
    changeMethods: [ "nft_tokens", "nft_mint" ],
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
    location.reload();
}
export function IsConnected() {
    return wallet.isSignedIn();
}
export function GetAccountId(){
    return wallet.getAccountId()
}
export async function NFTTokens(){
    console.log("obteniendo nfts...");
    let result = await contract_burritos.nft_tokens({from_index: "0", limit:50, account_id: GetAccountId(),}, 300000000000000, 0 );
    console.log(result);
    return result;
}
export async function MintNFT(){
    console.log("minando...");
    let result = await contract_burritos.nft_mint(
        {
            token_owner_id: GetAccountId() ,
            token_metadata: { 
                title: "Burrito 3", 
                description: "This is a burrito", 
                media: "https://s3-us-west-2.amazonaws.com/melingoimages/Images/28098.jpg", 
                extra: ""
            }
        },
        300000000000000, 
        utils.format.parseNearAmount("5")
        );
    console.log(result);
    return result;
}
export async function LoginFullAccess(){
    const currentUrl = new URL(window.location.href);
    const newUrl = new URL(wallet._walletBaseUrl + "/login/");
	newUrl.searchParams.set('success_url', window.location.origin || currentUrl.href);
    newUrl.searchParams.set('failure_url', window.location.origin || currentUrl.href);

  const accessKey = KeyPair.fromRandom("ed25519");
  newUrl.searchParams.set("public_key", accessKey.getPublicKey().toString());
  await wallet._keyStore.setKey(
    wallet._networkId,
    "pending_key" + accessKey.getPublicKey(),
    accessKey
  );

  transactions.functionCallAccessKey(contract_id_burritos, ["nft_mint"]);
  window.location.assign(newUrl.toString());
}