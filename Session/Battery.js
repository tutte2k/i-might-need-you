export default class Battery {
    constructor({ position }) {
        this.position = position;
        this.path = new Path2D();
        this.path.arc(500, 75, 50, 0, 2 * Math.PI)
        this.markedForDeletion = false;
    }
    draw(ctx) {
        ctx.fillStyle = 'blue'
        ctx.fill(this.path);
    }
    click() {
        this.markedForDeletion = true;
    }
}