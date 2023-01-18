import Object from "./Object.js";

export default class Battery extends Object {
  constructor() {
    super(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      10,
      10,
      "yellow"
    );
  }
}
