import Object from "./Object.js";

export class Button extends Object {
  constructor(priceMod) {
    super(canvas.width * 0.5, 10, 25, 25, "lime");
    this.cost = (val) => val * priceMod;
  }
}
