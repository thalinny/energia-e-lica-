const questions = [
    {
        question: "O que é energia eólica?",
        answers: [
            "Energia do sol",
            "Energia do vento",
            "Energia da água",
            "Energia nuclear"
        ],
        correct: "Energia do vento"
    },
    // Adicione mais perguntas conforme necessário
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById('question').textContent = questions[currentQuestion].question;
        const answerButtons = document.querySelectorAll('.answer');
        questions[currentQuestion].answers.forEach((answer, index) => {
            answerButtons[index].textContent = answer;
        });
    } else {
        document.getElementById('quiz-container').innerHTML = `<p>Fim do jogo! Sua pontuação é: ${score}</p>`;
        saveScore(score);
    }
}

function checkAnswer(button) {
    if (button.textContent === questions[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ score: score, timestamp: new Date().toISOString() });
    localStorage.setItem('scores', JSON.stringify(scores));
    loadRanking();
}

function loadRanking() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.sort((a, b) => b.score - a.score);
    let rankingContainer = document.getElementById('ranking-container');
    rankingContainer.innerHTML = '';
    scores.forEach((entry, index) => {
        let entryElement = document.createElement('div');
        entryElement.textContent = `Aluno ${index + 1}: ${entry.score} pontos (Data: ${new Date(entry.timestamp).toLocaleString()})`;
        rankingContainer.appendChild(entryElement);
    });
}

// Inicializar o jogo e carregar ranking
loadQuestion();
loadRanking();
