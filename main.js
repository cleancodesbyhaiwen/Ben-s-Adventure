import {menuScene} from './menu-scene.js'
import {bookScene} from './book-scene.js'
import {loadingScene} from './loading-scene.js'
import {PopUpScene} from './popup-scene.js'
import {castleScene0} from './castle-scene0.js'
import {castleScene1} from './castle-scene1.js'
import {castleScene2} from './castle-scene2.js'
import {TransitionScene} from './transition-scene.js'


const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    autoCenter: true,
    //scale: {
    //    parent: 'rgame-div',
    //    mode: Phaser.Scale.FIT,
    //},
    physics: {
        default: 'arcade',
        arcade: {                         
            debug:true,
            gravity: {y:1000}
        }
    },
    scene: [loadingScene,TransitionScene,menuScene,bookScene,castleScene0,castleScene1,castleScene2,PopUpScene]
};
export const game = new Phaser.Game(config);

