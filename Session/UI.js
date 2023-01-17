export default class UI {
    constructor(session) {
        this.session = session;
    }
    draw(ctx) {
        ctx.font = '100px serif';
        ctx.fillStyle = "black"
        ctx.fillText(this.session.robot.power, 100, 100);
    }
}