let noClickCount = 0;
const noBtn = document.querySelector('.no-btn');
const yesBtn = document.querySelector('.yes-btn');

function createFallingHearts() {
    let heartCount = 0;
    const isMobile = window.innerWidth <= 768;
    const maxHearts = isMobile ? 60 : 150;
    const interval = isMobile ? 120 : 80;
    
    const heartInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '💓';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, isMobile ? 6000 : 12000);
        
        heartCount++;
        if (heartCount >= maxHearts) {
            clearInterval(heartInterval);
        }
    }, interval); 
}

function createMovieTracks() {
    if (document.querySelector('.tracks-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'tracks-overlay';

    const allImages = [
        'M%26M/slika1.jpg',
        'M%26M/slika2.jpg',
        'M%26M/slika3.jpg',
        'M%26M/slika4.jpg',
        'M%26M/slika5.jpg',
        'M%26M/slika6.jpg',
        'M%26M/slika7.jpg',
        'M%26M/slika8.jpg',
        'M%26M/slika9.jpg',
        'M%26M/slika10.jpg',
        'M%26M/slika11.jpg',
        'M%26M/slika12.jpg',
        'M%26M/slika13.jpg',
        'M%26M/slika14.jpg',
        'M%26M/slika15.jpg',
        'M%26M/slika16.jpg',
        'M%26M/slika17.jpg',
        'M%26M/slika18.jpg',
        'M%26M/slika19.jpg',
        'M%26M/slika20.jpg'
    ];

    const group1 = allImages.slice(0, 7);
    const group2 = allImages.slice(7, 14);
    const group3 = allImages.slice(14, 20);
    const imageGroups = [group1, group2, group3];

    const tracks = 3;
    let finished = 0;
    const isMobile = window.innerWidth <= 768;
    const framesPerTrack = isMobile ? 8 : 12;

    for (let t = 0; t < tracks; t++) {
        const track = document.createElement('div');
        track.className = 'track ' + (t % 2 === 0 ? 'ltr' : 'rtl');
        
        const currentImages = imageGroups[t];

        for (let i = 0; i < framesPerTrack; i++) {
            const frame = document.createElement('div');
            frame.className = 'frame';

            const img = document.createElement('img');
            img.src = currentImages[i % currentImages.length];
            img.alt = '';

            img.onerror = function() {
                const fb = document.createElement('div');
                fb.className = 'frame-fallback';
                fb.textContent = '❤️';
                frame.replaceChild(fb, img);
            };

            frame.appendChild(img);
            track.appendChild(frame);
        }

        track.addEventListener('animationend', () => {
            finished++;
            if (finished === tracks) {
                setTimeout(() => {
                    if (overlay.parentNode) overlay.remove();
                    document.body.style.animation = 'fade-out 0.8s ease-out forwards';
                    setTimeout(() => {
                        window.location.href = 'Glavna.html';
                    }, 800);
                }, 500);
            }
        });

        overlay.appendChild(track);
    }

    document.body.appendChild(overlay);
}

noBtn.addEventListener('click', function() {
    noClickCount++;
    
    if (noClickCount === 3) {
        noBtn.textContent = 'Da';
        noBtn.classList.remove('no-btn');
        noBtn.classList.add('yes-btn');
        noClickCount = 0; 
    }
});

yesBtn.addEventListener('click', function() {
    createFallingHearts();
    createMovieTracks();
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('yes-btn') && e.target !== yesBtn) {
        createFallingHearts();
        createMovieTracks();
    }
});