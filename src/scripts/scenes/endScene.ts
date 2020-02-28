import ExampleObject from '../objects/exampleObject';

export default class EndScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'EndScene' });
  }

 
  create() {
    this.exampleObject = new ExampleObject(this, 50, 50);
    this.scene.start("TobyScene");
  }

  update() {
  }
}
