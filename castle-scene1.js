import {Helper} from './Helper.js'

export class castleScene1 extends Phaser.Scene {
    constructor(){
        super({
            key: "castle-scene1"
        })
    }
    preload(){
        this.load.image("background-scene1","./assets/castle-scene1/background.png");
        this.load.audio('wall_plaque_rotate_sound', 'assets/castle-scene1/wall_plaque_rotate.mp3');
        this.load.audio('come_up_stairs', 'assets/castle-scene1/come_up_stairs.wav');
        this.load.image("letter","./assets/castle-scene1/letter.png");
        this.load.image("letter_content","./assets/castle-scene1/letter_content.png");
        this.load.image("wall_plaque","./assets/castle-scene1/wall_plaque.png");
    }
    create(){
        this.wall_plaque_rotate = this.sound.add('wall_plaque_rotate_sound');
        this.door_open = this.sound.add('door_open_sound');
        const background_music = this.sound.add('background_music');
        this.background = this.add.tileSprite(1405,400,2810,800,'background-scene1').setScale(1.01);
        const come_up_stairs = this.sound.add('come_up_stairs');

        this.add.image(100,400,'pillar').setScale(0.35,0.435).setDepth(2);
        this.add.image(2700,400,'pillar').setScale(0.35,0.435).setDepth(2);

        this.door = this.add.sprite(470,360,'door_closed').setScale(0.5).setInteractive();
        this.door.on('pointerdown',function(){
            if(this.door.texture.key==='door_open_up'){
                this.scene.switch('castle-scene2');
            }
        },this)

        this.wall_plaque = this.add.sprite(470, 130, 'wall_plaque').setScale(0.3).setInteractive();
        this.wall_plaque.angle = 180;
        if(this.fromScene2) this.wall_plaque.angle = 0;
        this.wall_plaque.on('pointerdown',function(){
            if(this.wall_plaque.angle==-180){
                this.wall_plaque_rotate.play();
                let scene = this;
                this.add.tween({
                    targets: this.wall_plaque,
                    angle: 0,
                    ease: 'Linear',
                    duration: 5000,
                    repeat: 0,
                    onComplete: function(){
                        scene.door_open.play();
                        scene.door.setTexture('door_open_up');
                        come_up_stairs.play({volume: 2});
                    }
                },scene)
            }
        },this)

        this.torches = this.add.group();
        this.torches.create(170,100,'fire').setScale(0.5);
        this.torches.create(750,100,'fire').setScale(0.5);
        this.torches.create(1385,100,'fire').setScale(0.5);
        this.torches.create(1980,100,'fire').setScale(0.5);
        this.torches.create(2620,100,'fire').setScale(0.5);
        this.torches.children.iterate(function (torch) {
            torch.anims.play('torch');
        });

        this.letter = this.add.sprite(1500,650,'letter').setScale(0.08).setInteractive();
        this.letter.on('pointerdown',function(){
            this.scene.launch('letter-scene');
        },this)

        this.cameras.main.setBounds(0, 0, 2810, 100);
        this.physics.world.setBounds(0, 0, 2810,700);
        
        Helper.createKeys(this);
        this.player = Helper.createPlayer(this, 415, 585);

        //this.sound.pauseOnBlur = false;
        background_music.play({loop:true});
    }
    update(){
        console.log(this.player.x);
        Helper.updatePlayer(this, this.player,this.KeyA,this.KeyD,this.KeyW,this.KeyS,this.KeySHIFT,this.KeySPACE);
    }
}

export class letterScene extends Phaser.Scene {
    constructor(){
        super({
            key: "letter-scene"
        })
    }
    preload(){
        this.load.image("background","./assets/castle-scene1/background.png");
    }
    create(){
        this.add.sprite(600,400,'letter_content')
        this.input.on('pointerdown',function(){
            this.scene.stop();
        },this);
    }
}