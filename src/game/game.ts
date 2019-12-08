import {
  Application
} from 'pixi.js';
import { PhysicsManager } from './managers/physics.manager';
import { ScreenManager } from './managers/screen.manager';

export class Game {

  private appWidth: number;
  private appHeight: number;

  private screenManager: ScreenManager;
  private physicsManager: PhysicsManager;

  constructor(private app: Application) {
    this.screenManager = new ScreenManager(app);
    this.screenManager.switchScreen('GAME');
    this.physicsManager = new PhysicsManager();
    this.app.ticker.add(() => {
      this.screenManager.update();
      this.physicsManager.update();
    });
  }

  public onResize(appWidth: number, appHeight: number) {
    this.appWidth = appWidth;
    this.appHeight = appHeight;
    this.screenManager.onResize(appWidth, appHeight);
  }
}