import ExampleObject from '../objects/exampleObject';

export default class TobyScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
    background: Phaser.GameObjects.TileSprite;
    ship1: Phaser.GameObjects.Sprite;
    ship2: Phaser.GameObjects.Sprite;
    ship3: Phaser.GameObjects.Sprite;
    explosion: Phaser.GameObjects.Sprite;

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
}

  create() {
      this.background = this.add.tileSprite(0, 0, 400,400, "background");
      this.background.setOrigin(0,0);
      this.background.setScale(1.65);
      /*this.ship1 = this.add.image(400/2-50, 400/2, "ship");
      this.ship2 = this.add.image(400 / 2, 400 / 2, "ship2");
    this.ship3 = this.add.image(400 / 2 + 50, 400 / 2, "ship3");*/
    //this.exampleObject = new ExampleObject(this, 150, 50);

    this.ship1 = this.add.sprite(400 / 2 - 50, 400 / 2, "ship");
    this.ship2 = this.add.sprite(400 / 2, 400 / 2, "ship2");
    this.ship3 = this.add.sprite(400 / 2 + 50, 400 / 2, "ship3");
    
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
    //this.add.text(20,20, "Toby's scene", {fill:"darkblue"});
  }


  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.background.tilePositionY -= 0.3;
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
}