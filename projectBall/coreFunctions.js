function toggleBallsUpdate(){
    if(booleanUpdateBall) booleanUpdateBall = false;
    else booleanUpdateBall = true;
}

function stopBalls(){
    for(var i = 0; i < ballArray.length; i++){
        ballArray[i].velocity = new Vector(0, 0);
    }
}

function deleteBalls(){
    while(ballArray.length > 0) ballArray.pop();
}

function newBall(){
    var xPosition = +document.getElementById("xPosition").value;
    var yPosition = +document.getElementById("yPosition").value;
    var xVelocity = +document.getElementById("xVelocity").value;
    var yVelocity = +document.getElementById("yVelocity").value;
    var mass      = +document.getElementById("mass").value;
    var radius    = +document.getElementById("radius").value;
    if(xPosition - radius < 0) xPosition = radius;
    if(yPosition - radius < 0) yPosition = radius;
    if(xPosition + radius > canvas.width)  xPosition = canvas.width - radius;
    if(yPosition + radius > canvas.height) yPosition = canvas.height - radius;
    var color     = "rgb(255,255,255)";
    ballArray.push(new Ball(new Vector(xPosition, yPosition), new Vector(xVelocity, yVelocity), mass, radius, color));
}

function resizePixelMap(){
    canvas.width  = +document.getElementById("canvasWidth").value;
    if(canvas.width > 1300){
        canvas.width = 1300;
        document.getElementById("canvasWidth").value = 1300;
    }
    canvas.height = +document.getElementById("canvasHeight").value;
    if(canvas.height > 10000){
        canvas.height = 10000;
        document.getElementById("canvasHeight").value = 10000;
    }
    $('#innerDrawable').css('width', canvas.width + "px");
    for(var i = 0; i < ballArray.length; i++){
        var radius = ballArray[i].radius;
        if(ballArray[i].position.x - radius < 0) ballArray[i].position.x = radius;
        if(ballArray[i].position.y - radius < 0) ballArray[i].position.y = radius;
        if(ballArray[i].position.x + radius > canvas.width)  ballArray[i].position.x = canvas.width - radius;
        if(ballArray[i].position.y + radius > canvas.height) ballArray[i].position.y = canvas.height - radius;
    }
}