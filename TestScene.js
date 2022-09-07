
import * as Helpers from "./helpers.js";
import * as Near from "./near.js";

export class Test extends Phaser.Scene {
    constructor(){
        super("Test");
    }
    preload(){
        this.load.image("button", "./button.png");
    }
    create(){
        if(!Near.IsConnected())
            new Helpers.Button(this.game.config.width / 2, this.game.config.height / 2, 0.5, "button", "Login", this, Near.LoginFullAccess, null,{fontSize: 30, fontFamily: "BangersRegular"})
        else{
            new Helpers.Button(this.game.config.width - 200, 100, 0.5, "button", Near.GetAccountId(), this, Near.LogOut, null,{fontSize: 30, fontFamily: "BangersRegular"})
            new Helpers.Button(this.game.config.width / 2, this.game.config.height / 2, 0.5, "button", "Minar NFT", this, 
            ()=>{
                this.socket.emit("nftMint", {accountId: Near.GetAccountId()}); 
                Near.MintNFT()
            }, null,{fontSize: 30, fontFamily: "BangersRegular"})
            new Helpers.Button(this.game.config.width / 2, this.game.config.height / 2 + 100, 0.5, "button", "Ver NFTs", this, Near.NFTTokens, null,{fontSize: 30, fontFamily: "BangersRegular"})

            this.socket = io("https://example-sockets.herokuapp.com/");
            
            this.socket.on("nftMint", (result)=> {
                if(result){
                    Near.NFTTokens();
                }
            })
        }

    }
    update(){

    }
    
}