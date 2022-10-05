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
        // Initialize Sound and Background
        this.background = this.add.tileSprite(600,400, 1200,800,'background-menu').setDepth(-2);
        const background_music = this.sound.add('background_music_menu');
        background_music.play({loop:true}); 

        this.add.sprite(600, 250, 'start_button').setScale(0.8).setInteractive()
        .on('pointerdown',function(){
            background_music.pause(); 
            this.scene.start('transition-scene', {nextScene: 'book-scene', duration: 3000})
        },this)

        this.add.sprite(600, 380, 'credits_button').setScale(0.8).setInteractive()
        .on('pointerdown',function(){
            this.background.setAlpha(0.5);
            //this.parentScene.input.enabled = false;
            this.scene.launch('popup-scene',{parentScene: this, imgKey: 'credits_panel'});
        },this)


        this.add.sprite(600, 510, 'controls_button').setScale(0.8).setInteractive()
        .on('pointerdown',function(){
            this.background.setAlpha(0.5);
            //this.parentScene.input.enabled = false;
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