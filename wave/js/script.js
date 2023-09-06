const canvas = document.getElementById("waves-canvas")

const wave = {
    x: -Math.PI * 8,
    y: window.innerHeight - 100,
    height: 15,
    frequency: 10
}

function draw() {

    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let x = wave.x
    ctx.beginPath()
    ctx.moveTo(x, wave.y)
    do {
        ctx.fillStyle = "#2af"
        
        ctx.lineTo(x, wave.y + (wave.height * Math.sin(x / 16)))
        x += Math.PI * 4
        
    } while (x < window.innerWidth + (Math.PI * 8) * 2)

    ctx.lineTo(x, window.innerHeight)
    ctx.lineTo(0, window.innerHeight)

    x = -Math.PI * 8
    ctx.lineTo(wave.x, wave.y)
    
    ctx.fill()

    wave.x -= Math.PI / 8


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