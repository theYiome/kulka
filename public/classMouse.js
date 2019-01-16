class Mouse{
    constructor(){
        this.position = new Vector(0, 0); 
        document.onmousemove = Mouse.updateMousePosition;
        document.addEventListener("touchmove", Mouse.updateTouchPosition, false);
    }

    static updateMousePosition(event){
        mouse.position = new Vector(event.pageX, event.pageY);
    }

    static updateTouchPosition(event){
        event = event.changedTouches;
        mouse.position = new Vector(event[0].pageX, event[0].pageY);
    }

    relativePosition(elementID){
        var element = $("#"+elementID);
        return Vector.getSubtract(this.position, new Vector(element.offset().left, element.offset().top));
    }
}