import {Helper} from './Helper.js'

export class castleScene3 extends Phaser.Scene {
    constructor(){
        super({
            key: "castle-scene3"
        })
    }
    preload(){
        this.load.image("background-scene3","./assets/castle-scene3/background.png");
    }
    create(){
        this.background_music = this.sound.add('background_music');
        this.background_music.play({loop:true});
        this.door_open = this.sound.add('door_open_sound');

        this.background = this.add.tileSprite(2259,400,4518,800,'background-scene3').setScale(1.01);

        this.add.image(100,400,'pillar').setScale(0.35,0.435).setDepth(3);
        this.add.image(4150,400,'pillar').setScale(0.35,0.435).setDepth(3);

        this.door_open_up = this.add.sprite(400,335,'door_open_down').setScale(0.5).setInteractive();
        this.door = this.add.sprite(800,335,'door_closed').setScale(0.5).setInteractive();
        this.door_open_up.on('pointerdown',function(){
            this.scene.switch('castle-scene2');
        },this)
        this.flames = this.add.group();
        this.flames.create(2170,135,'fire').setScale(0.5);
        this.flames.create(2244,155,'fire').setScale(0.5);
        this.flames.create(2310,145,'fire').setScale(0.5);
        this.flames.create(2360,145,'fire').setScale(0.5);
        this.flames.create(2436,145,'fire').setScale(0.5);
        this.flames.children.iterate(function (flame) {
            flame.anims.play('candle_flame');
        });
             
        this.torch = this.add.sprite(4025,200,'fire').setScale(0.5).setInteractive();
        this.torch.anims.play('torch',true);

        this.cameras.main.setBounds(0, 0, 4518, 100);
        this.physics.world.setBounds(0, 0, 4518,650);

        Helper.createKeys(this);
        this.player = Helper.createPlayer(this, 600, 400);
        this.player.setDepth(2);

        this.bat = this.physics.add.sprite(600, 550, 'bat').setScale(0.2).anims.play('fly_mouth_closed');
        this.bat.body.setAllowGravity(false);
        this.bat.body.setImmovable(true);
        this.bat.health = 100;
        this.physics.add.collider(this.bat, this.flareGroup, this.hit, null, this);
    }      
    hit(bat,flare){
        flare.setVisible(false);
        bat.health--;
    } 
    update(){
        //console.log(this.bat.health)
        Helper.updatePlayer(this,this.player,this.KeyA,this.KeyD,this.KeyW,this.KeyS,this.KeySHIFT,this.KeySPACE);
    }
}

