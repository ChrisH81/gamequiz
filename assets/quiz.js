var timeRemaining = 60;
let score = 0;
let highScores = [];
let currentQuestionIndex = 0;
var countInterval;
var questionData = [
    {
        "question": "What was the first game released on N64?",
        "answers": {
            "Super Mario 64": true,
            "Zelda Ocarina of Time": false,
            "Mario Kart 64": false,
            "GoldenEye 007": false,
        }
    },
    {
        "question": "What is the 2nd best selling game on N64?",
        "answers": {
            "GoldenEye 007": false,
            "Super Mario 64": false,
            "Zelda Ocarina of Time": false,
            "Mario Kart 64": true,

        }
    },
    {
        "question": "What is the name of the James Bond Game?",
        "answers": {
            "GoldenEye 007": true,
            "Super Mario 64": false,
            "Zelda Ocarina of Time": false,
            "Mario Kart 64": false,
        }
    },
    {
        "question": "What Game features the character Link",
        "answers": {
            "Mario Kart 64": false,
            "Super Mario 64": false,
            "Zelda Ocarina of Time": true,
            "GoldenEye 007": false
        }
    }
];

function selectAnswer(event) {
    if (questionData[currentQuestionIndex].answers[event.target.innerText]) {
        score += 100;
        updateScore();
    } else {
        timeRemaining -= 15;
    }
    if (currentQuestionIndex === 3) {
        endGame();
        return;
    }
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}

function updateScore() {
    document.getElementById("score").getElementsByTagName("span")[0].innerText = score
}

function startQuiz() {
    document.getElementById("start-page").style.display = "none";
    document.getElementById("quiz-page").style.display = "block";
    countDown();
    showQuestion(currentQuestionIndex);
}

function showQuestion(i) {
    document.getElementById("question").innerText = questionData[i].question;
    let currAnnswerIndex = 0;
    for (let answer in questionData[i].answers) {
        document.getElementById("a-" + currAnnswerIndex).innerText = answer;
        if (currAnnswerIndex === 3) {
            break;
        }
        currAnnswerIndex++;
    }
}

function countDown() {
    countInterval = setInterval(function () {
        timeRemaining--;
        document.getElementById("timer").getElementsByTagName("span")[0].innerText = timeRemaining;
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(countInterval); //stop the counter
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("save-page").style.display = "block";
    document.getElementById("score-label").innerText = "Your score: " + score;
}

function submitScore() {
    const initials = document.getElementById("initials").value;
    if(initials.length == 0) {
        alert("invalid input");
        return;
    }
    highScores.push({score: score, initials: initials});
    highScores = highScores.sort((a, b) => b.score - a.score); //sort by high score
    //reset all values back to default
    timeRemaining = 60;
    score = 0;
    currentQuestionIndex = 0;
    updateScore();
    document.getElementById("save-page").style.display = "none";
    document.getElementById("start-page").style.display = "block";
    loadHighScores();
}

window.onload = function () {
    loadHighScores();
}

function loadHighScores() {
    const scoreListDiv = document.getElementById("scores-list");
    scoreListDiv.innerHTML = ""; //reset scores
    if (highScores.length > 0) {
        for (let i = 0; i < highScores.length && i < 5; i++) {
            const scoreDiv = document.createElement("div");
            scoreDiv.innerText = highScores[i].initials + " -- score: " + highScores[i].score;
            scoreListDiv.append(scoreDiv);
        }
    } else {
        scoreListDiv.innerHTML = "No High Scores Yet";
    }
}