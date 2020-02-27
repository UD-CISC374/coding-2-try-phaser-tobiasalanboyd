import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'MainScene' });
  }

 
  create() {
    this.exampleObject = new ExampleObject(this, 50, 50);
    this.scene.start("TobyScene");
  }

  update() {
  }
}
