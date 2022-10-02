export class PlayerHelper
{
    constructor(){
        player_last_frame_index = 0;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Create Player
    //////////////////////////////////////////////////////////////////////
    static createPlayer(scene,x,y){
        scene.sound.add('gun_shot_sound');
        scene.flareGroup = new FlareGroup(scene);
        let player = scene.physics.add.sprite(x,y, 'explorer').setScale(0.3);
        player.flipX = false;
        player.setCollideWorldBounds(true);
        player.anims.play('idle', true);
        player.health = 100;
        player.died = false;
        player.chosen_weapon = '';
        scene.cameras.main.startFollow(player, true, 0.08, 0.08);
        scene.cameras.main.setZoom(1);
        scene.input.keyboard.on('keydown-' + 'S', function (event) { 
            player.anims.play('crouch',true).on('animationcomplete', () =>{
                player.anims.pause(player.anims.currentAnim.frames[5]);
            });
        });
        return player;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Update Player
    //////////////////////////////////////////////////////////////////////
    static updatePlayer(scene, player){
        player.body.setSize(player.width,player.height,true);
        if(Phaser.Input.Keyboard.JustDown(scene.KeyONE)){
            scene.sound.add('change_weapon_sound').play();
            player.chosen_weapon = 'resolver';
            scene.resolver = scene.add.sprite(player.x, 400, 'resolver').setScale(0.2);
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyTWO)){
            scene.sound.add('change_weapon_sound').play();
            player.chosen_weapon = 'uzi';
            scene.uzi = scene.add.sprite(player.x, 400, 'uzi').setScale(0.2);
        }
        if(!player.died && !player.being_hurt){
            if (scene.KeyA.isDown && player.body.velocity.y == 0) {
                player.flipX = true;
                if (scene.KeySHIFT.isDown){
                    player.setVelocityX(-260);
                    if(scene.KeySPACE.isDown){
                        if(player.chosen_weapon=='resolver'){
                            player.anims.play('run_shoot_resolver',true);
                            if(player.anims.currentFrame.index == 7
                                && player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x-60, player.y-15,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='uzi'){
                            player.anims.play('run_shoot_uzi',true);
                            if(player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x-60, player.y,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }
                    }else{
                        player.anims.play('run', true);
                    }
                }
                else{
                    player.setVelocityX(-60);
                    if(scene.KeySPACE.isDown){
                        if(player.chosen_weapon=='resolver'){
                            player.anims.play('walk_shoot_resolver', true);
                            if(player.anims.currentFrame.index == 7
                                && player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x-60, player.y-15,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='uzi'){
                            player.anims.play('walk_shoot_uzi', true);
                            if( player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x-60, player.y,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }
                    }else{
                        player.anims.play('walk', true);
                    }
                }
            }
            else if (scene.KeyD.isDown && player.body.velocity.y == 0) {
                player.flipX = false;
                if (scene.KeySHIFT.isDown){
                    player.setVelocityX(260);
                    if(scene.KeySPACE.isDown){
                        if(player.chosen_weapon=='resolver'){
                            player.anims.play('run_shoot_resolver',true);
                            if(player.anims.currentFrame.index == 7
                                && player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x+60, player.y-15,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='uzi'){
                            player.anims.play('run_shoot_uzi',true);
                            if(player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x+60, player.y,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }
                    }else{
                        player.anims.play('run', true);
                    }
                }
                else{
                    player.setVelocityX(60);
                    if(scene.KeySPACE.isDown){
                        if(player.chosen_weapon=='resolver'){
                            player.anims.play('walk_shoot_resolver', true);
                            if(player.anims.currentFrame.index == 7
                                && player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x+60, player.y-15,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='uzi'){
                            player.anims.play('walk_shoot_uzi', true);
                            if( player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x+60, player.y,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }
                    }else{
                        player.anims.play('walk', true);
                    }
                }
            }else if(!scene.KeyW.isDown && !scene.KeySHIFT.isDown && 
                player.body.velocity.y==0 && !scene.KeyS.isDown){
                player.setVelocityX(0);
                if(scene.KeySPACE.isDown){
                    if(player.chosen_weapon=='resolver'){
                        player.anims.play('shoot_resolver',true);
                        if(player.anims.currentFrame.index == 5 
                            && player.anims.currentFrame.index != this.plyer_last_frame_index){
                            if(player.flipX==false){
                                scene.flareGroup.fireFlare(player.x+60, player.y-15,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }else{
                                scene.flareGroup.fireFlare(player.x-60, player.y-15,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }
                    }else if(player.chosen_weapon=='uzi'){
                        player.anims.play('shoot_uzi',true);
                        if(player.anims.currentFrame.index == 1
                            && player.anims.currentFrame.index != this.plyer_last_frame_index){
                            if(player.flipX==false){
                                scene.flareGroup.fireFlare(player.x+60, player.y,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }else{
                                scene.flareGroup.fireFlare(player.x-60, player.y,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }
                    }
                }else{
                    player.anims.play('idle',true);
                }
            }
            if (scene.KeyW.isDown && player.body.velocity.y==0){
                player.setVelocityY(-700);
                player.anims.play('jump', true);
            }
        }
        if(player.health <= 0 && !player.died){
            player.died = true;
            player.anims.play('die',true).on('animationcomplete', () =>{
                player.anims.pause(player.anims.currentAnim.frames[5]);
                scene.sound.get('background_music').pause();
                scene.scene.restart();
            });
        }
        this.plyer_last_frame_index = player.anims.currentFrame.index;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Create Keys for Controlling Player
    //////////////////////////////////////////////////////////////////////
    static createKeys(scene){
        scene.KeySPACE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        scene.KeySHIFT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        scene.KeyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        scene.KeyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        scene.KeyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        scene.KeyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        scene.KeyONE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        scene.KeyTWO = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    }
}
//////////////////////////////////////////////////////////////////////
///    Flare Group Class
//////////////////////////////////////////////////////////////////////
class FlareGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);
		this.createMultiple({
			classType: Flare, 
			frameQuantity: 30, 
			active: false,
			visible: false,
			key: 'flare'
		})
	}
    fireFlare(x, y, direction) {
		const flare = this.getFirstDead(false);
		if (flare) {
			flare.fire(x, y, direction);
		}              
	}
}
//////////////////////////////////////////////////////////////////////
///    Flare Class
//////////////////////////////////////////////////////////////////////
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