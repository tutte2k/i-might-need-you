
import Session from "./Session/Session.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const session = new Session(canvas);


canvas.addEventListener('click', function (event) {
    session.batteries.forEach(battery => {
        if (ctx.isPointInPath(battery.path, event.offsetX, event.offsetY)) {
            session.robot.power += 5;
            battery.click();
        }
    })
    if (ctx.isPointInPath(session.supply.path, event.offsetX, event.offsetY)) {
        session.robot.power++;
        session.supply.click();
    }
});

window.addEventListener("load", function () {
    let lastTime = 0;
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        session.update(deltaTime)

        session.robot.update(deltaTime);

        session.robot.draw(ctx);
        session.supply.draw(ctx)
        session.ui.draw(ctx);
        session.batteries.forEach(battery => battery.draw(ctx))
        session.batteries = session.batteries.filter(battery => battery.markedForDeletion === false)

        window.requestAnimationFrame(animate);
    }
    animate(0);
});