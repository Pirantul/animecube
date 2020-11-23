class Cube {
    step = 0;
    distance = 0;
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
            if (this.options.moveStep.length > this.step) {
            //получаем количество пикселей, на которое надо передвинуться
            this.distance = Object.values(this.options.moveStep[this.step])[0];
            //получаем направление движения
            const directionName = Object.keys(this.options.moveStep[this.step])[0];
            switch(directionName) {
                case 'right': 
                    this.rightMove();
                    break;
                case 'left': 
                    this.leftMove();
                    break;
                case 'up': 
                    this.upMove();
                    break;
                case 'down': 
                    this.downMove();
                    break;
            }
        }
    }

    rightMove() {
        //пока не достигли края, или дистанция не закончилась
        if ((this.screenWidth > this.positionLeft + this.elWidth) && this.distance > 0) {
            this.distance = this.distance - this.speed;
            //если перебежали за край, то возвращаемся к краю
            if (this.distance < 0) {
                this.positionLeft = this.positionLeft + this.speed + this.distance;     
            } else {
                this.positionLeft = this.positionLeft + this.speed; 
            }
            cube.style.transform = `translateX(${this.positionLeft}px) translateY(${this.positionTop}px)`;
            requestAnimationFrame(()=>this.rightMove())
        } else {
            //переходим к следующему шагу
            this.step++;
            this.move();
        }
    }

    leftMove() {
        if (this.positionLeft > 0 && this.distance > 0) {
            this.distance = this.distance - this.speed;
            if (this.distance < 0) {
                this.positionLeft = this.positionLeft - this.speed - this.distance;     
            } else {
                this.positionLeft = this.positionLeft - this.speed; 
            }
            cube.style.transform = `translateX(${this.positionLeft}px) translateY(${this.positionTop}px)`;
            requestAnimationFrame(()=>this.leftMove())
        } else {
            this.step++;
            this.move();
        }
    }

    upMove() {
        if (this.positionTop > 0 && this.distance > 0) {
            this.distance = this.distance - this.speed;
            if (this.distance < 0) {
                this.positionTop = this.positionTop - this.speed - this.distance;     
            } else {
                this.positionTop = this.positionTop - this.speed;
            }             
            cube.style.transform = `translateX(${this.positionLeft}px) translateY(${this.positionTop}px)`;
            requestAnimationFrame(()=>this.upMove())
        } else {
            this.step++;
            this.move();
        }
    }

    downMove() {
        if ((this.screenHeight > this.positionTop + this.elHeight) && this.distance > 0) {
            this.distance = this.distance - this.speed;
            if (this.distance < 0) {
                this.positionTop = this.positionTop + this.speed + this.distance;     
            } else {
                this.positionTop = this.positionTop + this.speed; 
            }           
            cube.style.transform = `translateX(${this.positionLeft}px) translateY(${this.positionTop}px)`;
            requestAnimationFrame(()=>this.downMove())
        } else {
            this.step++;
            this.move();
        }
    }        
}

const cubeBlack = new Cube('cube', {
    speed: 5, 
    moveStep: [ {'right': 200}, 
                {'down': 300}, 
                {'left': 400}, 
                {'up': 500}, 
                {'left': 160}, 
                {'down': 320}, 
                {'left': 1000}, //проверяем что не заходит за край
                {'right': 340}, 
                {'up': 200}],
    }) 