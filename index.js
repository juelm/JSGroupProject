const FPS = 30;

let can = document.getElementById('gameCanvas');
let ctx = can.getContext('2d');

class yellowGuy {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.side = 10;
		this.color = 'yellow';
	}

	draw() {
		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.x, this.y, this.side, this.side);
	}
}

class polygonalTrack {
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
		ctx.strokeStyle = "white";
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

let xy = 40;
let p = 0;
setInterval(update, 1000 / FPS);

function update() {
    ctx.fillRect(0, 0, can.width, can.height);
    
	let yg1 = new yellowGuy(10, 10);
	yg1.draw();
    
    let tr1 = new polygonalTrack(xy, xy, can.width / 2, can.height / 2);
	tr1.setOriginXY(xy + 10 * p, xy + 10 * p);
    tr1.drawFun();
    if(p<20){

        p++;
    }
}
