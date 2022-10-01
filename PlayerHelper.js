export class PlayerHelper
{
    constructor(){
        player_last_frame_index = 0;
        enemy_last_frame_index = 0;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Create Player
    //////////////////////////////////////////////////////////////////////
    static createPlayer(scene,x,y){
        scene.sound.add('gun_shot_sound');
        scene.flareGroup = new FlareGroup(scene);
        let player = scene.physics.add.sprite(x,y, 'explorer').setScale(0.3);
        player.flipX = false;
        player.body.setSize(280,590);
        player.setCollideWorldBounds(true);
        player.anims.play('idle', true);
        player.health = 100;
        player.died = false;
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
        if(!player.died && !player.being_hurt){
            if (scene.KeyA.isDown && player.body.velocity.y == 0) {
                player.flipX = true;
                if (scene.KeySHIFT.isDown){
                    player.setVelocityX(-260);
                    if(scene.KeySPACE.isDown){
                        player.anims.play('run_shoot_resolver',true);
                        if(player.anims.currentFrame.index == 7
                            && player.anims.currentFrame.index != this.plyer_last_frame_index){
                            scene.flareGroup.fireFlare(player.x-60, player.y,'left');
                            scene.sound.get('gun_shot_sound').play();
                        }
                    }else{
                        player.anims.play('run', true);
                    }
                }
                else{
                    player.setVelocityX(-60);
                    if(scene.KeySPACE.isDown){
                        player.anims.play('walk_shoot_resolver', true);
                        if(player.anims.currentFrame.index == 7
                            && player.anims.currentFrame.index != this.plyer_last_frame_index){
                            scene.flareGroup.fireFlare(player.x-60, player.y,'left');
                            scene.sound.get('gun_shot_sound').play();
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
                        player.anims.play('run_shoot_resolver',true);
                        if(player.anims.currentFrame.index == 7
                            && player.anims.currentFrame.index != this.plyer_last_frame_index){
                            scene.flareGroup.fireFlare(player.x+60, player.y,'right');
                            scene.sound.get('gun_shot_sound').play();
                        }
                    }else{
                        player.anims.play('run', true);
                    }
                }
                else{
                    player.setVelocityX(60);
                    if(scene.KeySPACE.isDown){
                        player.anims.play('walk_shoot_resolver', true);
                        if(player.anims.currentFrame.index == 7
                            && player.anims.currentFrame.index != this.plyer_last_frame_index){
                            scene.flareGroup.fireFlare(player.x+60, player.y,'right');
                            scene.sound.get('gun_shot_sound').play();
                        }
                    }else{
                        player.anims.play('walk', true);
                    }
                }
            }else if(!scene.KeyW.isDown && !scene.KeySHIFT.isDown && 
                player.body.velocity.y==0 && !scene.KeyS.isDown){
                player.setVelocityX(0);
                if(scene.KeySPACE.isDown){
                    player.anims.play('shoot_resolver',true);
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
    }
    //////////////////////////////////////////////////////////////////////
    ///    Create Enemy
    //////////////////////////////////////////////////////////////////////
    static createEnemy(scene,x,y,sprite_key,hit_sound_key,attck_sound_key, player_hit_sound_key){
        let enemy = scene.physics.add.sprite(x,y, sprite_key).setScale(0.3);
        enemy.setCollideWorldBounds(true);
        enemy.setImmovable(true);
        enemy.health = 100;
        enemy.body.setSize(200,550);
        enemy.hitSound = scene.sound.add(hit_sound_key);
        enemy.attackSound = scene.sound.add(attck_sound_key);
        enemy.playerHurtSound = scene.sound.add(player_hit_sound_key);
        scene.enemy_flare_collider = scene.physics.add.collider(enemy, scene.flareGroup, 
            this.hitByFlare, null, this);
        return enemy;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Enemy Hit By Flare Callback
    //////////////////////////////////////////////////////////////////////
    static hitByFlare(enemy,flare){
        enemy.hitSound.play();
        flare.setVisible(false);
        flare.setActive(false);
        enemy.health -= 10;  
    } 
    //////////////////////////////////////////////////////////////////////
    ///    Update Enemy
    //////////////////////////////////////////////////////////////////////
    static updateEnemy(scene, enemy, player){
        if(!enemy.died){
            if(player.x+100 < enemy.x){
                enemy.body.setVelocityX(-60);
            }else if(player.x - 100 > enemy.x){
                enemy.body.setVelocityX(60);
            }else{
                enemy.body.setVelocityX(0);
            }
            if(enemy.body.velocity.x > 0){
                enemy.flipX = true;
                enemy.anims.play('knight_walk',true)
            }else if(enemy.body.velocity.x < 0){
                enemy.flipX = false;
                enemy.anims.play('knight_walk',true)
            }else{
                if(enemy.anims.currentFrame.index == 11
                    && enemy.anims.currentFrame.index != this.enemy_last_frame_index){
                        enemy.attackSound.play();
                        if(scene.physics.overlap(player, enemy)){
                            player.health -= 10;
                            player.being_hurt = true;
                            player.anims.play('hurt',true).on('animationcomplete', () =>{
                                player.being_hurt = false;
                            });
                            enemy.playerHurtSound.play();
                        }
                }
                enemy.anims.play('knight_attack',true);
            }
        }
        if(enemy.health <= 0 && !enemy.died){
            scene.physics.world.removeCollider(scene.enemy_flare_collider);
            enemy.died = true;
            enemy.body.setVelocityX(0);
            enemy.anims.play('knight_die',true).on('animationcomplete', () =>{
                enemy.anims.pause(enemy.anims.currentAnim.frames[15]);
            });
        }
        this.enemy_last_frame_index = enemy.anims.currentFrame.index;
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