import BaseEnvManager from './base.env.manager';
import { Container, Loader, Sprite } from 'pixi.js';

export default class GroundManager extends BaseEnvManager {
  private ground: Sprite[] = [];
  constructor(parent: Container) {
    super(parent);
    const texture = Loader.shared.resources['env'].textures['tile_2.png'];
    this.ground = [];
    for (let i = 0; i < 7; i++) {
      const g = new Sprite(texture);
      this.container.addChild(g);
      g.x = (g.width - 25) * i;
      this.ground.push(g);
    }
  }

  public update = () => {
    this.container.x -= 7;
    const fg = this.ground[0];
    const lg = this.ground[this.ground.length - 1];
    if (fg.getBounds(true).x < -fg.width) {
      fg.x = lg.x + lg.width - 25;
      this.ground.shift();
      this.ground.push(fg);
    }
  };

  public onResize = (appWidth: number, appHeight: number): void  => {
      super.onResize(appWidth, appHeight);
      this.container.y = this.appHeight - 125;

  }
}
