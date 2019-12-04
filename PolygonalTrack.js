
let can = document.getElementById('gameCanvas');
let ctx = can.getContext('2d');

export default class polygonalTrack {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.trackColor = 'cyan';
	}
	draw() {
		// for (let k = 0; k < 7; k++) {
		// 	ctx.strokeStyle = rgb( 0, Math.floor(255-255/7*k), Math.floor(255/7*k));
		// }
		ctx.strokeStyle = "cyan";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    
    drawFun(){
        ctx.strokeStyle = this.trackColor;
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x +this.width,this.y);
        ctx.lineTo(this.x +this.width,this.y+this.height);
        ctx.lineTo(this.x,this.y + this.height);
        ctx.closePath();
        ctx.stroke();

        
    }
	getOriginXY() {
		return [ this.x, this.y ];
	}

	setOriginXY(newX, newY) {
		this.x = newX;
		this.y = newY;
	}

}