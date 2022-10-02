export class loadingScene extends Phaser.Scene{
    constructor(){
        super({
            key: "loading"
        })
    }
    preload(){
        // Loading Screen
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(440, 375, 320, 50);
        this.load.on("progress", (value)=>{
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(450, 385, 300 * value, 30);
        })
        this.load.on("complete", ()=>{
            console.log("Done Loading")
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        })
        // Castle Scene1 Specific
        this.load.image("background-scene1","./assets/castle-scene1/background.png");
        this.load.audio('brick_rotate_sound', 'assets/castle-scene1/brick_rotate.mp3');
        this.load.audio('come_up_stairs', 'assets/castle-scene1/come_up_stairs.wav');
        this.load.image("letter_content1","./assets/castle-scene1/letter_content.png");
        this.load.image("wall_plaque","./assets/castle-scene1/wall_plaque.png");
        this.load.image("map","./assets/castle-scene1/map.png");
        this.load.image("brick","./assets/castle-scene1/brick.png");
        this.load.image("key","./assets/castle-scene1/key.png");
        this.load.audio('who_are_you', 'assets/castle-scene1/who_are_you.wav');
        this.load.audio('dont_come', 'assets/castle-scene1/dont_come.wav');
        this.load.audio('alex_is', 'assets/castle-scene1/alex_is.wav');
        this.load.audio('to_kill', 'assets/castle-scene1/to_kill.mp3');
        this.load.audio('is_dead', 'assets/castle-scene1/is_dead.mp3');
        this.load.atlas('dog', './assets/castle-scene1/dog.png','./assets/castle-scene1/dog.json');
        this.load.audio('background_music1', 'assets/castle-scene1/background_music.mp3');
        this.load.audio('earth_shaking', 'assets/castle-scene1/earth_shaking.mp3');
        this.load.audio('stay_with', 'assets/castle-scene1/stay_with.wav');
        this.load.audio('go_away', 'assets/castle-scene1/go_away.wav');
        // Castle Scene2 Specific
        this.load.image("background-scene2","./assets/castle-scene2/background.png");
        this.load.audio('background_music2', 'assets/castle-scene2/background_music.wav');
        // General
        this.load.atlas('explorer', './assets/general/explorer.png','./assets/general/explorer.json');
        this.load.atlas('bat', './assets/general/bat.png','./assets/general/bat.json');
        this.load.atlas('fire','./assets/general/fire.png','./assets/general/fire.json')
        this.load.image("pillar","./assets/general/pillar.png");
        this.load.image("door_closed","./assets/general/door_closed.png");
        this.load.image("door_open_down","./assets/general/door_open_down.png");
        this.load.image("door_open_up","./assets/general/door_open_up.png");
        this.load.audio('door_open_sound', 'assets/general/door_open.mp3');
        this.load.audio('gun_shot_sound', 'assets/general/gun_shot.mp3');
        this.load.audio('bat_squeak_sound', 'assets/general/bat_squeak.mp3');
        this.load.audio('flare_hit_knight_sound', 'assets/general/flare_hit_knight.mp3');
        this.load.image("flare","./assets/general/flare.png");
        this.load.image("flare_hitting","./assets/general/flare_hitting.png");
        this.load.image("letter","./assets/general/letter.png");
        this.load.atlas('knight', './assets/general/knight.png','./assets/general/knight.json');
        this.load.audio('knight_whoosh_sound', 'assets/general/knight_whoosh.mp3');
        this.load.audio('hurt_by_knight_sound', 'assets/general/hurt_by_knight.mp3');
        this.load.audio('flare_hit_spider_sound', 'assets/general/flare_hit_spider.mp3');
        this.load.audio('bitten_by_spider_sound', 'assets/general/bitten_by_spider.mp3');
        this.load.audio('spider_attack_sound', 'assets/general/spider_attack.mp3');
        this.load.atlas('spider', './assets/general/spider.png','./assets/general/spider.json');
        this.load.audio('change_weapon_sound', 'assets/general/change_weapon.wav');
        this.load.audio('door_locked', 'assets/general/door_locked.wav');
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
        }), frameRate: 10, repeat: 0 });
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
        this.anims.create({ key: 'shoot_uzi', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 1, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_shoot_uzi_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'run_shoot_uzi', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 7, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_run_shooting_uzi_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'walk_shoot_uzi', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 7, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_walk_shooting_uzi_', suffix: '.png'
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
        // Spider Animation
        this.anims.create({ key: 'spider_move', frames: this.anims.generateFrameNames('spider', {
            start: 0, end: 7, zeroPad: 3,
            prefix: '__purple_black_widow_move_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'spider_bite', frames: this.anims.generateFrameNames('spider', {
            start: 0, end: 6, zeroPad: 3,
            prefix: '__purple_black_widow_bite_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'spider_die', frames: this.anims.generateFrameNames('spider', {
            start: 0, end: 4, zeroPad: 3,
            prefix: '__purple_black_widow_die_', suffix: '.png'
        }), frameRate: 10, repeat: 0});
        this.anims.create({ key: 'spider_idle', frames: this.anims.generateFrameNames('spider', {
            start: 0, end: 19, zeroPad: 3,
            prefix: '__purple_black_widow_idle_', suffix: '.png'
        }), frameRate: 10, repeat: 0});
        // Dog Animation
        this.anims.create({ key: 'dog_walk', frames: this.anims.generateFrameNames('dog', {
            start: 0, end: 14, zeroPad: 2,
            prefix: '__brown_lapphund_walk_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'dog_bark', frames: this.anims.generateFrameNames('dog', {
            start: 0, end: 9, zeroPad: 2,
            prefix: '__brown_lapphund_bark_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'dog_run', frames: this.anims.generateFrameNames('dog', {
            start: 0, end: 14, zeroPad: 2,
            prefix: '__brown_lapphund_run_', suffix: '.png'
        }), frameRate: 20, repeat: -1});
        this.anims.create({ key: 'dog_sitting', frames: this.anims.generateFrameNames('dog', {
            start: 0, end: 19, zeroPad: 2,
            prefix: '__brown_lapphund_idle_sitting_', suffix: '.png'
        }), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'dog_sit', frames: this.anims.generateFrameNames('dog', {
            start: 0, end: 4, zeroPad: 2,
            prefix: '__brown_lapphund_sit_', suffix: '.png'
        }), frameRate: 10, repeat: 1});
        this.anims.create({ key: 'dog_stand', frames: this.anims.generateFrameNames('dog', {
            start: 0, end: 4, zeroPad: 2,
            prefix: '__brown_lapphund_stand_', suffix: '.png'
        }), frameRate: 10, repeat: 0});
        this.anims.create({ key: 'dog_standing', frames: this.anims.generateFrameNames('dog', {
            start: 0, end: 19, zeroPad: 2,
            prefix: '__brown_lapphund_idle_', suffix: '.png'
        }), frameRate: 10, repeat: -1});

        this.scene.start('castle-scene1');
    }

}