import {PlayerHelper} from './PlayerHelper.js'
import {EnemyHelper} from './EnemyHelper.js'
import {DialogHelper} from './DialogHelper.js'

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
        // Initialize Sound and Background
        const wall_plaque_rotate = this.sound.add('wall_plaque_rotate_sound');
        const door_open = this.sound.add('door_open_sound');
        this.background_music = this.sound.add('background_music');
        this.background_music.play({loop:true});  
        const come_up_stairs = this.sound.add('come_up_stairs');  
        this.add.tileSprite(1690,400,3381,800,'background-scene1').setScale(1.01).setDepth(-2);
        
        // Initialize Pillar
        this.add.image(100,400,'pillar').setScale(0.5, 0.62).setDepth(2);
        this.add.image(3220,400,'pillar').setScale(0.5,0.62).setDepth(2);

        // Initialize Door
        const door = this.add.sprite(1700,358,'door_closed').setScale(0.5).setInteractive();
        door.on('pointerdown',function(){
            if(door.texture.key==='door_open_up'){
                this.background_music.pause();
                this.scene.switch('castle-scene2');
            }
        },this)

        // Initialize Letter
        const letter = this.add.sprite(730,395,'letter').setScale(0.05).setInteractive();
        letter.on('pointerdown',function(){
            this.scene.launch('letter-scene1');
        },this);

        // Initialize Player and Enemy
        PlayerHelper.createKeys(this);
        this.player = PlayerHelper.createPlayer(this, 2000, 585);
        this.knight = EnemyHelper.createEnemy(this, 2800,-400,'knight','flare_hit_knight_sound'
        ,'knight_whoosh_sound','hurt_by_knight_sound');  

        // Initialize Wall Plaque
        const wall_plaque = this.add.sprite(1700, 130, 'wall_plaque').setScale(0.3).setInteractive();
        wall_plaque.angle = 180;
        wall_plaque.on('pointerdown',function(){
            if(wall_plaque.angle==-180&&this.knight.died){
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
            }
        },this)

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
            flames.create(2500+distances[i],150,'fire').setScale(0.2);
            flames.create(2535+distances[i],160,'fire').setScale(0.2);
            flames.create(2570+distances[i],155,'fire').setScale(0.2);
            flames.create(2600+distances[i],155,'fire').setScale(0.2);
            flames.create(2635+distances[i],155,'fire').setScale(0.2);
        }
        flames.children.iterate(function (flame) {
            flame.anims.play('candle_flame');
        });
        this.add.sprite(660, 495, 'fire').setScale(0.15).setDepth(-1).anims.play('fireplace_fire');

        // Initialize Bat
        this.bat = this.physics.add.sprite(2400, 400, 'bat').setScale(0.2).setVelocityX(-500);
        this.bat.body.setAllowGravity(false);
        this.bat.anims.play('fly_mouth_closed');

        // Initialize Camera and World Bound
        this.cameras.main.setBounds(0, 0, 3381, 100);
        this.physics.world.setBounds(0, 0, 3381,700);
    }            
    update(){
        if(!this.dialog && this.player.x+500 > this.knight.x){
            this.dialog = DialogHelper.creatDialog(this,'Alex, is that you?','Who are you?',
            'Do not come over, or I will shoot you','alex_is','who_are_you','dont_come');
        }
        if(this.dialog) this.dialog.x = this.cameras.main.scrollX + 600;
        if(this.background_music.isPaused) this.background_music.play({loop:true});
        if(Math.abs(this.bat.x-this.player.x)<30) this.sound.add('bat_squeak_sound').play();
        if(this.bat.x < -30){
            this.bat.setActive(false);
            this.bat.setVisible(false);
        }
        PlayerHelper.updatePlayer(this, this.player);
        EnemyHelper.updateEnemy(this, this.knight, this.player, 
            'knight_walk','knight_attack','knight_die',true,11,15);
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