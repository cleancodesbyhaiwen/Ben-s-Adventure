import {PlayerHelper} from './helpers/PlayerHelper.js'
import {KnightHelper} from './helpers/KnightHelper.js'
import {DialogHelper} from './helpers/DialogHelper.js'
import {Item} from './helpers/PlayerHelper.js'

var larva;
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

        localStorage.setItem('furtherest_scene', Math.max(localStorage.getItem('furtherest_scene'),3));

        this.shark_jumped = false;
        this.knight_spoke = false;
        this.landed = false;
        this.playerInputEnable = true;
        this.key_added = false;
        // Initialize Sound and Background
        this.background = this.add.tileSprite(3962.5,400,15850,1600,'background-entrance').setScale(0.51).setDepth(-2);
        this.background_music = this.sound.add('background_music1');
        this.background_music.play({loop:true}); 

        // wall plaque and door
        const wall_plaque = this.add.sprite(7550, 230, 'wall_plaque').setScale(0.5);
        const wall_plaque_rotate = this.sound.add('brick_rotate_sound');
        const door = this.add.sprite(7550, 516, 'door_closed').setScale(0.55).setInteractive()
        .on('pointerdown',function(){
            if(door.texture.key=='door_open'){
                this.background_music.pause();
                this.cameras.main.fadeOut(1000, 0, 0, 0)
            }
            else{
                if(this.player.get_item('key1')!=-1&&wall_plaque.angle==0){
                    wall_plaque_rotate.play();     
                    this.add.tween({                                                 
                        targets: wall_plaque,
                        angle: 180,
                        ease: 'Linear',
                        duration: 5000,
                        repeat: 0,
                        onComplete: function(){                                     
                            door.setTexture('door_open');
                        }
                    },this)
                }else PlayerHelper.display_message(this, 'You need a key',3000);
            }
        },this);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('castle-scene0')
        })

        // Initialize Fishing Pole
        const fishing_pole = this.add.image(6630, 610, 'item_fishingpole').setScale(1.3).setRotation(-0.1)
        .setInteractive().on('pointerdown',function(){;
             this.player.add_item('fishing pole','item_fishingpole',
             'A fishing pole\npress F to start fishing');

            fishing_pole.destroy();
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
        PlayerHelper.createPlayer(this, 7000, 506);

        // Initialize Knight
        //this.knight = KnightHelper.createKnight(this,this.playerContainer, 5050,610,'knight',
        //'bullet_hit_knight_sound','knight_whoosh_sound','hurt_by_knight_sound', 
        //'knight_walk','knight_attack','knight_die','knight_idle',true,11,15); 

        // Bridge
        this.add.sprite(4050, 650, 'bridge').setScale(0.25)
        const bridge_collisionbox = this.add.rectangle(4050, 685, 1217, 15, 0x6666ff).setDepth(-1);
        this.physics.add.existing(bridge_collisionbox);
        bridge_collisionbox.body.setAllowGravity(false);
        bridge_collisionbox.body.setImmovable(true); 
        this.physics.add.collider(this.playerContainer, bridge_collisionbox);

        // Fishing
        const fishes = [new Fish('key', 'item_key1', undefined),
                        new Fish('Red Angler', 'fishes', 'red_angler_anims'),
                        new Fish('Purple Angler', 'fishes', 'purple_angler_anims'),
                        new Fish('Orange Puffer', 'fishes', 'orange_puffer_anims'),
                        new Fish('Pink Puffer', 'fishes', 'pink_puffer_anims'),
                        new Fish('Lion Fish', 'fishes', 'lion_fish_anims'),
                        new Fish('Sword Fish', 'fishes', 'sword_fish_anims'),]

        this.input.keyboard.on('keydown-' + 'F', function (event) { 
            if(this.playerBody.visible==true&&this.playerContainer.x>3550
                &&this.playerContainer.x<4250){
                    if(this.player.get_item('fishing pole')!=-1){
                        this.playerBody.setVisible(false);
                        this.playerArm.setVisible(false);
                        this.playerInputEnable = false;
                        this.fishing_player = this.add.sprite(this.playerContainer.x+80, 595, 'explorer').setScale(0.3).setDepth(-1);
                        this.fishing_player.anims.play('fishing');
                        this.strike_button = this.add.image(this.playerContainer.x+200, 550, 'strike_button').setScale(0.3)
                        .setInteractive().on('pointerdown', function(){
                            if(this.player.get_item('larva')==-1||this.player.items[this.player.get_item('larva')].quantity==0){
                                PlayerHelper.display_message(this, 'You need a bait', 3000)
                            }else{
                                this.player.items[this.player.get_item('larva')].quantity--;

                                const fish = fishes[Math.floor(Math.random()*4)];
                                this.fish = this.add.sprite(this.playerContainer.x+180, 900, fish.image).setScale(0.2);
                                this.fish.name = fish.name;
                                this.fish.angle = 90;
                                if(fish.anims!=undefined) this.fish.anims.play(fish.anims);
                                let scene = this;
                                this.add.tween({                                                 
                                    targets: this.fish,
                                    y: 550,
                                    ease: 'Linear',
                                    duration: 1000,
                                    repeat: 0,
                                    onComplete: function(){       
                                        console.log(scene)                              
                                        if(scene.fish.name=='key'){
                                            if(!scene.key_added){
                                                scene.player.add_item('key1','item_key1', 'Key for entering \nthe castle');
                                                scene.key_added = true;
                                            }
                                        }
                                        scene.fish.destroy();
                                    }
                                })
                                this.sound.add('splash_sound').play();
                                const splash = this.add.sprite(this.playerContainer.x+180, 750, 'splash').setScale(0.2)
                                this.sound.add('splash_sound').play();
                                splash.anims.play('splash_anims').on('animationcomplete', () =>{
                                    splash.destroy();
                                });

                            }
                            this.fishing_player.y = this.fishing_player.y - 35;
                            this.fishing_player.anims.play('striking').on('animationcomplete', () =>{
                                this.playerBody.setVisible(true);
                                this.playerArm.setVisible(true);
                                this.playerInputEnable = true;
                                this.fishing_player.destroy();
                                this.strike_button.destroy();
                            },this);
        
                        },this)
                        .on('pointerover', function(){this.setScale(0.33);})
                        .on('pointerout', function(){this.setScale(0.3);})
                    }else PlayerHelper.display_message(this, 'You need a fishing pole', 3000);
            }else PlayerHelper.display_message(this, 'You can only fish on the bridge', 3000);
        },this);

        // Digging Larva
        this.input.keyboard.on('keydown-' + 'G', function (event) { 
            if(larva!=undefined) larva.destroy();
            if(this.playerBody.visible==true&&this.playerContainer.x<3000){
                this.playerBody.setVisible(false);
                this.playerArm.setVisible(false);
                this.playerInputEnable = false;
                this.digging_player = this.add.sprite(this.playerContainer.x, 630, 'explorer').setScale(0.3);
                this.digging_player.anims.play('digging');
                this.time.addEvent({
                    delay: 3000,
                    callback: ()=>{  
                        larva = this.add.sprite(this.playerContainer.x+70, 720, 'larva').setScale(0.16)
                        .setInteractive().on('pointerdown',function(){
                            this.player.add_item('larva','item_larva','This is a perfect\nbait for fishing');
                            localStorage.setItem('items', this.player.items);
                            larva.destroy();
                            larva = undefined;
                        },this);
                        larva.anims.play('larva_wiggle');                                     
                        this.playerBody.setVisible(true);
                        this.playerArm.setVisible(true);
                        this.playerInputEnable = true;
                        this.digging_player.destroy();
                        this.digging_player=undefined
                    },
                    callbackScope: this,
                    loop: false
                },this);
            }
        },this);
    }
    update(){
        if(this.digging_player!=undefined){
            if(this.digging_player.anims.currentFrame.index==4
            &&this.digging_player.anims.currentFrame.index != this.digging_player.last_frame_index){
                this.sound.add('shovel_digging_sound').play();
            }
            this.digging_player.last_frame_index = this.digging_player.anims.currentFrame.index;
        }

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

        /*if(Math.abs(this.playerContainer.x-this.knight.x)<400&&!this.knight_spoke){
            this.sound.add('not_suppose').play();
            this.knight_spoke = true;

        }*/

        console.log(this.playerContainer.x)
        if(this.playerContainer.y<500 && !this.landed){
            this.playerContainer.body.setVelocityY(50)
            this.parachute.body.setVelocityY(50)
        }else{
            this.landed = true;
        }
        //console.log(this.playerContainer.y)
        if(this.playerInputEnable) PlayerHelper.updatePlayer(this, this.player, this.playerBody, this.playerArm, this.playerContainer);
        //KnightHelper.updateKnight(this, this.knight, this.playerContainer, this.player);
    }
}

class Fish {
    constructor(name, image, anims){
        this.name = name;
        this.image = image;
        this.anims = anims;
    }
}