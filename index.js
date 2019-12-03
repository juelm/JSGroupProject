
let can = document.getElementById('gameCanvas');
//mouse click event handler thing
can.addEventListener("mousedown", click, false);
let ctx = can.getContext('2d');

const FPS = 60;//30;


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
function blueGuy(sliderValue) {


let xy = 40;
let p = 0;
//setInterval(update, 1000 / FPS);
let percent = 0;
let direction = 1;
//let yg1 = new yellowGuy(10, 10);

function update() {
    ctx.fillRect(0, 0, can.width, can.height);
    
	
	//yg1.draw();
    
    let tr1 = new polygonalTrack(xy, xy, can.width / 2, can.height / 2);
	tr1.setOriginXY(xy + 10 * p, xy + 10 * p);
    tr1.drawFun();
    if(p<20){
        
        p++;
        
    }
}
animate();

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
    blueGuy(percent);
    
    setTimeout(function () {
        requestAnimationFrame(animate);
    }, 1000 / FPS);
    
}
function blueGuy(sliderValue) {
    
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

