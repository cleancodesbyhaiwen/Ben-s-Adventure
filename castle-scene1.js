import {PlayerHelper} from './PlayerHelper.js'
import {EnemyHelper} from './EnemyHelper.js'
import {DialogHelper} from './DialogHelper.js'
import {ArrowGroup} from './ArrowHelper.js'

export class castleScene1 extends Phaser.Scene {
    constructor(){
        super({
            key: "castle-scene1"
        })
    }
    preload(){
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }
    create(){
        this.key_retrieved = true;
        // Initialize Sound and Background
        const brick_rotate = this.sound.add('brick_rotate_sound');
        const door_open = this.sound.add('door_open_sound');
        const earth_shaking = this.sound.add('earth_shaking_sound');
        this.background = this.add.tileSprite(1690,400,3381,800,'background-scene1')
        .setScale(1.01).setDepth(-2);
        this.background_music = this.sound.add('background_music1');
        this.background_music.play({loop:true}); 
        
        
        // Initialize Map
        this.add.image(350,330,'map').setScale(0.25).setInteractive()
        .on('pointerdown',function(){
            this.background.setAlpha(0.5);
            this.scene.launch('popup-scene',{parentScene: this, imgKey: 'map'});
        },this);

        // Initialize Letter
        const letter = this.add.sprite(730,395,'letter').setScale(0.05).setInteractive();
        letter.on('pointerdown',function(){
            this.background.setAlpha(0.5);
            this.scene.launch('popup-scene',{parentScene: this, imgKey: 'letter_content1'});
        },this);

        // Initialize Pillar
        this.add.image(100,400,'pillar').setScale(0.5, 0.62).setDepth(2);
        this.add.image(3381,400,'pillar').setScale(0.5,0.62).setDepth(2);

        // Initialize Wall Plaque
        this.add.sprite(1700, 130, 'wall_plaque').setScale(0.3).setInteractive();

        // Initialize Door
        const door = this.add.sprite(1700,358,'door_closed').setScale(0.5).setInteractive();
        door.on('pointerdown',function(){
            if(this.key_retrieved && door.texture.key!=='door_open_up'){
                if(this.player.body.velocity.x==0){
                    door.setTexture('door_open_up');
                    door_open.play();
                }
            }else if(door.texture.key==='door_open_up'){
                this.scene.start('transition-scene', {nextScene: 'castle-scene2', duration: 3000});
            }else{
                this.sound.add('door_locked').play();
                this.arrowGroup.fireArrow(this.cameras.main.scrollX+Math.random()*1200, 100,this);
                this.arrowGroup.fireArrow(this.cameras.main.scrollX+Math.random()*1200, 100,this);
                this.arrowGroup.fireArrow(this.cameras.main.scrollX+Math.random()*1200, 100,this);
            }
        },this);

        // Initialize Brick
        this.brick = this.add.image(848, 275, 'brick').setScale(1.1,0.7).setInteractive()
        .on('pointerdown',function(){                                             // Click on brick
            if(this.brick.angle==0){
                brick_rotate.play();
                let scene = this;       
                this.add.tween({                                                  // Rotate Brick
                    targets: scene.brick,
                    angle: 90,
                    ease: 'Linear',
                    duration: 5000,
                    repeat: 0,
                    onComplete: function(){                                        // Shake Camera
                        earth_shaking.play();
                        scene.cameras.main.shake(3000);
                        scene.time.addEvent({
                            delay: 2000,
                            callback: ()=>{                                         // Drop Key
                                scene.physics.add.sprite(850, -100, 'key')
                                .setScale(0.1).setCollideWorldBounds(true)
                                .setInteractive().on('pointerdown',function(){     //  Retrive Key
                                    scene.key_retrieved = true;
                                    this.destroy();
                                });
                            },
                            callbackScope: this,
                            loop: false
                        },scene);
                    }
                },scene)
            }
        },this)
        
        // Initialize Player
        PlayerHelper.createPlayer(this, 400, 616);
 
        // Initialize Fires
        const torches = this.add.group();
        torches.create(1530,400,'fire').setScale(0.3).setDepth(-1);
        torches.create(1870,400,'fire').setScale(0.3).setDepth(-1);
        torches.children.iterate(function (torch) {
            torch.anims.play('torch');
        });
        const flames = this.add.group();
        const distances = [0, 481, -563, -1193, -1765, -2273];
        for(let i = 0;i < 6;i++){
            flames.create(2500+distances[i],155,'fire').setScale(0.2);
            flames.create(2535+distances[i],160,'fire').setScale(0.2);
            flames.create(2570+distances[i],155,'fire').setScale(0.2);
            flames.create(2600+distances[i],155,'fire').setScale(0.2);
            flames.create(2635+distances[i],155,'fire').setScale(0.2);
        }
        flames.children.iterate(function (flame) {
            flame.anims.play('candle_flame');
        });
        this.add.sprite(660, 500, 'fire').setScale(0.13).setDepth(-1).anims.play('fireplace_fire');

        // Initialize Camera and World Bound
        this.cameras.main.setBounds(0, 0, 3381, 700);
        this.physics.world.setBounds(0, 0, 3381,700);

        // Initialize arrows
        this.arrowGroup = new ArrowGroup(this);
        this.arrowGroup.createCollider(this, this.player);     
        
        // Initialize Chest
        const chest = this.add.sprite(2391,500,'chest_closed').setScale(0.15).setInteractive()
        .on('pointerdown', function(){
            chest.setTexture('chest_open')
            this.sound.add('door_locked').play();
        },this)
            
    }
    update(){
        // Update Player and Enemy
        PlayerHelper.updatePlayer(this, this.player, this.playerBody, this.playerArm, this.bodyContainer);
    }
}

