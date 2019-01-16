function initialize(){
    // Initialization
    canvas = $('#ballBox')[0];
    renderContext2D = canvas.getContext('2d');
    timeManager = new TimeManager();
    mouse = new Mouse();
    ballBoxLogic = new BallBox();
    vectorBoxLogic = new VectorBox();
    // ballBox Event Listeners
    document.getElementById('ballBox').addEventListener('mousedown', onBallDown, false);
    document.getElementById('ballBox').addEventListener('mouseup', onBallUp, false);
    document.getElementById('ballBox').addEventListener('touchstart', onBallTouchStart, false);
    document.getElementById('ballBox').addEventListener('touchend', onBallTouchEnd, false);
    // vectorBox Event Listeners
    document.getElementById('vectorBox').addEventListener('mousedown', onVectorDown, false);
    document.getElementById('vectorBox').addEventListener('mouseup', onVectorUp, false);
    document.getElementById('vectorBox').addEventListener('touchstart', onVectorTouchStart, false);
    document.getElementById('vectorBox').addEventListener('touchend', onVectorTouchEnd, false);
    // Start main loop
    window.requestAnimationFrame(mainLoop);
}

function mainLoop(){
    elapsedTime = timeManager.update();
    renderContext2D.clearRect(0, 0, canvas.width, canvas.height);
    ballBoxLogic.update();
    for(let a = 0; a < ballArray.length; a++){
        // Checking for collisions
        for (let b = a + 1; b < ballArray.length; b++){
            const radiusSum = ballArray[a].radius + ballArray[b].radius;
            const currentDistance = Vector.getDistance(ballArray[a].position, ballArray[b].position);
            if (currentDistance < radiusSum) Ball.ball_collision(ballArray[a], ballArray[b]);
        }
        // Ball calculations HERE
        Ball.wall_collision(ballArray[a], elapsedTime);
        if(booleanUpdateBall) ballArray[a].update(elapsedTime);
        ballArray[a].draw(renderContext2D);
    }
    vectorBoxLogic.update();
    window.requestAnimationFrame(mainLoop);
}