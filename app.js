let currentQuestionIndex = 0;
let score = 0;
let questions = [
    {
        topic: "Introduction to AI",
        question: "What does AI stand for?",
        options: ["Artificial Insight", "Automated Intelligence", "Artificial Intelligence", "Algorithm Integration", "Applied Informatics"],
        answer: 2,
        explanation: "AI stands for Artificial Intelligence."
    },
    {
        topic: "Expert Systems",
        question: "Which is a key component of an expert system?",
        options: ["Neural layer", "Inference engine", "Genetic code", "Fuzzy set", "Randomizer"],
        answer: 1,
        explanation: "Expert systems rely on an inference engine to apply rules to facts."
    }
];

function startQuiz(){
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    let q = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.question;
    document.getElementById('question-topic').innerText = q.topic;
    let optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, i) => {
        let btn = document.createElement('button');
        btn.className = 'btn btn--outline';
        btn.innerText = opt;
        btn.onclick = () => selectAnswer(i);
        optionsContainer.appendChild(btn);
    });
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex+1} of ${questions.length}`;
    document.getElementById('progress-fill').style.width = `${(currentQuestionIndex+1)/questions.length * 100}%`;
}

function selectAnswer(selected) {
    let q = questions[currentQuestionIndex];
    let feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.classList.remove('hidden');
    document.getElementById('next-btn').disabled = false;
    if(selected === q.answer){
        score++;
        feedbackContainer.classList.add('correct');
        document.getElementById('feedback-result').innerText = 'Correct!';
    } else {
        feedbackContainer.classList.add('incorrect');
        document.getElementById('feedback-result').innerText = 'Incorrect';
    }
    document.getElementById('feedback-explanation').innerText = q.explanation;
    document.getElementById('current-score').innerText = score;
    document.getElementById('total-attempted').innerText = currentQuestionIndex+1;
    document.getElementById('score-percentage').innerText = Math.round(score/(currentQuestionIndex+1)*100) + '%';
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('feedback-container').classList.add('hidden');
    if(currentQuestionIndex < questions.length){
        showQuestion();
        document.getElementById('next-btn').disabled = true;
    } else {
        finishQuiz();
    }
}

function finishQuiz(){
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('results-screen').classList.add('active');
    document.getElementById('final-score').innerText = score;
    document.getElementById('total-questions').innerText = questions.length;
    document.getElementById('final-percentage').innerText = Math.round(score/questions.length*100) + '%';
}

function restartQuiz(){
    document.getElementById('results-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('active');
}
