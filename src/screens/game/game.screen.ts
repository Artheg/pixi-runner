import {
  Container,
  Texture,
  Sprite,
  Loader,
  Application,
  Point
} from 'pixi.js';
import { Player } from '../../player';
import EnvManager from './managers/env.manager';

export class Game extends Container {
  private player: Player;

  private appWidth: number;
  private appHeight: number;

  private envManager: EnvManager;

  constructor(private app: Application) {
    super();
    this.player = new Player();
    this.player.x = 40;
    this.envManager = new EnvManager(this);

    this.addChild(this.player);
    

    this.app.ticker.add(() => {
      this.envManager.update();
      
    });
  }

  public onResize(appWidth: number, appHeight: number) {
    this.appWidth = appWidth;
    this.appHeight = appHeight;

    this.envManager.onResize(appWidth, appHeight);

    this.player.y = appHeight - 120;
  }
}
