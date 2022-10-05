export class PlayerHelper
{
    constructor(){
        player_last_frame_index = 0;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Create Player
    //////////////////////////////////////////////////////////////////////
    static createPlayer(scene,x,y){
        this.createKeys(scene);
        scene.sound.add('gun_shot_sound');
        scene.sound.add('shotgun_shot_sound');
        scene.flareGroup = new FlareGroup(scene);
        scene.player = scene.physics.add.sprite(x,y, 'explorer').setScale(0.3);
        scene.player.flipX = false;
        scene.player.setCollideWorldBounds(true);
        scene.player.anims.play('idle', true);
        scene.player.health = 100;
        scene.player.died = false;
        scene.player.chosen_weapon = 'revolver';
        scene.player.body.setImmovable(true);
        scene.player.enableInput = true;
        scene.player.body.setSize(300,650,true);
        scene.cameras.main.startFollow(scene.player, true, 0.08, 0.08);
        scene.cameras.main.setZoom(1);
        scene.input.keyboard.on('keydown-' + 'S', function (event) { 
            if(scene.player.enableInput) scene.player.anims.play('crouch',true).on('animationcomplete', () =>{
                scene.player.anims.pause(scene.player.anims.currentAnim.frames[5]);
            });
        });
        scene.input.keyboard.on('keydown-' + 'W', function (event) { 
            if(scene.player.enableInput&&scene.player.body.blocked.down) {
                scene.player.setVelocityY(-700);
                scene.player.anims.play('jump',true).on('animationcomplete', () =>{
                    scene.player.anims.pause(scene.player.anims.currentAnim.frames[9]);
                });
            }
        });
    }
    //////////////////////////////////////////////////////////////////////
    ///    Update Player
    //////////////////////////////////////////////////////////////////////
    static updatePlayer(scene, player){
        // Stat panel
        if(Phaser.Input.Keyboard.JustDown(scene.KeyTAB)){
            scene.stat_background = scene.add.sprite(scene.cameras.main.scrollX+600,400,'stat_background').setScale(1).setDepth(4);
            scene.health_bar = scene.add.sprite(scene.cameras.main.scrollX+495,552,'health_bar').setOrigin(0).setScale(player.health/113,0.7).setDepth(6);
            scene.chosen_weapon = scene.add.sprite(scene.cameras.main.scrollX+600,350,player.chosen_weapon).setScale(0.5).setDepth(5);
            player.enableInput = false;
        }
        if(Phaser.Input.Keyboard.JustUp(scene.KeyTAB)){
            scene.stat_background.destroy();
            scene.health_bar.destroy();
            scene.chosen_weapon.destroy();
            player.enableInput = true;
        }
        // change weapon
        if(Phaser.Input.Keyboard.JustDown(scene.KeyONE)){
            scene.sound.add('change_weapon_sound').play();
            player.chosen_weapon = 'revolver';
            if(scene.KeyTAB.isDown) scene.chosen_weapon.setTexture('revolver');
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyTWO)){
            scene.sound.add('change_weapon_sound').play();
            player.chosen_weapon = 'uzi';
            if(scene.KeyTAB.isDown) scene.chosen_weapon.setTexture('uzi');
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyTHREE)){
            scene.sound.add('change_weapon_sound').play();
            player.chosen_weapon = 'shotgun';
            if(scene.KeyTAB.isDown) scene.chosen_weapon.setTexture('shotgun');
        }
        // Movement Logic
        if(!player.died && !player.being_hurt && player.enableInput){
            // Moving to the left
            if (scene.KeyA.isDown && player.body.velocity.y == 0) {
                player.flipX = true;
                // run to the left
                if (scene.KeySHIFT.isDown){
                    player.setVelocityX(-260);
                    if(scene.KeySPACE.isDown){
                        if(player.chosen_weapon=='revolver'){
                            player.anims.play('run_shoot_revolver',true);
                            if(player.anims.currentFrame.index == 7
                                && player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x-60, player.y-5,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='uzi'){
                            player.anims.play('run_shoot_uzi',true);
                            if(player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x-100, player.y+5,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='shotgun'){
                            player.anims.play('run_shoot_shotgun',true);
                            if(player.anims.currentFrame.index == 6 &&
                                player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x-80, player.y,'left');
                                scene.flareGroup.fireFlare(player.x-80, player.y-10,'left');
                                scene.sound.get('shotgun_shot_sound').play();
                            }
                        }
                    }else{
                        player.anims.play('run', true);
                        if(player.anims.currentFrame.index%4==0 
                            &&player.anims.currentFrame.index != this.plyer_last_frame_index){
                            scene.sound.add('footstep_sound').play();
                        }
                    }
                }else{ // walk to the left
                    player.setVelocityX(-60);
                    if(scene.KeySPACE.isDown){
                        if(player.chosen_weapon=='revolver'){
                            player.anims.play('walk_shoot_revolver', true);
                            if(player.anims.currentFrame.index == 6
                                && player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x-60, player.y-5,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='uzi'){
                            player.anims.play('walk_shoot_uzi', true);
                            if( player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x-100, player.y+10,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='shotgun'){
                            player.anims.play('walk_shoot_shotgun', true);
                            if( player.anims.currentFrame.index == 6 && 
                                player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x-80, player.y,'left');
                                scene.flareGroup.fireFlare(player.x-80, player.y-10,'left');
                                scene.sound.get('shotgun_shot_sound').play();
                            }
                        }
                    }else{
                        player.anims.play('walk', true);
                        if(player.anims.currentFrame.index%4==0 
                            &&player.anims.currentFrame.index != this.plyer_last_frame_index){
                            scene.sound.add('footstep_sound').play();
                        }
                    }
                }
            }
            // Move to the right
            else if (scene.KeyD.isDown && player.body.velocity.y == 0) {
                player.flipX = false;
                // run to the right
                if (scene.KeySHIFT.isDown){
                    player.setVelocityX(260);
                    if(scene.KeySPACE.isDown){
                        if(player.chosen_weapon=='revolver'){
                            player.anims.play('run_shoot_revolver',true);
                            if(player.anims.currentFrame.index == 6
                                && player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x+60, player.y-5,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='uzi'){
                            player.anims.play('run_shoot_uzi',true);
                            if(player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x+100, player.y+5,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='shotgun'){
                            player.anims.play('run_shoot_shotgun',true);
                            if(player.anims.currentFrame.index == 6 &&
                                player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x+80, player.y,'right');
                                scene.flareGroup.fireFlare(player.x+80, player.y-10,'right');
                                scene.sound.get('shotgun_shot_sound').play();
                            }
                        }
                    }else{
                        player.anims.play('run', true);
                        if(player.anims.currentFrame.index%4==0 
                            &&player.anims.currentFrame.index != this.plyer_last_frame_index){
                            scene.sound.add('footstep_sound').play();
                        }
                    }
                }else{  // walk to the right
                    player.setVelocityX(60);
                    if(scene.KeySPACE.isDown){
                        if(player.chosen_weapon=='revolver'){
                            player.anims.play('walk_shoot_revolver', true);
                            if(player.anims.currentFrame.index == 6
                                && player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x+60, player.y-5,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='uzi'){
                            player.anims.play('walk_shoot_uzi', true);
                            if( player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x+100, player.y+10,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }else if(player.chosen_weapon=='shotgun'){
                            player.anims.play('walk_shoot_shotgun', true);
                            if( player.anims.currentFrame.index == 6 && 
                                player.anims.currentFrame.index != this.plyer_last_frame_index){
                                scene.flareGroup.fireFlare(player.x+80, player.y,'right');
                                scene.flareGroup.fireFlare(player.x+80, player.y-10,'right');
                                scene.sound.get('shotgun_shot_sound').play();
                            }
                        }
                    }else{
                        player.anims.play('walk', true);
                        if(player.anims.currentFrame.index%4==0 
                            &&player.anims.currentFrame.index != this.plyer_last_frame_index){
                            scene.sound.add('footstep_sound').play();
                        }
                    }
                }
            }
            // Staying still
            else if(!scene.KeyW.isDown && player.body.velocity.y==0 && !scene.KeyS.isDown){
                player.setVelocityX(0);
                if(scene.KeySPACE.isDown){
                    if(player.chosen_weapon=='revolver'){
                        player.anims.play('shoot_revolver',true);
                        if(player.anims.currentFrame.index == 5 
                            && player.anims.currentFrame.index != this.plyer_last_frame_index){
                            if(player.flipX==false){
                                scene.flareGroup.fireFlare(player.x+60, player.y,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }else{
                                scene.flareGroup.fireFlare(player.x-60, player.y,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }
                    }else if(player.chosen_weapon=='uzi'){
                        player.anims.play('shoot_uzi',true);
                        if(player.anims.currentFrame.index == 1
                            && player.anims.currentFrame.index != this.plyer_last_frame_index){
                            if(player.flipX==false){
                                scene.flareGroup.fireFlare(player.x+100, player.y+10,'right');
                                scene.sound.get('gun_shot_sound').play();
                            }else{
                                scene.flareGroup.fireFlare(player.x-100, player.y+10,'left');
                                scene.sound.get('gun_shot_sound').play();
                            }
                        }
                    }else if(player.chosen_weapon=='shotgun'){
                        player.anims.play('shoot_shotgun',true);
                        if(player.anims.currentFrame.index == 6
                            && player.anims.currentFrame.index != this.plyer_last_frame_index){
                            if(player.flipX==false){
                                scene.flareGroup.fireFlare(player.x+80, player.y+5,'right');
                                scene.flareGroup.fireFlare(player.x+80, player.y-5,'right');
                                scene.sound.get('shotgun_shot_sound').play();
                            }else{
                                scene.flareGroup.fireFlare(player.x-80, player.y+5,'left');
                                scene.flareGroup.fireFlare(player.x-80, player.y-5,'left');
                                scene.sound.get('shotgun_shot_sound').play();
                            }
                        }
                    }
                }else{
                    player.anims.play('idle',true);
                }
            }

        }
        // Die
        if(player.health <= 0 && !player.died){
            player.died = true;
            player.anims.play('die',true).on('animationcomplete', () =>{
                player.anims.pause(player.anims.currentAnim.frames[5]);
                scene.background_music.pause();
                scene.background.setAlpha(0.5);
                scene.scene.restart();
            })
        }
        // Storing last frame index
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
        scene.KeyTHREE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        scene.KeyTAB = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
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
        if(direction=='left') this.setVelocityX(-1000); 
        else this.setVelocityX(1000); 
	}
    preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (this.x >= this.scene.physics.world.bounds.width || this.x <= 0) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}