

const FPS = 30;


let can = document.getElementById("gameCanvas");
let ctx = can.getContext("2d");


document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keydown(/** @type {keyboarkdEvent}*/ev){
    
    switch(ev.keyCode){
        case 37: //Left Arrow
            break;
        case 38: //Up Arrow
            break;
        case 39: //Right Arrow
            break;

    }
}
function keyup(/** @type {keyboarkdEvent}*/ ev){
    switch(ev.keyCode){
        case 37: //Left Arrow
            break;
        case 38: //Up Arrow
            break;
        case 39: //Right Arrow
            break;

    }
}

setInterval(update, 1000 / FPS);

function update(){


}