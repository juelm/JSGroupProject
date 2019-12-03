const FPS = 60;//30;

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
//setInterval(update, 1000 / FPS);
let percent = 0;
let direction = 1;
let newXY;
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

    percent += direction;
    if (percent >= 100){
        percent = 0;
    }

     setTimeout(function () {
         requestAnimationFrame(animate);
     }, 1000 / FPS);
    
    blueGuy(percent);
}
function blueGuy(sliderValue) {

    //side 1
    ctx.clearRect(0, 0, can.width, can.height);

    ctx.beginPath();
    ctx.moveTo(230,230);
    ctx.lineTo(230,690);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    //side 2
    //ctx.clearRect(0, 0, can.width, can.height);
    ctx.beginPath();
    ctx.moveTo(230,690);
    ctx.lineTo(690,690);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    // side 3
    //ctx.clearRect(0, 0, can.width, can.height);
    ctx.beginPath();
    ctx.moveTo(690,690);
    ctx.lineTo(690,230);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    // side 4
    //ctx.clearRect(0, 0, can.width, can.height);
    ctx.beginPath();
    ctx.moveTo(690,230);
    ctx.lineTo(230,230);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    //let xy;

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
        let percent = sliderValue / 24;
        newXY = getLineXYatPercent({
            x: 230,
            y: 690
        }, {
            x: 690,
            y: 690
        }, percent);
    }
    else if (sliderValue < 75) {
        let percent = sliderValue / 24;
        newXY = getLineXYatPercent({
            x: 690,
            y: 690
        }, {
            x: 690,
            y: 230
        }, percent);
    }
    else  {
        let percent = sliderValue / 24;
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
    function drawRect(point) {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.rect(point.x - 13, point.y - 8, 25, 15);
        ctx.fill();
        ctx.stroke();
    }

    function getLineXYatPercent(startPt, endPt, percent) {
        var dx = endPt.x - startPt.x;
        var dy = endPt.y - startPt.y;
        var X = startPt.x + dx * percent;
        var Y = startPt.y + dy * percent;
        return ({
            x: X,
            y: Y
        });
    }

