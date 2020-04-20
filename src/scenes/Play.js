class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        //load images/title sprite
        this.load.image('rocket', './assets/harpoon.png');
        this.load.image('spaceship', './assets/greenfish.png');
        this.load.image('smallship', './assets/bluefish.png');
        this.load.image('starfield', './assets/waterfield.png');

        // load spritesheet
        this.load.spritesheet('greenfishdead', './assets/greenfishdead.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('bluefishdead', './assets/bluefishdead.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
    }
    create() {
        //create tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        /*
        //white rectangle border
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        */

        //green UI background
        this.add.rectangle(0, 0, 640, 75, 0x6FDFFF).setOrigin(0, 0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 400, 'rocket').setOrigin(0, 0);

        //add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 290, 'spaceship', 0, 10).setOrigin(0, 0);
        this.smallship = new Smallship(this, game.config.width, 240, 'smallship', 0, 40).setOrigin(0, 0);

        //play music
        
        this.sound.play('music');

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'greendead',
            frames: this.anims.generateFrameNumbers('greenfishdead', { start: 0, end: 6, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'bluedead',
            frames: this.anims.generateFrameNumbers('bluefishdead', { start: 0, end: 6, first: 0}),
            frameRate: 30
        });

        // score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(15, 15, this.p1Score, scoreConfig);

    
        //game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or 🠀 for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
         // check key input for restart & menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
        this.scene.restart(this.p1Score);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // scroll starfield
        //this.starfield.tilePositionX -= 4;

        // update game sprites
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.smallship.update();        //update smallship
        } 
        
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.greenDead(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.greenDead(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.greenDead(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.smallship)) {
            this.p1Rocket.reset();
            this.blueDead(this.smallship);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    greenDead(ship) {  
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'greenfishdead').setOrigin(0, 0);
        boom.anims.play('greendead');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });      
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion');
    }

    blueDead(ship) {  
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'bluefishdead').setOrigin(0, 0);
        boom.anims.play('bluedead');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.resetX();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });      
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion');
    }
} 