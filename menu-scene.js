import {game} from './main.js'

export class menuScene extends Phaser.Scene {
    constructor(){
        super({
            key: "menu-scene"
        })
    }
    preload(){
    }
    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // Initialize Sound and Background
        this.background = this.add.tileSprite(600,400, 1200,800,'background-menu').setDepth(-2);
        const background_music = this.sound.add('background_music_menu');
        background_music.play({loop:true}); 

        //localStorage.setItem('furtherest_scene', 1);
        const furtherest_scene_numebr = localStorage.getItem('furtherest_scene');
        var furtherest_scene = '';
        switch (furtherest_scene_numebr) {
        case '1':
            furtherest_scene = 'book-scene'
            break;
        case '2':
            furtherest_scene = 'plane-scene'
            break;
        case '3':
            furtherest_scene = 'entrance-scene'
            break;
        case '4':
            furtherest_scene = 'castle-scene0'
            break;
        default:
            furtherest_scene = 'book-scene'
        }
        // NEW GAME 
        this.add.text(460,250,'NEW GAME',{font: '50px groovy',fill: '#d0d3d9'}).setInteractive()
        .on('pointerover',function(){
            this.pointer_left = this.add.text(420, 250, '>',{font: '50px groovy',fill: '#d0d3d9'});
            this.pointer_right = this.add.text(760, 250, '<',{font: '50px groovy',fill: '#d0d3d9'});
        },this)
        .on('pointerout',function(){
            this.pointer_left.destroy();
            this.pointer_right.destroy();
        },this)
        .on('pointerdown',function(){
            background_music.pause(); 
            this.scene.start('book-scene')
        },this)
        
        // CONTINUE
        this.add.text(470,320,'CONTINUE',{font: '50px groovy',fill: '#d0d3d9'}).setInteractive()
        .on('pointerover',function(){
            this.pointer_left = this.add.text(440, 320, '>',{font: '50px groovy',fill: '#d0d3d9'});
            this.pointer_right = this.add.text(740, 320, '<',{font: '50px groovy',fill: '#d0d3d9'});
        },this)
        .on('pointerout',function(){
            this.pointer_left.destroy();
            this.pointer_right.destroy();
        },this)
        .on('pointerdown',function(){
            background_music.pause(); 
            this.scene.start(furtherest_scene)
        },this)

        // CREDITS
        this.add.text(490,390,'CREDITS',{font: '50px groovy',fill: '#d0d3d9'}).setInteractive()
        .on('pointerover',function(){
            this.pointer_left = this.add.text(450, 390, '>',{font: '50px groovy',fill: '#d0d3d9'});
            this.pointer_right = this.add.text(725, 390, '<',{font: '50px groovy',fill: '#d0d3d9'});
        },this)
        .on('pointerout',function(){
            this.pointer_left.destroy();
            this.pointer_right.destroy();
        },this)
        .on('pointerdown',function(){
            this.background.setAlpha(0.5);
            this.scene.launch('popup-scene',{parentScene: this, imgKey: 'credits_panel'});
        },this)

        // CONTROLS
        this.add.text(465,460,'CONTROLS',{font: '50px groovy',fill: '#d0d3d9'}).setInteractive()
        .on('pointerover',function(){
            this.pointer_left = this.add.text(425, 460, '>',{font: '50px groovy',fill: '#d0d3d9'});
            this.pointer_right = this.add.text(750, 460, '<',{font: '50px groovy',fill: '#d0d3d9'});
        },this)
        .on('pointerout',function(){
            this.pointer_left.destroy();
            this.pointer_right.destroy();
        },this)
        .on('pointerdown',function(){
            this.background.setAlpha(0.5);
            this.scene.launch('popup-scene',{parentScene: this, imgKey: 'controls_panel'});
        },this)

        const torches = this.add.group();
        torches.create(125,250,'fire').setScale(0.6).setDepth(-1);
        torches.create(1080,250,'fire').setScale(0.6).setDepth(-1);
        torches.children.iterate(function (torch) {
            torch.anims.play('torch');
        });
    }
    update(){
    }
}