export class Button {
    text;
    constructor(x, y, scale, img, label, scene, downCallback, upCallback, fontStyle, useScrollFactor = true, setPixelPerfect = true) {
        this.buttonResult = scene.add.container(x, y)
        .setDepth(5);
        
        this.scene = scene;
        this.button = scene.add.sprite(0,0, img)
        .setScale(scale)
        //.setInteractive(setPixelPerfect ? scene.input.makePixelPerfect() : null)
        .on("pointerdown", ()=>{ this.PointerDown(downCallback);})
        .on("pointerup", () => { this.PointerUp(upCallback); })
        .on('pointerover', this.PointerOver)
        .on("pointerout", this.PointerOut);
        
        if(setPixelPerfect)
            this.button.setInteractive(scene.input.makePixelPerfect())
        else 
            this.button.setInteractive()
            
        this.buttonResult.add(this.button)

        if(label !== null){
            this.text = scene.add.text(0, 10, label)
            .setOrigin(0.5)
            .setStyle(fontStyle)
            .setPadding({ left: 0, right: 0, top: 0, bottom: 32 });
            this.buttonResult.add(this.text);
        }
        if(useScrollFactor){
            this.buttonResult.setScrollFactor(0);
            this.text?.setScrollFactor(0);
            this.button?.setScrollFactor(0);
        }
    }
    GetComponents(){
        return this.buttonResult;
    }
    PointerDown(downCallback){
        if(downCallback !== null){
            //this.scene.sound.add("button-click", { loop: false, volume: SettingsButton.GetVolumeSFX()}).play();
            setTimeout(() => {
                downCallback();
            }, 500);
        }
    }
    PointerUp(upCallback){
        if(upCallback !== null){
            upCallback();
        }
    }
   PointerOver = () => {
        //this.scene.sound.add("button-hover", { loop: false, volume: SettingsButton.GetVolumeSFX()}).play();
        this.button.setTint (0xaaaaaa);
    }
    PointerOut = () => {
        this.button.setTint (0xffffff);
    }
    
}