import { Container, Loader, Sprite, Point } from 'pixi.js';
import BaseEnvPartController from './base.env.controller';

export default class TreeController extends BaseEnvPartController {
  private tree: Sprite;
  constructor(parent: Container) {
    super(parent);
    const treeT = Loader.shared.resources['env'].textures['tree.png'];
    this.tree = new Sprite(treeT);
    this.tree.scale = new Point(0.5, 0.5);

    this.container.addChild(this.tree);
    this.container.y = 250;
  }

  public update = () => {
    this.container.x -= 3;
    if (this.tree.getBounds().x + this.tree.width < 0) {
      this.container.x = this.appWidth;
    }
  };
}
