let can = document.getElementById('gameCanvas');
let ctx = can.getContext('2d');

export default class polygonalTrack {
	constructor(x, y, width, height, obstaclesLvl=0) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.trackColor = 'cyan';
		this.obstacleLvl=obstaclesLvl;
		this.obstacleArray1=[];
		this.populateObsArr();
	}
	populateObsArr(){
		
		let obs1=[this.x+120, this.y + this.height/3, this.x+220,this.y + this.height/3];
		let obs2 = obs1.slice();
		obs2[0]+=250;
		obs2[1]+=this.height/3;
		obs2[2]+=250;
		obs2[3]+=this.height/3;
		this.obstacleArray1[0]=obs1;
		this.obstacleArray1[1]=obs2;

	}
	drawObstacles(){
		let xStep = this.width / 4;
		let yStep = this.height / 3;
		ctx.strokeStyle = "red";
		for(let a of this.obstacleArray1){

			ctx.beginPath();
			
			ctx.moveTo(a[0], a[1]);
			ctx.lineTo(a[2], a[3]);
			ctx.closePath();
			ctx.stroke();
		}

	}
	getObstacleCoords(){
		return(this.obstacleArray1);

	}
	drawF() {
		ctx.strokeStyle = 'white';
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

	draw() {
		ctx.strokeStyle = this.trackColor;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.width, this.y);
		ctx.lineTo(this.x + this.width, this.y + this.height);
		ctx.lineTo(this.x, this.y + this.height);
		ctx.closePath();
		ctx.stroke();
		if(this.obstacleLvl!==0){
			this.populateObsArr();
			this.drawObstacles();

		}
	}
	getOriginXY() {
		return [ this.x, this.y ];
	}

	setOriginXY(newX, newY) {
		this.x = newX;
		this.y = newY;
	}
}
