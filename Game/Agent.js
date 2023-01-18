import Object from "./Object.js";

export default class Agent extends Object {
  constructor(skillLevel) {
    super(10, 10, 10, 10, "red");
    this.skillLevel = skillLevel;

    this.power = 0;

    window.addEventListener("click", () => {
      this.power++;
      console.log(this.power);
    });

    this.actionTimer = 0;
    this.actionInterval = 300;
  }

  update(deltaTime, batteryX, batteryY) {
   
    const actionTimerElapsed = this.actionTimer > this.actionInterval;

    if (this.power != 0 && actionTimerElapsed) {
      const dx = batteryX > this.x ? 1 : -1;
      const dy = batteryY > this.y ? 1 : -1;
      const probability = this.skillLevel / 100;
      if (Math.random() < probability) {
        this.x += dx;
        this.y += dy;
      } else {
        this.x += Math.random() < 0.5 ? -1 : 1;
        this.y += Math.random() < 0.5 ? -1 : 1;
      }
      this.skillLevel += 0.01;
      this.power--;

      this.actionTimer = 0;
    } else {
      this.actionTimer += deltaTime;
    }
  }
}
