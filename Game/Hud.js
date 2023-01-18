export default class Hud {
  constructor(game) {
    this.game = game;
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.font = 20 + "px " + "Arial";
    ctx.fillText("Agent power: " + this.game.agent.power.toFixed(2), 10, 30);
    ctx.fillText(
      "Agent skill: " + this.game.agent.skillLevel.toFixed(2),
      10,
      60
    );
    ctx.fillText("Agent speed: " + this.game.agent.speed.toFixed(2), 10, 90);
  }
}
