// Welcome Overlay Logic
window.addEventListener('load', () => {
    const welcomeOverlay = document.getElementById('welcome-overlay');
    document.body.classList.add('no-scroll');

    setTimeout(() => {
        welcomeOverlay.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        // Optional: Remove the overlay from DOM after transition for performance
        welcomeOverlay.addEventListener('transitionend', () => {
            welcomeOverlay.remove();
        }, { once: true });
    }, 4000); // Adjust time as needed for animation
});

// Theme Toggle Logic
const themeToggleButton = document.getElementById('theme-toggle-button');
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
});

// Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseover', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Plexus Background
const canvas = document.getElementById('plexus-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#00ffff';
        ctx.fill();
    }
    // check particle position, check mouse position, move the particle, draw the particle
    update() {
        //check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        //check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x+=10;
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x-=10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y+=10;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y-=10;
            }
        }
        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw();
    }
}

// create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#00ffff';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// check if particles are close enough to draw line between them
function connect(){
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle='rgba(0,255,255,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Noise Background
const noiseCanvas = document.getElementById('noise-canvas');
const noiseCtx = noiseCanvas.getContext('2d');

function drawNoise() {
    noiseCtx.clearRect(0, 0, noiseCanvas.width, noiseCtx.height);
    noiseCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';

    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * noiseCanvas.width;
        const y = Math.random() * noiseCanvas.height;
        const size = Math.random() * 1.5;
        noiseCtx.fillRect(x, y, size, size);
    }
}

function animateNoise() {
    drawNoise();
    requestAnimationFrame(animateNoise);
}

// resize event
window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80));
        init();
        noiseCanvas.width = innerWidth;
        noiseCanvas.height = innerHeight;
    }
);

// mouse out event
window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

init();
animate();
animateNoise();