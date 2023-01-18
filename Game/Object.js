export default class Object {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = c;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  static clicked(x,y,object) {
    return (
      x > object.x &&
      x < object.x + object.width &&
      y > object.y &&
      y < object.y + object.height
    );
  }
}
