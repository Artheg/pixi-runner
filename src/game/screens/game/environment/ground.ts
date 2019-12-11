import { GameObject } from "../../../base/gameobject";
import { Loader, Sprite } from "pixi.js";

export class Ground extends GameObject {
    constructor() {
        const texture = Loader.shared.resources['env'].textures['tile_2.png'];
        const sprite = new Sprite(texture);
        super(sprite);
    }

    public get collider() {
        const bounds = this.sprite.getBounds();
        bounds.y += 25;
        return bounds;
    }

    public get weight() {
        return 0;
    }
}