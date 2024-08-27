const canvas = document.getElementById('oscilloscope');
const ctx = canvas.getContext('2d');
const control1 = document.getElementById('control1');
const control2 = document.getElementById('control2');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Configuración de audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const carrierOscillator = audioContext.createOscillator();
const modulatorOscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();
const modulatorGain = audioContext.createGain();

// Configuración del oscilador portador (carrier)
carrierOscillator.type = 'sine'; // Tipo de onda
carrierOscillator.connect(gainNode);

// Configuración del oscilador modulador (modulator)
modulatorOscillator.type = 'sine'; // Tipo de onda
modulatorOscillator.connect(modulatorGain);
modulatorGain.connect(carrierOscillator.frequency); // La frecuencia del carrier se modula por el modulador

// Ajustar el rango de frecuencia de los osciladores
function updateFrequencies() {
    const frequency1 = control1.value / 100 * 1000; // Frecuencia del oscilador portador
    const frequency2 = control2.value / 100 * 1000; // Frecuencia del oscilador modulador

    carrierOscillator.frequency.setValueAtTime(frequency1, audioContext.currentTime);
    modulatorOscillator.frequency.setValueAtTime(frequency2, audioContext.currentTime);
    modulatorGain.gain.setValueAtTime(frequency2 / 100, audioContext.currentTime); // Ajustar la amplitud del modulador
}

gainNode.connect(audioContext.destination);
carrierOscillator.start();
modulatorOscillator.start();

// Actualizar frecuencias cuando cambien los controles
control1.addEventListener('input', updateFrequencies);
control2.addEventListener('input', updateFrequencies);


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
