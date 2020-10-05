import { Application, Container } from "pixi.js";
import { GameScreen } from "../screens/game/game.screen";
import { BaseScreen } from "../screens/base.screen";

export type ScreenID = 'GAME';
export class ScreenManager {
  private readonly screens: { [key in ScreenID]?: BaseScreen } = {}
  private currentScreen: BaseScreen;
  private appWidth: number;
  private appHeight: number;

  constructor(private app: Application) {
    this.screens['GAME'] = new GameScreen();
  }

  public switchScreen = (screenID: ScreenID) => {

    const newScreen = this.screens[screenID];
    newScreen.prepare();
    newScreen.onResize(this.appWidth, this.appHeight);
    this.addScreen(newScreen);

    if (!this.currentScreen) {
      this.currentScreen = newScreen;
      return;
    }

    this.removeScreen(this.currentScreen);
    this.currentScreen.clear();
    this.currentScreen = newScreen;
  }

  public update = () => {
    if (this.currentScreen) {
      this.currentScreen.update();
    }
  }

  public onResize = (appWidth: number, appHeight: number) => {
    this.appWidth = appWidth;
    this.appHeight = appHeight;
    if (this.currentScreen) {
      this.currentScreen.onResize(appWidth, appHeight);
    }
  }

  private addScreen(screen: BaseScreen) {
    this.app.stage.addChild(screen);
  }

  private removeScreen(screen: BaseScreen) {
    this.app.stage.removeChild(screen);
  }
}
