import { Container, Bounds } from 'pixi.js';

export class GameObject extends Container {
  constructor(protected sprite: Container) {
    super();
    this.addChild(sprite);
  }

  public get collider() {
    return this.sprite.getBounds(); // TODO
  }

  public onCollision = (other: GameObject) => {

  };

  public get weight() {
      return 0;
  }
}
