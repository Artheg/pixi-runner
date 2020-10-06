import * as PIXI from 'pixi.js';
import { Game } from './game/game';

export class Main {
  private static readonly GAME_WIDTH = 800;
  private static readonly GAME_HEIGHT = 600;
  private app: PIXI.Application;
  private game: Game;
  private loader: PIXI.Loader;

  constructor() {
    window.onload = () => {
      this.startLoadingAssets();
    };
  }

  private startLoadingAssets(): void {
    this.loader = PIXI.Loader.shared;
    this.loader.add('dude', 'assets/images/spritesheets/run/run.json');
    this.loader.add('env', 'assets/images/spritesheets/env/env.json')
    this.loader.onComplete.add(() => {
      this.onAssetsLoaded();
    });
    this.loader.load();
  }

  private onAssetsLoaded(): void {
    this.createApp();
    this.createGame();
    this.resize();
  }

  private createGame(): void {
    this.game = new Game(this.app);
    // this.app.stage.addChild(this.game);
  }

  private createApp(): void {
    this.app = new PIXI.Application({
      backgroundColor: 0x00002a,
      width: Main.GAME_WIDTH,
      height: Main.GAME_HEIGHT
    });

    document.body.appendChild(this.app.view);


    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  //TODO: Scaling, according to window's inner size
  private resize = (): void => {
      this.game.onResize(Main.GAME_WIDTH, Main.GAME_HEIGHT);
    // this.app.renderer.resize(Math.min(Main.GAME_WIDTH, window.innerWidth), Math.min(Main.GAME_HEIGHT, window.innerHeight));
    // const scaleX = window.innerWidth / Main.GAME_WIDTH;
    // const scaleY = window.innerHeight / Main.GAME_HEIGHT;
    // console.log(scaleX, scaleY);
    // this.app.stage.scale.x = Math.min(scaleX, scaleY);
    // this.app.stage.scale.y = Math.min(scaleX, scaleY);
  }
}

const game: Main = new Main();
