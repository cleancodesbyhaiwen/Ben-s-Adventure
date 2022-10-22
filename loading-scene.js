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
        // Menu Scene Specific
        this.load.image("background-menu","./assets/menu-scene/background.png");
        this.load.audio('background_music_menu', 'assets/menu-scene/background_music.mp3');
        this.load.image("start_button","./assets/menu-scene/start_button.png");
        this.load.image("controls_button","./assets/menu-scene/controls_button.png");
        this.load.image("credits_button","./assets/menu-scene/credits_button.png");
        this.load.image("controls_panel","./assets/menu-scene/controls_panel.png");
        this.load.image("credits_panel","./assets/menu-scene/credits_panel.png");
        this.load.audio('mouse_hover_sound', 'assets/menu-scene/mouse_hover.mp3');
        // Book scene specific
        this.load.image("book","./assets/book-scene/book.png");
        this.load.image("book_background","./assets/book-scene/book_background.png");
        this.load.atlas('page', './assets/book-scene/page.png','./assets/book-scene/page.json');
        this.load.image("background-book","./assets/book-scene/background.png");
        this.load.image("candle","./assets/book-scene/candle.png");
        this.load.audio('background_music_book', 'assets/book-scene/background_music.wav');
        this.load.image("tiara","./assets/book-scene/tiara.png");
        this.load.image("crown","./assets/book-scene/crown.png");
        this.load.image("lantern","./assets/book-scene/lantern.png");
        this.load.image("bracelet","./assets/book-scene/bracelet.png");
        this.load.image("necklace","./assets/book-scene/necklace.png");
        this.load.image("scarab","./assets/book-scene/scarab.png");
        this.load.image("chalice","./assets/book-scene/chalice.png");
        //Plane scene specific
        this.load.image("background-plane","./assets/plane-scene/background.png");
        this.load.image("plane","./assets/plane-scene/plane.png");
        this.load.audio('wind_sound', 'assets/plane-scene/wind.mp3');
        // Entrance scene specific
        this.load.atlas('larva','./assets/entrance-scene/larva.png','./assets/entrance-scene/larva.json')
        this.load.image("strike_button","./assets/entrance-scene/strike_button.png");
        this.load.audio('splash_sound', 'assets/entrance-scene/splash.mp3');
        this.load.audio('shovel_digging_sound', 'assets/entrance-scene/shovel_digging.mp3');
        this.load.image("background-entrance","./assets/entrance-scene/background.png");
        this.load.image("bridge","./assets/entrance-scene/bridge.png");
        this.load.image("parachute","./assets/entrance-scene/parachute.png");
        this.load.image("left_edge","./assets/entrance-scene/left_edge.png");
        this.load.image("right_edge","./assets/entrance-scene/right_edge.png");
        this.load.atlas('fishes','./assets/entrance-scene/fishes.png','./assets/entrance-scene/fishes.json')
        this.load.atlas('water','./assets/entrance-scene/water.png','./assets/entrance-scene/water.json')
        this.load.atlas('shark','./assets/entrance-scene/shark.png','./assets/entrance-scene/shark.json')
        this.load.atlas('splash','./assets/entrance-scene/splash.png','./assets/entrance-scene/splash.json')
        // Castle Scene0 Specific
        this.load.image("background-scene0","./assets/castle-scene0/background.png");
        this.load.audio('not_suppose', 'assets/castle-scene0/not_suppose.wav');
        this.load.audio('to_save', 'assets/castle-scene0/to_save.wav');
        this.load.audio('save_yourself', 'assets/castle-scene0/save_yourself.wav');
        this.load.audio('my_way', 'assets/castle-scene0/my_way.wav');
        this.load.audio('lets_see', 'assets/castle-scene0/lets_see.wav');
        this.load.atlas('skeleton', './assets/castle-scene0/skeleton.png','./assets/castle-scene0/skeleton.json');
        this.load.audio('crash_bone_sound', 'assets/castle-scene0/crash_bone.wav');
        this.load.audio('witch_laugh', 'assets/castle-scene0/witch_laugh.wav');
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
        this.load.audio('earth_shaking_sound', 'assets/castle-scene1/earth_shaking.mp3');
        this.load.audio('stay_with', 'assets/castle-scene1/stay_with.wav');
        this.load.audio('go_away', 'assets/castle-scene1/go_away.wav');
        this.load.image("arrow","./assets/castle-scene1/arrow.png");
        this.load.audio('arrow_shoot_sound', 'assets/castle-scene1/arrow_shoot.mp3');
        this.load.audio('arrow_hit_sound', 'assets/castle-scene1/arrow_hit.mp3');
        this.load.audio('thunder_rain_sound', 'assets/castle-scene1/thunder_rain.wav');
        this.load.image("chest_closed","./assets/castle-scene1/chest_closed.png");
        this.load.image("chest_open","./assets/castle-scene1/chest_open.png");
        // General
        this.load.image("item_larva","./assets/general/item_larva.png");
        this.load.image("item_fishingpole","./assets/general/item_fishingpole.png");
        this.load.image("item_key1","./assets/general/item_key1.png");
        this.load.image("item_key2","./assets/general/item_key2.png");
        this.load.image("item_back","./assets/general/item_back.png");
        this.load.image("item_shovel","./assets/general/item_shovel.png");
        this.load.image("backpack_panel","./assets/general/backpack_panel.png");
        this.load.image("backpack_icon","./assets/general/backpack_icon.png");
        this.load.atlas('bullet', './assets/general/bullet.png','./assets/general/bullet.json');
        this.load.image("bullet_count_icon","./assets/general/bullet_count_icon.png");
        this.load.atlas('explorer', './assets/general/explorer.png','./assets/general/explorer.json');
        this.load.atlas('bat', './assets/general/bat.png','./assets/general/bat.json');
        this.load.atlas('fire','./assets/general/fire.png','./assets/general/fire.json')
        this.load.image("pillar","./assets/general/pillar.png");
        this.load.image("door_closed","./assets/general/door_closed.png");
        this.load.image("door_open_down","./assets/general/door_open_down.png");
        this.load.image("door_open_up","./assets/general/door_open_up.png");
        this.load.image("door_open","./assets/general/door_open.png");
        this.load.audio('door_open_sound', 'assets/general/door_open.mp3');
        this.load.audio('gun_shot_sound', 'assets/general/gun_shot.mp3');
        this.load.audio('bat_squeak_sound', 'assets/general/bat_squeak.mp3');
        this.load.audio('bullet_hit_knight_sound', 'assets/general/bullet_hit_knight.mp3');
        this.load.image("bullet","./assets/general/bullet.png");
        this.load.image("bullet_hitting","./assets/general/bullet_hitting.png");
        this.load.image("letter","./assets/general/letter.png");
        this.load.atlas('knight', './assets/general/knight.png','./assets/general/knight.json');
        this.load.audio('knight_whoosh_sound', 'assets/general/knight_whoosh.mp3');
        this.load.audio('hurt_by_knight_sound', 'assets/general/hurt_by_knight.mp3');
        this.load.audio('bullet_hit_spider_sound', 'assets/general/bullet_hit_spider.mp3');
        this.load.audio('bitten_by_spider_sound', 'assets/general/bitten_by_spider.mp3');
        this.load.audio('spider_attack_sound', 'assets/general/spider_attack.mp3');
        this.load.atlas('spider', './assets/general/spider.png','./assets/general/spider.json');
        this.load.audio('change_weapon_sound', 'assets/general/change_weapon.wav');
        this.load.audio('door_locked', 'assets/general/door_locked.wav');
        this.load.image("uzi","./assets/general/uzi.png");
        this.load.image("revolver","./assets/general/revolver.png");
        this.load.image("stat_background","./assets/general/stat_background.png");
        this.load.image("shotgun","./assets/general/shotgun.png");
        this.load.audio('shotgun_shot_sound', 'assets/general/shotgun_shot.wav');
        this.load.image("restart_button","./assets/general/restart_button.png");
        this.load.audio('footstep_sound', 'assets/general/footstep.mp3');
        this.load.audio('player_hurt_sound', 'assets/general/player_hurt.ogg');
        this.load.image("close_button","./assets/general/close_button.png");    
        this.load.image("background_dialog","./assets/general/background_dialog.png");
        this.load.atlas('arm_revolver', './assets/general/arm_revolver.png','./assets/general/arm_revolver.json');
        this.load.atlas('arm_uzi', './assets/general/arm_uzi.png','./assets/general/arm_uzi.json');
        this.load.image('arm_shotgun', './assets/general/arm_shotgun.png');
        this.load.audio('uzi_shot_sound', 'assets/general/uzi_shot.mp3');
        this.load.image('sniper', './assets/general/sniper.png');
        this.load.image('ak', './assets/general/ak.png');
        this.load.image('bazooka', './assets/general/bazooka.png');
        this.load.audio('bazooka_shot_sound', 'assets/general/bazooka_shot.mp3');
        this.load.audio('sniper_shot_sound', 'assets/general/sniper_shot.mp3');
        this.load.audio('ak_shot_sound', 'assets/general/ak_shot.mp3');
        this.load.audio('bazooka_shot_sound', 'assets/general/bazooka_shot.wav');
        this.load.audio('zipper_sound', 'assets/general/zipper.wav');
        this.load.image("health_bar","./assets/general/health_bar.png");
        this.load.image("health_bar_base","./assets/general/health_bar_base.png");
        this.load.image("health_bar_icon","./assets/general/health_bar_icon.png");
        this.load.image("description_panel","./assets/general/description_panel.png");
        this.load.image("message_panel","./assets/general/message_panel.png");
    }
    create(){
        // Larva 
        this.anims.create({ key: 'larva_wiggle', frames: this.anims.generateFrameNames('larva', {
            start: 0, end:19, zeroPad: 3,
            prefix: '__lava_wiggle_', suffix: '.png'
        }), frameRate: 7, repeat: -1 });
        // Fishes
        this.anims.create({ key: 'sword_fish_anims', frames: this.anims.generateFrameNames('fishes', {
            start: 0, end:15, zeroPad: 3,
            prefix: 'sword-fish-swim__', suffix: '.png'
        }), frameRate: 15, repeat: -1 });

        this.anims.create({ key: 'red_angler_anims', frames: this.anims.generateFrameNames('fishes', {
            start: 0, end:15, zeroPad: 2,
            prefix: '__red_angler_fish_swim_', suffix: '.png'
        }), frameRate: 15, repeat: -1 });
        this.anims.create({ key: 'purple_angler_anims', frames: this.anims.generateFrameNames('fishes', {
            start: 0, end:15, zeroPad: 2,
            prefix: '__purple_angler_fish_swim_', suffix: '.png'
        }), frameRate: 15, repeat: -1 });

        this.anims.create({ key: 'orange_puffer_anims', frames: this.anims.generateFrameNames('fishes', {
            start: 0, end:7, zeroPad: 3,
            prefix: '__orange_puffer_fish_swim_inflated_', suffix: '.png'
        }), frameRate: 15, repeat: -1 });

        this.anims.create({ key: 'pink_puffer_anims', frames: this.anims.generateFrameNames('fishes', {
            start: 0, end:7, zeroPad: 3,
            prefix: '__pink_puffer_fish_swim_inflated_', suffix: '.png'
        }), frameRate: 15, repeat: -1 });
        this.anims.create({ key: 'lion_fish_anims', frames: this.anims.generateFrameNames('fishes', {
            start: 0, end:9, zeroPad: 3,
            prefix: '__lion_fish_pink_swim_', suffix: '.png'
        }), frameRate: 15, repeat: -1 });

        // Splash Shark Water
        this.anims.create({ key: 'splash_anims', frames: this.anims.generateFrameNames('splash', {
            start: 1, end:7, zeroPad: 2,
            prefix: 'up_splash_', suffix: '.png'
        }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'shark_anims', frames: this.anims.generateFrameNames('shark', {
            start: 0, end:11, zeroPad: 2,
            prefix: '__dark_blue_shark_swim_snapping_', suffix: '.png'
        }), frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'water_anims', frames: this.anims.generateFrameNames('water', {
            start: 1, end:3, zeroPad: 1,
            prefix: 'water', suffix: '.png'
        }), frameRate: 7, repeat: -1 });

        this.anims.create({ key: 'arm_uzi_anims', frames: this.anims.generateFrameNames('arm_uzi', {
            start: 0, end:9, zeroPad: 3,
            prefix: 'arm_uzi_', suffix: '.png'
        }), frameRate: 40, repeat: -1 });
        //Skeleton Animation
        this.anims.create({ key: 'skeleton_run', frames: this.anims.generateFrameNames('skeleton', {
            start: 0, end: 15, zeroPad: 3,
            prefix: '__skeleton_000_run_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'skeleton_attack', frames: this.anims.generateFrameNames('skeleton', {
            start: 0, end: 9, zeroPad: 3,
            prefix: '__skeleton_000_throw-bone_', suffix: '.png'
        }), frameRate: 15, repeat: -1 });
        this.anims.create({ key: 'skeleton_die', frames: this.anims.generateFrameNames('skeleton', {
            start: 0, end: 9, zeroPad: 3,
            prefix: '__skeleton_000_die_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });   
        // Page Animation
        this.anims.create({ key: 'next_page', frames: this.anims.generateFrameNames('page', {
            start: 1, end: 12, zeroPad: 2,
            prefix: 'double_page_animation_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });  

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
        this.anims.create({ key: 'striking', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 15, zeroPad: 3,
            prefix: 'striking_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });

        this.anims.create({ key: 'digging', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 9, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_dig_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });

        this.anims.create({ key: 'fishing', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 9, zeroPad: 3,
            prefix: 'fishing_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });

        this.anims.create({ key: 'fall', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 9, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_falling_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
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

        this.anims.create({ key: 'die', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 4, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_die_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });
        this.anims.create({ key: 'hurt', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 4, zeroPad: 3,
            prefix: '__explorer_light_skin_tone_hurt_', suffix: '.png'
        }), frameRate: 10, repeat: 0 });

        this.anims.create({ key: 'idle_without_arm', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 19, zeroPad: 3,
            prefix: 'idle_without_arm_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'walk_without_arm', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 7, zeroPad: 3,
            prefix: 'walk_without_arm_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'run_without_arm', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 7, zeroPad: 3,
            prefix: 'run_without_arm_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });

        this.anims.create({ key: 'arm_uzi', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 0, zeroPad: 3,
            prefix: 'arm_uzi_', suffix: '.png'
        }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'arm_shotgun', frames: this.anims.generateFrameNames('explorer', {
            start: 2, end: 2, zeroPad: 3,
            prefix: 'arm_shotgun_', suffix: '.png'
        }), frameRate: 10, repeat: 1 });
        this.anims.create({ key: 'arm_revolver', frames: this.anims.generateFrameNames('explorer', {
            start: 1, end: 1, zeroPad: 3,
            prefix: 'arm_revolver_', suffix: '.png'
        }), frameRate: 10, repeat: 1 });
        this.anims.create({ key: 'arm_ak', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 0, zeroPad: 3,
            prefix: 'arm_ak_', suffix: '.png'
        }), frameRate: 10, repeat: 1 });
        this.anims.create({ key: 'arm_bazooka', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 0, zeroPad: 3,
            prefix: 'arm_bazooka_', suffix: '.png'
        }), frameRate: 10, repeat: 1 });
        this.anims.create({ key: 'arm_sniper', frames: this.anims.generateFrameNames('explorer', {
            start: 0, end: 0, zeroPad: 3,
            prefix: 'arm_sniper_', suffix: '.png'
        }), frameRate: 10, repeat: 1 });

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
        //this.scene.start('castle-scene0');
        this.scene.start('menu-scene');
    }

}