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
            }
        },this);

        // Initialize Fishing Pole
        const fishing_pole = this.add.image(6630, 610, 'item_fishingpole').setScale(1.3).setRotation(-0.1)
        .setInteractive().on('pointerdown',function(){
            this.player.items.push(new Item('fishing pole','item_fishingpole', 'A fishing pole'));
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
        PlayerHelper.createPlayer(this, 4050, 506);

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



        const fishes = [new Fish('key', 'item_key1', undefined),
                        new Fish('stone fish', 'fishes', 'stone_fish_anims'),
                        new Fish('puffer fish', 'fishes', 'puffer_fish_anims'),
                        new Fish('sword fish', 'fishes', 'sword_fish_anims'),]
        this.input.keyboard.on('keydown-' + 'F', function (event) { 
            if(this.playerBody.visible==true&&this.playerContainer.x>3550&&this.playerContainer.x<4250){
                this.playerBody.setVisible(false);
                this.playerArm.setVisible(false);
                this.playerInputEnable = false;
                this.fishing_player = this.add.sprite(this.playerContainer.x, 595, 'explorer').setScale(0.3);
                this.fishing_player.anims.play('fishing');
                this.strike_button = this.add.image(this.playerContainer.x+200, 550, 'strike_button').setScale(0.3)
                .setInteractive().on('pointerdown', function(){
                    for(var i=0;i<this.player.items.length;i++){
                        if(this.player.items[i].name='larva'){
                            this.player.items.splice(i, 1);
                        }
                    }
                    this.fishing_player.y = this.fishing_player.y - 40;
                    this.fishing_player.anims.play('striking').on('animationcomplete', () =>{
                        this.playerBody.setVisible(true);
                        this.playerArm.setVisible(true);
                        this.playerInputEnable = true;
                        this.fishing_player.destroy();
                        this.strike_button.destroy();
                    },this);
                    const fish = fishes.pop();
                    this.fish = this.add.sprite(this.playerContainer.x+100, 900, fish.image).setScale(0.2);
                    this.fish.name = fish.name;
                    this.fish.angle = 90;
                    if(fish.anims!=undefined) this.fish.anims.play(fish.anims);
                    this.sound.add('splash_sound').play();
                    const splash = this.add.sprite(this.playerContainer.x+100, 750, 'splash').setScale(0.2)
                    this.sound.add('splash_sound').play();
                    splash.anims.play('splash_anims').on('animationcomplete', () =>{
                        splash.destroy();
                    });
                },this)
            }
        },this);

        this.input.keyboard.on('keydown-' + 'G', function (event) { 
            if(this.playerBody.visible==true&&this.playerContainer.x<3000){
                this.playerBody.setVisible(false);
                this.playerArm.setVisible(false);
                this.playerInputEnable = false;
                this.digging_player = this.add.sprite(this.playerContainer.x, 630, 'explorer').setScale(0.3);
                this.digging_player.anims.play('digging');
                this.time.addEvent({
                    delay: 3000,
                    callback: ()=>{  
                        larva = this.add.sprite(this.playerContainer.x+70, 750, 'larva').setScale(0.16);
                        larva.anims.play('larva_wiggle');  
                        this.add.tween({                                                 
                            targets: larva,
                            x: this.cameras.main.scrollX+60,
                            y: 120,
                            ease: 'Linear',
                            duration: 3000,
                            repeat: 0,
                            onComplete: function(){                                     
                                larva.destroy();  
                            }
                        },this) 
                        this.player.items.push(new Item('larva', 'item_larva', 'This is a perfect\n bait for fishing'))                         
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

        


        if(this.fish){
            this.fish.y -= 5;
            if(this.fish.y<=550){
                if(this.fish.name=='key'){
                    if(!this.key_added){
                        this.player.items.push(new Item('key1','item_key1', 'Key for entering \nthe castle'));
                        this.key_added = true;
                    }
                }
                this.fish.destroy();
            }
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