

const FPS = 30;


let can = document.getElementById("gameCanvas");
let ctx = can.getContext("2d");

class yellowGuy{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.side = 10;
        this.color = "yellow";
    }

    draw(){

        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.side, this.side);
    }
}





setInterval(update, 1000 / FPS);

function update(){
    
    ctx.fillRect(0,0,can.width, can.height);

    let yg1 = new yellowGuy(10,10);
    yg1.draw();


}