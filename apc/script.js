// script.js
const canvas = document.getElementById('oscilloscope');
const ctx = canvas.getContext('2d');
const control1 = document.getElementById('control1');
const control2 = document.getElementById('control2');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function drawWave() {
    const width = canvas.width;
    const height = canvas.height;
    const time = Date.now() / 1000;
    const frequency1 = control1.value / 100 * 10; // Adjust frequency range as needed
    const frequency2 = control2.value / 100 * 10; // Adjust frequency range as needed

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 2;

    for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin((x + time) * frequency1) * Math.sin((x + time) * frequency2) * height / 4;
        ctx.lineTo(x, y);
    }

    ctx.stroke();
}

function update() {
    drawWave();
    requestAnimationFrame(update);
}

update();
