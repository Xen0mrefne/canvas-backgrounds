const canvas = document.getElementById("worm_canvas");


const worms = []
const wormQuantity = 50;
const wormLength = 8;
const segmentRadius = 15;
const segmentY = 10;

function Randomizer() {
    this.getY = function() {
        return Math.ceil(Math.random() * window.innerHeight);
    }
    this.getSpeed = function() {
        return (Math.random() * 4) + 2;
    }
    this.coinFlip = function() {
        return Math.floor(Math.random() * 2) === 0;
    }
    this.getDelay = function() {
        return Math.floor(Math.random() * 500);
    }
}

const randomizer = new Randomizer();

function draw() {
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for (let i = 0; i < wormQuantity; i++) {
        if (worms[i].countdown > 0) {
            worms[i].countdown -= 1;
            continue;
        }

        if (worms[i].x === null) {
            if (worms[i].fromLeft) 
                worms[i].x = -wormLength * (segmentRadius * 2);
             else 
                worms[i].x = window.innerWidth + segmentRadius;
        }

        let arrived = false;

        if (worms[i].fromLeft) {
            worms[i].x += worms[i].speed;
            if (worms[i].x > window.innerWidth + segmentRadius) {
                arrived = true
            }
        } else {
            worms[i].x -= worms[i].speed;
            if (worms[i].x < -wormLength * (segmentRadius * 2)) {
                arrived = true
            }
        }

    
    
        for(let j = 0; j < wormLength; j++) {
            if (!worms[i].segments[j]) {
                worms[i].segments[j] = {
                    y: worms[i].fromLeft ? j * worms[i].speed : -j * worms[i].speed
                }
            } else {
                worms[i].segments[j].y += 0.2 * worms[i].speed
            }

            ctx.fillStyle = `hsl(0, 70%, ${worms[i].fromLeft ? 100 - (100 / wormLength) * (j + 1) : (100 / wormLength) * j}%)`
            ctx.beginPath();
            ctx.arc(
                worms[i].x + (j * (segmentRadius * 2)),
                worms[i].y + (30 * Math.sin(worms[i].segments[j].y / 12)),
                segmentRadius,
                0,
                Math.PI * 2,
                false
            );
            ctx.fill();
        }

        if (arrived) {
            worms[i].x = null;
            worms[i].y = randomizer.getY();
            worms[i].speed = randomizer.getSpeed();
            worms[i].segments = [];
        }
    }


    

    window.requestAnimationFrame(draw)
}

function init() {
    for (let i = 0; i < wormQuantity; i++) {
        worms[i] = {
            speed: randomizer.getSpeed(),
            x: null,
            y: randomizer.getY(),
            fromLeft: randomizer.coinFlip(),
            segments: [],
            countdown: randomizer.getDelay()
        }
    }
    canvas.setAttribute("width", window.innerWidth)
    canvas.setAttribute("height", window.innerHeight)   
    window.requestAnimationFrame(draw);
}

window.addEventListener("load", init)
window.addEventListener("resize", () => {
    canvas.setAttribute("width", window.innerWidth)
    canvas.setAttribute("height", window.innerHeight)
})