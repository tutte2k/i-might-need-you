import Agent from "./Agent.js";
import Battery from "./Battery.js";
import { Collision } from "../Utils/Helper.js";
import Hud from "./Hud.js";
import Supply from "./Supply.js";
import Object from "./Object.js";

export default class Game {
  constructor() {
    this.hud = new Hud(this);
    this.supply = new Supply();
    this.agent = new Agent(0);

    this.batteries = [];
    this.maxBatteries = 0;
    this.clicks = 0;
    this.spawnTimer = 0;
    this.spawnInterval = 5000;

    window.addEventListener("click", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (Object.clicked(x, y, this.supply)) {
        this.agent.power++;
        this.clicks++;
      }
      this.batteries.forEach((battery) => {
        if (Object.clicked(x, y, battery)) {
          battery.markedForDeletion = true;
          this.agent.power += 25;
          this.clicks++;
        }
      });
    });
  }
  update(deltaTime) {
    const spawnTimerElapsed = this.spawnTimer > this.spawnInterval;
    if (spawnTimerElapsed && this.batteries.length < this.maxBatteries) {
      this.batteries.push(new Battery());
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
        this.agent.power += 100;
      }
    });

    this.batteries = this.batteries.filter(
      (battery) => battery.markedForDeletion === false
    );
    this.maxBatteries = Math.floor((this.clicks) / 25);

  }
  draw(ctx) {
    this.hud.draw(ctx);
    this.agent.draw(ctx);
    this.batteries.forEach((battery) => battery.draw(ctx));
    this.supply.draw(ctx);
  }
}
