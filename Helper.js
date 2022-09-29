export class Helper
{
    constructor(){
        last_frame_index = 0;
    }
    static createPlayer(scene,x,y){
        scene.sound.add('gun_shot_sound');
        scene.flareGroup = new FlareGroup(scene);
        let player = scene.physics.add.sprite(x,y, 'explorer').setScale(0.3);
        player.flipX = false;
        player.setCollideWorldBounds(true);
        player.anims.play('idle', true);
        scene.cameras.main.startFollow(player, true, 0.08, 0.08);
        scene.cameras.main.setZoom(1);
        scene.input.keyboard.on('keydown-' + 'S', function (event) 
        { 
            player.anims.play('crouch',true).on('animationcomplete', () =>
            {
                player.anims.pause(player.anims.currentAnim.frames[5]);
            });
        });
        return player;
    }

    static updatePlayer(scene, player,KeyA,KeyD,KeyW,KeyS,KeySHIFT,KeySPACE){
        if (KeyA.isDown && player.body.velocity.y == 0) {
            if (KeySHIFT.isDown){
                player.flipX = true;
                player.setVelocityX(-260);
                if(KeySPACE.isDown){
                    player.anims.play('run_shoot_resolver',true);
                    if(player.anims.currentFrame.index == 7
                        && player.anims.currentFrame.index != this.last_frame_index){
                        scene.flareGroup.fireFlare(player.x-100, player.y,'left');
                        scene.sound.get('gun_shot_sound').play();
                    }
                }else{
                    player.anims.play('run', true);
                }
            }
            else{
                player.setVelocityX(-60);
                player.flipX = true;
                if(KeySPACE.isDown){
                    player.anims.play('walk_shoot_resolver', true);
                    if(player.anims.currentFrame.index == 7
                        && player.anims.currentFrame.index != this.last_frame_index){
                        scene.flareGroup.fireFlare(player.x-100, player.y,'left');
                        scene.sound.get('gun_shot_sound').play();
                    }
                }else{
                    player.anims.play('walk', true);
                }
            }
        }
        else if (KeyD.isDown && player.body.velocity.y == 0) {
            if (KeySHIFT.isDown){
                player.setVelocityX(260);
                player.flipX = false;
                if(KeySPACE.isDown){
                    player.anims.play('run_shoot_resolver',true);
                    if(player.anims.currentFrame.index == 7
                        && player.anims.currentFrame.index != this.last_frame_index){
                        scene.flareGroup.fireFlare(player.x+100, player.y,'right');
                        scene.sound.get('gun_shot_sound').play();
                    }
                }else{
                    player.anims.play('run', true);
                }
            }
            else{
                player.setVelocityX(60);
                player.flipX = false;
                if(KeySPACE.isDown){
                    player.anims.play('walk_shoot_resolver', true);
                    if(player.anims.currentFrame.index == 7
                        && player.anims.currentFrame.index != this.last_frame_index){
                        scene.flareGroup.fireFlare(player.x+100, player.y,'right');
                        scene.sound.get('gun_shot_sound').play();
                    }
                }else{
                    player.anims.play('walk', true);
                }
            }
        }else if(!KeyW.isDown && !KeySHIFT.isDown && player.body.velocity.y == 0 && !KeyS.isDown){
            player.setVelocityX(0);
            if(KeySPACE.isDown){
                player.anims.play('shoot_resolver',true);
                if(player.anims.currentFrame.index == 5 
                    && player.anims.currentFrame.index != this.last_frame_index){
                    if(player.flipX==false){
                        scene.flareGroup.fireFlare(player.x+100, player.y,'right');
                        scene.sound.get('gun_shot_sound').play();
                    }else{
                        scene.flareGroup.fireFlare(player.x-100, player.y,'left');
                        scene.sound.get('gun_shot_sound').play();
                    }
                }
            }else{
                player.anims.play('idle',true);
            }
        }
        if (KeyW.isDown && player.body.velocity.y == 0){
            player.setVelocityY(-700);
            player.anims.play('jump', true);
        }
        this.last_frame_index = player.anims.currentFrame.index;
    }
    static createKeys(scene){
        scene.KeySPACE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        scene.KeySHIFT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        scene.KeyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        scene.KeyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        scene.KeyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        scene.KeyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
}

class FlareGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		// Call the super constructor, passing in a world and a scene
		super(scene.physics.world, scene);
 
		// Initialize the group
		this.createMultiple({
			classType: Flare, // This is the class we create just below
			frameQuantity: 300, // Create 30 instances in the pool
			active: false,
			visible: false,
			key: 'flare'
		})
	}
    fireFlare(x, y, direction) {
		// Get the first available sprite in the group
		const flare = this.getFirstDead(false);
		if (flare) {
			flare.fire(x, y, direction);
		}              
	}
}
 
class Flare extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'flare');
	}
    fire(x, y, direction) {
		this.body.reset(x, y);
		this.setActive(true);
		this.setVisible(true);
        this.body.setAllowGravity(false);
        this.setScale(0.1);
        if(direction=='left'){
            this.setVelocityX(-1000); 
        }else{
            this.setVelocityX(1000); 
        }
	}
    preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (this.x >= this.scene.physics.world.bounds.width || this.x <= 0) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}