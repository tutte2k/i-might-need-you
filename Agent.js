export default class Agent {
  constructor(skillLevel) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.width = 10;
    this.height = 10;
    this.skillLevel = skillLevel;
  }
  moveTowardsBattery(batteryX, batteryY) {
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
  }
}
