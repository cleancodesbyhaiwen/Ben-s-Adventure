export class EnemyHelper
{
    constructor(){
        enemy_last_frame_index = 0;
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
        enemy.start_attack = false;
        return enemy;
    }
    //////////////////////////////////////////////////////////////////////
    ///    Enemy Hit By Flare Callback
    //////////////////////////////////////////////////////////////////////
    static hitByFlare(enemy,flare){
        enemy.hitSound.play();
        flare.destroy();
        enemy.health -= 10;  
    } 
    //////////////////////////////////////////////////////////////////////
    ///    Update Enemy
    //////////////////////////////////////////////////////////////////////
    static updateEnemy(scene, enemy, player, move_sprite_key, attack_sprite_key, die_sprite_key, flipX,
        attack_frame_index, die_frame_index){
        if(!enemy.died && enemy.start_attack){
            if(player.x+100 < enemy.x){
                enemy.body.setVelocityX(-60);
            }else if(player.x - 100 > enemy.x){
                enemy.body.setVelocityX(60);
            }else{
                enemy.body.setVelocityX(0);
            }
            if(enemy.body.velocity.x > 0){
                enemy.flipX = flipX;
                enemy.anims.play(move_sprite_key,true)
            }else if(enemy.body.velocity.x < 0){
                enemy.flipX = !flipX;
                enemy.anims.play(move_sprite_key,true);
            }else{
                if(enemy.anims.currentFrame.index == attack_frame_index
                    && enemy.anims.currentFrame.index != this.enemy_last_frame_index){
                        enemy.attackSound.play();
                        if(Math.abs(enemy.x-player.x)<100){
                            player.health -= 10;
                            player.being_hurt = true;
                            player.anims.play('hurt',true).on('animationcomplete', () =>{
                                player.being_hurt = false;
                            });
                            enemy.playerHurtSound.play();
                        }
                }
                enemy.anims.play(attack_sprite_key,true);
            }
        }
        else if(!enemy.died && !enemy.start_attack){
            enemy.anims.play('knight_idle',true);
        }
        if(enemy.health <= 0 && !enemy.died){
            scene.physics.world.removeCollider(scene.enemy_flare_collider);
            enemy.died = true;
            enemy.body.setVelocityX(0);
            enemy.anims.play(die_sprite_key,true).on('animationcomplete', () =>{
                enemy.anims.pause(enemy.anims.currentAnim.frames[die_frame_index]);
            });
        }
        this.enemy_last_frame_index = enemy.anims.currentFrame.index;
    }
}
