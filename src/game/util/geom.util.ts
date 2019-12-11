import { Bounds, Rectangle } from 'pixi.js';

export class GeomUtil {
  public static boundsIntersect = (
    a: Rectangle,
    b: Rectangle
  ): {
    aLeftOfB: boolean;
    aRightOfB: boolean;
    aAboveB: boolean;
    aBelowB: boolean;
    strictOnTop: boolean;
  } => {
    const aLeftOfB = a.right < b.left;
    const aRightOfB = a.left > b.right;
    const aAboveB = a.bottom < b.top;
    const aBelowB = a.top > b.bottom;
    const strictOnTop = a.bottom == b.top;
    
    return { aLeftOfB, aRightOfB, aAboveB, aBelowB, strictOnTop };
  };
}
