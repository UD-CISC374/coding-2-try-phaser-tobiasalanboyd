import ExampleObject from '../objects/exampleObject';
import Beam from '../objects/beam';

export default class TobyScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
    background: Phaser.GameObjects.TileSprite;
    ship1: Phaser.Physics.Arcade.Sprite;
    ship2: Phaser.Physics.Arcade.Sprite;
    ship3: Phaser.Physics.Arcade.Sprite;
    explosion: Phaser.GameObjects.Sprite;
    powerUps: any;
    player: Phaser.Physics.Arcade.Sprite;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    spacebar: Phaser.Input.Keyboard.Key;
    projectiles: Phaser.GameObjects.Group;
    enemies: Phaser.Physics.Arcade.Group;
    pcount: number;
    scoretext: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'TobyScene' });
  }

  preload(){
      
    this.load.image("background", "assets/tutorial_images/background.png");
    /*this.load.image("ship", "assets/tutorial_images/ship.png");
    this.load.image("ship2", "assets/tutorial_images/ship2.png");
    this.load.image("ship3", "assets/tutorial_images/ship3.png");*/
    this.load.spritesheet("ship", "assets/spritesheets/ship.png",{
        frameWidth: 16,
        frameHeight: 16
      });
      this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{
        frameWidth: 32,
        frameHeight: 16
      });
      this.load.spritesheet("ship3", "assets/spritesheets/ship3.png",{
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
        frameWidth: 16,
        frameHeight: 16
      });
      this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
        frameWidth: 16,
        frameHeight: 16
      });
      this.load.spritesheet("player", "assets/spritesheets/player.png",{
        frameWidth: 16,
        frameHeight: 24
      });
      this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
        frameWidth: 16,
        frameHeight: 16
      });
}

  create() {
      this.pcount = 0;
      
      this.background = this.add.tileSprite(0, 0, 400,400, "background");
      this.background.setOrigin(0,0);
      this.background.setScale(1.65);
      /*this.ship1 = this.add.image(400/2-50, 400/2, "ship");
      this.ship2 = this.add.image(400 / 2, 400 / 2, "ship2");
    this.ship3 = this.add.image(400 / 2 + 50, 400 / 2, "ship3");*/
    //this.exampleObject = new ExampleObject(this, 150, 50);

    this.scoretext = this.add.text(20,20, "Crickets: "+ this.pcount, {fill:"white"});

    this.ship1 = this.physics.add.sprite(400 / 2 - 50, 400 / 2, "ship");
    this.ship2 = this.physics.add.sprite(400 / 2, 400 / 2, "ship2");
    this.ship3 = this.physics.add.sprite(400 / 2 + 50, 400 / 2, "ship3");
    this.projectiles = this.add.group();
    
    //this.explosion = this.add.sprite(400 / 2 + 50, 400 / 2, "explosion");
     // 0.2 create animations
     this.anims.create({
        key: "ship1_anim",
        frames: this.anims.generateFrameNumbers("ship",{ start: 0, end: 1 }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "ship2_anim",
        frames: this.anims.generateFrameNumbers("ship2",{ start: 0, end: 1 }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "ship3_anim",
        frames: this.anims.generateFrameNumbers("ship3",{ start: 0, end: 1 }),
        frameRate: 20,
        repeat: -1
      });
  
      this.anims.create({
        key: "explode",
        frames: this.anims.generateFrameNumbers("explosion",{ start: 0, end: 4 }),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true
      });

      this.anims.create({
        key: "thrust",
        frames: this.anims.generateFrameNumbers("player",{ start: 0, end: 1 }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "beam_anim",
        frames: this.anims.generateFrameNumbers("beam",{ start: 0, end: 1 }),
        frameRate: 20,
        repeat: -1
      });
  
      // 0.3 play the animations
      this.ship1.play("ship1_anim");
      this.ship2.play("ship2_anim");
      this.ship3.play("ship3_anim");
  
      // 1 make the ships clickable to destroy them
      this.ship1.setInteractive();
      this.ship2.setInteractive();
      this.ship3.setInteractive();
  
      // 1.2
      this.input.on('gameobjectdown', this.destroyShip, this);

      this.anims.create({
        key: "red",
        frames: this.anims.generateFrameNumbers("power-up", {
          start: 0,
          end: 1
        }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "gray",
        frames: this.anims.generateFrameNumbers("power-up", {
          start: 2,
          end: 3
        }),
        frameRate: 20,
        repeat: -1
      });

      this.physics.world.setBoundsCollision();

    this.powerUps = this.physics.add.group();

    // 2.2 Add multiple objects
    let maxObjects = 4;
    for (let i = 0; i <= maxObjects; i++) {
      let powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
       powerUp.setRandomPosition(0, 0, 400, 400);

      // set random animation
      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      // setVelocity
      powerUp.setVelocity(100, 100);
      // 3.2
      powerUp.setCollideWorldBounds(true);
      // 3.3
     powerUp.setBounce(1);

    }
    //this.add.text(20,20, "Toby's scene", {fill:"darkblue"});
    this.player = this.physics.add.sprite(400/2-8,400-64,"player");
    this.player.play("thrust");
    this.player.setCollideWorldBounds(true);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    /*this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
        projectile.destroy;
    });*/
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp);

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hurtEnemy);
  }
  
  hurtPlayer(player, enemy){
      console.log("This should end the game.");
    //this.scene.start("EndScene");
  }

  pickPowerUp(player, powerUp){
    powerUp.disableBody(true,true);
    this.pcount+=1;
    console.log("Score is: "+this.pcount);//TODO: make the score work!
    this.scoretext.setText("Crickets: " + this.pcount);
  }

  

  update() {
    
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.background.tilePositionY -= 0.3;
    this.movePlayerManager();
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
        this.shootBeam();
    }
    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
        let beam = this.projectiles.getChildren()[i];
        beam.update();
      }
  }
    shootBeam() {
        let beam = new Beam(this);
    }
    movePlayerManager() {
        if(this.cursorKeys.left?.isDown){
            this.player.setVelocityX(-100);
        }
        else if(this.cursorKeys.right?.isDown){
            this.player.setVelocityX(100);
        }
        else{
            this.player.setVelocityX(0);
        }
        if(this.cursorKeys.up?.isDown){
            this.player.body.velocity.y = -100;
        }
        else if(this.cursorKeys.down?.isDown){
            this.player.body.velocity.y = 100;
        }
        else{
            this.player.body.velocity.y = 0;
        }
        
    }

  moveShip(ship, speed){
    ship.y += speed;
    if(ship.y>400){
        this.resetShipPos(ship);
    }
  }

  resetShipPos(ship){
    // put the ship on the top
    ship.y = 0;
    // put the ship on a random position on the x axis
    var randomX = Phaser.Math.Between(0, 400);
    ship.x = randomX;
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  hurtEnemy(projectile, enemy){
    //this.resetShipPos(enemy);
    projectile.disableBody(true,true);
    enemy.disableBody(true,true);
}
}