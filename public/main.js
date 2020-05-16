const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-6;
canvas.height = window.innerHeight-6;

const ctx = canvas.getContext('2d');

let coord = getCoord();

radius = 30;
var circles = [];
for (i=0;i<100;i++) {
    coord = getCoord();
    radius = Math.random()*40;
    circles.push( new Circle(coord.x, coord.y, radius));  
}

animate();

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for (i=0;i<circles.length;i++){
        circles[i].update();
    }
}

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xdir = Math.round((Math.random() - .5) * 2);
    this.ydir = Math.round((Math.random() - .5) * 2);
    this.color = getColor();

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke(); 
    }

    this.update = function() {
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
        this.draw();     
    }
}

function getCoord() {
    let x = Math.floor(Math.random() * (window.innerWidth - 80))+40;
    let y = Math.floor(Math.random() * (window.innerHeight - 80))+40;
    return { x: x, y: y };
}

function getColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}