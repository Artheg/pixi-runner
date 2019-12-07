import { GameObject } from '../base/gameobject';
import { GeomUtil } from '../../util/geom.util';
import { COPYFILE_FICLONE } from 'constants';

export class PhysicsManager {
  private objects: GameObject[] = [];
  private gravity: number = 0.09;
  constructor() {}

  public addObject = (object: GameObject) => {
    this.objects.push(object);
  };

  public update = () => {
    console.log(this.objects.length);
    for (let i = 0; i < this.objects.length; i++) {
      const a = this.objects[i];
      this.applyGravity(a);
      for (let j = 0; j < this.objects.length; j++) {
        const b = this.objects[j];
        if (a === b) {
            continue;
        }
        const intersects = GeomUtil.boundsIntersect(a.collider, b.collider);
        if (intersects) {
          a.onCollision(b);
          b.onCollision(a);
        }
        if (a.collider.bottom == b.collider.top) {
            this.applyGravity(a);
        }
      }
    }
  };

  private applyGravity = (a: GameObject,) => {
    a.y += (this.gravity * a.weight);
  }
}
