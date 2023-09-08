const canvas = document.getElementById("waves-canvas")


const wave = {
    x: -Math.PI * 8,
    y: window.innerHeight - 100,
    height: 30,
    frequency: 10,
    displacement: 0
}

function draw() {

    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let x;
    x = wave.x
    ctx.beginPath()
    ctx.moveTo(x, wave.y)
    do {
        ctx.fillStyle = "#1af"
       
        ctx.lineTo(x, wave.y + (wave.height * Math.sin(x / 64 - wave.displacement)))
        x += Math.PI * 8
    } while (x < window.innerWidth + (Math.PI * 8))

    ctx.lineTo(x, window.innerHeight)
    ctx.lineTo(0, window.innerHeight)
    ctx.lineTo(0, wave.y)
    ctx.fill()
    wave.displacement += 0.1

    if (wave.displacement > Math.PI * 2) {
        wave.displacement = 0
    }

    window.requestAnimationFrame(draw)
}


function init() {


    canvas.setAttribute("width", window.innerWidth)
    canvas.setAttribute("height", window.innerHeight)


    window.addEventListener("resize", () => {
        canvas.setAttribute("width", window.innerWidth)
        canvas.setAttribute("height", window.innerHeight)
    })


    window.requestAnimationFrame(draw)
}


window.addEventListener("load", init)
