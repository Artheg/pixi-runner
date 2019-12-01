import { Bounds, Rectangle } from 'pixi.js';

export class GeomUtil {
  public static boundsIntersect = (a: Rectangle, b: Rectangle): boolean => {
    const aLeftOfB = a.left < b.right;
    const aRightOfB = a.left > b.right;
    const aAboveB = a.bottom > b.top;
    const aBelowB = a.top < b.bottom;

    return ! (aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };
}
