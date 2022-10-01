import {PlayerHelper} from './PlayerHelper.js'
import {EnemyHelper} from './EnemyHelper.js'

export class castleScene2 extends Phaser.Scene {
    constructor(){
        super({
            key: "castle-scene2"
        })
    }
    preload(){
        
    }
    create(){
        this.background_music = this.sound.add('background_music');
        this.background_music.play({loop:true});
        const door_open = this.sound.add('door_open_sound');

        this.add.tileSprite(2259,400,4518,800,'background-scene2').setScale(1.01);

        this.add.image(100,400,'pillar').setScale(0.35,0.435).setDepth(3);
        this.add.image(4150,400,'pillar').setScale(0.35,0.435).setDepth(3);

        const door_open_down = this.add.sprite(720,335,'door_open_down').setScale(0.5).setInteractive();
        door_open_down.on('pointerdown',function(){
            this.background_music.pause();
            this.scene.switch('castle-scene1');
        },this)

        const door = this.add.sprite(1200,335,'door_closed').setScale(0.5).setInteractive();
        door.on('pointerdown',function(){
            if(door.texture.key==='door_open_up'){
                this.background_music.pause();
                this.scene.switch('castle-scene3')
            }
        },this)
        const flames = this.add.group();
        flames.create(2170,115,'fire').setScale(0.5);
        flames.create(2244,125,'fire').setScale(0.5);
        flames.create(2310,115,'fire').setScale(0.5);
        flames.create(2360,115,'fire').setScale(0.5);
        flames.create(2436,115,'fire').setScale(0.5);
        flames.create(2265,300,'fire').setScale(0.1);
        flames.create(2280,285,'fire').setScale(0.1);
        flames.create(2300,300,'fire').setScale(0.1);
        flames.children.iterate(function (flame) {
            flame.anims.play('candle_flame');
        });
             
        const torch = this.add.sprite(4015,200,'fire').setScale(0.5).setInteractive();
        torch.anims.play('torch',true);
        torch.on('pointerdown',function(){
            if(this.spider.died){
                let scene = this;
                this.add.tween({
                    targets: torch,
                    angle: -90,
                    x: 3560,
                    y:450,
                    ease: 'Linear',
                    yoyo: true,
                    duration: 3000,
                    repeat: 0,
                    onYoyo: function(){
                        scene.add.sprite(3535, 450, 'fire').setScale(0.2).anims.play('fireplace_fire');
                        door_open.play();
                        door.setTexture('door_open_up')
                    }
                },scene)
            }
        },this);

        this.cameras.main.setBounds(0, 0, 4518, 100);
        this.physics.world.setBounds(0, 0, 4518,650);

        PlayerHelper.createKeys(this);
        this.player = PlayerHelper.createPlayer(this, 600, 400);
        this.player.setDepth(2);
        this.spider = EnemyHelper.createEnemy(this,2800,400,'spider','flare_hit_spider_sound',
        'spider_attack_sound', 'bitten_by_spider_sound');
    }
    update(){
        //console.log(this.player.x)
        if(this.background_music.isPaused){
            this.background_music.play({loop:true});
        }
        PlayerHelper.updatePlayer(this,this.player,this.KeyA,this.KeyD,this.KeyW,this.KeyS,this.KeySHIFT,this.KeySPACE);
        EnemyHelper.updateEnemy(this, this.spider, this.player, 'spider_move','spider_bite','spider_die', false,6,4);
    }
}