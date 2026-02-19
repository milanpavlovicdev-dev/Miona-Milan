/* ========== NAV ========== */
const hamburger = document.getElementById('hamburger');
const navSidebar = document.getElementById('navSidebar');

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

/* ========== PODACI - FILMOVI & SERIJE ========== */
const WATCH_LIST = [
    /* ===== FILMOVI ===== */
    {
        title: '500 Days of Summer',
        type: 'film',
        emoji: '🌻',
        genre: 'Romansa / Drama',
        comment: 'Nije ljubavna priča — ali jeste naša vrsta filma.',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        title: 'Deadpool & Wolverine',
        type: 'film',
        emoji: '⚔️',
        genre: 'Akcija / Komedija',
        comment: 'Najluđi duo — smeh od početka do kraja.',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        title: 'Deadpool',
        type: 'film',
        emoji: '💀',
        genre: 'Akcija / Komedija',
        comment: 'Gde je sve počelo — neuništivi antihero.',
        rating: '⭐⭐⭐⭐'
    },
    {
        title: 'Deadpool 2',
        type: 'film',
        emoji: '💣',
        genre: 'Akcija / Komedija',
        comment: 'Još luđi nastavak sa još više smeha.',
        rating: '⭐⭐⭐⭐'
    },
    {
        title: 'The Notebook',
        type: 'film',
        emoji: '💌',
        genre: 'Romansa / Drama',
        comment: 'Klasik nad klasicima. Suze garantovane.',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        title: 'Titanic',
        type: 'film',
        emoji: '🚢',
        genre: 'Romansa / Drama',
        comment: 'Jack i Rose — večna ljubavna priča na moru.',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        title: 'Free Guy',
        type: 'film',
        emoji: '🎮',
        genre: 'Komedija / Akcija',
        comment: 'Kad NPC postane heroj — genijalno i zabavno!',
        rating: '⭐⭐⭐⭐'
    },
    {
        title: 'The Proposal',
        type: 'film',
        emoji: '💍',
        genre: 'Romansa / Komedija',
        comment: 'Sandra i Ryan = savršena kombinacija.',
        rating: '⭐⭐⭐⭐'
    },
    {
        title: 'Green Lantern',
        type: 'film',
        emoji: '💚',
        genre: 'Akcija / Fantazija',
        comment: 'Ryan Reynolds u zelenom — klasika.',
        rating: '⭐⭐⭐'
    },
    {
        title: 'Just Friends',
        type: 'film',
        emoji: '😂',
        genre: 'Romansa / Komedija',
        comment: 'Kad se prijateljstvo pretvori u nešto više.',
        rating: '⭐⭐⭐⭐'
    },
    {
        title: 'The Addams Family',
        type: 'film',
        emoji: '🖤',
        genre: 'Komedija / Horor',
        comment: 'Najčudnija ali najsimpatičnija porodica.',
        rating: '⭐⭐⭐⭐'
    },

    /* ===== SERIJE ===== */
    {
        title: 'The Summer I Turned Pretty',
        type: 'serija',
        emoji: '🌊',
        genre: 'Romansa / Drama',
        comment: 'Leto, ljubav i teške odluke. Prelepa serija.',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        title: 'Life with the Walter Boys',
        type: 'serija',
        emoji: '🏡',
        genre: 'Romansa / Drama',
        comment: 'Nova kuća, novi život, novi momci — haos!',
        rating: '⭐⭐⭐⭐'
    },
    {
        title: 'Stranger Things',
        type: 'serija',
        emoji: '👾',
        genre: 'Sci-Fi / Horor',
        comment: 'Upside Down i ekipa — neizostavna serija.',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        title: 'Alice in Borderland',
        type: 'serija',
        emoji: '🃏',
        genre: 'Triler / Sci-Fi',
        comment: 'Igre na život i smrt — napetost do poslednjeg trenutka.',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        title: 'XO, Kitty',
        type: 'serija',
        emoji: '💋',
        genre: 'Romansa / Komedija',
        comment: 'Kitty u Koreji — slatko, zabavno i romantično.',
        rating: '⭐⭐⭐⭐'
    }
];

/* ========== GENERISANJE KARTICA ========== */
function buildCards() {
    const container = document.getElementById('filmoviContainer');
    if (!container) return;

    container.innerHTML = '';

    WATCH_LIST.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'film-card';
        card.dataset.filter = item.type;
        card.style.animationDelay = `${(i + 1) * 0.08}s`;

        const typeLabel = item.type === 'film' ? '🎥 Film' : '📺 Serija';

        card.innerHTML = `
            <span class="card-type ${item.type}">${typeLabel}</span>
            <span class="card-emoji">${item.emoji}</span>
            <div class="card-title">${item.title}</div>
            <div class="card-genre">${item.genre}</div>
            <div class="card-comment">${item.comment}</div>
            <div class="card-rating">${item.rating}</div>
        `;

        container.appendChild(card);
    });

    updateStats();
}

/* ========== STATISTIKE ========== */
function updateStats() {
    const films = WATCH_LIST.filter(i => i.type === 'film').length;
    const series = WATCH_LIST.filter(i => i.type === 'serija').length;

    document.getElementById('totalCount').textContent = WATCH_LIST.length;
    document.getElementById('movieCount').textContent = films;
    document.getElementById('seriesCount').textContent = series;
}

/* ========== FILTERI ========== */
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            const cards = document.querySelectorAll('.film-card');

            cards.forEach(card => {
                if (filter === 'all' || card.dataset.filter === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', function() {
    buildCards();
    setupFilters();
});
