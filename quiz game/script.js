// DOM elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


// Array of possible questions
const questionsBank = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false }
    ]
  },
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Shark", correct: false }
    ]
  },
  {
    question: "Which language is primarily used for web development?",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Swift", correct: false }
    ]
  },
  {
    question: "How many continents are there on Earth?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false }
    ]
  }
];


// Quiz state vars
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = questionsBank.length;
maxScoreSpan.textContent = questionsBank.length;


// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    // console.log("Quiz Started.")
    //reset vars
    score = 0;
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active"); 
    showQuestion();
}

function showQuestion(){
    //reset state
    answerDisabled = 0;

    const currentQuestion = questionsBank[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / questionsBank.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;


    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event){
    if (answerDisabled) return

    answerDisabled = true

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answersContainer.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if (button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if (isCorrect){
        score ++;
        scoreSpan.textContent = score;
    }


    setTimeout( () =>{
        currentQuestionIndex++;

        if(currentQuestionIndex < questionsBank.length){
            showQuestion()
        }else{
            showResults()
        }
    }, 1000)
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percent = (score/questionsBank.length) * 100;

    if(percent === 100) {
        resultMessage.textContent = "Perfect! You're a genius."
    }
    else if(percent >= 80){
        resultMessage.textContent = "Great Job! You know your stuff."
    }
    else if(percent >= 60){
        resultMessage.textContent = "Well Done! Keep Learning."
    }
    else if(percent >= 40){
        resultMessage.textContent = "Not bad! Try again to improve."
    }
    else{
        resultMessage.textContent = "Keep studying! You'll get better."
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}