import Object from "./Object.js";

export default class Agent extends Object {
  constructor(x, y, skillLevel) {
    super(x, y, 10, 10, "red");
    this.skillLevel = skillLevel;

    this.power = 0;
    this.speed = 1;

    this.actionTimer = 0;
    this.actionInterval = 1000;
  }

  update(deltaTime, batteryX, batteryY) {
    const actionTimerElapsed = this.actionTimer > this.actionInterval;
    const canAfford = this.power - this.skillLevel > 0;
    if (this.power > 0 && actionTimerElapsed && canAfford) {
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

      this.skillLevel += 0.01;
      this.power = this.power -= this.skillLevel;

      this.actionTimer = 0;
      this.actionInterval = 50;
    } else {
      this.actionTimer += deltaTime;
    }
  }
}
