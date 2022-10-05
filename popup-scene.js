export class PopUpScene extends Phaser.Scene {
    constructor(){
        super({
            key: "popup-scene"
        })
    }
    init(data){
        this.parentScene = data.parentScene;
        this.imgKey = data.imgKey;
    }
    create(){
        this.parentScene.input.enabled = false;
        this.parentScene.input.keyboard.enabled = false;
        this.add.sprite(600,400,this.imgKey);
        this.add.sprite(1150,50,'close_button').setInteractive().setScale(0.5)
        .on('pointerdown',function(){
            this.parentScene.background.setAlpha(1);
            this.parentScene.input.enabled = true;
            this.parentScene.input.keyboard.enabled = true;
            this.scene.stop();
        },this);
    }
}