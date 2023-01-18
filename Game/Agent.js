import Object from "./Object.js";

export default class Agent extends Object {
  constructor(skillLevel) {
    super(10, 10, 10, 10, "red");
    this.skillLevel = skillLevel;

    this.power = 0;
    this.speed = 0;

    this.actionTimer = 0;
    this.actionInterval = 100;
  }

  update(deltaTime, batteryX, batteryY) {
    const actionTimerElapsed = this.actionTimer > this.actionInterval;
    if (this.power > 0 && actionTimerElapsed) {
      const dx = batteryX > this.x ? this.speed : -this.speed;
      const dy = batteryY > this.y ? this.speed : -this.speed;
      const probability = this.skillLevel / 100;
      if (Math.random() < probability) {
        this.x += dx;
        this.y += dy;
      } else {
        this.x += Math.random() < 0.5 ? -this.speed : this.speed;
        this.y += Math.random() < 0.5 ? -this.speed : this.speed;
      }
      this.skillLevel += this.power / 1000;
      this.speed = this.power / 100 < 9 ? this.power / 100 : 9;
      this.power--;
      this.actionTimer = 0;
    } else {
      this.actionTimer += deltaTime;
    }
  }
}
