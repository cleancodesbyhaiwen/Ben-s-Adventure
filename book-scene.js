export class bookScene extends Phaser.Scene {
    constructor(){
        super({
            key: "book-scene"
        })
    }
    preload(){
    }
    create(){
        this.cameras.main.fadeIn(4000, 0, 0, 0);
        localStorage.setItem('furtherest_scene', Math.max(localStorage.getItem('furtherest_scene'),1));

        this.add.sprite(600,400,'book_background');
        this.add.sprite(600,400,'book').setScale(0.55);


        this.cameras.main.setBounds(0, 0, 1200, 800);
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(600, 400);

        this.second_page = false;
        this.input.on('pointerdown',function(){
            var cam = this.cameras.main;
            cam.pan(860, 285, 5000, 'Power2');
            cam.zoomTo(3, 5000);
            this.time.addEvent({
                delay: 5000,
                callback: ()=>{    
                    this.scene.start('sky-scene')
                },
                callbackScope: this,
                loop: false
            },this);
        },this)
    }
    update(){
        console.log(this.input.x)
        console.log(this.input.y)
    }
}