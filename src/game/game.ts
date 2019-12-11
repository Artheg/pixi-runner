import { Application } from 'pixi.js';
import { PhysicsManager } from './managers/physics.manager';
import { ScreenManager } from './managers/screen.manager';
import { GameObject } from './base/gameobject';
import { injectable, Container } from 'inversify';
import 'reflect-metadata';

export class Game {
  private static instance: Game;

  private appWidth: number;
  private appHeight: number;

  private screenManager: ScreenManager;
  private physicsManager: PhysicsManager;

  constructor(private app: Application) {
    Game.instance = this;
    this.physicsManager = new PhysicsManager();
    this.screenManager = new ScreenManager(app);
    this.screenManager.switchScreen('GAME');
    this.app.ticker.add(() => {
      this.screenManager.update();
      this.physicsManager.update();
    });
  }

  public registerGameObject = (gameObject: GameObject): void => {
    console.log('object registered!');
    this.physicsManager.addObject(gameObject);
  }

  public onResize(appWidth: number, appHeight: number) {
    this.appWidth = appWidth;
    this.appHeight = appHeight;
    this.screenManager.onResize(appWidth, appHeight);
  }

  public static getInstance() {
    return Game.instance;
  }
}