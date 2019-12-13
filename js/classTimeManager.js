class TimeManager{
   
    constructor(){
        this.timeData = new Date().getTime();
    }

    getElapsedTime_sec(){
        return (new Date().getTime() - this.timeData)/1000;
    }

    update(){ // updates capturedTime and Returns elapsed time between current time and captured time in seconds 
        var elapsedTime_sec = this.getElapsedTime_sec();
        if(elapsedTime_sec > 0.12) elapsedTime_sec = 0;
        this.timeData = new Date().getTime();
        return elapsedTime_sec;
    }
}