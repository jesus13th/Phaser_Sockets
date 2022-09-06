// npx es-dev-server --node-resolve --watch
import * as Test from "./TestScene.js";

const testScene = Test.Test;


const config = {
    type: Phaser.AUTO,
    parent: 'gameContainer',
    audio: {
        disableWebAudio: true
    },
    scale:{
        parent: "gameContainer",
        mode: Phaser.Scale.CENTER_BOTH,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min:{
            width: 200,
            height: 120
        }, 
        max: {
            width: 1600,
            height: 960
        },
        zoom: 1
    },
    physics:{
        default: "arcade",
        arcade:{
            gravity:{
                y: 0
            },
            debug: false,
            debugShowBody: true,
            debugShowStaticBody: true,
        },
    },
    autorRound: false,
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.NONE,
    scene: [ testScene ]
};

const game = new Phaser.Game(config);