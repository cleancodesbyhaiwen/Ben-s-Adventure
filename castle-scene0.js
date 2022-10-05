import {PlayerHelper} from './PlayerHelper.js'
import {EnemyHelper} from './EnemyHelper.js'
import {DialogHelper} from './DialogHelper.js'
import {ArrowGroup} from './ArrowHelper.js'

export class castleScene0 extends Phaser.Scene {
    constructor(){
        super({
            key: "castle-scene0"
        })
    }
    preload(){
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }
    create(){
        // Initialize Sound and Background
        this.background = this.add.tileSprite(1690,400,3381,800,'background-scene0')
        .setScale(1.01).setDepth(-2);
        this.background_music = this.sound.add('background_music1');
        this.background_music.play({loop:true}); 
        
        
        // Initialize Player
        PlayerHelper.createPlayer(this, 400, 616);
 
        // Initialize Fires
        const torches = this.add.group();
        torches.create(60,200,'fire').setScale(0.4).setDepth(-1);
        torches.create(1120,200,'fire').setScale(0.4).setDepth(-1);
        torches.create(2290,200,'fire').setScale(0.4).setDepth(-1);
        torches.create(3330,200,'fire').setScale(0.4).setDepth(-1);
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

        // Initialize Camera and World Bound
        this.cameras.main.setBounds(0, 0, 3381, 700);
        this.physics.world.setBounds(0, 0, 3381,700);

        // Initialize arrows
        this.arrowGroup = new ArrowGroup(this);
        this.arrowGroup.createCollider(this, this.player);     
        

        //this.skeleton1 = EnemyHelper.createSkeleton(this,this.player, 1000,310,2); 
        //this.skeleton2 = EnemyHelper.createSkeleton(this,this.player, 1300,310,1); 
        //this.skeleton3 = EnemyHelper.createSkeleton(this,this.player, 1200,310); 
        //this.skeleton4 = EnemyHelper.createSkeleton(this,this.player, 1100,310); 

        // Initialize Knight
        this.knight = EnemyHelper.createKnight(this,this.player, 1000,610,'knight',
        'flare_hit_knight_sound','knight_whoosh_sound','hurt_by_knight_sound', 
        'knight_walk','knight_attack','knight_die','knight_idle',true,11,15); 
        this.time.addEvent({
            delay: 3000, 
            callback: ()=>{    
                this.sound.add('not_suppose').play();
            },
            callbackScope: this,
            loop: false
        },this);

        // Initilize Knight Dialog
        this.player.enableInput = false;
        this.time.addEvent({
            delay: 0, //6000
            callback: ()=>{ 
                this.knight_dialog = DialogHelper.creatDialog(this,'Get out of my way, or I\'ll kill you',
                'I\'m here to save the children','my_way','to_save',
                'lets_see','save_yourself', 'knight_dialog',this.cameras.main.scrollX+600);
            },
            callbackScope: this,
            loop: false
        },this);
        
    }
    update(){
        if(this.player.x > 3100){
            this.background_music.pause();
            this.scene.start('transition-scene', {nextScene: 'castle-scene1', duration: 3000});
        }
        // Update Player and Enemy
        PlayerHelper.updatePlayer(this, this.player);
        EnemyHelper.updateKnight(this, this.knight, this.player);
        //EnemyHelper.updateSkeleton(this, this.skeleton1, this.player,2)
        //EnemyHelper.updateSkeleton(this, this.skeleton2, this.player,1)
        //EnemyHelper.updateSkeleton(this, this.skeleton3, this.player)
        //EnemyHelper.updateSkeleton(this, this.skeleton4, this.player)
        if(this.player.x > 1000 && !this.arrowAdded){
            this.arrowAdded = true
            this.time.addEvent({
                delay: 1000, 
                callback: ()=>{    
                    this.arrowGroup.fireArrow(Math.random()*600+this.cameras.main.scrollX, 100, this)
                },
                callbackScope: this,
                loop: true
            },this);
        }
    }
}