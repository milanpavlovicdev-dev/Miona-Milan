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

function scrollToCard(place) {
    const card = document.querySelector(`.place-card[data-place="${place}"]`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.transform = 'scale(1.03)';
        card.style.boxShadow = '0 15px 40px rgba(46,196,182,0.3)';
        setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
        }, 1500);
    }
}

function toggleCities(btn) {
    const content = btn.nextElementSibling;
    btn.classList.toggle('open');
    content.classList.toggle('open');
}

/* ==========================================
   KONFIGURACIJA - OVDE DODAJEŠ NOVE DRŽAVE!
   ==========================================
   
   Za svaku državu dodaj novi objekat u PLACES niz.
   
   Polja:
     id        - jedinstveni ID (bez razmaka, mala slova)
     name      - ime države
     emoji     - zastava emoji
     type      - 'visited' ili 'dream'
     date      - datum ili tekst za karticu
     story     - opis/priča za karticu
     tags      - niz tagova ['🏖️ Plaža', '🌅 Zalasci']
     svgClass  - CSS klasa/ID u SVG mapi (npr '.Spain', '#RS')
                 Otvori world-map.svg i nađi class="..." ili id="..."
     cities    - niz gradova za mapu i karticu:
       { name, x, y }               - ime, x i y koordinata u SVG-u
       { name, x, y, story }        - sa opisom za karticu
       { name, x, y, anchor:'end' } - tekst levo od tačkice
   
   Koordinate (x, y): SVG viewBox je 2000x857.
   Nađi državu u world-map.svg, pogledaj path koordinate.
   ========================================== */

