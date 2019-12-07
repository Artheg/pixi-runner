import { Container } from "pixi.js";
import { ScreenID } from "../managers/screen.manager";

export class BaseScreen extends Container {
    protected appWidth: number;
    protected appHeight: number;

    constructor(public readonly screenID: ScreenID) {
        super();
    }

    public prepare() {
        throw new Error('prepare() not implemented');
    }

    public update() {
        throw new Error('update() not implemented');
    }

    public clear() {
        throw new Error('clear() not implemented');
    }

    public onResize(appWidth: number, appHeight: number) {
        this.appWidth = appWidth;
        this.appHeight = appHeight;
    }
}