class Ball{

    constructor(vec_position, vec_velocity, mass, radius, color = "rgb(255,255,255)"){
        this.position = vec_position;
        this.velocity = vec_velocity; // pixels per second
        this.mass     = mass;
        this.radius   = radius; // in pixels
        this.color    = color;  // string like "rgb(255,255,255)"
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(elapsed_time){
        this.position.setAdd(Vector.getMultiply(this.velocity, elapsed_time));
    }

    static wall_collision(A, elapsed_time){
        var future_position = new Vector(A.position.x + (A.velocity.x * elapsed_time), A.position.y + (A.velocity.y * elapsed_time));           
        if(future_position.y > canvas.height - A.radius || future_position.y < 0 + A.radius) A.velocity.y = -(A.velocity.y);
        if(future_position.x > canvas.width  - A.radius || future_position.x < 0 + A.radius) A.velocity.x = -(A.velocity.x);
    }

static ball_collision(A, B){
        let m1 = A.mass;
        let m2 = B.mass;
        let v1 = A.velocity.getLength();
        let v2 = B.velocity.getLength();
        let θ1 = Math.atan2(A.velocity.y, A.velocity.x);
        let θ2 = Math.atan2(B.velocity.y, B.velocity.x);
        let φ  = Math.PI + Math.atan2(Math.abs(A.position.x - B.position.x), Math.abs(A.position.y - B.position.y));

        A.velocity.x = ((v1*Math.cos(θ1-φ)*(m1-m2) + 2*m2*v2*Math.cos(θ2-φ))/(m1+m2))*Math.cos(φ) 
        + v1*Math.sin(θ1-φ)*Math.cos(φ + (Math.PI/2));

        A.velocity.y = ((v1*Math.cos(θ1-φ)*(m1-m2) + 2*m2*v2*Math.cos(θ2-φ))/(m1+m2))*Math.sin(φ) 
        + v1*Math.sin(θ1-φ)*Math.sin(φ + (Math.PI/2));

        B.velocity.x = ((v2*Math.cos(θ2-φ)*(m2-m1) + 2*m1*v1*Math.cos(θ1-φ))/(m2+m1))*Math.cos(φ)
        + v2*Math.sin(θ2-φ)*Math.cos(φ + (Math.PI/2));

        B.velocity.y = ((v2*Math.cos(θ2-φ)*(m2-m1) + 2*m1*v1*Math.cos(θ1-φ))/(m2+m1))*Math.sin(φ)
        + v2*Math.sin(θ2-φ)*Math.sin(φ + (Math.PI/2));
    }
}