const PLACES = [
    /* ===== POSETILI SMO ===== */
    {
        id: 'srbija',
        name: 'Srbija',
        emoji: '🇷🇸',
        type: 'visited',
        date: 'Naš dom 🏠',
        story: 'Ovde je sve počelo. Naše šetnje, naši filmski maratoni, naši zagrljaji. Mesto gde je naša ljubav procvetala.',
        tags: ['🏠 Dom', '❤️ Početak', '🌆 Šetnje'],
        svgClass: '#RS, #XK',
        cities: [
            { name: 'Beograd', x: 1090, y: 214, story: 'Naše šetnje po Dedinju, ljuljaška, proslave...' },
            { name: 'Novi Sad', x: 1087, y: 211, anchor: 'end', story: 'Najukusnija pasta, duge šetnje, smeh.' },
            { name: 'Tara', x: 1088, y: 219, anchor: 'end', story: 'Planinska magija — svež vazduh, šume i Harry Potter filmovi.' },
            { name: 'Aranđelovac', x: 1091, y: 217, story: 'Školski izlet.' }
        ]
    },
    {
        id: 'grcka',
        name: 'Grčka',
        emoji: '🇬🇷',
        type: 'visited',
        date: 'Leto 2024',
        story: 'Sunce, more i mi dvoje. Grčka je bila predivna u maju — obilasci gradova, prelepi zalasci sunca i trenuci koji će zauvek ostati u našim srcima.',
        tags: ['🏖️ Plaža', '🌅 Zalasci', '🍦 Sladoled'],
        svgClass: '.Greece',
        cities: [
            { name: 'Solun', x: 1105.66, y: 240.19, anchor: 'end', story: 'Bela kula, obala i prelepa atmosfera.' },
            { name: 'Afytos', x: 1108.56, y: 243.64, anchor: 'end', story: 'Obilazak' },
            { name: 'Skala Fourkas', x: 1108.50, y: 244.19, anchor: 'end', story: 'Obilazak' },
            { name: 'Kriopigi', x: 1108.85, y: 243.90, story: 'Hotel Kasandra = beskonacno sećanja.' },
            { name: 'Polihrono', x: 1109.10, y: 244.00, story: 'Obilazak' },
            { name: 'Haniotis', x: 1109.25, y: 244.10, anchor: 'end', story: 'Obilazak' },
            { name: 'Pefkohori', x: 1109.35, y: 244.20, story: 'Obilazak' }
        ]
    },
    {
        id: 'madjarska',
        name: 'Mađarska',
        emoji: '🇭🇺',
        type: 'visited',
        date: 'Putovanje',
        story: 'Budimpešta nas je oduševila — prelepa arhitektura, restorani, slike. Segedin nas je iznenadio svojom lepotom i toplinom.',
        tags: ['🏛️ Arhitektura', '🍖 Restorani', '🌉 Dunav'],
        svgClass: '#HU',
        cities: [
            { name: 'Budimpešta', x: 1081, y: 197, story: 'Parlament, Budimski zamak i nezaboravne šetnje.' },
            { name: 'Segedin', x: 1088, y: 205, story: 'Predivan trg i dobra hrana.' }
        ]
    },
    {
        id: 'slovenija',
        name: 'Slovenija',
        emoji: '🇸🇮',
        type: 'visited',
        date: 'Putovanje',
        story: 'Mala zemlja sa ogromnom lepotom. Od morske obale Pirana do arhitekture Ljubljane.',
        tags: ['🏔️ Priroda', '🌊 More', '🏰 Gradovi'],
        svgClass: '#SI',
        cities: [
            { name: 'Piran', x: 1055.7, y: 209.2, anchor: 'end', story: 'Mediteranski šarm, uske uličice i pogled na more.' },
            { name: 'Ljubljana', x: 1060, y: 206, story: 'Šoping je obeležio Ljubljanu.' },
            { name: 'Kranj', x: 1059, y: 205, anchor: 'end', story: 'Miran i tih gradić gde nam je bio hotel.' },
            { name: 'Škofja Loka', x: 1059, y: 205, anchor: 'end', story: 'Lep gradić sa uskim ulicama i rekom koja teče kroz njega.' }
        ]
    },
    {
        id: 'slovacka',
        name: 'Slovačka',
        emoji: '🇸🇰',
        type: 'visited',
        date: 'Putovanje',
        story: 'Bratislava — grad na Dunavu sa prekrasnim starim centrom i pogledom na zamak. Kratko ali slatko putovanje!',
        tags: ['🕵️‍♂️ Mafija', '⛲ Fontana', '🏢 Tržni centri'],
        svgClass: '#SK',
        cities: [
            { name: 'Bratislava', x: 1072, y: 193, story: 'Primark, i tržni centri kao i lepe slikice' }
        ]
    },
    {
        id: 'austrija',
        name: 'Austrija',
        emoji: '🇦🇹',
        type: 'visited',
        date: 'Putovanje',
        story: 'Beč, grad muzike i kulture. Kratak ali slatak obilazak, neke od najlepših slika u muzeju.',
        tags: ['🎵 Muzika', '〽️ Mek', '🏛️ Kultura'],
        svgClass: '#AT',
        cities: [
            { name: 'Beč', x: 1068, y: 192, anchor: 'end', story: 'Trg Marije Terezije.' }
        ]
    },
    {
        id: 'makedonija',
        name: 'Makedonija',
        emoji: '🇲🇰',
        type: 'visited',
        date: 'Putovanje',
        story: 'Kumanovo — Smešno prozivanje Kumanova.',
        tags: ['🤝 Susedi', '🍽️ Hrana'],
        svgClass: '#MK',
        cities: [
            { name: 'Kumanovo', x: 1098, y: 231, story: '.' }
        ]
    },
    {
        id: 'crnagora',
        name: 'Crna Gora',
        emoji: '🇲🇪',
        type: 'visited',
        date: 'Putovanje',
        story: 'Bokokotorski zaliv — jedno od najlepših mesta na svetu. Planine koje zaranjaju u more, stari gradovi i nezaboravni pogledi. Vraćanje svake godine.',
        tags: ['🏔️ Zaliv', '🌊 More', '🏰 Stari grad'],
        svgClass: '#ME',
        cities: [
            { name: 'Herceg Novi', x: 1082, y: 229, anchor: 'end', story: 'Druženje, palme i pogled na zaliv.' },
            { name: 'Kotor', x: 1083, y: 229, story: 'Stari grad i prelepe zidine.' },
            { name: 'Dobrota', x: 1083, y: 229, story: 'Mirno mestašce pored Kotora sa pogledom na zaliv. Lepo kupanje.' }
        ]
    },
    {
        id: 'bih',
        name: 'Bosna i Hercegovina',
        emoji: '🇧🇦',
        type: 'visited',
        date: 'Putovanje',
        story: 'Višegrad — grad Na Drini ćuprije. Most Mehmed-paše Sokolovića.',
        tags: ['📚 Andrić', '🌉 Most', '🏞️ Drina'],
        svgClass: '#BA',
        cities: [
            { name: 'Višegrad', x: 1085, y: 220, story: 'Andrićgrad, čuveni most i magija reke Drine.' }
        ]
    },

    /* ===== SANJAMO O... ===== */
    {
        id: 'japan',
        name: 'Japan',
        emoji: '🇯🇵',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '.Japan',
        cities: [
            { name: 'Tokio', x: 1728, y: 272, story: '...' },
            { name: 'Kjoto', x: 1710, y: 276, anchor: 'end', story: '..' },
            { name: 'Osaka', x: 1709, y: 278, story: '...' }
        ]
    },
    {
        id: 'sad',
        name: 'SAD',
        emoji: '🇺🇸',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '.United.States',
        cities: [
            { name: 'Njujork', x: 603, y: 240, story: '...' },
            { name: 'Los Anđeles', x: 355, y: 282, anchor: 'end', story: '...' },
            { name: 'Havaji', x: 113, y: 366, story: '...' }
        ]
    },
    {
        id: 'holandija',
        name: 'Holandija',
        emoji: '🇳🇱',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#NL',
        cities: [
            { name: 'Amsterdam', x: 1010, y: 167, story: '...' }
        ]
    },
    {
        id: 'engleska',
        name: 'Engleska',
        emoji: '🇬🇧',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '.United.Kingdom',
        cities: [
            { name: 'London', x: 986, y: 172, story: '...' }
        ]
    },
    {
        id: 'ceska',
        name: 'Češka',
        emoji: '🇨🇿',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#CZ',
        cities: [
            { name: 'Prag', x: 1057, y: 181, story: '...' }
        ]
    },
    {
        id: 'kipar',
        name: 'Kipar',
        emoji: '🇨🇾',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '.Cyprus',
        cities: [
            { name: 'Larnaka', x: 1166, y: 277, story: '...' },
            { name: 'Limasol', x: 1163, y: 278, anchor: 'end', story: '...' }
        ]
    },
    {
        id: 'rusija',
        name: 'Rusija',
        emoji: '🇷🇺',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '.Russian.Federation',
        cities: [
            { name: 'Moskva', x: 1163, y: 146, story: '...' },
            { name: 'Sankt Petersburg', x: 1124, y: 121, anchor: 'end', story: '...' }
        ]
    },
    {
        id: 'estonija',
        name: 'Estonija',
        emoji: '🇪🇪',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#EE',
        cities: [
            { name: 'Talin', x: 1099, y: 124, story: '...' }
        ]
    },
    {
        id: 'portugal',
        name: 'Portugal',
        emoji: '🇵🇹',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#PT',
        cities: [
            { name: 'Lisabon', x: 939, y: 252, story: '...' }
        ]
    },
    {
        id: 'spanija',
        name: 'Španija',
        emoji: '🇪🇸',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#ES',
        cities: [
            { name: 'Barselona', x: 998, y: 235, story: '...' }
        ]
    },
    {
        id: 'brazil',
        name: 'Brazil',
        emoji: '🇧🇷',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#BR',
        cities: [
            { name: 'Rio de Žaneiro', x: 748, y: 648, story: '...' }
        ]
    },
    {
        id: 'malta',
        name: 'Malta',
        emoji: '🇲🇹',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '.Malta',
        cities: [
            { name: 'Valeta', x: 1063, y: 271, story: '...' }
        ]
    },
    {
        id: 'maldivi',
        name: 'Maldivi',
        emoji: '🇲🇻',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#MV',
        cities: [
            { name: 'Male', x: 1403, y: 475, story: '...' }
        ]
    },
    {
        id: 'hrvatska',
        name: 'Hrvatska',
        emoji: '🇭🇷',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#HR',
        cities: [
            { name: 'Split', x: 1071, y: 222, story: '...' },
            { name: 'Zagreb', x: 1067, y: 207, anchor: 'end', story: '...' },
            { name: 'Vis', x: 1070, y: 223, anchor: 'end', story: '...' }
        ]
    },
    {
        id: 'italija',
        name: 'Italija',
        emoji: '🇮🇹',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '.Italy',
        cities: [
            { name: 'Rim', x: 1051, y: 232, story: '...' }
        ]
    },
    {
        id: 'zanzibar',
        name: 'Zanzibar',
        emoji: '🇹🇿',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#TZ',
        cities: [
            { name: 'Zanzibar', x: 1206, y: 539, story: '...' }
        ]
    },
    {
        id: 'egipat',
        name: 'Egipat',
        emoji: '🇪🇬',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#EG',
        cities: [
            { name: 'Kairo', x: 1156, y: 308, story: '...' }
        ]
    },
    {
        id: 'dubai',
        name: 'Dubai',
        emoji: '🇦🇪',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#AE',
        cities: [
            { name: 'Dubai', x: 1291, y: 340, story: '...' }
        ]
    },
    {
        id: 'jkoreja',
        name: 'Južna Koreja',
        emoji: '🇰🇷',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#KR',
        cities: [
            { name: 'Seul', x: 1655, y: 260, story: '...' }
        ]
    },
    {
        id: 'norveska',
        name: 'Norveška',
        emoji: '🇳🇴',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '.Norway',
        cities: [
            { name: 'Tromsø', x: 1064, y: 66, story: '...' },
            { name: 'Bergen', x: 1011, y: 119, anchor: 'end', story: '...' }
        ]
    },
    {
        id: 'grcka-san',
        name: 'Grčka ✨',
        emoji: '🇬🇷',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: null,
        cities: [
            { name: 'Skopelos', x: 1109, y: 250, story: '...' },
            { name: 'Atina', x: 1111, y: 257, anchor: 'end', story: '...' },
            { name: 'Santorini', x: 1121, y: 267, story: '...' }
        ]
    },
    {
        id: 'francuska',
        name: 'Francuska',
        emoji: '🇫🇷',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '.France',
        cities: [
            { name: 'Pariz', x: 998, y: 188, story: '...' }
        ]
    },
    {
        id: 'rumunija',
        name: 'Rumunija',
        emoji: '🇷🇴',
        type: 'dream',
        date: 'Jednog dana...',
        story: '...',
        tags: ['...'],
        svgClass: '#RO',
        cities: [
            { name: 'Temišvar', x: 1094, y: 208, story: '...' },
            { name: 'Transilvanija', x: 1116, y: 208, story: '...' }
        ]
    }
];

