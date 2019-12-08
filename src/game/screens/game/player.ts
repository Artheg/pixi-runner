import { Container, Loader, AnimatedSprite} from 'pixi.js';
import { GameObject } from '../../base/gameobject';

export class Player extends GameObject {

  constructor() {
    const container = new Container();
    const sheet = Loader.shared.resources['dude'].spritesheet;
    const dudeSprite = new AnimatedSprite(
      sheet.animations['Dude_Monster_Run_6']
      );
      dudeSprite.play();
      dudeSprite.animationSpeed = 0.3;
      // dudeSprite.scale.set(2, 2);
      container.addChild(dudeSprite);
      super(container);
  }

  public get weight() {
    return 0;
  }
}
