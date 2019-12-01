import {
  Container,
  Texture,
  Sprite,
  Loader,
  Application,
  Point
} from 'pixi.js';
import { Player } from '../../player';
import EnvManager from './managers/environment/env.manager';
import { PhysicsManager } from './managers/physics.manager';

export class Game extends Container {
  private player: Player;

  private appWidth: number;
  private appHeight: number;

  private envManager: EnvManager;
  private physicsManager: PhysicsManager;

  constructor(private app: Application) {
    super();
    this.player = new Player();
    this.player.x = 40;
    this.envManager = new EnvManager(this);
    this.physicsManager = new PhysicsManager();

    this.addChild(this.player);

    this.physicsManager.addObject(this.player);

    this.app.ticker.add(() => {
      this.envManager.update();
      this.physicsManager.update();      
    });
  }

  public onResize(appWidth: number, appHeight: number) {
    this.appWidth = appWidth;
    this.appHeight = appHeight;

    this.envManager.onResize(appWidth, appHeight);

    this.player.y = appHeight - 600;
  }
}
