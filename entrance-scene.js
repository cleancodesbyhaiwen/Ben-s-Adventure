import {PlayerHelper} from './helpers/PlayerHelper.js'
import {KnightHelper} from './helpers/KnightHelper.js'
import {DialogHelper} from './helpers/DialogHelper.js'


export class entranceScene extends Phaser.Scene {
    constructor(){
        super({
            key: "entrance-scene",
        })
    }
    preload(){
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }
    create(){
        this.shark_jumped = false;
        this.knight_spoke = false;
        this.landed = false;
        // Initialize Sound and Background
        this.background = this.add.tileSprite(3962.5,400,15850,1600,'background-entrance').setScale(0.51).setDepth(-2);
        this.background_music = this.sound.add('background_music1');
        this.background_music.play({loop:true}); 
        // wall plaque and door
        const wall_plaque_rotate = this.sound.add('brick_rotate_sound');
        const door = this.add.sprite(7550, 516, 'door_closed').setScale(0.55).setInteractive()
        .on('pointerdown',function(){
            if(door.texture.key=='door_open'){
                this.scene.start('castle-scene0')
            }
        },this);
        const wall_plaque = this.add.sprite(7550, 230, 'wall_plaque').setScale(0.5).setInteractive()
        .on('pointerdown',function(){
            if(wall_plaque.angle==0){
                wall_plaque_rotate.play();     
                this.add.tween({                                                  // Rotate Brick
                    targets: wall_plaque,
                    angle: 180,
                    ease: 'Linear',
                    duration: 5000,
                    repeat: 0,
                    onComplete: function(){                                        // Shake Camera
                        door.setTexture('door_open');
                    }
                },this)
            }
        },this);

        // Initialize Camera and World Bound
        this.cameras.main.setBounds(0, 0, 7925, 800);
        this.physics.world.setBounds(0, 0, 7925,705);

        // Water
        const water = this.add.sprite(4050,790, 'water').setScale(0.6)
        water.anims.play('water_anims')
        this.add.image(3525, 785, 'left_edge').setScale(0.4)
        this.add.image(4580, 785, 'right_edge').setScale(0.4)

        // Initialize Player
        this.parachute = this.physics.add.sprite(420, -60, 'parachute').setScale(0.3)
        PlayerHelper.createPlayer(this, 4000, 506);

        // Initialize Knight
        this.knight = KnightHelper.createKnight(this,this.playerContainer, 5050,610,'knight',
        'bullet_hit_knight_sound','knight_whoosh_sound','hurt_by_knight_sound', 
        'knight_walk','knight_attack','knight_die','knight_idle',true,11,15); 

        
        // Bridge
        this.add.sprite(4050, 650, 'bridge').setScale(0.25)
        const bridge_collisionbox = this.add.rectangle(4050, 685, 1217, 15, 0x6666ff).setDepth(-1);
        this.physics.add.existing(bridge_collisionbox);
        bridge_collisionbox.body.setAllowGravity(false);
        bridge_collisionbox.body.setImmovable(true); 
        this.physics.add.collider(this.playerContainer, bridge_collisionbox);


        
    }
    update(){

        if(this.playerContainer.x > 4040 && !this.shark_jumped){
            this.shark = this.physics.add.sprite(4040, 900, 'shark').setScale(0.5)
            this.shark.angle = 90
            this.shark.anims.play('shark_anims')
            this.shark.body.setVelocityY(-1000)
            this.shark_jumped = true;
        }

        if(this.shark && Math.floor(this.shark.y) < 800 && Math.floor(this.shark.y) > 790){
            const splash = this.add.sprite(4040, 700, 'splash').setScale(0.3)
            this.sound.add('splash_sound').play();
            splash.anims.play('splash_anims').on('animationcomplete', () =>{
                splash.destroy();
            });
        }

        if(Math.abs(this.playerContainer.x-this.knight.x)<400&&!this.knight_spoke){
            this.sound.add('not_suppose').play();
            this.knight_spoke = true;

        }

        console.log(this.playerContainer.x)
        if(this.playerContainer.y<500 && !this.landed){
            this.playerContainer.body.setVelocityY(50)
            this.parachute.body.setVelocityY(50)
        }else{
            this.landed = true;
        }
        //console.log(this.playerContainer.y)
        PlayerHelper.updatePlayer(this, this.player, this.playerBody, this.playerArm, this.playerContainer);
        KnightHelper.updateKnight(this, this.knight, this.playerContainer, this.player);
    }
}