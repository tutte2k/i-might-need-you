import Agent from "./Agent.js";
import Battery from "./Battery.js";
import { Collision } from "../Utils/Helper.js";
import Hud from "./Hud.js";

export default class Game {
  constructor(agentSkill) {
    this.agent = new Agent(agentSkill);
    this.batteries = [new Battery()];
    this.hud = new Hud(this);
  }
  update(deltaTime) {
    this.agent.update(deltaTime, this.batteries[0].x, this.batteries[0].y);
    this.batteries.forEach((target) => {
      if (Collision.check(this.agent, target)) {
        target.x = Math.random() * canvas.width;
        target.y = Math.random() * canvas.height;
      }
    });
  }
  draw(ctx) {
    this.hud.draw(ctx);
    this.agent.draw(ctx);
    this.batteries.forEach((battery) => battery.draw(ctx));
  }
}
