class QNetwork {
  constructor() {
    this.model = tf.sequential();
    this.model.add(
      tf.layers.dense({ units: 24, inputShape: [4], activation: "relu" })
    );
    this.model.add(tf.layers.dense({ units: 4, activation: "linear" }));
    this.model.compile({
      optimizer: tf.train.adam(0.1),
      loss: "meanSquaredError",
    });
  }

  predict(state) {
    const tensor = tf.tensor2d([state], [1, 4]);
    return this.model.predict(tensor);
  }

  async train(state, action, error, alpha) {
    const qValues = this.predict(state);
    const label = tf.oneHot(tf.tensor1d([action], "int32"), 4);
    await this.model.fit(tf.tensor2d([state], [1, 4]), label, {
      epochs: 1,
      learningRate: alpha,
    });
  }
}

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const battery = {
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
};

const robot = {
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  epsilon: 0.01,
  alpha: 0.01,
  qNetwork: new QNetwork(),

  chooseAction: (lidar) => {
    let qValues = robot.qNetwork.predict(lidar);
    let action = tf.argMax(qValues, 1).dataSync()[0];
    let maxQ = qValues.dataSync()[action];
    if (Math.random() < robot.epsilon) {
      action = Math.floor(Math.random() * 4);
      maxQ = -1;
    }

    let minDistance = Number.MAX_SAFE_INTEGER;
    let closestRect = -1;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
      let distance = Math.sqrt(
        Math.pow(robot.x + dx[i] - battery.x, 2) +
          Math.pow(robot.y + dy[i] - battery.y, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestRect = i;
      }
    }
    action = closestRect;
    return action;
  },
  update: async (state, action, nextState, reward) => {
    const nextQValues = robot.qNetwork.predict(nextState);
    const nextQValue = tf.max(nextQValues).dataSync()[0];
    const qValue = robot.qNetwork.predict(state)[action];
    const error = reward + 0.9 * nextQValue - qValue;
    await robot.qNetwork.train(state, action, error, robot.alpha);
    robot.epsilon *= 0.99;
  },
  move: (dx, dy) => {
    if (
      robot.x + dx >= 0 &&
      robot.x + dx <= canvas.width - 10 &&
      robot.y + dy >= 0 &&
      robot.y + dy <= canvas.height - 10
    ) {
      robot.x += dx;
      robot.y += dy;
    }
  },
};

let lidar = [10, 20, 15, 5];

const runSimulation = async () => {
  const action = robot.chooseAction(lidar);
  let reward = 0;
  let nextLidar = [...lidar];
  if (action === 0) {
    robot.move(-1, 0);
  } else if (action === 1) {
    robot.move(1, 0);
  } else if (action === 2) {
    robot.move(0, -1);
  } else if (action === 3) {
    robot.move(0, 1);
  }

  function hasCollided(robot, battery) {
    const size = 10;
    return (
      robot.x + size >= battery.x &&
      robot.x <= battery.x + size &&
      robot.y <= battery.y + size &&
      robot.y + size >= battery.y
    );
  }

  if (hasCollided(robot, battery)) {
    reward = 10;
    battery.x = Math.random() * canvas.width;
    battery.y = Math.random() * canvas.height;
  }
  if (
    robot.x <= 0 ||
    robot.x >= canvas.width - 10 ||
    robot.y <= 0 ||
    robot.y >= canvas.height - 10
  ) {
    reward = -1;
  }

  nextLidar[0] =
    Math.abs(robot.x - battery.x) < 10 ? 10 - Math.abs(robot.x - battery.x) : 0;
  nextLidar[1] =
    Math.abs(robot.y - battery.y) < 10 ? 10 - Math.abs(robot.y - battery.y) : 0;

  await robot.update(lidar, action, nextLidar, reward);

  lidar = nextLidar;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, 5);
  ctx.fillRect(0, 0, 5, canvas.height);
  ctx.fillRect(0, canvas.height - 5, canvas.width, 5);
  ctx.fillRect(canvas.width - 5, 0, 5, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(battery.x, battery.y, 10, 10);
  ctx.fillStyle = "green";
  ctx.fillRect(robot.x, robot.y, 10, 10);
  requestAnimationFrame(runSimulation);
};
requestAnimationFrame(runSimulation);
