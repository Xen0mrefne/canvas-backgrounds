const canvas = document.getElementById("stars-canvas");

const starQuantity = 300;
const sizeMultiplier = 0.4;
const stars = []

function Randomizer() {
    this.getSpeed = function() {
        return Math.random() * 3 + 1;
    }
    this.getY = function() {
        return Math.ceil(Math.random() * window.innerHeight);
    }
    this.getDelay = function() {
        return Math.ceil(Math.random() * 1000);
    }
    this.getBlinkColor = function() {
        const value = Math.floor(Math.random() * 3);
        switch (value) {
            case 0:
                return "#fff"
            case 1: 
                return "#f00"
            case 2:
                return "#00f"
        }
    }
    this.coinFlip = function() {
        return Math.floor(Math.random() * 2) === 0;
    }
}

const randomizer = new Randomizer()

function draw() {

    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)


    for(let i = 0; i < starQuantity; i++) {
        if (stars[i].countdown > 0) {
            stars[i].countdown -= 1;
            continue;
        }

        if (stars[i].x === null) {
            stars[i].x = window.innerWidth + stars[i].size
        }

        let arrived = false;

        stars[i].x -= stars[i].speed;
        if (stars[i].x < -stars[i].size) {
            arrived = true;
        }

        if (stars[i].blinking) {
            ctx.fillStyle = randomizer.getBlinkColor();
        } else {
            ctx.fillStyle = "#fff"
        }

        ctx.beginPath()
        ctx.arc(stars[i].x, stars[i].y, stars[i].size, 0, Math.PI * 2, false)
        ctx.fill()

        if (arrived) {
            const speed = randomizer.getSpeed();
            stars[i].x = null;
            stars[i].y = randomizer.getY();
            stars[i].speed = speed;
            stars[i].size = speed * sizeMultiplier;
            stars[i].blinking = randomizer.coinFlip();
        }

    }

    window.requestAnimationFrame(draw);
}

function init() {

    for (let i = 0; i < starQuantity; i++) {
        const speed = randomizer.getSpeed();
        stars[i] = {
            speed: speed,
            x: null,
            y: randomizer.getY(),
            size: speed * sizeMultiplier,
            blinking: randomizer.coinFlip(),
            countdown: randomizer.getDelay()
        }
    }

    canvas.setAttribute("width", window.innerWidth)
    canvas.setAttribute("height", window.innerHeight)   
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
    canvas.setAttribute("width", window.innerWidth)
    canvas.setAttribute("height", window.innerHeight) 
})
window.addEventListener("load", init)