export class SkeletonHelper
{
    constructor(){
        skeleton_last_frame_index = 0;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Create Skeleton
    //////////////////////////////////////////////////////////////////////
    static createSkeleton(scene, player,x,y){
        let skeleton = scene.physics.add.sprite(x,y, 'skeleton').setScale(0.3);
        if(player.x>x) skeleton.flipX = true;
        else skeleton.flipX = false;
        skeleton.setCollideWorldBounds(true);
        skeleton.setImmovable(true);
        skeleton.body.setSize(100,skeleton.height,true); 
        skeleton.health = 100;
        skeleton.hitSound = scene.sound.add('crash_bone_sound');   
        skeleton.attackSound = scene.sound.add('crash_bone_sound');
        skeleton.playerHurtSound = scene.sound.add('crash_bone_sound');
        skeleton.move_sprite_key = 'skeleton_run';
        skeleton.attack_sprite_key = 'skeleton_attack';
        skeleton.die_sprite_key = 'skeleton_die';
        skeleton.idle_sprite_key = 'skeleton_attack';
        skeleton.isflipX = true;
        skeleton.attack_frame_index = 5;
        skeleton.die_frame_index = 9;
        skeleton.last_frame_index = 0;
        scene.skeleton_bullet_collider = []
        scene.skeleton_bullet_collider = scene.physics.add.collider(skeleton, scene.bulletGroup, 
            function(skeleton,bullet){
                if(skeleton.x > bullet.x-5){
                    bullet.flipX = false;
                }else{
                    bullet.flipX = true;
                }
                bullet.setTexture('bullet_hitting')
                skeleton.hitSound.play();
                if(!bullet.counted) skeleton.health -= 10;  
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
        return skeleton;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Update Skeleton
    //////////////////////////////////////////////////////////////////////
    static updateSkeleton(scene, skeleton, player, playerContainer){
        if(!skeleton.died){
            if(playerContainer.x+100 < skeleton.x){
                skeleton.body.setVelocityX(-60);
            }else if(playerContainer.x - 100 > skeleton.x){
                skeleton.body.setVelocityX(60);
            }else{
                skeleton.body.setVelocityX(0);
            }
            if(skeleton.body.velocity.x > 0){
                skeleton.flipX = skeleton.isflipX;
                skeleton.anims.play(skeleton.move_sprite_key,true)
            }else if(skeleton.body.velocity.x < 0){
                skeleton.flipX = !skeleton.isflipX;
                skeleton.anims.play(skeleton.move_sprite_key,true);
            }else{
                if(skeleton.anims.currentFrame.index == skeleton.attack_frame_index
                    && skeleton.anims.currentFrame.index != skeleton.last_frame_index ){
                        skeleton.attackSound.play();
                        if(Math.abs(skeleton.x-playerContainer.x)<100){
                            player.health -= 10;
                            skeleton.playerHurtSound.play();
                        }
                }
                skeleton.anims.play(skeleton.attack_sprite_key,true);
            }
        }
        else if(!skeleton.died && !skeleton.start_attack){
            skeleton.anims.play(skeleton.idle_sprite_key,true);
        }
        if(skeleton.health <= 0  && !skeleton.died){
            skeleton.body.setSize(10,10,true)
            //scene.physics.world.removeCollider(scene.skeleton_flare_collider);
            skeleton.died = true;
            skeleton.body.setVelocityX(0);
            skeleton.anims.play(skeleton.die_sprite_key,true).on('animationcomplete', () =>{
                console.log('complete')
                skeleton.anims.pause(skeleton.anims.currentAnim.frames[skeleton.die_frame_index]);
            });
        }
        skeleton.last_frame_index  = skeleton.anims.currentFrame.index;
    }
}
