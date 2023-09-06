const canvas = document.getElementById("rain-canvas");

const rainOptions = {
    length: 40,
    quantity: 100,
    xSpeed: 7,
}

const raindrops = [];

function Randomizer() {
    this.getX = function() {
        return Math.floor(Math.random() * (window.innerWidth + rainOptions.xSpeed * 30));
    }
    this.getSpeed = function() {
        return Math.ceil(Math.random() * 10 + 20);
    }
    this.getDelay = function() {
        return Math.floor(Math.random() * 500);
    }
}

const randomizer = new Randomizer()

function draw() {
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for (let i = 0; i < rainOptions.quantity; i++) {
        if (raindrops[i].countdown > 0) {
            raindrops[i].countdown -= 1;
            continue;
        }

        if (raindrops[i].y === null) {
            raindrops[i].y = -raindrops[i].length;
        }

        let arrived = false;

        raindrops[i].x -= rainOptions.xSpeed
        raindrops[i].y += raindrops[i].speed;
        if (raindrops[i].y > window.innerHeight + raindrops[i].length) {
            arrived = true;
        }

        ctx.strokeStyle = "#ffffff80";
        ctx.lineWidth = 2

        
        ctx.beginPath();
        ctx.moveTo(raindrops[i].x, raindrops[i].y);
        ctx.lineTo(raindrops[i].x - (rainOptions.xSpeed * 1.5), raindrops[i].y + (raindrops[i].speed * 1.5));
        ctx.stroke();
        ctx.closePath();


        if (arrived) {
            raindrops[i].y = null
            raindrops[i].x = randomizer.getX()
        }
    }


    window.requestAnimationFrame(draw)
}

function init() {


    for (let i = 0; i < rainOptions.quantity; i++) {
        raindrops[i] = {
            x: randomizer.getX(),
            y: null,
            speed: randomizer.getSpeed(),
            length: rainOptions.length,
            countdown: randomizer.getDelay()
        }
    }

    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    window.addEventListener("resize", () => {
        canvas.setAttribute("width", window.innerWidth);
        canvas.setAttribute("height", window.innerHeight);
    })

    window.requestAnimationFrame(draw)
}

window.addEventListener("load", init)