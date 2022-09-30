import {PlayerHelper} from './PlayerHelper.js'

export class castleScene3 extends Phaser.Scene {
    constructor(){
        super({
            key: "castle-scene3"
        })
    }
    preload(){
        this.load.image("background-scene3","./assets/castle-scene3/background.png");
        this.load.image("book_green","./assets/castle-scene3/book_green.png");
        this.load.image("letter_content2","./assets/castle-scene3/letter_content.png");
        this.load.audio('earth_shaking', 'assets/castle-scene3/earth_shaking.mp3');
    }
    create(){
        this.background_music = this.sound.add('background_music');
        this.background_music.play({loop:true});
        const door_open = this.sound.add('door_open_sound');
        const earth_shaking_sound = this.sound.add('earth_shaking');

        this.add.tileSprite(2259,400,4518,800,'background-scene3').setScale(1.01);
        const book_green = this.add.sprite(3000, 445, 'book_green').setScale(0.5).setInteractive();
        book_green.on('pointerdown',function(){
            let scene = this;
            this.add.tween({
                targets: book_green,
                x: 2910,
                ease: 'Linear',
                duration: 3000,
                repeat: 0,
                onComplete: function(){
                    scene.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            earth_shaking_sound.play();
                            scene.cameras.main.shake(4000);
                            scene.physics.add.sprite(2900, -10, 'letter').setScale(0.08).setCollideWorldBounds(true)
                            .setInteractive().on('pointerdown',function(){
                                scene.scene.launch('letter-scene2');
                            },scene);
                        },
                        callbackScope: this,
                        loop: false
                    });
                }
            },scene)
        },this)


        this.add.image(100,400,'pillar').setScale(0.35,0.435).setDepth(3);
        this.add.image(4150,400,'pillar').setScale(0.35,0.435).setDepth(3);

        const door_open_down = this.add.sprite(400,335,'door_open_down').setScale(0.5).setInteractive();
        const door = this.add.sprite(800,335,'door_closed').setScale(0.5).setInteractive();
        door_open_down.on('pointerdown',function(){
            this.background_music.pause();
            this.scene.switch('castle-scene2');
        },this)
        const flames = this.add.group();
        flames.create(2170,135,'fire').setScale(0.5);
        flames.create(2244,155,'fire').setScale(0.5);
        flames.create(2310,145,'fire').setScale(0.5);
        flames.create(2360,145,'fire').setScale(0.5);
        flames.create(2436,145,'fire').setScale(0.5);
        flames.children.iterate(function (flame) {
            flame.anims.play('candle_flame');
        });
             
        const torch = this.add.sprite(4025,200,'fire').setScale(0.5).setInteractive();
        torch.anims.play('torch',true);

        this.cameras.main.setBounds(0, 0, 4518, 100);
        this.physics.world.setBounds(0, 0, 4518,650);

        PlayerHelper.createKeys(this);
        this.player = PlayerHelper.createPlayer(this, 600, 400);
        this.player.setDepth(2);

    }      

    update(){
        console.log(this.player.x)
        if(this.background_music.isPaused){
            this.background_music.play({loop:true});
        }
        PlayerHelper.updatePlayer(this,this.player,this.KeyA,this.KeyD,this.KeyW,this.KeyS,this.KeySHIFT,this.KeySPACE);
    }
}

export class letterScene2 extends Phaser.Scene {
    constructor(){
        super({
            key: "letter-scene2"
        })
    }
    create(){
        this.add.sprite(600,400,'letter_content2')
        this.input.on('pointerdown',function(){
            this.scene.stop();
        },this);
    }
}