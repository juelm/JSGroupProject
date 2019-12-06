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
        this.alive = true;
        this.timeOfDeath = 0;
	}

	draw() {
        if (this.side > 0){
            if (this.alive === false){
                this.timeOfDeath += 1;
                if (this.timeOfDeath <= 30){
                    this.side += 1;
                }
                if (this.timeOfDeath > 30){
                    this.side -= 1;
                }
            }

            if(this.rotation >= 2 * Math.PI) this.rotation = 0;

            let currentX = this.x + this.side / 2 * Math.cos(this.rotation);
            let currentY = this.y + this.side / 2 * Math.sin(this.rotation);

            ctx.strokeStyle = this.color;
            
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            
            ctx.lineTo(currentX + (this.side / 2) * Math.cos(this.rotation + .5 * Math.PI),
                    currentY + (this.side / 2) * Math.sin(this.rotation + .5 * Math.PI));

            currentX += (this.side / 2) * Math.cos(this.rotation + .5 * Math.PI);
            currentY += (this.side / 2) * Math.sin(this.rotation + .5 * Math.PI);

            ctx.lineTo(currentX + this.side * Math.cos(this.rotation + Math.PI),
            currentY + this.side * Math.sin(this.rotation +  Math.PI));

            currentX += this.side * Math.cos(this.rotation + Math.PI);
            currentY += this.side * Math.sin(this.rotation + Math.PI);

            ctx.lineTo(currentX + this.side * Math.cos(this.rotation + 1.5 * Math.PI),
            currentY + this.side * Math.sin(this.rotation +  1.5 * Math.PI));

            currentX += this.side * Math.cos(this.rotation + 1.5 * Math.PI);
            currentY += this.side * Math.sin(this.rotation + 1.5 * Math.PI);

            ctx.lineTo(currentX + this.side * Math.cos(this.rotation + 2 * Math.PI),
            currentY + this.side * Math.sin(this.rotation +  2 * Math.PI));

            ctx.closePath();
            ctx.stroke();

            this.rotation += turnSpeed; 
        }
    }
    die(){
        this.alive = false;
    }
}