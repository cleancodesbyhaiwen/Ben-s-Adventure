import {loadingScene} from './loading-scene.js'
import {letterScene} from './castle-scene1.js'
import {castleScene1} from './castle-scene1.js'
import {castleScene2} from './castle-scene2.js'
import {castleScene3} from './castle-scene3.js'

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:1000}
        }
    },
    scene: [loadingScene,castleScene1,castleScene2,castleScene3,letterScene]
};

export const game = new Phaser.Game(config);