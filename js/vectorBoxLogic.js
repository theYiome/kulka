class VectorBox{
    constructor(){
        this.booleanUpdate = false;
        this.booleanStoppedByOut = false;
        this.vectorCanvas = $('#vectorCanvas')[0];
    }

    update(){
        if(this.booleanUpdate){
            document.getElementById("xVelocity").value = (mouse.relativePosition("vectorCanvas").x - this.vectorCanvas.width/2).toFixed(0) * 4;
            document.getElementById("yVelocity").value = (mouse.relativePosition("vectorCanvas").y - this.vectorCanvas.height/2).toFixed(0) * 4;
            var ctx = this.vectorCanvas.getContext('2d');

            ctx.clearRect(0, 0, this.vectorCanvas.width, this.vectorCanvas.height);
            ctx.beginPath();
            ctx.moveTo(this.vectorCanvas.width/2, this.vectorCanvas.height/2);
            ctx.lineTo(mouse.relativePosition("vectorCanvas").x, mouse.relativePosition("vectorCanvas").y);
            ctx.lineWidth=4;
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(this.vectorCanvas.width/2, this.vectorCanvas.height/2, 8, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'gold';
            ctx.fill();
            ctx.closePath();
        }
    }

}

function onVectorDown(){
    vectorBoxLogic.booleanUpdate = true;
}

function onVectorTouchStart(event){
    mouse.position = new Vector(event.pageX, event.pageY);
    event.preventDefault();
    vectorBoxLogic.booleanUpdate = true;
}

function onVectorUp(){
    vectorBoxLogic.booleanUpdate = false;
}

function onVectorTouchEnd(event){
    mouse.position = new Vector(event.pageX, event.pageY);
    event.preventDefault();
    vectorBoxLogic.booleanUpdate = false;
}

function onVectorOut(){
    if(vectorBoxLogic.booleanUpdate){
        vectorBoxLogic.booleanUpdate = false;
        vectorBoxLogic.booleanStoppedByOut = true;
    }
}

function onVectorOver(){
    if(vectorBoxLogic.booleanStoppedByOut === true){
        vectorBoxLogic.booleanUpdate = true;
        vectorBoxLogic.booleanStoppedByOut = false;
    }
}