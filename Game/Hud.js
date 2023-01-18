export default class Hud {
  constructor(game) {
    this.game = game;
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.font = 20 + "px " + "Arial";
    ctx.fillText(
      "POWER: " +
        (this.game.agent.power.toFixed(1) > 0
          ? this.game.agent.power.toFixed(1)
          : 0),
      25,
      30
    );
    ctx.fillText(
      "SKILL: " + this.game.agent.skillLevel.toFixed(1),
      25,
      60
    );
    ctx.fillText(
      "CLICKS: " + this.game.clicks.toFixed(0),
      canvas.width * 0.5,
      canvas.height * 0.9 + 30
    );

    ctx.fillText(
      "SUPPLY: " + this.game.supply.gain.toFixed(0),
      25,
      canvas.height * 0.9
    );

    ctx.fillText(
      "MAX BATTERIES: " + this.game.maxBatteries.toFixed(0),
      25,
      canvas.height * 0.9 + 30
    );
  }
}
