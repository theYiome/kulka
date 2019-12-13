class BallBox{
    constructor(){
        this.grabbed = null;
        this.mousePressed = false;
    }

    update(){
        if(this.mousePressed){
            var mousePosition = mouse.relativePosition("ballBox");
            if(this.grabbed != null){
                ballArray[this.grabbed].color = "rgb(255,0,0)";
                var distance = Vector.getSubtract(ballArray[this.grabbed].position, mousePosition);
                if(true){
                    ballArray[this.grabbed].velocity = Vector.getMultiply(Vector.getSubtract(ballArray[this.grabbed].position, mousePosition), -8);
                }
                else this.leaveBall();
            }
            else{
                this.lookForBall(mousePosition);
                this.updateNewBallPosition();
            }
        }
        else if(this.grabbed != null) this.leaveBall();
        
    }

    leaveBall(){
        ballArray[this.grabbed].color = "rgb(255,255,255)";
        this.grabbed = null;
    }

    lookForBall(mousePosition){
        for(var i = 0; i < ballArray.length; i++){
            if(Vector.getSubtract(ballArray[i].position, mousePosition).getLength() < ballArray[i].radius) this.grabbed = i;
        }
    }

    updateNewBallPosition(){
        document.getElementById("xPosition").value = mouse.relativePosition("ballBox").x.toFixed(0);
        document.getElementById("yPosition").value = mouse.relativePosition("ballBox").y.toFixed(0);
    }

}

function onBallDown(){
    ballBoxLogic.mousePressed = true;
}

function onBallTouchStart(event){
    mouse.position = new Vector(event.pageX, event.pageY);
    event.preventDefault();
    ballBoxLogic.mousePressed = true;
}

function onBallUp(){
    ballBoxLogic.mousePressed = false;
}

function onBallTouchEnd(event){
    mouse.position = new Vector(event.pageX, event.pageY);
    event.preventDefault();
    ballBoxLogic.mousePressed = false;
}

function onBallOut(){
    ballBoxLogic.mousePressed = false;
} 