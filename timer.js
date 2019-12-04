   function countdown() {
    let seconds = 15, $seconds = document.querySelector('gameCanvas');
    $seconds.textContent = seconds
    ctx.fillStyle = "red";
    if(seconds --> 0) setTimeout(countdown, 1000)
}
