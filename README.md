
## Code Quiz Challenge

build a timed coding quiz with multiple-choice questions.

## Description
This site is a Game Quiz to test your general knowledge of Nintendo 64.
Each correct answer is worth 100 points. 400 points are the maximum.
High scores are posted and listed highest to lowest after your initials have been entered. 

## Deployed URL
[LIVE QUIZ URL](https://chrish81.github.io/gamequiz/)

## Screen Shot

![screen shot](https://i.imgur.com/Q8qllOn.jpg)

## Code Explanation

GIVEN I am taking a code quiz
WHEN I click the start button
```html
    <button id="start" class="btn btn-primary btn-lg" onclick="startQuiz()">Start N64 Quiz</button>
```
THEN a timer starts and I am presented with a question
```javascript
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

function countDown() {
    countInterval = setInterval(function () {
        timeRemaining--;
        document.getElementById("timer").getElementsByTagName("span")[0].innerText = timeRemaining;
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);

```
WHEN I answer a question
THEN I am presented with another question
```javascript
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

```

WHEN I answer a question incorrectly
THEN time is subtracted from the clock
```javascript
function selectAnswer(event) {
    if (questionData[currentQuestionIndex].answers[event.target.innerText]) {
        score += 100;
        updateScore();
    } else {
        timeRemaining -= 15;
```
WHEN all questions are answered or the timer reaches 0
THEN the game is over
```javascript
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

function countDown() {
    countInterval = setInterval(function () {
        timeRemaining--;
        document.getElementById("timer").getElementsByTagName("span")[0].innerText = timeRemaining;
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

}
```
WHEN the game is over
THEN I can save my initials and score
```javascript
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
}
```


## Contributing
Pull requests are welcome.
