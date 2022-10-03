export class DialogHelper{
    constructor(){

    }
    static creatDialog(scene,choice1_text, choice2_text,choice1_sound,choice2_sound
        ,choice1_reply_sound,choice2_reply_sound, dialog_name, x_position){

        var dialog = scene.rexUI.add.dialog({
            x: x_position,
            y: 750,
            width: 300,

            choices: [
                createLabel(scene, choice1_text),
                createLabel(scene, choice2_text),
            ],
            space: {
                left: 20,
                right: 20,
                top: -20,
                bottom: -20,
        
                title: 25,
                titleLeft: 30,
                content: 25,
                description: 25,
                descriptionLeft: 20,
                descriptionRight: 20,
                choices: 25,
        
                toolbarItem: 5,
                choice: 5,
                action: 15,
            },
            align: {
                title: 'center',
                content: 'center',
                // description: 'left',
                choices: 'center',
                actions: 'right', // 'center'|'left'|'right'
            },
            click: {
                mode: 'release'
            }
        })
        .layout()
        .popUp(1000)
        .setDepth(3);

        var tween = scene.tweens.add({
            targets: dialog,
            scaleX: 1,
            scaleY: 1,
            ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0, // -1: infinity
            yoyo: false
        });
        if(dialog_name=='dog_dialog'){
            dialog_action_dog(dialog,scene,choice1_sound,choice2_sound);
        }else if(dialog_name=='knight_dialog'){
            dialog_action_knight(dialog,scene,choice1_sound,choice2_sound,choice1_reply_sound,choice2_reply_sound);
        }
        return dialog;
    }
    
}
function dialog_action_dog(dialog,scene,choice1_sound,choice2_sound){
    
    dialog
    .on('button.click', function (button, groupName, index, pointer, event) {
        dialog.destroy();
        scene.input.keyboard.enabled = true;
        this.player.enableInput = true;
        switch (index){
            case 0:
                scene.sound.add(choice1_sound).play();
                scene.time.addEvent({
                    delay: 2000,
                    callback: ()=>{
                        scene.dog.go_away = true
                    },
                    callbackScope: this,
                    loop: false
                },scene);
                break;
            case 1:
                scene.sound.add(choice2_sound).play();
                break;
        }
    }, scene)
    .on('button.over', function (button, groupName, index, pointer, event) {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
    })
    .on('button.out', function (button, groupName, index, pointer, event) {
        button.getElement('background').setStrokeStyle(2,0x000000);
    });
}
function dialog_action_knight(dialog,scene,choice1_sound,choice2_sound,choice1_reply_sound,choice2_reply_sound){
    scene.input.keyboard.enabled = true;
    dialog
    .on('button.click', function (button, groupName, index, pointer, event) {
        dialog.destroy();
        scene.input.keyboard.enabled = true;
        this.player.enableInput = true;
        switch (index){
            case 0:
                scene.sound.add(choice1_sound).play();
                scene.time.addEvent({
                    delay: 2000,
                    callback: ()=>{
                        scene.sound.add(choice1_reply_sound).play();
                        scene.knight.start_attack = true;
                    },
                    callbackScope: this,
                    loop: false
                },scene);
                break;
            case 1:
                scene.sound.add(choice2_sound).play();
                scene.time.addEvent({
                    delay: 2000,
                    callback: ()=>{
                        scene.sound.add(choice2_reply_sound).play();
                        scene.knight.start_attack = true;
                    },
                    callbackScope: this,
                    loop: false
                },scene);
                break;
        }
    }, scene)
    .on('button.over', function (button, groupName, index, pointer, event) {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
    })
    .on('button.out', function (button, groupName, index, pointer, event) {
        button.getElement('background').setStrokeStyle();
    });
}

var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        width: 40, // Minimum width of round-rectangle
        height: 40, // Minimum height of round-rectangle
        
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 5, 0xffffff, 1)
        .setStrokeStyle(2,0x000000),

        text: scene.add.text(0, 0, text, {
            fontSize: '18px',
            color: 'black',
            fontWeight: 'bold',
            fontFamily: 'cursive'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
}
