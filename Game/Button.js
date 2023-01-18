import Object from "./Object.js";

export class Button extends Object {
  constructor(name, priceMod, x, y, color, game) {
    super(x, y, 25, 25, color);
    this.game = game;
    this.name = name;
    this.priceMod = priceMod;
    this.cost = (val) => val * priceMod;
  }
  draw(ctx) {
    super.draw(ctx);
    ctx.fillStyle = "black";
    ctx.font = 15 + "px " + "Arial";
    ctx.fillText(
      "+" + this.name + "(" + this.cost(this.game.current[this.name]()) + " clicks)",
      this.x,
      this.y
    );
  }
}
