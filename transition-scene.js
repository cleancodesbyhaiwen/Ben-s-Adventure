export class TransitionScene extends Phaser.Scene {
    constructor(){
        super({
            key: "transition-scene"
        })
    }
    init(data){
        this.nextScene = data.nextScene;
        this.duration = data.duration;
    }
    create(){
        this.time.addEvent({
            delay: this.duration, 
            callback: ()=>{    
                this.scene.start(this.nextScene)
            },
            callbackScope: this,
            loop: false
        },this);
    }
}