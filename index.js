const FPS = 30;
const turnSpeed = Math.PI / FPS;
let cubeSpeed = 10;

let can = document.getElementById('gameCanvas');
let ctx = can.getContext('2d');

class yellowGuy {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.side = 10;
        this.color = '#ffff00';
        this.rotation = 2 * Math.PI;
	}

	draw() {

        if(this.rotation >= 2 * Math.PI) this.rotation = 0;

        let currentX = this.x + this.side / 2 * Math.cos(this.rotation);
        let currentY = this.y + this.side / 2 * Math.sin(this.rotation);

		ctx.strokeStyle = this.color;
        //ctx.strokeRect(this.x, this.y, this.side, this.side);
        
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


        // ctx.lineTo(this.side * Math.cos(this.rotation + 1.5 * Math.PI),
        // this.side * Math.sin(this.rotation +  1.5 * Math.PI));
        ctx.lineTo(currentX + this.side * Math.cos(this.rotation + 2 * Math.PI),
        currentY + this.side * Math.sin(this.rotation +  2 * Math.PI));

        ctx.closePath();
        ctx.stroke();

        this.rotation += turnSpeed;



        // ctx.fillStyle = "white";
        // ctx.fillRect(currentX, currentY, this.side, this.side);
        // ctx.fillStyle = "black";

        
	}
}

class blueGuy extends yellowGuy{
    constructor(x,y){
        super(x, y);
        this.side = 25;
        this.color = '#FF00FF';
        this.rotation = 2 * Math.PI;
        this.clockwise = true;
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

let xy = 40;
let p = 0;
setInterval(update, 1000 / FPS);
let tr1 = new polygonalTrack(xy, xy, can.width / 2, can.height / 2);
let yg1 = new yellowGuy(300, 300);
let bg = new blueGuy(tr1.x, tr1.y);

function update() {
    ctx.fillRect(0, 0, can.width, can.height);
    
	tr1.setOriginXY(xy + 10 * p, xy + 10 * p);
    tr1.draw();
    if(p<20){

        p++;
    }
    yg1.draw();


    //--------Path Tracing Logic----------
    if(p === 20) {
        bg.x = tr1.x;
        bg.y = tr1.y
    }
    // else if(clockwise){
    //     if(bg.y === tr1.y){
    //         bg.x +=
    //     }
    // }
    bg.draw();
    //console.log(yg1.x);
}
