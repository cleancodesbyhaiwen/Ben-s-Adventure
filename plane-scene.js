export class planeScene extends Phaser.Scene {
    constructor(){
        super({
            key: "plane-scene",
            physics:{
                arcade:{
                    gravity: {y: 50}
                }
            }
        })
    }
    preload(){
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }
    create(){
        // Initialize Sound and Background
        this.background = this.add.tileSprite(1340,400,2680,800,'background-plane')
        .setScale(1.01).setDepth(-2);
        this.background_music = this.sound.add('wind_sound');
        this.background_music.play({loop:true}); 


        this.explorer = this.physics.add.sprite(620,200, 'explorer').setScale(0.2);
        this.explorer.anims.play('fall',true);
        this.explorer.body.setAllowGravity(false);
        this.add.sprite(600, 200, 'plane').setScale(0.5);


        this.time.addEvent({
            delay: 200, //66000
            callback: ()=>{    
                this.explorer.body.setAllowGravity(true);
            },
            callbackScope: this,
            loop: false
        },this);

        // Initialize Camera and World Bound
        this.cameras.main.setBounds(0, 0, 2680, 625);
        this.physics.world.setBounds(0, 0, 2680,700);
        
    }
    update(){
        this.background.tilePositionX += 5;
        if(this.explorer.y>1000){
            this.background_music.pause();
            this.scene.start('entrance-scene')
        }
    }
}