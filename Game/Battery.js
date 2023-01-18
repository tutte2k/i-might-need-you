import Object from "./Object.js";

export default class Battery extends Object {
  constructor() {
    super(
      Math.random() * canvas.width * 0.5,
      Math.random() * canvas.height * 0.5,
      10,
      10,
      "green"
    );
    this.markedForDeletion = false;
  }
}