/* ========== BOJE ========== */
const VISITED_COLOR = '#2ec4b6';
const DREAM_COLOR = '#c9a5f7';
const LAND_COLOR = '#e0e0e0';
const LAND_STROKE = '#aaa';
const WATER_COLOR = '#d4eaf7';

/* ========== AUTO-GENERISANJE KARTICA ========== */
function buildCards() {
    const container = document.getElementById('placesContainer');
    if (!container) return;

    container.innerHTML = '';

    PLACES.forEach((p, i) => {
        const isVisited = p.type === 'visited';
        const badge = isVisited ? '<div class="place-status visited-badge">✅ Posetili smo</div>'
                                : '<div class="place-status dream-badge">💭 Sanjamo</div>';

        const citiesHTML = p.cities.map(c =>
            `<div class="city-item">
                <span class="city-name">📍 ${c.name}</span>
                ${c.story ? `<p class="city-story">${c.story}</p>` : ''}
            </div>`
        ).join('');

        const tagsHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');

        const card = document.createElement('div');
        card.className = `place-card ${p.type}`;
        card.dataset.filter = p.type;
        card.dataset.place = p.id;
        card.style.animationDelay = `${(i + 1) * 0.1}s`;

        card.innerHTML = `
            ${badge}
            <div class="place-emoji">${p.emoji}</div>
            <h3>${p.name}</h3>
            <span class="place-date">${p.date}</span>
            <p class="place-story">${p.story}</p>
            <div class="cities-list">
                <button class="cities-toggle" onclick="toggleCities(this)">📍 Gradovi <span class="arrow">▼</span></button>
                <div class="cities-content">${citiesHTML}</div>
            </div>
            <div class="place-tags">${tagsHTML}</div>
        `;

        container.appendChild(card);
    });

    updateStats();
    setupFilters();
}

