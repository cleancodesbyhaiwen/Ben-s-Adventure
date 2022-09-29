import {Helper} from './Helper.js'

export class castleScene2 extends Phaser.Scene {
    constructor(){
        super({
            key: "castle-scene2"
        })
    }
    preload(){
        this.load.image("background-scene2","./assets/castle-scene2/background.png");
    }
    create(){
        this.background_music = this.sound.add('background_music');
        this.background_music.play({loop:true});
        this.door_open = this.sound.add('door_open_sound');

        this.background = this.add.tileSprite(2259,400,4518,800,'background-scene2').setScale(1.01);

        this.add.image(100,400,'pillar').setScale(0.35,0.435).setDepth(3);
        this.add.image(4150,400,'pillar').setScale(0.35,0.435).setDepth(3);

        this.door_open_down = this.add.sprite(720,335,'door_open_down').setScale(0.5).setInteractive();
        this.door_open_down.on('pointerdown',function(){
            this.scene.switch('castle-scene1');
        },this)

        this.door = this.add.sprite(1200,335,'door_closed').setScale(0.5).setInteractive();
        this.door.on('pointerdown',function(){
            if(this.door.texture.key==='door_open_up'){
                this.scene.switch('castle-scene3')
            }
        },this)
        this.flames = this.add.group();
        this.flames.create(2170,115,'fire').setScale(0.5);
        this.flames.create(2244,125,'fire').setScale(0.5);
        this.flames.create(2310,115,'fire').setScale(0.5);
        this.flames.create(2360,115,'fire').setScale(0.5);
        this.flames.create(2436,115,'fire').setScale(0.5);
        this.flames.create(2265,300,'fire').setScale(0.1);
        this.flames.create(2280,285,'fire').setScale(0.1);
        this.flames.create(2300,300,'fire').setScale(0.1);
        this.flames.children.iterate(function (flame) {
            flame.anims.play('candle_flame');
        });
             
        this.torch = this.add.sprite(4015,200,'fire').setScale(0.5).setInteractive();
        this.torch.anims.play('torch',true);
        this.torch.on('pointerdown',function(){
            let scene = this;
            this.add.tween({
                targets: this.torch,
                angle: -90,
                x: 3560,
                y:450,
                ease: 'Linear',
                yoyo: true,
                duration: 3000,
                repeat: 0,
                onYoyo: function(){
                    scene.add.sprite(3535, 450, 'fire').setScale(0.2).anims.play('fireplace_fire');
                    scene.door_open.play();
                    scene.door.setTexture('door_open_up')
                }
            },scene)
        },this)

        this.cameras.main.setBounds(0, 0, 4518, 100);
        this.physics.world.setBounds(0, 0, 4518,650);

        Helper.createKeys(this);
        this.player = Helper.createPlayer(this, 600, 400);
        this.player.setDepth(2);
    }
    update(){
        //console.log(this.player.x)
        Helper.updatePlayer(this,this.player,this.KeyA,this.KeyD,this.KeyW,this.KeyS,this.KeySHIFT,this.KeySPACE);
    }
}