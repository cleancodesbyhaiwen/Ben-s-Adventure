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
        this.background_music = this.sound.add('background_music2');
        this.background_music.play({loop:true});

        this.background = this.add.tileSprite(1690,400,3381,800,'background-scene2').setScale(1.01).setDepth(-2);

        const flames = this.add.group();
        flames.create(57,150,'fire').setScale(0.5);
        flames.create(1120,150,'fire').setScale(0.5);
        flames.create(2277,150,'fire').setScale(0.5);
        flames.create(3327,150,'fire').setScale(0.5);
        flames.children.iterate(function (flame) {
            flame.anims.play('torch');
        });
             
        // Initialize Camera and World Bound
        this.cameras.main.setBounds(0, 0, 3381, 100);
        this.physics.world.setBounds(0, 0, 3381,700);

        PlayerHelper.createKeys(this);
        this.player = PlayerHelper.createPlayer(this, 200, 616);
        this.player.setDepth(2);
       // this.spider = EnemyHelper.createEnemy(this,800,400,'spider','flare_hit_spider_sound',
       // 'spider_attack_sound', 'bitten_by_spider_sound');
        //this.spider.start_attack = true;
    }
    update(){
        console.log(this.player.x)
        PlayerHelper.updatePlayer(this,this.player,this.KeyA,this.KeyD,this.KeyW,this.KeyS,this.KeySHIFT,this.KeySPACE);
        //EnemyHelper.updateEnemy(this, this.spider, this.player, 
        //    'spider_move','spider_bite','spider_die', 'spider_idle',false,6,4);
    }
}