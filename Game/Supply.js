import Object from "./Object.js";
export default class Supply extends Object {
  constructor() {
    super(canvas.width * 0.5, canvas.height * 0.5, 25, 25, "blue");
    this.gain = 2;
  }
}
