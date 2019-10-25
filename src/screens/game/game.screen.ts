import {
  Container,
  Texture,
  Sprite,
  Loader,
  Application,
  Point
} from 'pixi.js';
import { Player } from '../../player';

export class Game extends Container {
  private player: Player;

  private groundContainer: Container;
  private treeContainer: Container;
  private mountainContainer: Container;
  private cloudContainer: Container;

  private appWidth: number;
  private appHeight: number;

  constructor(private app: Application) {
    super();
    this.player = new Player();
    this.player.x = 40;
    this.groundContainer = new Container();
    this.treeContainer = new Container();
    this.mountainContainer = new Container();
    this.cloudContainer = new Container();

    this.cloudContainer.y = 0;
    this.cloudContainer.x = -100;

    this.mountainContainer.y = 20;

    const mountainT = Loader.shared.resources['env'].textures['mountain.png'];
    const mountain = new Sprite(mountainT);

    this.mountainContainer.addChild(mountain);

    const treeT = Loader.shared.resources['env'].textures['tree.png'];
    const tree = new Sprite(treeT);
    tree.scale = new Point(0.5, 0.5);

    this.treeContainer.addChild(tree);
    this.treeContainer.y = 250;

    this.mountainContainer.alpha = 0.3;

    this.addChild(this.mountainContainer);
    this.addChild(this.cloudContainer);
    this.addChild(this.treeContainer);

    this.addChild(this.groundContainer);
    this.addChild(this.player);

    const texture = Loader.shared.resources['env'].textures['tile_2.png'];
    const ground: Sprite[] = [];
    for (let i = 0; i < 7; i++) {
      const g = new Sprite(texture);
      this.groundContainer.addChild(g);
      g.x = (g.width - 25) * i;
      ground.push(g);
    }

    const clouds: Sprite[] = [];
    for (let i = 0; i < 5; i++) {
      const texture =
        Loader.shared.resources['env'].textures[
          'cloud' + i.toString() + '.png'
        ];
      const c = new Sprite(texture);
      c.x = 170 * i + 500 * Math.random();
      c.y += 200 * Math.random();
      c.scale = new Point(0.5, 0.5);
      this.cloudContainer.addChild(c);
      clouds.push(c);
    }

    this.app.ticker.add(() => {
      this.groundContainer.x -= 7;
      this.cloudContainer.x -= 0.2;
      this.treeContainer.x -= 3;
      this.mountainContainer.x -= 0.1;

      for (let i = 0; i < this.cloudContainer.children.length; i++) {
        const cloud = this.cloudContainer.children[i] as Sprite;
        if (cloud.getBounds().x + cloud.width < 0) {
            cloud.x = -this.cloudContainer.x + this.appWidth + 200 * Math.random();
            cloud.y = 200 * Math.random();
        }
      }

      if (mountain.getBounds().x + mountain.width < 0) {
        this.mountainContainer.x = this.appWidth;
      }
      if (tree.getBounds().x + tree.width < 0) {
        this.treeContainer.x = this.appWidth;
      }
      const fg = ground[0];
      const lg = ground[ground.length - 1];
      if (fg.getBounds(true).x < -fg.width) {
        fg.x = lg.x + lg.width - 25;
        ground.shift();
        ground.push(fg);
      }
    });
  }

  public onResize(appWidth: number, appHeight: number) {
    this.appWidth = appWidth;
    this.appHeight = appHeight;
    this.groundContainer.y = this.appHeight - 125;

    this.player.y = this.groundContainer.y;
  }
}
