export class PlayerHelper
{
    constructor(){
    }
    //////////////////////////////////////////////////////////////////////
    ///    Create Player
    //////////////////////////////////////////////////////////////////////
    static createPlayer(scene,x,y){
        // initialize sound and keyboard
        this.createKeys(scene);
        scene.sound.add('shotgun_shot_sound');
        scene.sound.add('uzi_shot_sound');
        scene.sound.add('ak_shot_sound');
        scene.sound.add('bazooka_shot_sound');
        scene.sound.add('sniper_shot_sound');

        //initialize bullets
        scene.bulletGroup = new BulletGroup(scene);

        // initialize body, arm, and body_arm container
        scene.playerBody = scene.add.sprite(25,85, 'explorer').setScale(0.3);
        scene.playerArm = scene.add.sprite(10,90, 'explorer').setScale(0.3)
        scene.bodyContainer = scene.add.container(x, y, [scene.playerBody,scene.playerArm ]);
        scene.physics.world.enable(scene.bodyContainer);
        scene.bodyContainer.body.setVelocity(0, 0).setCollideWorldBounds(true).setImmovable(true);
        scene.bodyContainer.flipX = false;
        scene.bodyContainer.body.setSize(50,170,false)
        scene.playerBody.anims.play('idle_without_arm', true);
        scene.playerArm.anims.play('arm_uzi', true);

        // initilize player object 
        scene.player = new Player();

        // initialize healt bar
        scene.health_bar_base = scene.add.sprite(scene.cameras.main.scrollX+40,33,'health_bar_base')
        .setOrigin(0).setDepth(6).setScale(0.5);
        scene.health_bar = scene.add.sprite(scene.cameras.main.scrollX+48,40,'health_bar')
        .setOrigin(0).setScale(scene.player.health/200,0.5).setDepth(6);
        scene.health_bar_icon = scene.add.sprite(scene.cameras.main.scrollX+20,30,'health_bar_icon')
        .setOrigin(0).setScale(0.5).setDepth(7);

        // initialize camera
        scene.cameras.main.startFollow(scene.bodyContainer, true, 0.08, 0.08);
        scene.cameras.main.setZoom(1);
        
        // initialize jump
        scene.input.keyboard.on('keydown-' + 'W', function (event) { 
            if(scene.player.enableInput&&scene.bodyContainer.body.blocked.down) {
                if(scene.playerBody.flipX) scene.playerArm.x = 40
                else scene.playerArm.x = 10
                scene.playerBody.anims.play('idle_without_arm', true);
                scene.bodyContainer.body.setVelocity(scene.bodyContainer.body.velocity.x, -700);
            }
        });
    }
    //////////////////////////////////////////////////////////////////////
    ///    Update Player
    //////////////////////////////////////////////////////////////////////
    static updatePlayer(scene,player, playerBody, playerArm, bodyContainer){
        // Set Arm angle
        if(playerBody.flipX){
            let angle = Phaser.Math.Angle.Between(-bodyContainer.x-25, 
                -bodyContainer.y-85, -scene.input.x-scene.cameras.main.scrollX, 
                -scene.input.y-scene.cameras.main.scrollY);
            if(angle < -0.5) angle = -0.5;
            else if(angle > 0.6) angle = 0.6;
            playerArm.setRotation(angle)
        }else{
            let angle = Phaser.Math.Angle.Between(bodyContainer.x+25, 
                bodyContainer.y+85, scene.cameras.main.scrollX+scene.input.x, 
                scene.cameras.main.scrollY+scene.input.y);
            if(angle > 0.5) angle = 0.5;
            else if(angle < -0.6) angle = -0.6;
            playerArm.setRotation(angle)
        }
        // SHOTGUN SHOOT
        if(player.chosen_weapon=='shotgun'){
            this.shoot_bullet(scene, player, playerArm, playerBody, bodyContainer,
                50, 150, 45, 89, 5, 89, 'shotgun_shot_sound');
            this.shoot_bullet(scene, player, playerArm, playerBody, bodyContainer,
                50, 150, 45, 85, 5, 85, 'shotgun_shot_sound');
        }
        // UZI SHOOT
        else if(player.chosen_weapon=='uzi'){
            this.shoot_bullet(scene, player, playerArm, playerBody, bodyContainer,
                5, 130, 45, 85, 5, 85, 'uzi_shot_sound');
        }
        // AK SHOOT
        else if(player.chosen_weapon=='ak'){
            this.shoot_bullet(scene, player, playerArm, playerBody, bodyContainer,
                10, 150, 45, 80, 5, 80, 'ak_shot_sound');
        }
        // SNIPER SHOOT
        else if(player.chosen_weapon=='sniper'){
            this.shoot_bullet(scene, player, playerArm, playerBody, bodyContainer,
                50, 150, 45, 78, 5, 78, 'sniper_shot_sound');
        }                           
        // Healt Bar and Weapon Panel
        scene.health_bar_base.x = scene.cameras.main.scrollX+40;
        scene.health_bar.x = scene.cameras.main.scrollX+48;
        scene.health_bar_icon.x = scene.cameras.main.scrollX+20;
        scene.health_bar.setScale(player.health/200,0.5);

        if(Phaser.Input.Keyboard.JustDown(scene.KeyTAB)){
            scene.stat_background = scene.add.sprite(scene.cameras.main.scrollX+600,400,'stat_background')
            .setScale(1).setDepth(4);
            scene.chosen_weapon = scene.add.sprite(scene.cameras.main.scrollX+600,350,player.chosen_weapon)
            .setScale(0.7).setDepth(5);
            scene.bullet_count = scene.add.text(scene.cameras.main.scrollX+360, 540, player.bullet_count+'/300', { 
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 50}).setDepth(6)
            player.enableInput = false;
        }
        if(Phaser.Input.Keyboard.JustUp(scene.KeyTAB)){
            scene.stat_background.destroy();
            scene.chosen_weapon.destroy();
            scene.bullet_count.destroy();
            player.enableInput = true;
        }
        // change weapon
        if(Phaser.Input.Keyboard.JustDown(scene.KeyONE)){
            scene.sound.add('change_weapon_sound').play();
            player.chosen_weapon = 'uzi';
            scene.playerArm.anims.play('arm_uzi', true);
            if(scene.KeyTAB.isDown) scene.chosen_weapon.setTexture('uzi');
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyTWO)){
            scene.sound.add('change_weapon_sound').play();
            player.chosen_weapon = 'ak';
            scene.playerArm.anims.play('arm_ak', true);
            if(scene.KeyTAB.isDown) scene.chosen_weapon.setTexture('ak');
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyTHREE)){
            scene.sound.add('change_weapon_sound').play();
            player.chosen_weapon = 'shotgun';
            scene.playerArm.anims.play('arm_shotgun', true);
            if(scene.KeyTAB.isDown) scene.chosen_weapon.setTexture('shotgun');
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyFOUR)){
            scene.sound.add('change_weapon_sound').play();
            player.chosen_weapon = 'sniper';
            scene.playerArm.anims.play('arm_sniper', true);
            if(scene.KeyTAB.isDown) scene.chosen_weapon.setTexture('sniper');
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyFIVE)){
            scene.sound.add('change_weapon_sound').play();
            player.chosen_weapon = 'bazooka';
            scene.playerArm.anims.play('arm_bazooka', true);
            if(scene.KeyTAB.isDown) scene.chosen_weapon.setTexture('bazooka');
        }
        // Movement Logic
        if(!player.died && player.enableInput){
            // Moving to the left
            if (scene.KeyA.isDown && bodyContainer.body.velocity.y == 0) {
                playerBody.flipX = true;
                playerArm.flipX = true;
                // run to the left
                if (scene.KeySHIFT.isDown){
                    scene.playerArm.x = 30;
                    scene.bodyContainer.body.setVelocity(-260, 0);
                    playerBody.anims.play('run_without_arm', true);
                    if(playerBody.anims.currentFrame.index%4==0 
                        &&playerBody.anims.currentFrame.index != player.last_frame_index){
                        scene.sound.add('footstep_sound').play();
                    }
                }
                // walk to the left
                else{ 
                    scene.bodyContainer.body.setVelocity(-100, 0);
                    scene.playerArm.x = 38;
                    playerBody.anims.play('walk_without_arm', true);
                    if(playerBody.anims.currentFrame.index%4==0 
                        &&playerBody.anims.currentFrame.index != player.last_frame_index){
                        scene.sound.add('footstep_sound').play();
                    }
                }
            }
            // Move to the right
            else if (scene.KeyD.isDown && bodyContainer.body.velocity.y == 0) {
                playerBody.flipX = false;
                playerArm.flipX = false;
                // run to the right
                if (scene.KeySHIFT.isDown){
                    scene.bodyContainer.body.setVelocity(260, 0);
                    scene.playerArm.x = 19;
                    playerBody.anims.play('run_without_arm', true);
                    if(playerBody.anims.currentFrame.index%4==0 
                        &&playerBody.anims.currentFrame.index != player.last_frame_index){
                        scene.sound.add('footstep_sound').play();
                    }
                }
                // walk to the right
                else{  
                    scene.bodyContainer.body.setVelocity(100, 0);
                    scene.playerArm.x = 12;
                    playerBody.anims.play('walk_without_arm', true);
                    if(playerBody.anims.currentFrame.index%4==0 
                        &&playerBody.anims.currentFrame.index != player.last_frame_index){
                        scene.sound.add('footstep_sound').play();
                    }
                }
            }
            // Staying still
            else if(!scene.KeyW.isDown && bodyContainer.body.velocity.y==0){
                scene.bodyContainer.body.setVelocity(0, 0);
                if(playerBody.flipX){
                    playerArm.x = 40
                }else{
                    playerArm.x = 10
                }
                playerBody.anims.play('idle_without_arm',true);
            }
        }
        // Die
        if(player.health <= 0 && !player.died){
            player.died = true;
            playerArm.destroy();
            playerBody.anims.play('die',true).on('animationcomplete', () =>{
                playerBody.anims.pause(playerBody.anims.currentAnim.frames[5]);
                scene.background_music.pause();
                scene.background.setAlpha(0.5);
                scene.scene.restart();
            })
        }
        // Storing last frame index
        player.last_frame_index = playerBody.anims.currentFrame.index;
        player.frame++;
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
        scene.KeyONE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        scene.KeyTWO = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        scene.KeyTHREE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        scene.KeyFOUR = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        scene.KeyFIVE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        scene.KeySIX = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);
        scene.KeyTAB = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
    }
    //////////////////////////////////////////////////////////////////////
    ///    Shoot BUllet
    //////////////////////////////////////////////////////////////////////
    static shoot_bullet(scene, player, playerArm, playerBody, bodyContainer,
        shootRate, length, left_x_offset, left_y_offset, right_x_offset, right_y_offset, sound_key){
        if(scene.input.activePointer.isDown){
            if(player.frame%shootRate==0){
                scene.sound.get(sound_key).play();
                let angle_radian = Math.abs(playerArm.angle)*Math.PI/180;
                if(playerBody.flipX) {
                    if(playerArm.angle>0){
                        scene.bulletGroup.fireBullet(bodyContainer.x+left_x_offset-Math.cos(angle_radian)*length,
                        bodyContainer.y+left_y_offset-Math.sin(angle_radian)*length,scene,playerArm,'left',scene.player);
                    }else{
                        scene.bulletGroup.fireBullet(bodyContainer.x+left_x_offset-Math.cos(angle_radian)*length,
                        bodyContainer.y+left_y_offset+Math.sin(angle_radian)*length,scene,playerArm,'left',scene.player);
                    }
                }
                else{
                    if(playerArm.angle>0){
                        scene.bulletGroup.fireBullet(bodyContainer.x+right_x_offset+Math.cos(angle_radian)*length,
                        bodyContainer.y+right_y_offset+Math.sin(angle_radian)*length,scene,playerArm,'right',scene.player);
                    }else{
                        scene.bulletGroup.fireBullet(bodyContainer.x+right_x_offset+Math.cos(angle_radian)*length,
                        bodyContainer.y+right_y_offset-Math.sin(angle_radian)*length,scene,playerArm,'right',scene.player);
                    }
                } 
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////
///    Player Class
//////////////////////////////////////////////////////////////////////
class Player {
    constructor(){
        this.health = 100;
        this.died = false;
        this.chosen_weapon = 'uzi';
        this.enableInput = true;
        this.frame = 0;
        this.bullet_count = 300;
        this.last_frame_index = 0;
    }
}
//////////////////////////////////////////////////////////////////////
///    Bullet Group Class
//////////////////////////////////////////////////////////////////////
class BulletGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);
		this.createMultiple({
			classType: Bullet, 
			frameQuantity: 300, 
			active: false,
			visible: false,
			key: 'bullet'
		})
	}
    fireBullet(x, y,scene,playerArm, direction, player) {
		const bullet = this.getFirstDead(false);
		if (bullet) {
			bullet.fire(x, y, scene,playerArm, direction, player);
		}              
	}
}
//////////////////////////////////////////////////////////////////////
///    Bullet Class
//////////////////////////////////////////////////////////////////////
class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'bullet');
	}
    fire(x, y,scene,playerArm,direction, player) {
        player.bullet_count -= 1;
        if(player.bullet_count>=0){
            this.body.reset(x, y);
            this.setActive(true);
            this.setVisible(true);
            this.body.setAllowGravity(false);
            this.setScale(0.1);
            let vec = scene.physics.velocityFromAngle(playerArm.angle, 1)
            if(direction=='right'){
                if(scene.bodyContainer.body.velocity.x>250) vec.y -= 0.1
                this.body.setVelocityX(1000*vec.x)
                this.body.setVelocityY(1000*vec.y)
                this.angle = playerArm.angle-180 
            }else{
                this.body.setVelocityX(-1000*vec.x)
                this.body.setVelocityY(-1000*vec.y)
                this.angle = playerArm.angle
            }
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