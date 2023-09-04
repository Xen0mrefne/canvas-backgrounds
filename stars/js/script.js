const canvas = document.getElementById("stars-canvas");

const starQuantity = 300;
const sizeMultiplier = 0.4;
const stars = []

function getRandomSpeed() {
    return Math.random() * 3 + 1;
}

function getRandomY() {
    return Math.ceil(Math.random() * window.innerHeight);
}

function getRandomDelay() {
    return Math.ceil(Math.random() * 1000);
}

function getBlinkColor() {
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

function coinFlip() {
    return Math.floor(Math.random() * 2) === 0;
}

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
            ctx.fillStyle = getBlinkColor();
        } else {
            ctx.fillStyle = "#fff"
        }

        ctx.beginPath()
        ctx.arc(stars[i].x, stars[i].y, stars[i].size, 0, Math.PI * 2, false)
        ctx.fill()

        if (arrived) {
            const speed = getRandomSpeed();
            stars[i].x = null;
            stars[i].y = getRandomY();
            stars[i].speed = speed;
            stars[i].size = speed * sizeMultiplier;
            stars[i].blinking = coinFlip();
        }

    }

    window.requestAnimationFrame(draw);
}

function init() {

    for (let i = 0; i < starQuantity; i++) {
        const speed = getRandomSpeed();
        stars[i] = {
            speed: speed,
            x: null,
            y: getRandomY(),
            size: speed * sizeMultiplier,
            blinking: coinFlip(),
            countdown: getRandomDelay()
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