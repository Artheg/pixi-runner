import { Container } from "pixi.js";

export default class BaseEnvManager {
    protected container: Container;
    protected appWidth: number;
    protected appHeight: number;

    constructor(parent: Container) {
        this.container = new Container();
        parent.addChild(this.container);
    }

    public update = (): void => {
        throw new Error('Not implemented Error');
    }

    public onResize (appWidth: number, appHeight: number) {
        this.appWidth = appWidth;
        this.appHeight = appHeight;
    }
}