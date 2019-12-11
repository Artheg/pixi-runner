import { Container, Bounds } from 'pixi.js';
import { Game } from '../game';

export class GameObject extends Container {
  constructor(protected sprite: Container) {
    super();
    this.addChild(sprite);
    Game.getInstance().registerGameObject(this);
  }

  public get collider() {
    return this.sprite.getBounds(); // TODO
  }

  public onCollision (other: GameObject)  {

  };

  public get weight() {
      return 0;
  }
}
