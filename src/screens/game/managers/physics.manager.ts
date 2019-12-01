import { GameObject } from "../base/gameobject";

export class PhysicsManager {
    private objects: GameObject[] = [];
    constructor() {

    }

    public addObject = (object: GameObject) => {
        this.objects.push(object);
    }

    public update = () => {
        for (let i = 0; i < this.objects.length; i++) {
                        
        }
    }
}