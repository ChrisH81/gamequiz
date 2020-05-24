var timeRemaining = 60;
let score = 0;
let highScore =0;
let currentQuestionIndex = 0;


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
        "question": "2What was the first game released on N64?",
        "answers": {
            "Super Mario 64": true,
            "Zelda Ocarina of Time": false,
            "Mario Kart 64": false,
            "GoldenEye 007": false,
        }
    },
    {
        "question": "3What was the first game released on N64?",
        "answers": {
            "Super Mario 64": true,
            "Zelda Ocarina of Time": false,
            "Mario Kart 64": false,
            "GoldenEye 007": false
        }
    },
    {
        "question": "4What was the first game released on N64?",
        "answers": {
            "Super Mario 64": true,
            "Zelda Ocarina of Time": false,
            "Mario Kart 64": false,
            "GoldenEye 007": false
        }
    }
]


function selectAnswer(event) {
    if (questionData[currentQuestionIndex].answers[event.target.innerText]) {
        console.log('right');
        score += 100;
    }
    else {
        console.log("wrong");
        score -= 50;
    }
    if (currentQuestionIndex === 3) {
        console.log("game over");
        return;
    }
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}



function startQuiz() {
    document.getElementById("start-page").style.display = "none";
    document.getElementById("quiz-page").style.display = "block";
    countDown();
    showQuestion(currentQuestionIndex);
}

function showQuestion (i) {
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
    var x = setInterval(function () {
        timeRemaining--;
        document.getElementById("timer").getElementsByTagName("span")[0].innerText = timeRemaining;
        if (timeRemaining === 0) {
            console.log("game over");
            clearInterval(x); //game over
        }
    }, 1000);

}

