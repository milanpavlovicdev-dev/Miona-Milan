const hamburger = document.getElementById('hamburger');
const navSidebar = document.getElementById('navSidebar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navSidebar.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navSidebar.contains(e.target)) {
        hamburger.classList.remove('active');
        navSidebar.classList.remove('active');
    }
});

const envelopeScene = document.getElementById('envelopeScene');
const envelope = document.getElementById('envelope');
const letterOverlay = document.getElementById('letterOverlay');
const letterClose = document.getElementById('letterClose');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

let isOpened = false;

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

envelopeScene.addEventListener('click', () => {
    if (isOpened) return;
    isOpened = true;

    envelope.classList.add('opened');

    setTimeout(() => {
        launchHeartBurst();
    }, 400);

    setTimeout(() => {
        envelope.classList.add('fly-away');
    }, 1200);

    setTimeout(() => {
        envelopeScene.style.display = 'none';
        document.querySelector('.page-subtitle').style.display = 'none';
        letterOverlay.classList.add('active');
        launchConfetti();
    }, 1800);
});

letterClose.addEventListener('click', () => {
    letterOverlay.classList.remove('active');

    setTimeout(() => {
        envelopeScene.style.display = '';
        document.querySelector('.page-subtitle').style.display = '';
        envelope.classList.remove('opened', 'fly-away');
        isOpened = false;
    }, 400);
});

letterOverlay.addEventListener('click', (e) => {
    if (e.target === letterOverlay) {
        letterClose.click();
    }
});

function launchHeartBurst() {
    const hearts = ['💕', '💜', '💗', '✨', '💖', '💝'];
    const rect = envelopeScene.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const h = document.createElement('div');
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.cssText = `
            position: fixed;
            left: ${cx}px;
            top: ${cy}px;
            font-size: ${16 + Math.random() * 16}px;
            pointer-events: none;
            z-index: 1500;
            transition: all ${0.6 + Math.random() * 0.6}s ease-out;
            opacity: 1;
        `;
        document.body.appendChild(h);

        const angle = (Math.PI * 2 / 12) * i;
        const dist = 60 + Math.random() * 80;

        requestAnimationFrame(() => {
            h.style.left = (cx + Math.cos(angle) * dist) + 'px';
            h.style.top = (cy + Math.sin(angle) * dist - 30) + 'px';
            h.style.opacity = '0';
            h.style.transform = 'scale(0.3)';
        });

        setTimeout(() => h.remove(), 1200);
    }
}

const confettiPieces = [];

function launchConfetti() {
    confettiPieces.length = 0;

    const colors = ['#c9a5f7', '#e0c6ff', '#ff6b9d', '#feca57', '#ff9ff3', '#a29bfe', '#fd79a8'];

    for (let i = 0; i < 100; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: -20 - Math.random() * 200,
            w: 4 + Math.random() * 6,
            h: 8 + Math.random() * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 3,
            vy: 1.5 + Math.random() * 3,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            opacity: 1,
            fade: 0.002 + Math.random() * 0.003
        });
    }

    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let alive = false;

    for (const p of confettiPieces) {
        if (p.opacity <= 0) continue;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.opacity -= p.fade;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
    }

    if (alive) {
        requestAnimationFrame(animateConfetti);
    } else {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}
