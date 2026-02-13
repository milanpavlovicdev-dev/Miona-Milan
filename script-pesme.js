const hamburger = document.getElementById('hamburger');
const navSidebar = document.getElementById('navSidebar');
const categoryBtns = document.querySelectorAll('.category-btn');
const poemCards = document.querySelectorAll('.poem-card');
const modal = document.getElementById('poemModal');
const modalClose = document.getElementById('modalClose');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalText = document.getElementById('modalText');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navSidebar.classList.toggle('active');
});

document.addEventListener('click', function(e) {
    if (!navSidebar.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navSidebar.classList.remove('active');
    }
});

categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        categoryBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.dataset.category;
        
        poemCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

function openPoem(btn) {
    const card = btn.closest('.poem-card');
    const icon = card.querySelector('.poem-icon').textContent;
    const title = card.querySelector('h3').textContent;
    const date = card.querySelector('.poem-date').textContent;
    const fullText = card.querySelector('.poem-full').innerHTML;
    
    modalIcon.textContent = icon;
    modalTitle.textContent = title;
    modalDate.textContent = date;
    modalText.innerHTML = fullText;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        } else if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

const lightbox = document.getElementById('photoLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxRotate = document.getElementById('lightboxRotate');
let currentRotation = 0;

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('poem-photo') && e.target.src && !e.target.src.endsWith('/')) {
        const src = e.target.getAttribute('src');
        if (src && src !== '') {
            lightboxImg.src = src;
            lightboxImg.alt = e.target.alt;
            currentRotation = 0;
            lightboxImg.style.transform = 'rotate(0deg)';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
});

lightboxRotate.addEventListener('click', function() {
    currentRotation += 90;
    lightboxImg.style.transform = 'rotate(' + currentRotation + 'deg)';
});

lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});
