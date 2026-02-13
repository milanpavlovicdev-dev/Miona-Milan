const hamburger = document.getElementById('hamburger');
const navSidebar = document.getElementById('navSidebar');

hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navSidebar.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-sidebar a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navSidebar.classList.remove('active');
    });
});

document.addEventListener('click', function(event) {
    const isClickInsideMenu = navSidebar.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger && navSidebar.classList.contains('active')) {
        hamburger.classList.remove('active');
        navSidebar.classList.remove('active');
    }
});

const startDate = new Date('2024-02-14T00:00:00');

function updateStatistics() {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let dayDiff = now.getDate() - startDate.getDate();

    if (dayDiff < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        dayDiff += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const weeks = Math.floor(dayDiff / 7);
    const days = dayDiff % 7;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('weeks').textContent = weeks;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

updateStatistics();
setInterval(updateStatistics, 1000);
