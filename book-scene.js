
var follower;
var path;
var graphics;
export class bookScene extends Phaser.Scene {
    constructor(){
        super({
            key: "book-scene"
        })
    }
    preload(){
    }
    create(){
        // Fade In
        this.cameras.main.fadeIn(4000, 0, 0, 0);
        // Updating furtherest Scene
        localStorage.setItem('furtherest_scene', Math.max(localStorage.getItem('furtherest_scene'),1));

        const background_music = this.sound.add('background_music_book');
        background_music.play({loop:true}); 

        this.add.sprite(600,400,'book_background').setScale(1.1);
        this.add.sprite(600,400,'book').setScale(0.55);

        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(600, 400);

        this.input.on('pointerdown',function(){
            this.cameras.main.pan(860, 285, 5000, 'Power2');
            this.cameras.main.zoomTo(2, 5000);
            this.time.addEvent({
                delay: 5000,
                callback: ()=>{    
                    background_music.pause();
                    this.cameras.main.fadeOut(2000, 0, 0, 0)
                },
                callbackScope: this,
                loop: false
            },this);
        },this);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('sky-scene');
        })

        this.time.addEvent({
            delay: 15000,
            callback: ()=>{  
                this.add.text(400, 760, 'Left Click To Continue',{font: '30px groovy',fill: '#ffffff'}).setAlpha(0.8);
            },
            callbackScope: this,
            loop: false
        },this);

        var path = new Phaser.Curves.Path();
        path.add(new Phaser.Curves.Ellipse(382, 410, 150));

        this.tiara = this.add.follower(path, -50, 0, 'tiara').setScale(0.15);
        this.lantern = this.add.follower(path, -50, 0, 'lantern').setScale(0.15);
        this.bracelet = this.add.follower(path, -50, 0, 'bracelet').setScale(0.15);
        this.necklace = this.add.follower(path, -50, 0, 'necklace').setScale(0.15);
        this.scarab = this.add.follower(path, -50, 0, 'scarab').setScale(0.15);
        this.chalice = this.add.follower(path, -50, 0, 'chalice').setScale(0.15);

        const follower_group = [this.tiara, this.lantern
            ,this.bracelet,this.necklace,this.scarab,this.chalice ]

        for (var i = 0; i < 6; i++)
        {
            var follower = follower_group[i];
            follower.startFollow({
                duration: 12000,
                yoyo: false,
                repeat: -1,
                rotateToPath: true,
                rotationOffset: 90,
                delay: i * 2000,
            });
        }
        this.time.addEvent({
            delay: 12000,
            callback: ()=>{  
                this.crown = this.add.sprite(332, 410, 'crown').setScale(0.15);
            },
            callbackScope: this,
            loop: false
        },this);
    }
    update(){
        this.tiara.angle = 0; 
        this.lantern.angle = 0; 
        this.bracelet.angle = 0; 
        this.necklace.angle = 0; 
        this.scarab.angle = 0; 
        this.chalice.angle = 0; 
        console.log(this.input.x)
        console.log(this.input.y)
    }
}