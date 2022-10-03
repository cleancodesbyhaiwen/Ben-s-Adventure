
        // Initialize Dog
        this.dog = this.physics.add.sprite(1300, 500, 'dog').setScale(0.2);
        this.dog.setCollideWorldBounds(true)
        this.dog_dialog = DialogHelper.creatDialog(this,'Go away, Rocky','Hey Rocky, Stay with me',
        'go_away','stay_with',
        undefined,undefined, 'dog_dialog');



        // Update Dog
        if(this.dog && !this.dog.go_away){
            if(!this.dog.see_knight){
                if(this.player.x+100 < this.dog.x){
                    this.dog.body.setVelocityX(-60);
                }else if(this.player.x - 100 > this.dog.x){
                    this.dog.body.setVelocityX(60);
                }else{
                    this.dog.body.setVelocityX(0);
                }
            }
            if(this.dog.body.velocity.x < 0 && this.dog.body.velocity.x > -250){
                this.dog.flipX = false;
                this.dog.anims.play('dog_walk',true)
            }else if(this.dog.body.velocity.x <  -250){
                this.dog.flipX = false;
                this.dog.anims.play('dog_run',true);
            }else if(this.dog.body.velocity.x > 0){
                this.dog.flipX = true;
                this.dog.anims.play('dog_walk',true);
            }else if(!this.dog.sitting){
                this.dog.anims.play('dog_sitting',true);
            }
            if(this.knight){
                if(this.knight.died){
                    this.dog.see_knight = false;
                }else{
                    this.dog.see_knight = true;
                    this.dog.body.setVelocityX(-260);
                }
            }
            if(this.dog.x < 300 && this.dog.see_knight){
                this.dog.body.setVelocityX(0);
            }
        }else{
            this.dog.body.setVelocityX(60);
            this.dog.flipX = true;
            this.dog.anims.play('dog_walk',true)
            if(this.dog.x > 3000){
                this.dog.setVisible(false);
                this.dog.setActive(false);
            }
        }

        if(this.dog_dialog) this.dog_dialog.x = this.cameras.main.scrollX + 600;