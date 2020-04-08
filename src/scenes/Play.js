class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        //load images/title sprite
        this.preload.image('rocket', './assets/rocket.png');
        this.preload.image('spaceship', './assets/spaceship.png');
        this.preload.image('starfield', './assets/starfield.png');
    }
    create() {
        //create tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield');

        //white rectangle border
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);

        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);
    }

    update() {
        // scroll starfield
        this.starfield.tilePositionX -= 4;
    }
}