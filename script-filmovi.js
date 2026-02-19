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
        poster: 'https://image.tmdb.org/t/p/w500/qXAuQ9hF30sQRsXf40OfRVl0MJZ.jpg',
        genre: 'Romansa / Drama',
        comment: '...'
    },
    {
        title: 'Deadpool & Wolverine',
        type: 'film',
        poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
        genre: 'Akcija / Komedija',
        comment: '...'
    },
    {
        title: 'Deadpool',
        type: 'film',
        poster: 'https://image.tmdb.org/t/p/w500/3E53WEZJqP6aM84D8CckXx4pIHw.jpg',
        genre: 'Akcija / Komedija',
        comment: '...'
    },
    {
        title: 'Deadpool 2',
        type: 'film',
        poster: 'https://image.tmdb.org/t/p/w500/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg',
        genre: 'Akcija / Komedija',
        comment: '...'
    },
    {
        title: 'The Notebook',
        type: 'film',
        poster: 'https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg',
        genre: 'Romansa / Drama',
        comment: '...'
    },
    {
        title: 'Titanic',
        type: 'film',
        poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
        genre: 'Romansa / Drama',
        comment: '...'
    },
    {
        title: 'Free Guy',
        type: 'film',
        poster: 'https://image.tmdb.org/t/p/w500/dxraF0qPr1OEgJk17ltQTO84kQF.jpg',
        genre: 'Komedija / Akcija',
        comment: '...'
    },
    {
        title: 'The Proposal',
        type: 'film',
        poster: 'https://image.tmdb.org/t/p/w500/6stnAm1wSek8ZrislwK4xGTyCnt.jpg',
        genre: 'Romansa / Komedija',
        comment: '...'
    },
    {
        title: 'Green Lantern',
        type: 'film',
        poster: 'https://image.tmdb.org/t/p/w500/fj21HwUprqjjwTdkKC1XZurRSpV.jpg',
        genre: 'Akcija / Fantazija',
        comment: '...'
    },
    {
        title: 'Just Friends',
        type: 'film',
        poster: 'https://image.tmdb.org/t/p/w500/lh2EUTVOcESkdEOcsjYEW6qS1U0.jpg',
        genre: 'Romansa / Komedija',
        comment: '...'
    },
    {
        title: 'The Addams Family',
        type: 'film',
        poster: 'https://image.tmdb.org/t/p/w500/qFf8anju5f2epI0my8RdwwIXFIP.jpg',
        genre: 'Komedija / Horor',
        comment: '...'
    },

    /* ===== SERIJE ===== */
    {
        title: 'The Summer I Turned Pretty',
        type: 'serija',
        poster: 'https://image.tmdb.org/t/p/w500/xBIz53wYWsKfFpN0TaizVAjKJ0z.jpg',
        genre: 'Romansa / Drama',
        comment: '...'
    },
    {
        title: 'Life with the Walter Boys',
        type: 'serija',
        poster: 'https://image.tmdb.org/t/p/w500/jg3YdxDNlxay0NWTxgAPif647Hj.jpg',
        genre: 'Romansa / Drama',
        comment: '...'
    },
    {
        title: 'Stranger Things',
        type: 'serija',
        poster: 'https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg',
        genre: 'Sci-Fi / Horor',
        comment: '...'
    },
    {
        title: 'Alice in Borderland',
        type: 'serija',
        poster: 'https://image.tmdb.org/t/p/w500/Ac8ruycRXzgcsndTZFK6ouGA0FA.jpg',
        genre: 'Triler / Sci-Fi',
        comment: '...'
    },
    {
        title: 'XO, Kitty',
        type: 'serija',
        poster: 'https://image.tmdb.org/t/p/w500/hxvTdKAwv27PUfpXOQp6AwWr6V.jpg',
        genre: 'Romansa / Komedija',
        comment: '...'
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
            <div class="card-poster">
                <img src="${item.poster}" alt="${item.title}" loading="lazy">
                <span class="card-type ${item.type}">${typeLabel}</span>
            </div>
            <div class="card-body">
                <div class="card-title">${item.title}</div>
                <div class="card-genre">${item.genre}</div>
                <div class="card-comment">${item.comment}</div>
            </div>
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
