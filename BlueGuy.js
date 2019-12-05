let can = document.getElementById('gameCanvas');
let ctx = can.getContext('2d');
import yellowGuy from './YellowGuy.js';

export default class blueGuy extends yellowGuy {
    constructor(x, y) {
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
		this.won = false;
		this.cubeSpeed = 10;
        this.JUMP_SPEED = 80;
	}

	jump() {
		if (this.alive) {
			this.jumping = true;
			this.clockwise = !this.clockwise;
			return [ this.x, this.y ]; //At event, need to know position of blueGuy for comparison with yellowGuy positions for hit detection.
		}
	}

	move(track) {
		if (!this.alive) this.cubeSpeed = 0;

		if (!this.jumping) {
			let remainder = 0;
			this.x += this.xDirection * this.cubeSpeed;
			this.y += this.yDirection * this.cubeSpeed;

			if (this.clockwise) {
				if (this.x > track.x + track.width) {
					remainder = this.x - track.x - track.width;
					this.x = track.x + track.width;
					this.xDirection = 0;
					this.yDirection = 1;
				}
				if (this.x < track.x) {
					remainder = track.x - this.x;
					this.x = track.x;
					this.xDirection = 0;
					this.yDirection = -1;
				}
				if (this.y > track.y + track.height) {
					remainder = this.y - track.y - track.height;
					if (!this.won) {
						this.y = track.y + track.height;
						this.xDirection = -1;
						this.yDirection = 0;
					}
				}
				if (this.y < track.y) {
					remainder = track.y - this.y;
					this.y = track.y;
					this.y = track.y;
					this.xDirection = 1;
					this.yDirection = 0;
				}
			} else {
				if (this.x > track.x + track.width) {
					remainder = this.x - track.x - track.width;
					this.x = track.x + track.width;
					this.xDirection = 0;
					this.yDirection = -1;
				}
				if (this.x < track.x) {
					remainder = track.x - this.x;
					this.x = track.x;
					this.xDirection = 0;
					this.yDirection = 1;
				}
				if (this.y > track.y + track.height) {
					remainder = this.y - track.y - track.height;
					if (!this.won) {
						this.y = track.y + track.height;
						this.xDirection = 1;
						this.yDirection = 0;
					}
				}
				if (this.y < track.y) {
					remainder = track.y - this.y;
					this.y = track.y;
					this.y = track.y;
					this.xDirection = -1;
					this.yDirection = 0;
				}
			}

			this.x += this.xDirection * remainder * 1.5;
			this.y += this.yDirection * remainder * 1.5;
		} else {
			if (this.x === track.x) {
				this.yDirection *= -1;
				this.jumpX = 1;
				this.jumpY = 0;
			}
			if (this.x === track.x + track.width) {
				this.yDirection *= -1;
				this.jumpX = -1;
				this.jumpY = 0;
			}
			if (this.y === track.y + track.height) {
				this.xDirection *= -1;
				this.jumpX = 0;
				this.jumpY = -1;
			}
			if (this.y === track.y) {
				this.xDirection *= -1;
				this.jumpX = 0;
				this.jumpY = 1;
			}

			this.x += this.JUMP_SPEED * this.jumpX;
			this.y += this.JUMP_SPEED * this.jumpY;

            let obstCoords = track.getObstacleCoords();
            if(obstCoords[0]){
                obstCoords.forEach(el => {
                    
                    console.log(`x:${this.x} y: ${this.y} dist: ${Math.abs(this.y - el[1])}`)
                    
                    if (
                        (Math.abs(this.y - el[1]) <= 40 && (this.x < el[2]) && (this.x > el[0])) ||
                        (Math.abs(this.x - el[0]) <= 40 && (this.y < el[3]) && (this.y > el[1]))
                    ) {
                        this.JUMP_SPEED = 0;
                        super.die();
                    }
                });
            }

			if (
				this.x <= track.x ||
				this.x >= track.x + track.width ||
				this.y < track.y ||
				this.y > track.y + track.height
			) {
				this.jumping = false;
				//this.clockwise = !this.clockwise;
			}
		}
	}

	win() {
		this.won = true;
	}
}
