class Square {
    constructor(ctx, x, y, xLen, yLen) {
        this.ctx = ctx;
        this.colors = [];
        this.initColors();
        this.colorIdx = Math.floor(Math.random() * this.colors.length);
        this.x = x;
        this.y = y;
        this.xLen = xLen;
        this.yLen = yLen;
        this.xdir = Math.round((Math.random() - .5) * 1.5);
        this.ydir = Math.round((Math.random() - .5) * 1.5);
    }

    initColors() {
        // for (let c = 0; c < 5; c++) {
        //     let r = Math.floor(Math.random() * 255);
        //     let g = Math.floor(Math.random() * 255);
        //     let b = Math.floor(Math.random() * 255);
        //     this.colors.push(`rgb(${r},${g},${b})`);
        // }
        this.colors = ['#000000', '#ff0000', '#0000ff', '#f00011']
        // this.colors[0] = "#ff0000";
        // this.colors[1] = "#00ff00";
        // this.colors[2] = "#0000ff";
        // this.colors[3] = "#ff00f0";
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.xLen, this.yLen);
        //        ctx.strokeStyle = this.color;
        //        ctx.stroke();
        this.ctx.fillStyle = this.colors[this.colorIdx];
        this.ctx.fill();
    }

    update() {

        if (this.xdir == 0 && this.ydir == 0){
            this.xdir = Math.round((Math.random() - .3) * 1.5);
            this.ydir = Math.round((Math.random() - .5) * 1.5);
        }

        if (Math.random() > .96){
            this.xdir = Math.round((Math.random() - .3) * 1.5);
        }

        if (Math.random() > .96){
            this.ydir = Math.round((Math.random() - .3) * 1.5);
        }

        this.y += this.ydir;
        if (this.y  > innerHeight-(this.yLen)) {
            this.y = this.yLen;
            this.colorIdx = Math.floor(Math.random() * this.colors.length);
        }
        this.x += this.xdir;
        if (this.x  > innerWidth) {
            this.x = this.xLen;
            this.colorIdx = Math.floor(Math.random() * this.colors.length);

        }
        if (this.x < 0) {
            this.x = innerWidth-this.xLen;
            this.colorIdx = Math.floor(Math.random() * this.colors.length);
        }
        if (this.y < 0) {
            this.y = innerHeight-this.yLen;
            this.colorIdx = Math.floor(Math.random() * this.colors.length);
        }
        this.draw();
    }
}

class Circle {
    constructor(ctx, x, y, radius) {
        this.ctx = ctx;
        this.colors = [];
        this.initColors();
        this.colorIdx = Math.floor(Math.random() * this.colors.length);
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xdir = Math.round((Math.random() - .5) * 1.5);
        this.ydir = Math.round((Math.random() - .5) * 1.5);
        console.log('x',this.xdir);
        console.log(this.ydir);
        this.originalRad = radius;
    }

    initColors() {
        // for (let c = 0; c < 5; c++) {
        //     let r = Math.floor(Math.random() * 255);
        //     let g = Math.floor(Math.random() * 255);
        //     let b = Math.floor(Math.random() * 255);
        //     this.colors.push(`rgb(${r},${g},${b})`);
        // }
        this.colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
        // this.colors[0] = "#ff0000";
        // this.colors[1] = "#00ff00";
        // this.colors[2] = "#0000ff";
        // this.colors[3] = "#ff00f0";
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //        ctx.strokeStyle = this.color;
        //        ctx.stroke();
        this.ctx.fillStyle = this.colors[this.colorIdx];
        this.ctx.fill();
    }
    update() {
        if (this.xdir == 0) {
            this.xdir = 1;
        }
        if (this.ydir == 0) {
            this.ydir = 1;
        }
        this.y += this.ydir;
        if (this.y + radius > innerHeight) {
            this.ydir = -this.ydir;
        }
        if (this.y - radius < 1) {
            this.ydir = -this.ydir;
        }
        this.x += this.xdir;
        if (this.x + radius > innerWidth) {
            this.xdir = -this.xdir;
        }
        if (this.x - radius < 1) {
            this.xdir = -this.xdir;
        }
        if (
            (mouse.x - this.x < 50) &&
            (mouse.x - this.x > -50) &&
            (mouse.y - this.y < 50) &&
            (mouse.y - this.y > -50)
        ) {
            this.radius++;
        } else {
            if (this.radius > this.originalRad) {
                this.radius--;
            }
        }
        this.draw();
    }
}

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-6;
canvas.height = window.innerHeight-6;

const ctx = canvas.getContext('2d');

let coord = getCoord();
var mouse = {
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove', (e)=> {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth - 6;
    canvas.height = window.innerHeight - 6;
    init();
});

radius = 30;
var circles = [];
var square = null;
init();

function init() {
    circles = [];
    square = new Square(ctx, innerWidth/2, innerHeight/2, 20,20);

    for (i = 0; i < 10; i++) {
        coord = getCoord();
        radius = (Math.floor(Math.random() * 10)) + 3;
        let c = new Circle(ctx, coord.x, coord.y, radius)
        circles.push(c);
    }
}

animate();

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for (i=0;i<circles.length;i++){
        circles[i].update();
    }
    square.update();
}

function getCoord() {
    let x = Math.floor(Math.random() * (window.innerWidth - 80))+40;
    let y = Math.floor(Math.random() * (window.innerHeight - 80))+40;
    return { x: x, y: y };
}
