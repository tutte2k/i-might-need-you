import Robot from "./Robot.js";
import UI from "./UI.js";
import Battery from "./Battery.js";
import Supply from "./Supply.js";
export default class Session {
  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;

    this.robot = new Robot(
      { position: { x: this.width / 2, y: this.height / 2 } },
      this
    );
    this.ui = new UI(this);
    this.supply = new Supply({
      position: { x: this.width / 3, y: this.height / 3 },
    });
    this.batteries = [];
    this.maxBatteries = 0;

    this.batteryTimer = 0;
    this.batteryInterval = 5000;
  }

  update(deltaTime) {
    const spawnTimerElapsed = this.batteryTimer > this.batteryInterval;
    const maxAmountOfBatteries = this.batteries.length > this.maxBatteries;

    if (spawnTimerElapsed && !maxAmountOfBatteries) {
      this.addBattery();
      this.batteryTimer = 0;
    } else {
      this.batteryTimer += deltaTime;
    }
  }
  addBattery() {
    console.log(this.width * Math.random())
    this.batteries.push(
      new Battery({
        position: {
          x: this.width * Math.random(),
          y: this.height * Math.random(),
        },
      })
    );
  }
}
