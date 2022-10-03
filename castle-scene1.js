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
        
        // Initialize Map
        this.add.image(350,330,'map').setScale(0.25).setInteractive()
        .on('pointerdown',function(){
            this.background.setAlpha(0.5);
            this.input.keyboard.enabled = false;
            this.scene.launch('popup-scene',{parentScene: this, imgKey: 'map'});
        },this);

        // Initialize Letter
        const letter = this.add.sprite(730,395,'letter').setScale(0.05).setInteractive();
        letter.on('pointerdown',function(){
            this.background.setAlpha(0.5);
            this.input.keyboard.enabled = false;
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
                door.setTexture('door_open_up');
                door_open.play();
                this.time.addEvent({
                    delay: 500,
                    callback: ()=>{                                        
                        this.knight = EnemyHelper.createEnemy(this, 1700,350,'knight',
                        'flare_hit_knight_sound','knight_whoosh_sound','hurt_by_knight_sound', 
                        'knight_walk','knight_attack','knight_die','knight_idle',true,11,15); 
                    },
                    callbackScope: this,
                    loop: false
                },this);
            }else if(door.texture.key==='door_open_up'){
                if(this.knight.died) this.scene.start('castle-scene2');
            }else{
                this.sound.add('door_locked').play();
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
        this.time.addEvent({
            delay: 1000,
            callback: ()=>{                                       
                //this.arrowGroup.fireArrow(this.cameras.main.scrollX+Math.random()*1200, 100,this);
            },
            callbackScope: this,
            loop: true,
            repeatCount: 3
        },this);

        // Black Screen at Beginning
        const black_screen = this.add.rectangle(600, 400, 1200, 800, 0x000000, 1).setDepth(4);
        const thunder_rain = this.sound.add('thunder_rain_sound');
        thunder_rain.play();
        this.time.addEvent({
            delay: 0, //15000
            callback: ()=>{    
                thunder_rain.pause();
                black_screen.destroy();
                this.background_music = this.sound.add('background_music1');
                this.background_music.play({loop:true}); 
            },
            callbackScope: this,
            loop: false
        },this);
    }
    update(){
        // Add dialog
        if(this.knight && !this.knight_dialog){
            this.knight_dialog = DialogHelper.creatDialog(this,'Alex, is that you?',
            'Do not come over, or I will shoot you','alex_is','dont_come',
            'is_dead','to_kill', 'knight_dialog',this.cameras.main.scrollX+600);
            this.input.keyboard.enabled = false;
        }
        // Update Player and Enemy
        PlayerHelper.updatePlayer(this, this.player);
        if(this.knight) EnemyHelper.updateEnemy(this, this.knight, this.player);
    }
}

export class PopUpScene extends Phaser.Scene {
    constructor(){
        super({
            key: "popup-scene"
        })
    }
    init(data){
        this.parentScene = data.parentScene;
        this.imgKey = data.imgKey;
    }
    create(){
        this.add.sprite(600,400,this.imgKey);
        this.input.on('pointerdown',function(){
            this.parentScene.background.setAlpha(1);
            this.parentScene.input.keyboard.enabled = true;
            this.scene.stop();
        },this);
    }
}