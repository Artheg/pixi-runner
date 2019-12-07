import { Container, Sprite, Loader } from 'pixi.js';
import BaseEnvPartController from './base.env.controller';

export default class MountainController extends BaseEnvPartController {
  private mountain: Sprite;
  constructor(parent: Container) {
    super(parent);
    const mountainT = Loader.shared.resources['env'].textures['mountain.png'];
    this.mountain = new Sprite(mountainT);

    this.container.addChild(this.mountain);

    this.container.alpha = 0.3;
  }

  public update = () => {
    this.container.x -= 0.2;
    if (this.mountain.getBounds().x + this.mountain.width < 0) {
      this.container.x = this.appWidth;
    }
  };

  public onResize(appWidth: number, appHeight: number) {
    this.container.y = 20;
  }
}
