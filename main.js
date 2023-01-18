import Agent from "./Agent.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const agent = new Agent(0);

const target = {
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  width: 10,
  height: 10,
};

function checkCollision() {
  if (
    agent.x < target.x + target.width &&
    agent.x + agent.width > target.x &&
    agent.y < target.y + target.height &&
    agent.y + agent.height > target.y
  ) {
    target.x = Math.random() * canvas.width;
    target.y = Math.random() * canvas.height;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "blue";
  ctx.fillRect(agent.x, agent.y, agent.width, agent.height);

  ctx.fillStyle = "red";
  ctx.fillRect(target.x, target.y, target.width, target.height);
}

function gameLoop() {
  agent.moveTowardsBattery(target.x, target.y);
  agent.skillLevel += 0.01;
  checkCollision();
  draw();
  requestAnimationFrame(gameLoop);
}
gameLoop();
