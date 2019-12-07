import { Container, Loader, Sprite, Point } from 'pixi.js';
import TreeManager from './tree.env.manager';
import GroundManager from './ground.env.manager';
import MountainManager from './mountain.env.manager';
import CloudManager from './cloud.env.manager';
import BaseEnvManager from './base.env.manager';

export default class EnvManager {
  private appWidth: number;
  private appHeight: number;

  private managers: BaseEnvManager[] = [];

  constructor(private gameScreen: Container) {
    this.addManager(new MountainManager(gameScreen));
    this.addManager(new TreeManager(gameScreen));
    this.addManager(new GroundManager(gameScreen));
    this.addManager(new CloudManager(gameScreen));
  }

  private addManager = (controller: BaseEnvManager): BaseEnvManager => {
    this.managers.push(controller);
    return controller;
  };

  onResize(appWidth: number, appHeight: number) {
    this.appWidth = appWidth;
    this.appHeight = appHeight;
    this.managers.forEach(manager => {
      manager.onResize(appWidth, appHeight);
    });
  }

  public update = () => {
    this.managers.forEach(manager => {
      manager.update();
    });
  };
}
