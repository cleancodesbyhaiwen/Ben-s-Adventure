export class DialogHelper{
    constructor(){

    }
    static creatDialog(scene,choice1_text, choice2_text,choice1_sound,choice2_sound
        ,choice1_reply_sound,choice2_reply_sound, dialog_name, x_position){
        var dialog = scene.rexUI.add.dialog({
            x: x_position,
            y: 750,
            width: 400,

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
        .setDepth(3)
        .setScrollFactor(0);

        var tween = scene.tweens.add({
            targets: dialog,
            scaleX: 1,
            scaleY: 1,
            ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0, // -1: infinity
            yoyo: false
        });
        if(dialog_name=='knight_dialog'){
            dialog_action_knight(dialog,scene,choice1_sound,choice2_sound,choice1_reply_sound,choice2_reply_sound);
        }
        return dialog;
    }
    
}
// Initilize Knight Dialog
/*
this.time.addEvent({
    delay: 3000, //6000
    callback: ()=>{ 
        this.knight_dialog = DialogHelper.creatDialog(this,'Get out of my way, or I\'ll kill you',
        'I\'m here to save the children','my_way','to_save',
        'lets_see','save_yourself', 'knight_dialog',this.cameras.main.scrollX+600);
    },
    callbackScope: this,
    loop: false
},this);*/
function dialog_action_knight(dialog,scene,choice1_sound,choice2_sound,choice1_reply_sound,choice2_reply_sound){
    dialog
    .on('button.click', function (button, groupName, index, pointer, event) {
        dialog.destroy();
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
        button.getElement('text').setColor('#e8ebe9');
    })
    .on('button.out', function (button, groupName, index, pointer, event) {
        button.getElement('text').setColor('white');
    });
}

var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        width: 40, // Minimum width of round-rectangle
        height: 40, // Minimum height of round-rectangle
       // background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 5, 0xffffff, 1)
       // .setStrokeStyle(2,0x000000),
        background: scene.rexUI.add.ninePatch({
            key: 'background_dialog',
            columns: [0.25, undefined,0.25],
            rows: [1, undefined, 1],
        }),

        text: scene.add.text(0, 0, text, {
            fontSize: '18px',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'cursive'
        }),

        space: {
            left: 20,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
}
