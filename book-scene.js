export class bookScene extends Phaser.Scene {
    constructor(){
        super({
            key: "book-scene"
        })
    }
    preload(){
    }
    create(){
        this.add.sprite(630,405,'background-book').setScale(0.9);
        this.add.sprite(630,400,'book').setScale(0.6);
        const page = this.add.sprite(585,270,'page').setScale(0.6).setInteractive();

        this.cameras.main.setBounds(0, 0, 1200, 800);
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(600, 400);

        this.second_page = false;
        this.input.on('pointerdown',function(){
            if(this.second_page){
                var cam = this.cameras.main;
                cam.pan(350, 400, 5000, 'Power2');
                cam.zoomTo(3, 5000);
                this.time.addEvent({
                    delay: 5000,
                    callback: ()=>{    
                        this.scene.start('plane-scene')
                    },
                    callbackScope: this,
                    loop: false
                },this);
            }else{
                page.anims.play('next_page')
                this.second_page = true;
            }
        },this)
        
        
        page.anims.play('next_page')
        page.anims.pause(page.anims.currentAnim.frames[0]);
    }
    update(){
    }
}