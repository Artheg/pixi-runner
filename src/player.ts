import { Container, Loader, AnimatedSprite} from 'pixi.js';

export class Player extends Container {
  constructor() {
    super();

    const sheet = Loader.shared.resources['dude'].spritesheet;
    const dudeSprite = new AnimatedSprite(
      sheet.animations['Dude_Monster_Run_6']
    );
    dudeSprite.play();
    dudeSprite.animationSpeed = 0.3;
    // dudeSprite.scale.set(2, 2);
    this.addChild(dudeSprite);
  }
}
