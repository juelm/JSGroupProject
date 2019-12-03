const FPS = 30;
const turnSpeed = Math.PI / FPS;
let cubeSpeed = 10;
let JUMP_SPEED = 120;

let can = document.getElementById('gameCanvas');
let ctx = can.getContext('2d');

class yellowGuy {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.side = 10;
        this.color = '#ffff00';
        this.rotation = 2 * Math.PI;
        this.corners = [];
	}

	draw() {

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

class blueGuy extends yellowGuy{
    constructor(x,y){
        super(x, y);
        this.side = 25;
        this.color = '#FF00FF';
        this.rotation = 2 * Math.PI;
        this.clockwise = true;
        this.xDirection = 1;
        this.yDirection = 0;
        this.jumping = false;
        this.jumpX = 0;
        this.jumpY = 0;
    }

    jump(){

        this.jumping = true;
        this.clockwise = !this.clockwise;

    }

    move(track){

        if(!this.jumping){

            let remainder = 0;
            this.x += this.xDirection * cubeSpeed;
            this.y += this.yDirection * cubeSpeed;

            if (this.clockwise){
                if(this.x > track.x + track.width){
                    remainder = this.x - track.x  - track.width;
                    this.x = track.x + track.width;
                    this.xDirection = 0;
                    this.yDirection = 1;
                }
                if(this.x < track.x){
                    remainder = track.x - this.x;
                    this.x = track.x;
                    this.xDirection = 0;
                    this.yDirection = -1;
                }
                if(this.y > track.y + track.height){
                    remainder = this.y - track.y  - track.height;
                    this.y = track.y + track.height;
                    this.xDirection = -1;
                    this.yDirection = 0;
                }
                if(this.y < track.y){
                    remainder = track.y - this.y;
                    this.y = track.y;
                    this.y = track.y;
                    this.xDirection = 1;
                    this.yDirection = 0;
                }
            }else{
                if(this.x > track.x + track.width){
                    remainder = this.x - track.x  - track.width;
                    this.x = track.x + track.width;
                    this.xDirection = 0;
                    this.yDirection = -1;
                }
                if(this.x < track.x){
                    remainder = track.x - this.x;
                    this.x = track.x;
                    this.xDirection = 0;
                    this.yDirection = 1;
                }
                if(this.y > track.y + track.height){
                    remainder = this.y - track.y  - track.height;
                    this.y = track.y + track.height;
                    this.xDirection = 1;
                    this.yDirection = 0;
                }
                if(this.y < track.y){
                    remainder = track.y - this.y;
                    this.y = track.y;
                    this.y = track.y;
                    this.xDirection = -1;
                    this.yDirection = 0;
                }

            }

            this.x += this.xDirection * remainder;
            this.y += this.yDirection * remainder;
        }else{
            if(this.x === track.x){
                this.yDirection *= -1;
                this.jumpX = 1;
                this.jumpY = 0;
            }
            if(this.x === track.x + track.width){
                this.yDirection *= -1;
                this.jumpX = -1;
                this.jumpY = 0;
            }
            if(this.y === track.y + track.height){
                this.xDirection *= -1;
                this.jumpX = 0;
                this.jumpY = -1;
            }
            if(this.y === track.y){
                this.xDirection *= -1;
                this.jumpX = 0;
                this.jumpY = 1;
            }
            this.x += JUMP_SPEED * this.jumpX;
            this.y += JUMP_SPEED * this.jumpY;
            
            if(this.x <= track.x || this.x >= track.x + track.width || this.y < track.y || this.y > track.y + track.height) {
                this.jumping = false;
                //this.clockwise = !this.clockwise;
            }

        }
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




//---------------End Classes--------------------




let xy = 40;
let p = 0;
setInterval(update, 1000 / FPS);
let tr1 = new polygonalTrack(xy, xy, can.width / 2, can.height / 2);
let yg1 = new yellowGuy(300, 300);
let bg = new blueGuy(tr1.x, tr1.y);


document.addEventListener("keydown", keydown);

function keydown(/** @type {keyboarkdEvent}*/ev){
    
    switch(ev.keyCode){
        case 13: //Enter Key
            bg.jump();
            break;
    }
}

function update() {
    ctx.fillRect(0, 0, can.width, can.height);
    
	tr1.setOriginXY(xy + 10 * p, xy + 10 * p);
    tr1.draw();
    if(p<20){

        p++;
    }
    yg1.draw();
    
 
    if(p === 20) {
        bg.x = tr1.x;
        bg.y = tr1.y
        p++;
    }
    if(p > 20){
        bg.draw();
        bg.move(tr1);
    }

}
