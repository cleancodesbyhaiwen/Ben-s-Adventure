//////////////////////////////////////////////////////////////////////
///    Arrow Group Class
//////////////////////////////////////////////////////////////////////
export class ArrowGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);
		this.createMultiple({
			classType: Arrow, 
			frameQuantity: 30, 
			active: false,
			visible: false,
			key: 'arrow'
		})

	}
    fireArrow(x, y, scene) {
		const arrow = this.getFirstDead(false);
		if (arrow) {
			arrow.shoot(x, y, scene);
		}              
	}
    createCollider(scene, playerContainer){
        scene.arrowCollider = scene.physics.add.collider(playerContainer, this, 
            function(player,arrow){
                console.log('hit player')
                scene.player.health -= 10;
                scene.sound.add('player_hurt_sound').play();
                arrow.destroy();
            }, null, scene);
    }
}
//////////////////////////////////////////////////////////////////////
///    Arrow Class
//////////////////////////////////////////////////////////////////////
class Arrow extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'arrow');
	}
    shoot(x, y, scene) {
		this.body.reset(x, y);
		this.setActive(true);
		this.setVisible(true);
        this.flipX=true;
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.setScale(0.2);
        this.body.setSize(10,10);
        scene.sound.add('arrow_shoot_sound').play();

        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', function(body) {
            if(body.gameObject === this){
                //console.log('world bound collide')
                //body.setVelocityX(0)
                //body.setVelocityY(0)
                //this.setActive(false);
                //body.enable = false; 
                this.destroy();
                scene.sound.add('arrow_hit_sound').play();
            }
        },this);
        let x_y_ratio = (scene.playerContainer.x-this.x)/(scene.playerContainer.y-this.y);
        this.body.setVelocityX(400*x_y_ratio)
        this.body.setVelocityY(400)
        this.setRotation(Phaser.Math.Angle.Between(this.x, 
            this.y, scene.playerContainer.x, scene.playerContainer.y))
	}
    preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (this.x >= this.scene.physics.world.bounds.width || this.x <= 0) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}