import yellowGuy from './YellowGuy.js';
import blueGuy from './BlueGuy.js';
import polygonalTrack from './PolygonalTrack.js';

const FPS = 30;
let L1State = [];
let gameTimer = 10;
let secondTimer = 0;

let can = document.getElementById('gameCanvas');

let ctx = can.getContext('2d');

let timeCan = document.getElementById('timerCanvas');
let timeCtx = timeCan.getContext('2d');
timeCtx.fillRect(0,0,timeCan.width,timeCan.height);

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
            if (gameTimer <= 0){
                gameTimer = 0;
            }
        }
}

function countdown() {

    timeCtx.font = "50px Verdana";
    timeCtx.fillStyle = "magenta";
    timeCtx.fillText(gameTimer, 100, 90);
    timeCtx.fillStyle = "black";

}

  
