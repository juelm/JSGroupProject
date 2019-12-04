
const FPS = 30;
const turnSpeed = Math.PI / FPS;
let cubeSpeed = 10;
let JUMP_SPEED = 120;
let L1State = [];
let gameTimer = 30;
let secondTimer = 0;

let can = document.getElementById('gameCanvas');
//mouse click event handler thing
can.addEventListener("mousedown", click, false);
let ctx = can.getContext('2d');

let timeCan = document.getElementById('timerCanvas');
let timeCtx = timeCan.getContext('2d');
//timeCtx.fillStyle = "green";
timeCtx.fillRect(0,0,timeCan.width,timeCan.height);

//ctx.drawImage(timeCan, 1, 1);

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


let percent = 0;
let direction = 1;
//let yg1 = new yellowGuy(10, 10);

function createRow(track, y, arr){
 
    for(let i = track.x + 75; i < track.x + track.width; i += 50){
    let temp = new yellowGuy(i, y);
    arr.push(temp);
    }
   }

function update() {
    ctx.fillRect(0, 0, can.width, can.height);
    

	tr1.setOriginXY(xy + 10 * p, xy + 10 * p);
    tr1.draw();
    if(p<20){
        p++;
    }
        //yg1.draw();
    
 
        if(p === 20) {
            bg.x = tr1.x;
            bg.y = tr1.y
            p++;
            createRow(tr1,tr1.y+tr1.height/2,L1State);
            createRow(tr1,tr1.y+tr1.height/2 + 50,L1State);
            
        }
        if(p > 20){
            for(let i = 0; i < L1State.length; i++) {
                L1State[i].draw();
            }
            bg.draw();
            bg.move(tr1);

            timeCtx.clearRect(0,0,timeCan.width,timeCan.height);
            timeCtx.fillRect(0,0,timeCan.width,timeCan.height);
            countdown();
            secondTimer ++;
            if (secondTimer == FPS){
                gameTimer--;
                secondTimer = 0;
            }
            

        }
    
}
//animate();

function animate(){
    //counter clockwise
    if (direction == 1){
        percent += direction;
        if(percent >= 100){
        percent = 0;
        }
    }
    //clockwise
    if (direction == -1){
        percent += direction;
        if(percent <= 0)
        percent = 100;
    }
    road(percent);
    
    setTimeout(function () {
        requestAnimationFrame(animate);
    }, 1000 / FPS);
    
}
function road(sliderValue) {
    
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.lineWidth = 5;
    //fake road! just for visuals
    //side 1 going counter clockwise
    ctx.beginPath();
    ctx.moveTo(230,230);
    ctx.lineTo(230,690);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    //side 2
    ctx.beginPath();
    ctx.moveTo(230,690);
    ctx.lineTo(690,690);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    // side 3
    ctx.beginPath();
    ctx.moveTo(690,690);
    ctx.lineTo(690,230);
    ctx.strokeStyle = 'gold';
    ctx.stroke();
    // side 4
    ctx.beginPath();
    ctx.moveTo(690,230);
    ctx.lineTo(230,230);
    ctx.strokeStyle = 'green';
    ctx.stroke();
    
    
    let newXY = 0;
    //this is the road!
    if (sliderValue < 25) {
        let percent = sliderValue / 24;
        newXY = getLineXYatPercent({
            x: 230,
            y: 230
        }, {
            x: 230,
            y: 690
        }, percent);
    }
    else if (sliderValue < 50) {
        let percent = (sliderValue - 25) / 24
        newXY = getLineXYatPercent({
            x: 230,
            y: 690
        }, {
            x: 690,
            y: 690
        }, percent);
    }
    else if (sliderValue < 75) {
        let percent = (sliderValue - 50) / 24;
        newXY = getLineXYatPercent({
            x: 690,
            y: 690
        }, {
            x: 690,
            y: 230
        }, percent);
    }
    else  {
        let percent = (sliderValue - 75) / 24;
        newXY = getLineXYatPercent({
            x: 690,
            y: 230
        }, {
            x: 230,
            y: 230
        }, percent);
    }
    drawRect(newXY);
}

//this is lil guy
    function drawRect(point) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; //translucent
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.rect(point.x - 14, point.y - 14, 25, 25); // -14 centers the lil guy on the road
        ctx.fill();
        ctx.stroke();
    }
//using 
    function getLineXYatPercent(startPt, endPt, percent) {
        let dx = endPt.x - startPt.x;
        let dy = endPt.y - startPt.y;
        let X = startPt.x + dx * percent;
        let Y = startPt.y + dy * percent;
        return ({
            x: X,
            y: Y
        });
    }
//ON MOUSE CLICK
function click(event){
if (direction == 1) direction = -1;
else if (direction == -1) direction = 1;
percent = (percent + 50) % 100;
}
function countdown() {
    //timeCtx.textAlign = "right";
    //timeCtx.fillStyle = "gold";
    //timeCtx.fillStyle = "black";
    timeCtx.font = "50px Verdana";
    
    // let gradient = timeCtx.createLinearGradient(0, 0, timeCan.width, 0);
    // gradient.addColorStop("0"," magenta");
    // gradient.addColorStop("0.5", "blue");
    // gradient.addColorStop("1.0", "red");
    //timeCtx.fillStyle = gradient;
    timeCtx.fillStyle = "magenta";

    let seconds = 30;
    $seconds = document.getElementById('timerCanvas');
    $seconds.textContent = seconds;
    // if(seconds --> 0) setTimeout(countdown, 1000);


    timeCtx.fillText(gameTimer, 100, 90);
    timeCtx.fillStyle = "black";

    // let count = setInterval(function() {
    // seconds--;
    // if (seconds <= 0) clearInterval(count);
    // }, 1000);
}

    
