export class loadingScene extends Phaser.Scene{
    constructor(){
        super({
            key: "loading"
        })
    }

    preload(){
        this.load.atlas('explorer', './assets/general/explorer.png','./assets/general/explorer.json');
        this.load.atlas('bat', './assets/general/bat.png','./assets/general/bat.json');
        this.load.atlas('fire','./assets/general/fire.png','./assets/general/fire.json')
        this.load.image("pillar","./assets/general/pillar.png");
        this.load.image("door_closed","./assets/general/door_closed.png");
        this.load.image("door_open_down","./assets/general/door_open_down.png");
        this.load.image("door_open_up","./assets/general/door_open_up.png");
        this.load.audio('background_music', 'assets/general/background_music.mp3');
        this.load.audio('door_open_sound', 'assets/general/door_open.mp3');
        this.load.audio('gun_shot_sound', 'assets/general/gun_shot.mp3');
        this.load.audio('bat_squeak_sound', 'assets/general/bat_squeak.mp3');
        this.load.audio('flare_hit_knight_sound', 'assets/general/flare_hit_knight.mp3');
        this.load.image("flare","./assets/general/flare.png");
        this.load.image("letter","./assets/general/letter.png");
        this.load.atlas('knight', './assets/general/knight.png','./assets/general/knight.json');
        this.load.audio('knight_whoosh_sound', 'assets/general/knight_whoosh.mp3');
        this.load.audio('hurt_by_knight_sound', 'assets/general/hurt_by_knight.mp3');
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0,this.game.renderer.height / 2, this.game.renderer.width * percent,50);
        })
        this.load.on("complete", ()=>{
            console.log("Done Loading")
        })
    }

    create(){
        // Knight animation
        this.anims.create({ key: 'knight_walk', frames: this.anims.generateFrameNames('knight', {
            start: 0, end: 15, zeroPad: 3,
            prefix: 'knight-walk-left__', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'knight_run', frames: this.anims.generateFrameNames('knight', {
            start: 0, end: 15, zeroPad: 3,
            prefix: 'knight-run-left__', suffix: '.png'
        }), frameRate: 15, repeat: -1 });
        this.anims.create({ key: 'knight_attack', frames: this.anims.generateFrameNames('knight', {
            start: 0, end: 11, zeroPad: 3,
            prefix: 'knight-attack-left__', suffix: '.png'
        }), frameRate: 10, repeat: -1 });        
        this.anims.create({ key: 'knight_idle', frames: this.anims.generateFrameNames('knight', {
            start: 0, end: 7, zeroPad: 3,
            prefix: 'knight-rest-left__', suffix: '.png'
        }), frameRate: 20, repeat: 0 });
        this.anims.create({ key: 'knight_die', frames: this.anims.generateFrameNames('knight', {
            start: 0, end: 14, zeroPad: 3,
            prefix: 'knight-die-facing-left__', suffix: '.png'
        }), frameRate: 20, repeat: 0 });
        // Explorer animation
        this.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 19, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_idle_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'walk', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 7, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_walk_', suffix: '.png'
        }), frameRate: 5, repeat: -1 });
        this.anims.create({ key: 'run', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 7, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_run_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });        
        this.anims.create({ key: 'jump', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 9, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_jump_', suffix: '.png'
        }), frameRate: 20, repeat: 0 });
        this.anims.create({ key: 'crouch', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 5, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_crouch_', suffix: '.png'
        }), frameRate: 20, repeat: 0 });
        this.anims.create({ key: 'shoot_resolver', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 5, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_shoot_revolver_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'run_shoot_resolver', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 7, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_run_shooting_revolver_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'walk_shoot_resolver', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 7, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_walk_shooting_revolver_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'die', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 4, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_die_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'hurt', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 4, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_hurt_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });
        // Bat animation
        this.anims.create({ key: 'fly_mouth_closed', frames: this.anims.generateFrameNames('bat', {
            start: 0, end: 7, zeroPad: 3,
            prefix: '__black_bat_fly_mouth_closed_', suffix: '.png'
        }), frameRate: 20, repeat: -1 });
        this.anims.create({ key: 'fly_mouth_open', frames: this.anims.generateFrameNames('bat', {
            start: 0, end: 7, zeroPad: 3,
            prefix: '__black_bat_fly_mouth_open_', suffix: '.png'
        }), frameRate: 20, repeat: -1 });
        // Fire animation
        this.anims.create({ key: 'candle_flame', frames: this.anims.generateFrameNames('fire', {
            start: 1, end: 4, zeroPad: 2,
            prefix: 'candle_flame_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'fireplace_fire', frames: this.anims.generateFrameNames('fire', {
            start: 1, end: 4, zeroPad: 2,
            prefix: 'fire_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'torch', frames: this.anims.generateFrameNames('fire', {
            start: 1, end: 5, zeroPad: 2,
            prefix: 'tourch_lit_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });

        this.scene.start('castle-scene1');
    }

}