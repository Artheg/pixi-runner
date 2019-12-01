import { Container, Loader, Sprite, Point } from 'pixi.js';

export default class EnvManager {
  onResize(appWidth: number, appHeight: number) {
    this.appWidth = appWidth;
    this.appHeight = appHeight;
    this.groundContainer.y = this.appHeight - 125;
  }

  private appWidth: number;
  private appHeight: number;
  private groundContainer: Container;
  private treeContainer: Container;
  private mountainContainer: Container;
  private cloudContainer: Container;
  private mountain: Sprite;
  private tree: Sprite;
  private ground: Sprite[];

  constructor(private gameScreen: Container) {
    this.groundContainer = new Container();
    this.treeContainer = new Container();
    this.mountainContainer = new Container();
    this.cloudContainer = new Container();

    this.cloudContainer.y = 0;
    this.cloudContainer.x = -100;

    this.mountainContainer.y = 20;

    const mountainT = Loader.shared.resources['env'].textures['mountain.png'];
    this.mountain = new Sprite(mountainT);

    this.mountainContainer.addChild(this.mountain);

    const treeT = Loader.shared.resources['env'].textures['tree.png'];
    this.tree = new Sprite(treeT);
    this.tree.scale = new Point(0.5, 0.5);

    this.treeContainer.addChild(this.tree);
    this.treeContainer.y = 250;

    this.mountainContainer.alpha = 0.3;

    gameScreen.addChild(this.mountainContainer);
    gameScreen.addChild(this.cloudContainer);
    gameScreen.addChild(this.treeContainer);

    gameScreen.addChild(this.groundContainer);

    const texture = Loader.shared.resources['env'].textures['tile_2.png'];
    this.ground = [];
    for (let i = 0; i < 7; i++) {
      const g = new Sprite(texture);
      this.groundContainer.addChild(g);
      g.x = (g.width - 25) * i;
      this.ground.push(g);
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
  }

  public update = () => {
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

    if (this.mountain.getBounds().x + this.mountain.width < 0) {
      this.mountainContainer.x = this.appWidth;
    }
    if (this.tree.getBounds().x + this.tree.width < 0) {
      this.treeContainer.x = this.appWidth;
    }
    const fg = this.ground[0];
    const lg = this.ground[this.ground.length - 1];
    if (fg.getBounds(true).x < -fg.width) {
      fg.x = lg.x + lg.width - 25;
      this.ground.shift();
      this.ground.push(fg);
    }
  }
}
