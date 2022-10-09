import {PlayerHelper} from './PlayerHelper.js'
import {EnemyHelper} from './EnemyHelper.js'
import {DialogHelper} from './DialogHelper.js'
import {ArrowGroup} from './ArrowHelper.js'

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
        // Initialize Sound and Background
        this.background = this.add.tileSprite(2191,400,4382,800,'background-entrance').setScale(1.02).setDepth(-2);
        this.background_music = this.sound.add('background_music1');
        this.background_music.play({loop:true}); 

        const wall_plaque_rotate = this.sound.add('brick_rotate_sound');

        const door = this.add.sprite(2880, 515, 'door_closed').setScale(0.6).setInteractive()
        .on('pointerdown',function(){
            if(door.texture.key=='door_open'){
                this.scene.start('castle-scene0')
            }
        },this);

        const wall_plaque = this.add.sprite(2880, 200, 'wall_plaque').setScale(0.5).setInteractive()
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
        this.cameras.main.setBounds(0, 0, 4382, 800);
        this.physics.world.setBounds(0, 0, 4382,715);


        // Initialize Player
        this.landed = false;
        this.parachute = this.physics.add.sprite(420, -60, 'parachute').setScale(0.3)
        PlayerHelper.createPlayer(this, 2880, -100);

        // Initialize Knight
        this.knight = EnemyHelper.createKnight(this,this.bodyContainer, 1000,610,'knight',
        'bullet_hit_knight_sound','knight_whoosh_sound','hurt_by_knight_sound', 
        'knight_walk','knight_attack','knight_die','knight_idle',true,11,15); 
        this.time.addEvent({
            delay: 3000, 
            callback: ()=>{    
                this.sound.add('not_suppose').play();
            },
            callbackScope: this,
            loop: false
        },this);
        

        this.add.sprite(1300, 675, 'bridge').setScale(0.25)
        
        // Initilize Knight Dialog
        this.player.enableInput = false;
        this.time.addEvent({
            delay: 6000, //6000
            callback: ()=>{ 
                this.physics.config.gravity.y = 1000;
                this.knight_dialog = DialogHelper.creatDialog(this,'Get out of my way, or I\'ll kill you',
                'I\'m here to save the children','my_way','to_save',
                'lets_see','save_yourself', 'knight_dialog',this.cameras.main.scrollX+600);
            },
            callbackScope: this,
            loop: false
        },this);
        
    }
    update(){
        console.log(this.bodyContainer.x)
        if(this.bodyContainer.y<500 && !this.landed){
            this.bodyContainer.body.setVelocityY(50)
            this.parachute.body.setVelocityY(50)
        }else{
            this.landed = true;
        }
        //console.log(this.bodyContainer.y)
        PlayerHelper.updatePlayer(this, this.player, this.playerBody, this.playerArm, this.bodyContainer);
        EnemyHelper.updateKnight(this, this.knight, this.bodyContainer, this.player);
    }
}