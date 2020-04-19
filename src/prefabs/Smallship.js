//Smallship prefab
class Smallship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add object to existing scene
        this.points = pointValue;
    }

    update() {
       // move smallship left
       this.x -= game.settings.spaceshipSpeed+1;
       //move smallship up
       //this.y += game.settings.spaceshipspeed;
       //wraparound screen bounds
       if(this.x <= 0 - this.width) {
           this.resetX();
       }
       if(this.y >= 480 + this.height) {
        this.resetY();
       }
    }

    resetX(){
        this.x = game.config.width;
    }

    resetY(){
        this.y = 0;
    }
}