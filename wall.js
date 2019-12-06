let can = document.getElementById('gameCanvas');
let ctx = can.getContext('2d');

export class wall{
    constructor(x, y, length, rotation, color, jumpX, jumpY,next){
        this.clockWise = true;
        this.startX = x;
        this.startY = y;
        this.jumpX = jumpX;
        this.jumpY = jumpY;
        this.color = color;
        this.endX = x + length * Math.cos(rotation);
        this.endY = y + length * Math.sin(rotation);
        this.next = next;
    }

    draw(){
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
            
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        
        ctx.lineTo(this.endX, this.endY);

        ctx.closePath();    
        ctx.stroke();
    }
}

export default class circleWall extends wall{
    constructor(x, y, radius, color){
        super(x, y, radius, 0, color);
        this.radius = radius;
    }

    draw(){

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
            
        ctx.beginPath();
        
        ctx.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI, false)

        ctx.closePath();
        ctx.stroke();

    }
}