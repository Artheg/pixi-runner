import { Container, Sprite, Loader, Point } from 'pixi.js';
import BaseEnvManager from './base.env.manager';

export default class CloudManager extends BaseEnvManager {
  private clouds: Sprite[] = [];
  constructor(parent: Container) {
    super(parent);
    this.container.y = 0;
    this.container.x = -100;
    for (let i = 0; i < 5; i++) {
      const texture =
        Loader.shared.resources['env'].textures[
          'cloud' + i.toString() + '.png'
        ];
      const c = new Sprite(texture);
      c.x = 170 * i + 500 * Math.random();
      c.y += 200 * Math.random();
      c.scale = new Point(0.5, 0.5);
      this.container.addChild(c);
      this.clouds.push(c);
    }
  }

  public update = () => {
    this.container.x -= 0.2;
    for (let i = 0; i < this.clouds.length; i++) {
      const cloud = this.clouds[i];
      if (cloud.getBounds().x + cloud.width < 0) {
        cloud.x = -this.container.x + this.appWidth + 200 * Math.random();
        cloud.y = 200 * Math.random();
      }
    }
  };

  public onResize(appWidth: number, appHeight: number) {
    super.onResize(appWidth, appHeight);
  }
}
