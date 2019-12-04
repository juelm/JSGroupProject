import yellowGuy from './YellowGuy.js';
import blueGuy from './BlueGuy.js';
import polygonalTrack from './PolygonalTrack.js';

const FPS = 30;
let cubeSpeed = 10;
let JUMP_SPEED = 120;
let L1State = [];

let can = document.getElementById('gameCanvas');
//mouse click event handler thing
can.addEventListener('mousedown', click, false);
let ctx = can.getContext('2d');

let xy = 40;
let p = 0;
let bgCoordinates;

setInterval(update, 1000 / FPS);
let tr1 = new polygonalTrack(xy, xy, can.width / 2, can.height / 2);
let yg1 = new yellowGuy(300, 300);
let bg = new blueGuy(tr1.x, tr1.y);

document.addEventListener('keydown', keydown);

function keydown(/** @type {keyboardEvent}*/ ev) {
	switch (ev.keyCode) {
		case 13: //Enter Key
            bgCoordinates = bg.jump(); //Need coordinates of blueGuy to compare withcoordinates of yellowGuy.
            checkHitStatus();
			break;
	}
}

function checkHitStatus (){
    for(let m of L1State){
        if( (bgCoordinates[0]>m.x-2)  && (bgCoordinates[0] <m.x+2) || (bgCoordinates[1]>m.y-2)  && (bgCoordinates[1] <m.y+2)){
            m.alive=false;
        }
    }
}


let percent = 0;
let direction = 1;
//let yg1 = new yellowGuy(10, 10);

function createRow(track, y, arr) {
	for (let i = track.x + 75; i < track.x + track.width; i += 50) {
		let temp = new yellowGuy(i, y);
		arr.push(temp);
	}
}

function update() {
	ctx.fillRect(0, 0, can.width, can.height);

	tr1.setOriginXY(xy + 10 * p, xy + 10 * p);
	tr1.draw();
	if (p < 20) {
		p++;
	}
	//yg1.draw();

	if (p === 20) {
		bg.x = tr1.x;
		bg.y = tr1.y;
		p++;
		createRow(tr1, tr1.y + tr1.height / 2, L1State);
		createRow(tr1, tr1.y + tr1.height / 2 + 50, L1State);
	}
	if (p > 20) {
		for (let i = 0; i < L1State.length; i++) {
			L1State[i].draw();
		}
		bg.draw();
		bg.move(tr1);
	}
}
//animate();

function animate() {
	//counter clockwise
	if (direction == 1) {
		percent += direction;
		if (percent >= 100) {
			percent = 0;
		}
	}
	//clockwise
	if (direction == -1) {
		percent += direction;
		if (percent <= 0) percent = 100;
	}
	road(percent);

	setTimeout(function() {
		requestAnimationFrame(animate);
	}, 1000 / FPS);
}
function road(sliderValue) {
	ctx.clearRect(0, 0, can.width, can.height);
	ctx.lineWidth = 5;
	//fake road! just for visuals
	//side 1 going counter clockwise
	ctx.beginPath();
	ctx.moveTo(230, 230);
	ctx.lineTo(230, 690);
	ctx.strokeStyle = 'red';
	ctx.stroke();
	//side 2
	ctx.beginPath();
	ctx.moveTo(230, 690);
	ctx.lineTo(690, 690);
	ctx.strokeStyle = 'blue';
	ctx.stroke();
	// side 3
	ctx.beginPath();
	ctx.moveTo(690, 690);
	ctx.lineTo(690, 230);
	ctx.strokeStyle = 'gold';
	ctx.stroke();
	// side 4
	ctx.beginPath();
	ctx.moveTo(690, 230);
	ctx.lineTo(230, 230);
	ctx.strokeStyle = 'green';
	ctx.stroke();

	let newXY = 0;
	//this is the road!
	if (sliderValue < 25) {
		let percent = sliderValue / 24;
		newXY = getLineXYatPercent(
			{
				x: 230,
				y: 230
			},
			{
				x: 230,
				y: 690
			},
			percent
		);
	} else if (sliderValue < 50) {
		let percent = (sliderValue - 25) / 24;
		newXY = getLineXYatPercent(
			{
				x: 230,
				y: 690
			},
			{
				x: 690,
				y: 690
			},
			percent
		);
	} else if (sliderValue < 75) {
		let percent = (sliderValue - 50) / 24;
		newXY = getLineXYatPercent(
			{
				x: 690,
				y: 690
			},
			{
				x: 690,
				y: 230
			},
			percent
		);
	} else {
		let percent = (sliderValue - 75) / 24;
		newXY = getLineXYatPercent(
			{
				x: 690,
				y: 230
			},
			{
				x: 230,
				y: 230
			},
			percent
		);
	}
	drawRect(newXY);
}

//this is lil guy
function drawRect(point) {
	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; //translucent
	ctx.strokeStyle = 'cyan';
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
	return {
		x: X,
		y: Y
	};
}

//ON MOUSE CLICK
function click(event) {
	direction *= -1;
	percent = (percent + 50) % 100;
}