function updateStats() {
    const visited = PLACES.filter(p => p.type === 'visited').length;
    const dream = PLACES.filter(p => p.type === 'dream').length;
    const elV = document.getElementById('countriesVisited');
    const elD = document.getElementById('countriesDream');
    if (elV) elV.textContent = visited;
    if (elD) elD.textContent = dream;
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const placeCards = document.querySelectorAll('.place-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            placeCards.forEach(card => {
                if (filter === 'all' || card.dataset.filter === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ========== MAPA ========== */
function initMap() {
    const container = document.getElementById('mapContainer');
    if (!container) return;

    try {
        const svgText = typeof WORLD_MAP_SVG !== 'undefined' ? WORLD_MAP_SVG : null;
        if (!svgText) throw new Error('Map data not loaded');

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svg = svgDoc.querySelector('svg');

        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.removeAttribute('viewbox');
        svg.setAttribute('viewBox', '0 0 2000 857');
        svg.style.background = WATER_COLOR;
        svg.setAttribute('fill', 'none');

        svg.querySelectorAll('path').forEach(path => {
            path.setAttribute('fill', LAND_COLOR);
            path.setAttribute('stroke', '#b0b0b0');
            path.setAttribute('stroke-width', '0.2');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
        });

        svg.querySelectorAll('circle').forEach(circle => {
            circle.setAttribute('fill', LAND_COLOR);
            circle.setAttribute('stroke', '#b0b0b0');
            circle.setAttribute('stroke-width', '0.2');
        });

        PLACES.forEach(place => {
            const color = place.type === 'visited' ? VISITED_COLOR : DREAM_COLOR;
            const cssClass = place.type === 'visited' ? 'country-visited' : 'country-dream';

            if (place.svgClass) {
                svg.querySelectorAll(place.svgClass).forEach(el => {
                    el.setAttribute('fill', color);
                    el.setAttribute('stroke', '#b0b0b0');
                    el.setAttribute('stroke-width', '0.2');
                    el.setAttribute('stroke-linecap', 'round');
                    el.setAttribute('stroke-linejoin', 'round');
                    el.classList.add(cssClass);
                });
            }

            const ns = 'http://www.w3.org/2000/svg';
            place.cities.forEach(city => {
                const g = document.createElementNS(ns, 'g');
                g.classList.add('city-marker');
                g.style.cursor = 'pointer';
                g.addEventListener('click', () => scrollToCard(place.id));

                const dot = document.createElementNS(ns, 'circle');
                dot.setAttribute('cx', city.x);
                dot.setAttribute('cy', city.y);
                dot.setAttribute('r', '1');
                dot.setAttribute('fill', place.type === 'dream' ? '#e63946' : '#222');
                dot.setAttribute('stroke', 'white');
                dot.setAttribute('stroke-width', '0.8');

                const isLeft = city.anchor === 'end';
                const dx = isLeft ? -6 : 6;
                const dy = 3;

                const text = document.createElementNS(ns, 'text');
                text.setAttribute('x', city.x + dx);
                text.setAttribute('y', city.y + dy);
                text.setAttribute('font-size', '7');
                text.setAttribute('fill', '#222');
                text.setAttribute('font-family', 'Arial, sans-serif');
                text.setAttribute('font-weight', 'bold');
                text.setAttribute('text-anchor', city.anchor || 'start');
                text.setAttribute('paint-order', 'stroke');
                text.setAttribute('stroke', 'white');
                text.setAttribute('stroke-width', '2.5');
                text.setAttribute('stroke-linejoin', 'round');
                text.dataset.cx = city.x;
                text.dataset.cy = city.y;
                text.dataset.dx = dx;
                text.dataset.dy = dy;
                text.dataset.anchor = city.anchor || 'start';
                text.textContent = city.name;

                g.appendChild(dot);
                g.appendChild(text);
                svg.appendChild(g);
            });
        });

        container.innerHTML = '';
        container.appendChild(svg);

        setupZoomPan(svg);

    } catch (error) {
        console.error('Error loading map:', error);
        container.innerHTML = '<p style="text-align:center;color:#999;padding:60px 20px;font-size:1.1em;">⚠️ Greška pri učitavanju mape</p>';
    }
}

/* ========== ZOOM & PAN ========== */
function setupZoomPan(svg) {
    const container = svg.parentElement;
    let viewBox = { x: 0, y: 0, w: 2000, h: 857 };
    const original = { x: 0, y: 0, w: 2000, h: 857 };
    const minZoom = 0.005;
    const maxZoom = 1;
    let isPanning = false;
    let startPoint = { x: 0, y: 0 };
    let startViewBox = { x: 0, y: 0 };

    function updateViewBox() {
        svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        scaleMarkers();
    }

    function scaleMarkers() {
        const ratio = viewBox.w / original.w;
        const s = Math.pow(ratio, 0.40);
        const ts_power = Math.pow(ratio, 0.72);
        const r = 0.6 * s;
        const sw = 0.5 * s;
        const fs = 7 * ts_power;
        const ts = 2.5 * ts_power;

        const labels = [];

        svg.querySelectorAll('.city-marker').forEach(g => {
            const c = g.querySelector('circle');
            const t = g.querySelector('text');
            if (c) { c.setAttribute('r', r); c.setAttribute('stroke-width', sw); }
            if (t) {
                t.setAttribute('font-size', fs);
                t.setAttribute('stroke-width', ts);
                const baseDx = parseFloat(t.dataset.dx);
                const baseDy = parseFloat(t.dataset.dy);
                const cx = parseFloat(t.dataset.cx);
                const cy = parseFloat(t.dataset.cy);
                const dx = baseDx * ts_power;
                const dy = baseDy * ts_power;
                t.setAttribute('x', cx + dx);
                t.setAttribute('y', cy + dy);
                const anchor = t.dataset.anchor || 'start';
                const labelW = t.textContent.length * fs * 0.6;
                const labelH = fs;
                const lx = anchor === 'end' ? cx + dx - labelW : cx + dx;
                const ly = cy + dy - labelH * 0.7;
                labels.push({ t, cx, cy, dx, dy, lx, ly, w: labelW, h: labelH, anchor, baseDx, baseDy });
            }
        });

        /* --- collision avoidance --- */
        for (let pass = 0; pass < 4; pass++) {
            for (let i = 0; i < labels.length; i++) {
                const a = labels[i];
                /* only check against visible labels in current viewport */
                if (a.cx < viewBox.x - 20 || a.cx > viewBox.x + viewBox.w + 20 ||
                    a.cy < viewBox.y - 20 || a.cy > viewBox.y + viewBox.h + 20) continue;

                for (let j = i + 1; j < labels.length; j++) {
                    const b = labels[j];
                    if (b.cx < viewBox.x - 20 || b.cx > viewBox.x + viewBox.w + 20 ||
                        b.cy < viewBox.y - 20 || b.cy > viewBox.y + viewBox.h + 20) continue;

                    const overlapX = Math.min(a.lx + a.w, b.lx + b.w) - Math.max(a.lx, b.lx);
                    const overlapY = Math.min(a.ly + a.h, b.ly + b.h) - Math.max(a.ly, b.ly);

                    if (overlapX > 0 && overlapY > 0) {
                        const nudge = (overlapY / 2) + fs * 0.3;
                        if (a.cy <= b.cy) {
                            a.dy -= nudge; a.ly -= nudge;
                            b.dy += nudge; b.ly += nudge;
                        } else {
                            a.dy += nudge; a.ly += nudge;
                            b.dy -= nudge; b.ly -= nudge;
                        }
                        a.t.setAttribute('y', a.cy + a.dy);
                        b.t.setAttribute('y', b.cy + b.dy);
                    }
                }
            }
        }
    }

    function zoom(delta, cx, cy) {
        const scale = delta > 0 ? 0.8 : 1.25;
        const newW = viewBox.w * scale;
        const newH = viewBox.h * scale;

        if (newW < original.w * minZoom || newW > original.w * maxZoom) return;
        if (newH < original.h * minZoom || newH > original.h * maxZoom) return;

        const ratioX = cx !== undefined ? cx : 0.5;
        const ratioY = cy !== undefined ? cy : 0.5;

        viewBox.x += (viewBox.w - newW) * ratioX;
        viewBox.y += (viewBox.h - newH) * ratioY;
        viewBox.w = newW;
        viewBox.h = newH;
        updateViewBox();
    }

    function getSVGPoint(e) {
        const rect = container.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
        };
    }

    container.addEventListener('wheel', function(e) {
        e.preventDefault();
        const pt = getSVGPoint(e);
        zoom(e.deltaY < 0 ? 1 : -1, pt.x, pt.y);
    }, { passive: false });

    container.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        isPanning = true;
        startPoint = { x: e.clientX, y: e.clientY };
        startViewBox = { x: viewBox.x, y: viewBox.y };
    });

    window.addEventListener('mousemove', function(e) {
        if (!isPanning) return;
        const rect = container.getBoundingClientRect();
        const dx = (e.clientX - startPoint.x) / rect.width * viewBox.w;
        const dy = (e.clientY - startPoint.y) / rect.height * viewBox.h;
        viewBox.x = startViewBox.x - dx;
        viewBox.y = startViewBox.y - dy;
        updateViewBox();
    });

    window.addEventListener('mouseup', function() {
        isPanning = false;
    });

    let lastTouchDist = 0;
    let lastTouchCenter = null;

    container.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            isPanning = true;
            startPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            startViewBox = { x: viewBox.x, y: viewBox.y };
        } else if (e.touches.length === 2) {
            isPanning = false;
            lastTouchDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            lastTouchCenter = getSVGPoint({
                clientX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                clientY: (e.touches[0].clientY + e.touches[1].clientY) / 2
            });
        }
    }, { passive: true });

    container.addEventListener('touchmove', function(e) {
        e.preventDefault();
        if (e.touches.length === 1 && isPanning) {
            const rect = container.getBoundingClientRect();
            const dx = (e.touches[0].clientX - startPoint.x) / rect.width * viewBox.w;
            const dy = (e.touches[0].clientY - startPoint.y) / rect.height * viewBox.h;
            viewBox.x = startViewBox.x - dx;
            viewBox.y = startViewBox.y - dy;
            updateViewBox();
        } else if (e.touches.length === 2 && lastTouchDist) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const delta = dist > lastTouchDist ? 1 : -1;
            if (Math.abs(dist - lastTouchDist) > 5) {
                zoom(delta, lastTouchCenter.x, lastTouchCenter.y);
                lastTouchDist = dist;
            }
        }
    }, { passive: false });

    container.addEventListener('touchend', function() {
        isPanning = false;
        lastTouchDist = 0;
    });

    document.getElementById('zoomIn').addEventListener('click', () => zoom(1, 0.5, 0.5));
    document.getElementById('zoomOut').addEventListener('click', () => zoom(-1, 0.5, 0.5));
    document.getElementById('zoomReset').addEventListener('click', () => {
        viewBox = { ...original };
        updateViewBox();
    });
}

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', function() {
    buildCards();
    initMap();
});
