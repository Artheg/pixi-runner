import { BaseScreen } from "../base.screen";
import EnvController from "./environment/env.controller";
import { Player } from "./player";

export class GameScreen extends BaseScreen {
    private envController: EnvController;
    private player: Player;

    constructor() {
        super('GAME');
        this.envController = new EnvController(this);

        this.player = new Player();
        this.addChild(this.player);
        this.player.x = 40;
        this.player.y = 470;
    }

    public update() {
        this.envController.update();
    }

    public prepare() {

    }

    public clear() {

    }

    public onResize(appWidth: number, appHeight: number) {
        super.onResize(appWidth, appHeight);
        this.envController.onResize(appWidth, appHeight);
    }
}