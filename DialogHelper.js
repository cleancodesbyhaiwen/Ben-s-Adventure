export class DialogHelper{
    constructor(){

    }
    static creatDialog(scene,choice1_text, choice2_text,choice1_sound,choice2_sound
        ,choice1_reply_sound,choice2_reply_sound, dialog_name){
      var dialog = scene.rexUI.add.dialog({
        x: 600,
        y: 700,
        width: 800,
    
        //background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 5, 0xFFFFFF, 0),
        //title: createLabel(scene, 'Dialog').setDraggable(),
    
        toolbar: [
            //createLabel(scene, 'O'),
            //createLabel(scene, 'X')
        ],
        leftToolbar: [
            //createLabel(scene, 'A'),
            //createLabel(scene, 'B')
        ],  
        //content: createLabel(scene, 'Content'),
        //description: createLabel(scene, 'Description'),
        choices: [
            createLabel(scene, choice1_text),
            createLabel(scene, choice2_text),
            //createLabel(scene, choice3_text)
        ],
        actions: [
            //createLabel(scene, '1'),
            //createLabel(scene, '2'),
            //createLabel(scene, '3')
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
            choice: 15,
            action: 15,
        },
        expand: {
            title: false,
            // content: false,
            // description: false,
            // choices: false,
            // actions: true,
        },
        align: {
            title: 'center',
            // content: 'left',
            // description: 'left',
            // choices: 'left',
            actions: 'right', // 'center'|'left'|'right'
        },
        click: {
            mode: 'release'
        }
      })
      //.setDraggable('background')   // Draggable-background
      .layout()
      //.drawBounds(scene.add.graphics(), 0xff0000)
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
        switch (index){
            case 0:
                scene.sound.add(choice1_sound).play();
                scene.dog.go_away = true
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
        button.getElement('background').setStrokeStyle();
    });
}
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
    
      background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 10, 0xffffff, 0.3),

      text: scene.add.text(0, 0, text, {
          fontSize: '24px',
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
