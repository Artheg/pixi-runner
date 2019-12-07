import { Container, Loader, Sprite, Point } from 'pixi.js';
import TreeController from './tree.env.controller';
import GroundController from './ground.env.controller';
import MountainController from './mountain.env.controller';
import CloudController from './cloud.env.controller';
import BaseEnvPartController from './base.env.controller';

export default class EnvController {
  private appWidth: number;
  private appHeight: number;

  private managers: BaseEnvPartController[] = [];

  constructor(private gameScreen: Container) {
    this.addManager(new MountainController(gameScreen));
    this.addManager(new TreeController(gameScreen));
    this.addManager(new GroundController(gameScreen));
    this.addManager(new CloudController(gameScreen));
  }

  private addManager = (controller: BaseEnvPartController): BaseEnvPartController => {
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
