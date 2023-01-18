export default class Hud {
  constructor(game) {
    this.game = game;
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.font = 20 + "px " + "Arial";
    ctx.fillText("Agent power: " + (this.game.agent.power.toFixed(1) > 0 ? this.game.agent.power.toFixed(1) : 0), 10, 30);
    ctx.fillText(
      "Agent skill: " + this.game.agent.skillLevel.toFixed(1),
      10,
      60
    );
    ctx.fillText("Agent speed: " + this.game.agent.speed.toFixed(1), 10, 90);
    ctx.fillText("Clicks: " + this.game.clicks.toFixed(0), 10, 120);
    ctx.fillText("Supply gain: " + this.game.supply.gain.toFixed(0), 10, 150);
  }
}
