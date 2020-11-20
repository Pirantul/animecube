class Cube {
    constructor(tagId, options = {}) {
        this.cube = document.getElementById(tagId);
        this.screen = document.getElementById(tagId).parentNode;
        this.options = options;
        this.screenWidth = this.screen.offsetWidth;
        this.screenHeight = this.screen.offsetHeight;
        this.elWidth = this.cube.offsetWidth;
        this.elHeight = this.cube.offsetHeight;
        this.positionLeft = this.cube.offsetLeft;
        this.positionTop = this.cube.offsetTop;
        this.speed = this.options.speed ? +this.options.speed : 1;
        this.direction = this.options.direction ? this.options.direction : "right";
        //смещаем кубик в центр, чтобы можно было двигаться в разных направлениях
        this.positionLeft = (this.screenWidth - this.elWidth)/2;
        this.positionTop = (this.screenHeight - this.elHeight)/2;
        //start
        this.move();

    }

    move() {
        requestAnimationFrame(()=>eval(`this.${this.options.direction}Move()`));
    }

    rightMove() {
        if (this.screenWidth > this.positionLeft + this.elWidth) {
            this.positionLeft = this.positionLeft + this.speed; 
            cube.style.transform = `translateX(${this.positionLeft}px) translateY(${this.positionTop}px)`;
            requestAnimationFrame(()=>this.rightMove())
        } else {
            requestAnimationFrame(()=>this.downMove())
        }
    }

    leftMove() {
        if (this.positionLeft > 0) {
            this.positionLeft = this.positionLeft - this.speed;
            cube.style.transform = `translateX(${this.positionLeft}px) translateY(${this.positionTop}px)`;
            requestAnimationFrame(()=>this.leftMove())
        } else {
            requestAnimationFrame(()=>this.upMove())
        }
    }

    upMove() {
        if (this.positionTop > 0) {
            this.positionTop = this.positionTop - this.speed; 
            cube.style.transform = `translateX(${this.positionLeft}px) translateY(${this.positionTop}px)`;
            requestAnimationFrame(()=>this.upMove())
        } else {
            requestAnimationFrame(()=>this.rightMove())
        }
    }

    downMove() {
        if (this.screenHeight > this.positionTop + this.elHeight) {
            this.positionTop = this.positionTop + this.speed; 
            cube.style.transform = `translateX(${this.positionLeft}px) translateY(${this.positionTop}px)`;
            requestAnimationFrame(()=>this.downMove())
        } else {
            requestAnimationFrame(()=>this.leftMove())
        }
    }

        
}



const cubeBlack = new Cube('cube', {speed: 10, direction: "left"}) 