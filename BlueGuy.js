
let cubeSpeed = 10;
let JUMP_SPEED = 120;
let can = document.getElementById('gameCanvas');
let ctx = can.getContext('2d');
import yellowGuy from './YellowGuy.js';


export default class blueGuy extends yellowGuy{
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
        return([this.x,this.y]); //At event, need to know position of blueGuy for comparison with yellowGuy positions for hit detection. 

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

            this.x += this.xDirection * remainder*1.5;
            this.y += this.yDirection * remainder*1.5;
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