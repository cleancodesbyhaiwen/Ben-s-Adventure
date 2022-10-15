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

        // NEW GAME 
        this.add.text(480,250,'NEW GAME',{font: '50px monospace',fill: '#ffffff'}).setInteractive()
        .on('pointerover',function(){
            this.pointer_left = this.add.text(420, 250, '>',{font: '50px monospace',fill: '#ffffff'});
            this.pointer_right = this.add.text(720, 250, '<',{font: '50px monospace',fill: '#ffffff'});
        },this)
        .on('pointerout',function(){
            this.pointer_left.destroy();
            this.pointer_right.destroy();
        },this)
        .on('pointerdown',function(){
            background_music.pause(); 
            this.scene.start('transition-scene', {nextScene: 'book-scene', duration: 3000})
        },this)
        
        // CONTINUE
        this.add.text(480,320,'CONTINUE',{font: '50px monospace',fill: '#ffffff'}).setInteractive()
        .on('pointerover',function(){
            this.pointer_left = this.add.text(420, 320, '>',{font: '50px monospace',fill: '#ffffff'});
            this.pointer_right = this.add.text(720, 320, '<',{font: '50px monospace',fill: '#ffffff'});
        },this)
        .on('pointerout',function(){
            this.pointer_left.destroy();
            this.pointer_right.destroy();
        },this)
        .on('pointerdown',function(){
            this.background.setAlpha(0.5);
            //this.parentScene.input.enabled = false;
            this.scene.launch('popup-scene',{parentScene: this, imgKey: 'controls_panel'});
        },this)

        // CREDITS
        this.add.text(490,390,'CREDITS',{font: '50px monospace',fill: '#ffffff'}).setInteractive()
        .on('pointerover',function(){
            this.pointer_left = this.add.text(420, 390, '>',{font: '50px monospace',fill: '#ffffff'});
            this.pointer_right = this.add.text(720, 390, '<',{font: '50px monospace',fill: '#ffffff'});
        },this)
        .on('pointerout',function(){
            this.pointer_left.destroy();
            this.pointer_right.destroy();
        },this)
        .on('pointerdown',function(){
            this.background.setAlpha(0.5);
            //this.parentScene.input.enabled = false;
            this.scene.launch('popup-scene',{parentScene: this, imgKey: 'credits_panel'});
        },this)

        // CONTROLS
        this.add.text(480,460,'CONTROLS',{font: '50px monospace',fill: '#ffffff'}).setInteractive()
        .on('pointerover',function(){
            this.pointer_left = this.add.text(420, 460, '>',{font: '50px monospace',fill: '#ffffff'});
            this.pointer_right = this.add.text(720, 460, '<',{font: '50px monospace',fill: '#ffffff'});
        },this)
        .on('pointerout',function(){
            this.pointer_left.destroy();
            this.pointer_right.destroy();
        },this)
        .on('pointerdown',function(){
            this.background.setAlpha(0.5);
            //this.parentScene.input.enabled = false;
            this.scene.launch('popup-scene',{parentScene: this, imgKey: 'controls_panel'});
        },this)

        /*
        this.add.sprite(600, 250, 'start_button').setScale(0.8).setInteractive()
        .on('pointerdown',function(){

        },this)

        this.add.sprite(600, 380, 'credits_button').setScale(0.8).setInteractive()
        .on('pointerdown',function(){

        },this)


        this.add.sprite(600, 510, 'controls_button').setScale(0.8).setInteractive()
        .on('pointerdown',function(){

        },this)*/

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