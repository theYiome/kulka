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

    static wall_collision(A, elapsed_time) {
        const radius = A.radius;
        if (A.position.x - radius < 0) {
            A.position.x = radius;
            A.velocity.x = -(A.velocity.x)
        }
        if (A.position.y - radius < 0){
            A.position.y = radius;
            A.velocity.y = -(A.velocity.y)
        }
        if (A.position.x + radius > canvas.width){
            A.position.x = canvas.width - radius;
            A.velocity.x = -(A.velocity.x)
        }
        if (A.position.y + radius > canvas.height){
            A.position.y = canvas.height - radius;
            A.velocity.y = -(A.velocity.y)
        }
    }

    static ball_collision(A, B){
        const m1 = A.mass;
        const m2 = B.mass;
        let x1 = A.position;
        let x2 = B.position;
        // Position correction
        let xH = Vector.getSubtract(x2, x1);
        if (xH.getLength() < 0.00001) { // To avoid dividing by zero
            A.position.x = x1.x = x1.x + Math.random();
            A.position.y = x1.y = x1.y + Math.random();
            xH = Vector.getSubtract(x2, x1);
        }
        const k = (A.radius + B.radius) / xH.getLength();
        const displacement = Vector.getMultiply(xH, k - 1);

        A.position = x1 = Vector.getSubtract(x1, Vector.getMultiply(displacement, m2 / (m1 + m2)));
        B.position = x2 = Vector.getAdd(x2, Vector.getMultiply(displacement, m1 / (m1 + m2)));
        // New velocity calculation 
        const v1 = A.velocity;
        const v2 = B.velocity;

        const v1_componentA = ((2 * m2) / (m1 + m2));
        const v1_componentB = Vector.getDotProduct(Vector.getSubtract(v1, v2), Vector.getSubtract(x1, x2)) / Math.pow(Vector.getSubtract(x1, x2).getLength(), 2);
        const v1_new = Vector.getSubtract(v1, Vector.getMultiply(Vector.getSubtract(x1, x2), v1_componentA * v1_componentB));

        const v2_componentA = ((2 * m1) / (m1 + m2));
        const v2_componentB = Vector.getDotProduct(Vector.getSubtract(v2, v1), Vector.getSubtract(x2, x1)) / Math.pow(Vector.getSubtract(x2, x1).getLength(), 2);
        const v2_new = Vector.getSubtract(v2, Vector.getMultiply(Vector.getSubtract(x2, x1), v2_componentA * v2_componentB));

        A.velocity = v1_new;
        B.velocity = v2_new;
        return;
    }
}