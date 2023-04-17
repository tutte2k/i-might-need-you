import { Collision } from "../Utils/Helper.js";
import Agent from "./Agent.js";
import Battery from "./Battery.js";
import { Button } from "./Button.js";
import Hud from "./Hud.js";
import Object from "./Object.js";
import Supply from "./Supply.js";

export default class Game {
  constructor(width, height) {
    this.hud = new Hud(this);
    this.supply = new Supply();
    this.agent = new Agent(width * 0.5, height * 0.5, 1);

    this.batteries = [new Battery()];
    this.maxBatteries = 1;

    this.autoClick = 1;
    this.autoClickTimer = 0;
    this.autoClickInterval = 1000;

    this.buttons = [
      new Button("supply", 25, canvas.width * 0.4, 20, "pink", this),
      new Button("maxBatteries", 100, canvas.width * 0.6, 20, "pink", this),
      new Button("autoClick", 1000, canvas.width * 0.8, 20, "pink", this),
    ];

    this.clicks = 0;
    this.spawnTimer = 0;
    this.spawnInterval = 5000;

    this.upgrade = {
      supply: () => (this.supply.gain *= 2),
      maxBatteries: () => this.maxBatteries++,
      autoClick: () => this.autoClick++,
    };
    this.current = {
      supply: () => this.supply.gain,
      maxBatteries: () => this.maxBatteries,
      autoClick: () => this.autoClick,
    };

    this.click = () => {
      this.agent.power += this.supply.gain;
      this.clicks++;
    };

    window.addEventListener("click", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (Object.clicked(x, y, this.supply)) {
        this.click();
      }
      this.batteries.forEach((battery) => {
        if (Object.clicked(x, y, battery)) {
          battery.markedForDeletion = true;
          this.agent.power += this.supply.gain * 10;
          this.clicks++;
        }
      });
      this.buttons.forEach((button) => {
        if (Object.clicked(x, y, button)) {
          if (this.clicks >= button.cost(this.current[button.name]())) {
            this.clicks -= button.cost(this.current[button.name]());
            this.upgrade[button.name]();
          }
        }
      });
    });
  }
  calculateDistance(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  update(deltaTime) {
    const autoClickElapsed =
      this.autoClickTimer > this.autoClickInterval && this.autoClick > 1;
    if (autoClickElapsed) {
      for (let i = 0; i < this.autoClick; i++) {
        this.click();
      }
      this.autoClickTimer = 0;
    } else {
      this.autoClickTimer += deltaTime;
    }

    const spawnTimerElapsed = this.spawnTimer > this.spawnInterval;

    if (spawnTimerElapsed) {
      if (this.batteries.length < this.maxBatteries) {
        this.batteries.push(new Battery());
      }
      this.spawnTimer = 0;
    } else {
      this.spawnTimer += deltaTime;
    }
    if (this.batteries.length != 0) {
      let closestBattery = this.batteries[0];
      let closestDistance = this.calculateDistance(
        this.agent.x,
        this.batteries[0].x,
        this.agent.y,
        this.batteries[0].y
      );

      for (var i = 1; i < this.batteries.length; i++) {
        var tempDist = this.calculateDistance(
          agent.x,
          this.batteries[i].x,
          agent.y,
          this.batteries[i].y
        );
        if (tempDist > closestDistance) {
          closestDistance = tempDist;
          closestBattery = this.batteries[i];
        }
      }

      this.agent.update(deltaTime, closestBattery.x, closestBattery.y);
    }
    this.batteries.forEach((battery) => {
      if (Collision.check(this.agent, battery)) {
        battery.markedForDeletion = true;
        this.agent.power += this.supply.gain * 100;
      }
    });

    this.batteries = this.batteries.filter(
      (battery) => battery.markedForDeletion === false
    );
  }
  draw(ctx) {
    this.hud.draw(ctx);
    this.batteries.forEach((battery) => battery.draw(ctx));
    this.buttons.forEach((button) => button.draw(ctx));
    this.supply.draw(ctx);
    this.agent.draw(ctx);
  }
}
