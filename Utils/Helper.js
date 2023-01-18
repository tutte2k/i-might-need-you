export class Collision {
  static check(agent, target) {
    return (
      agent.x < target.x + target.width &&
      agent.x + agent.width > target.x &&
      agent.y < target.y + target.height &&
      agent.y + agent.height > target.y
    );
  }
}
