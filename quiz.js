
const originalQuizData = [
    {
        question: "Koje cveće najviše asocira na našu vezu?",
        options: ["Ljiljani", "Orhideje", "Ruže", "Lale"],
        correct: 3
    },
    {
        question: "Koja je naša omiljena boja?",
        options: ["Plava", "Crvena", "Zelena", "Žuta"],
        correct: 2
    },
    {
        question: "Od kada smo zajedno?",
        options: ["14. Januar 2024", "14. Februar 2024", "14. Mart 2024", "14. April 2024"],
        correct: 1
    },
    {
        question: "Mesto gde bismo voleli da živimo?",
        options: ["Italija", "Grčka", "Kipar", "Nemačka"],
        correct: 2
    },
    {
        question: "Naš omiljeni film 2024 godine?",
        options: ["Deadpool & Wolverine", "Inside Out 2", "Wicked", "Despicable Me 4"],
        correct: 0
    },
    {
        question: "√64?",
        options: ["7", "9", "6", "8"],
        correct: 3
    },
    {
        question: "Koji je prvi film koji smo gledali kod kuće?",
        options: ["The Notebook", "Titanic", "La La Land", "Minions"],
        correct: 0
    },
    {
        question: "Koja nam je omiljena serija?",
        options: ["XO kitty", "Alice in borderland", "Stranger Things", "To all the boys i loved before"],
        correct: [0,1,2,3]
    },
    {
        question: "Koju aktivnost najviše volimo da radimo zajedno?",
        options: ["Šetnje", "Gledanje filmova", "Igranje društvenih igara", "Putovanja"],
        correct: [0,1,2,3]
    },
    {
        question: "Koja nam je omiljena plaža u Herceg Novom?",
        options: ["Madjari", "Baby plaža", "Hotel plaža", "Boka"],
        correct: 2
    },
    {
        question: "Šta najviše volimo slatko da pravimo u Herceg Novom?",
        options: ["Palačinke", "Sladoled", "Krofne", "Tiramisu"],
        correct: 0
    },
    {
        question: "Koje voće podseća na početak naše veze?",
        options: ["Jagode", "Jabuka", "Grejpfrut", "Mandarina"],
        correct: 3
    },
    {
        question: "Gde najviše volimo da se šetamo u Beogradu",
        options: ["Kalemegdan", "Dedinje", "Banjica", "Stepa"],
        correct: 1
    },
    {
        question: "Ko je prvi rekao volim te?",
        options: ["Niko", "Miona", "Milan", "Oboje smo istovremeno"],
        correct: 2
    },
    {
        question: "Gde smo se prvi put poljubili?",
        options: ["U skoli", "U parku", "U bioskopu", "U restoranu"],
        correct: 1
    },
    {
        question: "Koje jelo nam je obeležilo 2025. godinu?",
        options: ["Pica sendviči", "Špagete", "Ovsena kaša", "Tiramisu"],
        correct: 0
    },
    {
        question: "Koji nam je prvi zajednički koncert na koji smo išli?",
        options: ["Buč kesedi", "Tap 011", "Vlado Georgijev", "Bajaga"],
        correct: 2
    },
    {
        question: "Koja nam je omiljena igrica?",
        options: ["Roblox", "Roblox", "Roblox", "Roblox"],
        correct: [0,1,2,3]
    },
    {
        question: "Koliko vremena volimo da provodimo zajedno?",
        options: ["24 sata", "2-3 sata", "6 sati", "∞"],
        correct: 3
    },
    {
        question: "Koji nam je omiljeni autobus?",
        options: ["78", "18", "67", "49"],
        correct: 0
    },
];

let quizData = [];
let currentQuestion = 0;
let score = 0;
let answered = false;
let selectedAnswer = null;
let isFullQuiz = false;
let quizMode = 'full';

const questionText = document.getElementById('questionText');
const optionButtons = document.querySelectorAll('.option-btn');
const feedbackEl = document.getElementById('feedback');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const completeSection = document.getElementById('completeSection');
const quizContent = document.querySelector('.quiz-content');
const finalScore = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initQuiz() {
    localStorage.removeItem('quizState');
    localStorage.removeItem('quizComplete');
    localStorage.removeItem('quizData');
    quizData = shuffleArray(originalQuizData);
    currentQuestion = 0;
    score = 0;
    answered = false;
    selectedAnswer = null;
    isFullQuiz = true;
    quizMode = 'full';
    completeSection.style.display = 'none';
    quizContent.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    
    optionButtons.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.disabled = false;
    });
    
    feedbackEl.classList.remove('show', 'correct', 'incorrect');
    feedbackEl.textContent = '';
    
    updateProgress();
    
    answered = false;
    selectedAnswer = null;
    nextBtn.disabled = true;
    updateNavigationButtons();
}

function answerQuestion(index) {
    if (answered) return;
    
    answered = true;
    selectedAnswer = index;
    const question = quizData[currentQuestion];
    let isCorrect;
    if (Array.isArray(question.correct)) {
        isCorrect = question.correct.includes(index);
    } else {
        isCorrect = index === question.correct;
    }
    
    optionButtons.forEach((btn, i) => {
        btn.disabled = true;
        if (Array.isArray(question.correct) ? question.correct.includes(i) : i === question.correct) {
            btn.classList.add('correct');
        } else if (i === index && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    if (isCorrect) {
        score++;
        feedbackEl.textContent = '✓ Tačno! ' + (quizData.length - currentQuestion - 1) + ' pitanja još preostaje.';
        feedbackEl.classList.add('show', 'correct');
        nextBtn.disabled = false;
    } else {
        feedbackEl.textContent = '✗ Pogrešno! Pokušaj da ponovim pitanje ili nastavi dalje.';
        feedbackEl.classList.add('show', 'incorrect');
    }
    
    updateNavigationButtons();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Pitanje ${currentQuestion + 1} od ${quizData.length}`;
}

function updateNavigationButtons() {
    prevBtn.disabled = currentQuestion === 0;
    
    if (answered) {
        nextBtn.disabled = !selectedAnswer && selectedAnswer !== 0;
    } else {
        nextBtn.disabled = true;
    }
}

function nextQuestion() {
    if (answered) {
        currentQuestion++;
        if (currentQuestion >= quizData.length) {
            completeQuiz();
        } else {
            loadQuestion();
        }
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        answered = false;
        selectedAnswer = null;
        loadQuestion();
    }
}

function completeQuiz() {
    showCompleteScreen();
}

function showCompleteScreen() {
    quizContent.style.display = 'none';
    completeSection.style.display = 'block';
    
    const percentage = Math.round((score / quizData.length) * 100);
    finalScore.innerHTML = `
        <h3>Tvoj rezultat:</h3>
        <div class="score">${score}/${quizData.length}</div>
        <p>${percentage}%</p>
    `;
}

function restartQuiz() {
    quizData = shuffleArray(originalQuizData);
    currentQuestion = 0;
    score = 0;
    answered = false;
    selectedAnswer = null;
    quizMode = 'full';
    completeSection.style.display = 'none';
    quizContent.style.display = 'block';
    loadQuestion();
}

optionButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.option);
        answerQuestion(index);
    });
});

nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', previousQuestion);
restartBtn.addEventListener('click', restartQuiz);

document.addEventListener('DOMContentLoaded', initQuiz);
