import yellowGuy from './YellowGuy.js';
import blueGuy from './BlueGuy.js';
import polygonalTrack from './PolygonalTrack.js';
import wall from './wall.js';
import circleWall from './wall.js';

const FPS = 30;
let L1State = [];
let gameTimer = 10;
let secondTimer = 0;

let can = document.getElementById('gameCanvas');

let ctx = can.getContext('2d');

let timeCan = document.getElementById('timerCanvas');
let timeCtx = timeCan.getContext('2d');
timeCtx.fillRect(0, 0, timeCan.width, timeCan.height);

let xy = 40;
let p = 0;
let bgCoordinates;
let obstacleCoord;
let hitObstacle=false;

setInterval(update, 1000 / FPS);

let tr1 = new polygonalTrack(xy, xy, can.width / 2, can.height / 2);
let yg1 = new yellowGuy(300, 300);
let bg = new blueGuy(tr1.x, tr1.y);
let wall1 = new wall(25, 25, 50, .25 * Math.PI, "red")
let wall2 = new circleWall(100, 100, 50, "red");


document.addEventListener('keydown', keydown);

function keydown(/** @type {keyboardEvent}*/ ev) {
	switch (ev.keyCode) {
		case 13:; //Enter Key
		case 32:
			bgCoordinates = bg.jump(); //Need coordinates of blueGuy to compare withcoordinates of yellowGuy.
			obstacleCoord = tr1.getObstacleCoords();
      checkobstacleStatus();
			checkHitStatus();
			break;
	}
}

function checkHitStatus() {
	let leeway = 15;
	for (let m of L1State) {
		if (
			(bgCoordinates[0] > m.x - leeway && bgCoordinates[0] < m.x + leeway) ||
			(bgCoordinates[1] > m.y - leeway && bgCoordinates[1] < m.y + leeway)
		) {
			m.die();
		}
	}
}
function checkobstacleStatus(){

	for(let a of obstacleCoord){
			if( (bgCoordinates[0]>a[0])  && (bgCoordinates[0] <a[2]) || (bgCoordinates[1]>a[1])  && (bgCoordinates[1] <a[3])){

					bg.die();
					hitObstacle=true;
			}

	}
}

function createRow(track, y, arr) {
	for (let i = track.x + 75; i < track.x + track.width; i += 50) {
		let temp = new yellowGuy(i, y);
		arr.push(temp);
	}
}

function update() {
	ctx.fillRect(0, 0, can.width, can.height);

    tr1.draw();

    if(p<20){
        p++;
        tr1.setOriginXY(xy + 10 * p, xy + 10 * p);
    }

    if(p === 20) {
        bg.x = tr1.x;
        bg.y = tr1.y
        p++;
        createRow(tr1,tr1.y+tr1.height/2, L1State);
        createRow(tr1,tr1.y+tr1.height/2 + 50, L1State);

        
    }
    if(p === 21){

        let allDone = true;
        wall1.draw();
        wall2.draw();

        for(let i = 0; i < L1State.length; i++) {
            L1State[i].draw();
            if(L1State[i].alive) allDone = false; 
        }

        if(allDone) bg.win();

        bg.draw();
        bg.move(tr1);


        secondTimer ++;
        if (secondTimer == FPS){

            if(!allDone) gameTimer--;

            secondTimer = 0;
        }

        timeCtx.clearRect(0,0,timeCan.width,timeCan.height);
        timeCtx.fillRect(0,0,timeCan.width,timeCan.height);
        countdown();
        
        if (gameTimer <= 0){
            gameTimer = 0;
            bg.die();

            for (let j = 0; j < L1State.length; j++){
                L1State[j].die();
            }
            setTimeout(() => {gameTimer = 10; 
                              secondTimer = 0; 
                              L1State = []; 
                              p = 0; 
                              bg = new blueGuy(tr1.x, tr1.y); 
                              tr1 = new polygonalTrack(xy, xy, can.width / 2, can.height / 2)
                            }, 3000);

            p++;
            
        }
    }
    if(p === 22){
        bg.draw();
        for(let i = 0; i < L1State.length; i++) {
            L1State[i].draw();
        }

    }

}

function countdown() {
	timeCtx.font = '50px Verdana';
	timeCtx.fillStyle = 'magenta';
	timeCtx.fillText(gameTimer, 100, 90);
	timeCtx.fillStyle = 'black';
}
