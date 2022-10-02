import {loadingScene} from './loading-scene.js'
import {PopUpScene} from './castle-scene1.js'
import {castleScene1} from './castle-scene1.js'
import {castleScene2} from './castle-scene2.js'

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {                         
            //debug:true,
            gravity: {y:1000}
        }
    },
    scene: [loadingScene,castleScene1,castleScene2,PopUpScene]
};

export const game = new Phaser.Game(config);

