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
        this.colors = ['#ff0000', '#ffff00', '#00ffff', '#0000ff']
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