export class bookScene extends Phaser.Scene {
    constructor(){
        super({
            key: "book-scene"
        })
    }
    preload(){
    }
    create(){
        this.lights.enable();
        this.add.sprite(630,400,'background-book').setScale(0.8).setPipeline('Light2D');
        this.add.sprite(630,400,'book').setScale(0.6).setPipeline('Light2D');
        const page = this.add.sprite(585,270,'page').setScale(0.6).setInteractive().setPipeline('Light2D')

        this.add.sprite(620, 700, 'candle').setScale(2).setPipeline('Light2D')
        const flame = this.add.sprite(600,600,'fire').setScale(0.8)
        flame.anims.play('candle_flame')
        var light = this.lights.addLight(600, 620, 120000).setIntensity(1.5);
        var ellipse = new Phaser.Geom.Ellipse(light.x, light.y, 35, 50);

        this.time.addEvent({
            delay: 150,
            callback: function ()
            {
                Phaser.Geom.Ellipse.Random(ellipse, light);
            },
            callbackScope: this,
            repeat: -1
        });

        
        this.time.addEvent({
            delay: 66000, 
            callback: ()=>{    
                page.anims.play('next_page')
                .on('animationcomplete', () =>{
                    this.sound.add('narrator2').play()
                });
                this.time.addEvent({
                    delay: 5000, 
                    callback: ()=>{    
                        this.scene.start('transition-scene', {nextScene: 'castle-scene0', duration: 3000})
                    },
                    callbackScope: this,
                    loop: false
                },this);
            },
            callbackScope: this,
            loop: false
        },this);
        page.anims.play('next_page')
        page.anims.pause(page.anims.currentAnim.frames[0]);

        
        const black_screen = this.add.rectangle(600, 400, 1200, 800, 0x000000, 1).setDepth(4);
        this.time.addEvent({
            delay: 0, 
            callback: ()=>{    
                black_screen.destroy();
                this.time.addEvent({
                    delay: 2000, 
                    callback: ()=>{    
                        this.sound.add('narrator').play()
                    },
                    callbackScope: this,
                    loop: false
                },this);
            },
            callbackScope: this,
            loop: false
        },this);
    }
    update(){

    }
}