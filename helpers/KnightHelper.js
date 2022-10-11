export class KnightHelper
{
    constructor(){
        knight_last_frame_index = 0;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Create Knight
    //////////////////////////////////////////////////////////////////////
    static createKnight(scene,playerContainer,x,y,sprite_key,hit_sound_key,attck_sound_key, player_hit_sound_key,
        move_sprite_key, attack_sprite_key,die_sprite_key,idle_sprite_key,isflipX,
        attack_frame_index,die_frame_index){
        let knight = scene.physics.add.sprite(x,y, sprite_key).setScale(0.3).setOrigin(0.5,0.5);
        if(playerContainer.x>x) knight.flipX = true;
        else knight.flipX = false;
        knight.setCollideWorldBounds(true);
        knight.setImmovable(true);
        knight.health = 100;
        knight.hitSound = scene.sound.add(hit_sound_key);   
        knight.attackSound = scene.sound.add(attck_sound_key);
        knight.playerHurtSound = scene.sound.add(player_hit_sound_key);
        knight.move_sprite_key = move_sprite_key;
        knight.attack_sprite_key = attack_sprite_key;
        knight.die_sprite_key = die_sprite_key;
        knight.idle_sprite_key = idle_sprite_key;
        knight.isflipX = isflipX;
        knight.attack_frame_index = attack_frame_index;
        knight.die_frame_index = die_frame_index;
        scene.knight_bullet_collider = scene.physics.add.collider(knight, scene.bulletGroup, 
            function(knight,bullet){
                if(knight.x > bullet.x-5){
                    bullet.flipX = false;
                }else{
                    bullet.flipX = true;
                }
                bullet.setTexture('bullet_hitting');
                knight.hitSound.play();
                if(!bullet.counted) knight.health -= bullet.damage;  
                bullet.counted = true;
                scene.time.addEvent({
                    delay: 50,
                    callback: ()=>{
                        bullet.destroy();
                    },
                    callbackScope: this,
                    loop: false
                });
            }, null, scene);
            knight.start_attack = true;
        return knight;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Update Knight
    //////////////////////////////////////////////////////////////////////
    static updateKnight(scene, knight, playerContainer, player){
        knight.body.setSize(200,knight.height,true);  // keep height of collision box
        if(!knight.died && knight.start_attack){
            if(playerContainer.x+100 < knight.x){
                knight.body.offset.x = 300; // Make collision box fit
                knight.body.setVelocityX(-60);
            }else if(playerContainer.x - 100 > knight.x){
                knight.body.offset.x = 100; // Make collision box fit
                knight.body.setVelocityX(60);
            }else{
                knight.body.setVelocityX(0);
            }
            if(knight.body.velocity.x > 0){
                knight.flipX = knight.isflipX;
                knight.anims.play(knight.move_sprite_key,true)
            }else if(knight.body.velocity.x < 0){
                knight.flipX = !knight.isflipX;
                knight.anims.play(knight.move_sprite_key,true);
            }else{
                if(knight.anims.currentFrame.index == knight.attack_frame_index
                    && knight.anims.currentFrame.index != this.knight_last_frame_index){
                        knight.attackSound.play();
                        if(Math.abs(knight.x-playerContainer.x)<100){
                            player.health -= 10;
                            knight.playerHurtSound.play();
                        }
                }
                knight.anims.play(knight.attack_sprite_key,true);
            }
        }
        else if(!knight.died && !knight.start_attack){
            knight.anims.play(knight.idle_sprite_key,true);
        }
        if(knight.health <= 0 && !knight.died){
            scene.physics.world.removeCollider(scene.knight_bullet_collider);
            knight.died = true;
            knight.body.setVelocityX(0);
            knight.anims.play(knight.die_sprite_key,true).on('animationcomplete', () =>{
                knight.anims.pause(knight.anims.currentAnim.frames[knight.die_frame_index]);
            });
        }
        this.knight_last_frame_index = knight.anims.currentFrame.index;
    }
}
