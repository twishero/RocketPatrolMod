class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    create() {
        console.log(this);
        //display meny text
        this.add.text(20, 20, "Rocket Patrol Menu");

        //launch next scene
        this.scene.start("playScene");
    }
}