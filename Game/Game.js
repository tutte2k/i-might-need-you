import Agent from "./Agent.js";
import Battery from "./Battery.js";
import { Collision } from "../Utils/Helper.js";
import Hud from "./Hud.js";
import Supply from "./Supply.js";
import Object from "./Object.js";
import { Button } from "./Button.js";

export default class Game {
  constructor(width, height) {
    this.hud = new Hud(this);
    this.supply = new Supply();
    this.agent = new Agent(width * 0.5, height * 0.5, 0);

    this.batteries = [new Battery()];
    this.maxBatteries = 1;

    this.buttons = [new Button(10)];

    this.clicks = 0;
    this.spawnTimer = 0;
    this.spawnInterval = 2000;

    window.addEventListener("click", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (Object.clicked(x, y, this.supply)) {
        this.agent.power += this.supply.gain;
        this.clicks++;
      }

      this.batteries.forEach((battery) => {
        if (Object.clicked(x, y, battery)) {
          battery.markedForDeletion = true;
          this.agent.power += 25;
          this.clicks++;
        }
      });
      this.buttons.forEach((button) => {
        if (Object.clicked(x, y, button)) {
          if (this.clicks > button.cost(this.supply.gain)) {
            this.clicks -= button.cost(this.supply.gain);
            this.supply.gain *= this.supply.gain;
          }
        }
      });
    });
  }
  update(deltaTime) {
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
      this.agent.update(deltaTime, this.batteries[0].x, this.batteries[0].y);
    }
    this.batteries.forEach((battery) => {
      if (Collision.check(this.agent, battery)) {
        battery.markedForDeletion = true;
        this.supply.power + this.supply.gain * 10;
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
