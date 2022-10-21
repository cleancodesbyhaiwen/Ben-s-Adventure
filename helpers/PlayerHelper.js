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
        scene.playerContainer = scene.add.container(x, y, [scene.playerBody,scene.playerArm ]);
        scene.physics.world.enable(scene.playerContainer);
        scene.playerContainer.body.setVelocity(0, 0).setCollideWorldBounds(true)
        //.setImmovable(true);
        scene.playerContainer.flipX = false;
        scene.playerContainer.body.setSize(50,170,false)
        scene.playerBody.anims.play('idle_without_arm', true);
        scene.playerArm.anims.play('arm_uzi', true);

        // initilize player object 
        scene.player = new Player();

        // initialize health bar
        scene.health_bar_base = scene.add.sprite(scene.cameras.main.scrollX+40,33,'health_bar_base')
        .setOrigin(0).setDepth(6).setScale(0.5).setScrollFactor(0,0);
        scene.health_bar = scene.add.sprite(scene.cameras.main.scrollX+48,40,'health_bar')
        .setOrigin(0).setScale(scene.player.health/200,0.5).setDepth(6).setScrollFactor(0,0);
        scene.health_bar_icon = scene.add.sprite(scene.cameras.main.scrollX+20,20,'health_bar_icon')
        .setOrigin(0).setScale(0.5).setDepth(7).setScrollFactor(0,0);

        // initialize chosen weapon
        scene.chosen_weapon = scene.add.sprite(scene.cameras.main.scrollX+150,100, scene.player.weapon.image)
        .setScale(0.16).setOrigin(0).setScrollFactor(0,0);
        scene.bullet_count = scene.add.text(scene.cameras.main.scrollX+270,150
            ,scene.player.weapon.bullet_count+'/'+scene.player.weapon.max_bullet_count,
            {font: '30px monospace',fill: '#ffffff'}).setScrollFactor(0,0)

        // Initialize backpack            
        scene.add.sprite(scene.cameras.main.scrollX+40,100,'backpack_icon')
        .setOrigin(0).setDepth(6).setScale(0.2).setScrollFactor(0,0).setInteractive()
        .on('pointerdown', function(){
            scene.sound.add('zipper_sound').play();
            if(scene.backpackContainer==undefined){
                const background_panel = scene.add.sprite(0,0,'backpack_panel').setDepth(7);
                const item_list = []
                item_list.push(background_panel)
                for(let i=0;i<scene.player.items.length;i++){
                    const item_back = scene.add.sprite(i%5*160-315, Math.floor(i/5)*170-200,'item_back').setDepth(8)
                    .setInteractive().on('pointerover',function(){
                        scene.description_panel = scene.add.image(scene.input.x+scene.cameras.main.scrollX-10,
                            scene.input.y-10, 'description_panel').setOrigin(0,0).setDepth(9)
                            .setScale(0.01*scene.player.items[i].max_length,0.04*scene.player.items[i].num_of_line);
                        scene.desciption = scene.add.text(scene.input.x+scene.cameras.main.scrollX, scene.input.y, 
                            scene.player.items[i].description+'\nQuantity: '+scene.player.items[i].quantity,
                            {font: '30px monospace',fill: '#000000'}).setDepth(9);
                    })
                    .on('pointerout',function(){scene.desciption.destroy();scene.description_panel.destroy();})
                    const item = scene.add.image(i%5*160-315,Math.floor(i/5)*170-200,scene.player.items[i].image).setDepth(8);
                    item_list.push(item_back);
                    item_list.push(item);
                }
                scene.backpackContainer = scene.add.container(scene.cameras.main.scrollX+600, 400, item_list)
                .setDepth(8);
            }else{

                scene.backpackContainer.destroy();
                scene.backpackContainer=undefined;
            }
        });
        
        // Initialize message
        scene.message_panel = scene.add.image(scene.cameras.main.scrollX+20, 700, 'message_panel')
        .setOrigin(0,0).setScrollFactor(0,0).setVisible(false);
        scene.message = scene.add.text(scene.cameras.main.scrollX+30,710,'',
        {font: '30px monospace',fill: '#000000'}).setScrollFactor(0,0);

        // initialize camera
        scene.cameras.main.startFollow(scene.playerContainer, true, 0.08, 0.08);
        scene.cameras.main.setZoom(1);
        
        // initialize jump
        scene.input.keyboard.on('keydown-' + 'W', function (event) { 
            if(scene.player.enableInput&&scene.playerContainer.body.blocked.down) {
                if(scene.playerBody.flipX) scene.playerArm.x = 40
                else scene.playerArm.x = 10
                scene.playerBody.anims.play('idle_without_arm', true);
                scene.playerContainer.body.setVelocity(scene.playerContainer.body.velocity.x, -700);
            }
        });

        scene.input.keyboard.on('keydown-' + 'ESC', function (event) { 
            scene.add.text(scene.cameras.main.scrollX+520,400,'QUIT',{font: '50px monospace',fill: '#ffffff'})
            .setInteractive().on('pointerdown',function(){scene.scene.start('menu-scene')})
            scene.add.text(scene.cameras.main.scrollX+480,470,'CONTINUE',{font: '50px monospace',fill: '#ffffff'})
            .setInteractive().on('pointerdown', function(){this.destroy();})
        });

    }
    //////////////////////////////////////////////////////////////////////
    ///    Update Player
    //////////////////////////////////////////////////////////////////////
    static updatePlayer(scene,player, playerBody, playerArm, playerContainer){
        // Set Arm angle
        if(playerBody.flipX){
            let angle = Phaser.Math.Angle.Between(-playerContainer.x-25, 
                -playerContainer.y-85, -scene.input.x-scene.cameras.main.scrollX, 
                -scene.input.y-scene.cameras.main.scrollY);
            if(angle < -0.5) angle = -0.5;
            else if(angle > 0.6) angle = 0.6;
            playerArm.setRotation(angle)
        }else{
            let angle = Phaser.Math.Angle.Between(playerContainer.x+25, 
                playerContainer.y+85, scene.cameras.main.scrollX+scene.input.x, 
                scene.cameras.main.scrollY+scene.input.y);
            if(angle > 0.5) angle = 0.5;
            else if(angle < -0.6) angle = -0.6;
            playerArm.setRotation(angle)
        }

        // Shoot Bullets
        this.shoot_bullet(scene, player, playerArm, playerBody, playerContainer, player.weapon);
        // Update Health and Bullet Count
        scene.health_bar.setScale(player.health/200,0.5);
        scene.bullet_count.setText(player.weapon.bullet_count+'/'+scene.player.weapon.max_bullet_count)

        // TAB Panel 
        if(Phaser.Input.Keyboard.JustDown(scene.KeyTAB)){
            scene.stat_background = scene.add.sprite(scene.cameras.main.scrollX+600,400,'stat_background')
            .setScale(1).setDepth(4);
            player.enableInput = false;
        }
        if(Phaser.Input.Keyboard.JustUp(scene.KeyTAB)){
            scene.stat_background.destroy();
            player.enableInput = true;
        }
        // change weapon
        if(Phaser.Input.Keyboard.JustDown(scene.KeyONE)){
            scene.sound.add('change_weapon_sound').play();
            player.weapon = player.uzi;
            scene.playerArm.anims.play('arm_uzi', true);
            scene.chosen_weapon.setTexture(player.weapon.image);
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyTWO)){
            scene.sound.add('change_weapon_sound').play();
            player.weapon = player.ak;
            scene.playerArm.anims.play('arm_ak', true);
            scene.chosen_weapon.setTexture(player.weapon.image);
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyTHREE)){
            scene.sound.add('change_weapon_sound').play();
            player.weapon = player.shotgun;
            scene.playerArm.anims.play('arm_shotgun', true);
            scene.chosen_weapon.setTexture(player.weapon.image);
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyFOUR)){
            scene.sound.add('change_weapon_sound').play();
            player.weapon = player.sniper;
            scene.playerArm.anims.play('arm_sniper', true);
            scene.chosen_weapon.setTexture(player.weapon.image);
        }
        if(Phaser.Input.Keyboard.JustDown(scene.KeyFIVE)){
            scene.sound.add('change_weapon_sound').play();
            player.weapon = player.bazooka;
            scene.playerArm.anims.play('arm_bazooka', true);
            scene.chosen_weapon.setTexture('bazooka');
        }
        // Movement Logic
        if(!player.died && player.enableInput){
            // Moving to the left
            if (scene.KeyA.isDown && playerContainer.body.velocity.y == 0) {
                playerBody.flipX = true;
                playerArm.flipX = true;
                // run to the left
                if (scene.KeySHIFT.isDown){
                    scene.playerArm.x = 30;
                    scene.playerContainer.body.setVelocity(-260, 0);
                    playerBody.anims.play('run_without_arm', true);
                    if(playerBody.anims.currentFrame.index%4==0 
                        &&playerBody.anims.currentFrame.index != player.last_frame_index){
                        scene.sound.add('footstep_sound').play();
                    }
                }
                // walk to the left
                else{ 
                    scene.playerContainer.body.setVelocity(-100, 0);
                    scene.playerArm.x = 38;
                    playerBody.anims.play('walk_without_arm', true);
                    if(playerBody.anims.currentFrame.index%4==0 
                        &&playerBody.anims.currentFrame.index != player.last_frame_index){
                        scene.sound.add('footstep_sound').play();
                    }
                }
            }
            // Move to the right
            else if (scene.KeyD.isDown && playerContainer.body.velocity.y == 0) {
                playerBody.flipX = false;
                playerArm.flipX = false;
                // run to the right
                if (scene.KeySHIFT.isDown){
                    scene.playerContainer.body.setVelocity(260, 0);
                    scene.playerArm.x = 19;
                    playerBody.anims.play('run_without_arm', true);
                    if(playerBody.anims.currentFrame.index%4==0 
                        &&playerBody.anims.currentFrame.index != player.last_frame_index){
                        scene.sound.add('footstep_sound').play();
                    }
                }
                // walk to the right
                else{  
                    scene.playerContainer.body.setVelocity(100, 0);
                    scene.playerArm.x = 12;
                    playerBody.anims.play('walk_without_arm', true);
                    if(playerBody.anims.currentFrame.index%4==0 
                        &&playerBody.anims.currentFrame.index != player.last_frame_index){
                        scene.sound.add('footstep_sound').play();
                    }
                }
            }
            // Staying still
            else if(!scene.KeyW.isDown && playerContainer.body.velocity.y==0){
                scene.playerContainer.body.setVelocity(0, 0);
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
        scene.KeyESC = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
    //////////////////////////////////////////////////////////////////////
    ///    Display message
    //////////////////////////////////////////////////////////////////////
    static display_message(scene, message, duration){
        let num_of_line = (message.match(/\n/g) || []).length + 1;
        const array = message.split("\n");
        let max_length = 0;
        for(let i=0;i<array.length;i++){
            max_length = Math.max(max_length, array[i].length);
        }
        scene.message_panel.setVisible(true);
        scene.message_panel.setScale(0.04*max_length,0.3*num_of_line).setDepth(8);
        scene.message.setText(message).setDepth(8);
        scene.time.addEvent({
            delay: duration,
            callback: ()=>{  
                scene.message.setText('');
                scene.message_panel.setVisible(false);
            },
            callbackScope: scene,
            loop: false
        });
    }
    //////////////////////////////////////////////////////////////////////
    ///    Shoot BUllet
    //////////////////////////////////////////////////////////////////////
    static shoot_bullet(scene, player, playerArm, playerBody, playerContainer,weapon){
        if(scene.input.activePointer.isDown){
            if(player.frame%weapon.shootRate==0&&weapon.bullet_count>0){
                scene.sound.get(weapon.shoot_sound).play();
                let angle_radian = Math.abs(playerArm.angle)*Math.PI/180;
                if(playerBody.flipX) {
                    if(playerArm.angle>0){
                        scene.bulletGroup.fireBullet(playerContainer.x+weapon.left_x_offset-Math.cos(angle_radian)*weapon.length,
                        playerContainer.y+weapon.left_y_offset-Math.sin(angle_radian)*weapon.length,scene,playerArm
                        ,'left',scene.player, weapon.damage, weapon.bullet_image);
                    }else{
                        scene.bulletGroup.fireBullet(playerContainer.x+weapon.left_x_offset-Math.cos(angle_radian)*weapon.length,
                        playerContainer.y+weapon.left_y_offset+Math.sin(angle_radian)*weapon.length,scene,playerArm
                        ,'left',scene.player, weapon.damage, weapon.bullet_image);
                    }
                }
                else{
                    if(playerArm.angle>0){
                        scene.bulletGroup.fireBullet(playerContainer.x+weapon.right_x_offset+Math.cos(angle_radian)*weapon.length,
                        playerContainer.y+weapon.right_y_offset+Math.sin(angle_radian)*weapon.length,scene,playerArm
                        ,'right',scene.player, weapon.damage, weapon.bullet_image);
                    }else{
                        scene.bulletGroup.fireBullet(playerContainer.x+weapon.right_x_offset+Math.cos(angle_radian)*weapon.length,
                        playerContainer.y+weapon.right_y_offset-Math.sin(angle_radian)*weapon.length,scene,playerArm
                        ,'right',scene.player, weapon.damage, weapon.bullet_image);
                    }
                } 
                weapon.bullet_count -= 1;
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////
///    Item Class
//////////////////////////////////////////////////////////////////////
export class Item {
    constructor(name, image, description){
        this.name = name;
        this.image = image;
        this.description = description;
        this.quantity = 10;
        this.num_of_line = (description.match(/\n/g) || []).length + 2;
        this.max_length = this.find_max_length();
    }
    find_max_length(){
        const array = this.description.split("\n");
        let max_length = 0;
        for(let i=0;i<array.length;i++){
            max_length = Math.max(max_length, array[i].length);
        }
        return max_length;
    }
}
//////////////////////////////////////////////////////////////////////
///    Weapon Class
//////////////////////////////////////////////////////////////////////
class Weapon {
    constructor(damage, shootRate, bullet_count, shoot_sound, image,bullet_image,length,left_x_offset,
        left_y_offset,right_x_offset,right_y_offset){
        this.damage = damage;
        this.shootRate = shootRate;
        this.bullet_count = bullet_count;
        this.max_bullet_count = bullet_count;
        this.shoot_sound = shoot_sound;
        this.image = image;
        this.length = length;
        this.left_x_offset = left_x_offset;
        this.left_y_offset = left_y_offset;
        this.right_x_offset = right_x_offset;
        this.right_y_offset = right_y_offset;
        this.bullet_image = bullet_image;
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
        this.uzi = new Weapon(5, 10, 100, 'uzi_shot_sound', 'uzi', 'bullet.png',130, 45, 85, 5, 85);
        this.sniper = new Weapon(100, 50, 10, 'sniper_shot_sound', 'sniper','bullet.png', 150, 45, 78, 5, 78);
        this.shotgun = new Weapon(50, 50, 20, 'shotgun_shot_sound', 'shotgun','bullet.png', 150, 45, 85, 5, 87);
        this.ak = new Weapon(30, 10, 50, 'ak_shot_sound', 'ak','bullet.png', 150, 45, 80, 5, 80);
        this.bazooka = new Weapon(3, 100, 5, 'bazooka_shot_sound','bazooka','missile.png', 150, 45, 80, 5, 80);
        this.weapon = this.uzi;
        this.money = 0;
        this.items = [new Item('key2','item_key2', 'Key for entering the dark \nside of the castle'),
        new Item('fishing pole','item_fishingpole',
        'A fishing pole\npress F to start fishing'),
        new Item('larva', 'item_larva', 'This is a perfect\nbait for fishing'),
        new Item('key1', 'item_key1', 'This is a perfect\nbait for fishing'),
        new Item('shovel', 'item_shovel', 'A shovel, can be\nused to dig things')];
    }
    get_item(item_name){
        for(let i=0;i<this.items.length;i++){
            if(this.items[i].name==item_name){
                return i;
            }
        }
        return -1;
    }
    add_item(name, image, description){
        if(this.get_item(name)==-1){
            console.log('sdsd')
            this.items.push(new Item(name, image, description));  
        }else{
            this.items[this.get_item(name)].quantity++;
        }
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
			key: 'wall_plaque'
		})
	}
    fireBullet(x, y,scene,playerArm, direction, player, damage, image) {
		const bullet = this.getFirstDead(false);
		if (bullet) {
			bullet.fire(x, y, scene,playerArm, direction, player, damage,image);
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
    fire(x, y,scene,playerArm,direction, player, damage, image){
        this.flipX = true;
        player.bullet_count -= 1;
        this.damage = damage;
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.body.setAllowGravity(false);
        this.setScale(0.1);
        let vec = scene.physics.velocityFromAngle(playerArm.angle, 1)
        if(direction=='right'){
            if(scene.playerContainer.body.velocity.x>250) vec.y -= 0.1
            this.body.setVelocityX(1000*vec.x)
            this.body.setVelocityY(1000*vec.y)
            this.angle = playerArm.angle-180 
        }else{
            this.body.setVelocityX(-1000*vec.x)
            this.body.setVelocityY(-1000*vec.y)
            this.angle = playerArm.angle
        }
        this.setFrame(image);
	}
    preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (this.x >= this.scene.physics.world.bounds.width || this.x <= 0) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}