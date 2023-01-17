export default class Robot {
  constructor({ position }, session) {
    this.position = position;
    this.power = 0;
    this.speed = 1;
    this.directions = {
      up: () => (this.position.y -= this.speed),
      down: () => (this.position.y += this.speed),
      left: () => (this.position.x -= this.speed),
      right: () => (this.position.x += this.speed),
    };

    this.actionTimer = 0;
    this.actionInterval = 200;
  }
  update(deltaTime) {
    const actionTimerElapsed = this.actionTimer > this.actionInterval;

    if (actionTimerElapsed && this.power != 0) {
      this.train();
      this.power--;
      this.actionTimer = 0;
    } else {
      this.actionTimer += deltaTime;
    }
  }
  move(direction) {
    this.directions[direction]();
  }
  train() {
    //train logic
    this.decide();
  }
  decide() {
    //decision logic
    let decision = "up";
    this.move(decision);
  }
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, 100, 100);
  }
}
