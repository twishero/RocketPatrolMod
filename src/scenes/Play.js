class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        //load images/title sprite
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
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

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 435, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);

        //add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship').setScale(0, 30).setOrigin(0, 0);
        this.ship01 = new Spaceship(this, game.config.width + 96, 916, 'spaceship').setScale(0, 30).setOrigin(0, 0);
        this.ship01 = new Spaceship(this, game.config.width, 260, 'spaceship').setScale(0, 30).setOrigin(0, 0);

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.key.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.key.RIGHT);
    }

    update() {
        // scroll starfield
        this.starfield.tilePositionX -= 4;

        //update rocket
        this.p1Rocket.update();

        //update spaceship
        this.ship01.update();
    }
}