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
        this.load.image("letter_content1","./assets/castle-scene1/letter_content.png");
        this.load.image("wall_plaque","./assets/castle-scene1/wall_plaque.png");
    }
    create(){
        const wall_plaque_rotate = this.sound.add('wall_plaque_rotate_sound');
        const door_open = this.sound.add('door_open_sound');
        this.background_music = this.sound.add('background_music');
        this.background_music.play({loop:true});    
        this.add.tileSprite(1396,400,2793,800,'background-scene1').setScale(1.01);
        const come_up_stairs = this.sound.add('come_up_stairs');

        this.add.image(100,400,'pillar').setScale(0.35,0.435).setDepth(2);
        this.add.image(2700,400,'pillar').setScale(0.35,0.435).setDepth(2);

        const door = this.add.sprite(470,360,'door_closed').setScale(0.5).setInteractive();
        door.on('pointerdown',function(){
            if(door.texture.key==='door_open_up'){
                this.background_music.pause();
                this.scene.switch('castle-scene2');
            }
        },this)

        const wall_plaque = this.add.sprite(470, 130, 'wall_plaque').setScale(0.3).setInteractive();
        wall_plaque.angle = 180;
        wall_plaque.on('pointerdown',function(){
            wall_plaque_rotate.play();
            this.add.tween({
                targets: wall_plaque,
                angle: 0,
                ease: 'Linear',
                duration: 5000,
                repeat: 0,
                onComplete: function(){
                    door_open.play();
                    door.setTexture('door_open_up');
                    come_up_stairs.play({volume: 3});
                }
            })
        },this)

        const torches = this.add.group();
        torches.create(170,100,'fire').setScale(0.5);
        torches.create(750,100,'fire').setScale(0.5);
        torches.create(1385,100,'fire').setScale(0.5);
        torches.create(1980,100,'fire').setScale(0.5);
        torches.create(2620,100,'fire').setScale(0.5);
        torches.children.iterate(function (torch) {
            torch.anims.play('torch');
        });

        const letter = this.add.sprite(1500,650,'letter').setScale(0.08).setInteractive();
        letter.on('pointerdown',function(){
            this.scene.launch('letter-scene1');
        },this)

        this.bat = this.physics.add.sprite(2400, 400, 'bat').setScale(0.2).setVelocityX(-500);
        this.bat.body.setAllowGravity(false);
        this.bat.anims.play('fly_mouth_closed');

        this.cameras.main.setBounds(0, 0, 2793, 100);
        this.physics.world.setBounds(0, 0, 2793,700);
        
        Helper.createKeys(this);
        this.player = Helper.createPlayer(this, 415, 585);
        this.knight = Helper.createEnemy(this, 2800,400,'knight','flare_hit_knight_sound'
        ,'knight_whoosh_sound','hurt_by_knight_sound');    
    }            
    update(){
        //console.log(this.player.health)
        if(this.background_music.isPaused) this.background_music.play({loop:true});
        if(Math.abs(this.bat.x-this.player.x)<30) this.sound.add('bat_squeak_sound').play();
        if(this.bat.x < -30){
            this.bat.setActive(false);
            this.bat.setVisible(false);
        }
        Helper.updatePlayer(this, this.player);
        Helper.updateEnemy(this, this.knight, this.player);
    }
}

export class letterScene1 extends Phaser.Scene {
    constructor(){
        super({
            key: "letter-scene1"
        })
    }
    create(){
        this.add.sprite(600,400,'letter_content1');
        this.input.on('pointerdown',function(){
            this.scene.stop();
        },this);
    }
}