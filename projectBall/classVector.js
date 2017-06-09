class Vector{

    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    setAdd(vectorB){
        this.x += vectorB.x;
        this.y += vectorB.y;
    }

    setSubtract(vectorB){
        this.x -= vectorB.x;
        this.y -= vectorB.y;
    }
    
    setMultiply(multipler){
        this.x *= multipler;
        this.y *= multipler;
    }

    setOpposite(){
        this.x *= (-1);
        this.y *= (-1);
    }

    setAbsolute(){
        if(this.x < 0) this.x *= -1;
        if(this.y < 0) this.y *= -1;
    }

    getLength(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    static getAdd(vectorA, vectorB){
        return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
    }

    static getSubtract(vectorA, vectorB){ //order matters
        return new Vector(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
    }

    static getMultiply(vectorA, multipler){
        return new Vector(vectorA.x * multipler, vectorA.y * multipler);
    }

    static getOpposite(vectorA){
        return new Vector(vectorA.x * (-1), vectorA.y * (-1));
    }

    static getDistance(vectorA, vectorB){
        return Vector.getSubtract(vectorA, vectorB).getLength();
    }
    /* NOT TESTED!
    static getCrossProduct(vectorA, vectorB){
        return (vectorA.x * vectorB.x) + (vectorA.y + vectorB.y);
    }

    static getCosAngle(vectorA, vectorB){
        return getCrossProduct(vectorA, vectorB)/(vectorA.getLength() + vectorB.getLength());
    }
    */
}