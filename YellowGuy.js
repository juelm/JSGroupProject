let can = document.getElementById('gameCanvas');
let ctx = can.getContext('2d');
const FPS = 30;
const turnSpeed = Math.PI / FPS;

export default class yellowGuy {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.side = 10;
		this.color = '#ffff00';
		this.rotation = 2 * Math.PI;
		this.corners = [];
	}

	draw() {
		if (this.rotation >= 2 * Math.PI) this.rotation = 0;

		let currentX = this.x + this.side / 2 * Math.cos(this.rotation);
		let currentY = this.y + this.side / 2 * Math.sin(this.rotation);

		ctx.strokeStyle = this.color;

		ctx.beginPath();
		ctx.moveTo(currentX, currentY);

		getCorners(this.side, this.rotation);

		ctx.closePath();
		ctx.stroke();

		this.rotation += turnSpeed;

		function newXY(s, r, counter1) {
			currentX += s * Math.cos(r + counter1 * Math.PI * 0.5);
			currentY += s * Math.sin(r + counter1 * Math.PI * 0.5);
		}
		function getCorners(s, r) {
			for (let k = 1; k < 5; k++) {
				if (k === 1) {
					newXY(s / 2, r, k);
				} else {
					newXY(s, r, k);
				}
				ctx.lineTo(currentX, currentY);
			}
		}
	}
}
