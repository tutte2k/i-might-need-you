export default class Supply {
    constructor({ position }) {
        this.position = position;
        this.path = new Path2D();
        this.path.arc(400, 75, 50, 0, 2 * Math.PI)
    }
    draw(ctx) {
        ctx.fillStyle = 'yellow'
        ctx.fill(this.path);
    }
    click() {
       
    }
}