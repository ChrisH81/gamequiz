var timeRemaining = 60;
function startQuiz() {
    console.log(timeRemaining);
    console.log("Started");
    countDown();
}

function countDown() {
    setInterval(function () {
        timeRemaining--;
    }, 1000);
    if (timeRemaining === 0) {
        clearInterval(); //game over
    }
}