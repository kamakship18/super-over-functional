const $ballElem = document.getElementsByClassName('ball');

const $team1ScoreElem = document.getElementById('score-team1');
const $team1WicketsElem = document.getElementById('wickets-team1');

const $team2ScoreElem = document.getElementById('score-team2');
const $team2WicketsElem = document.getElementById('wickets-team2');

const resetBtn = document.getElementById('reset');
const strikeBtn = document.getElementById('strike');

const strikeAudio = new Audio("https://i1.faceprep.in/prograd-junior/bat%2Bhit%2Bball.mp3");
const cheerAudio = new Audio("https://i1.faceprep.in/prograd-junior/Ball%2BHit%2BCheer.mp3");

let team1Score = 0;
let team2Score = 0;
let team1Wickets = 0;
let team2Wickets = 0;
let turn = 1;
let ballsFaced = 0;
const possibleOutcomes = [0, 1, 2, 3, 4, 5, 6, "W"];

function gameFinished() {
    if (team1Score > team2Score) alert("India is Winner");
    if (team2Score > team1Score) alert("Pakistan is Winner");
    if (team1Score === team2Score) alert("It's a tie!");
}

strikeBtn.onclick = () => {
    strikeAudio.play();
    ballsFaced++;
    if (turn === 1) {
        let score = possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];
        console.log(score);
        console.log(turn);
        if (score === "W") {
            team1Wickets++;
            $team1WicketsElem.innerText = team1Wickets;
            document.querySelector(`#team1-superover .ball:nth-child(${ballsFaced})`).innerHTML = "W";
        } else {
            team1Score += score;
            $team1ScoreElem.textContent = team1Score;
            document.querySelector(`#team1-superover .ball:nth-child(${ballsFaced})`).innerHTML = score;
        }
        if (ballsFaced === 6 || team1Wickets === 2) {
            turn = 2;
            ballsFaced = 0;
        }
        
    } else if (turn === 2) {
        let score = possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];
        console.log(score);
        if (score === "W") {
            team2Wickets++;
            $team2WicketsElem.innerText = team2Wickets;
            document.querySelector(`#team2-superover .ball:nth-child(${ballsFaced})`).innerHTML = "W";
        } else {
            team2Score += score;
            $team2ScoreElem.innerText = team2Score;
            document.querySelector(`#team2-superover .ball:nth-child(${ballsFaced})`).innerHTML = score;
        }
        if (ballsFaced === 6 || team2Wickets === 2 || team2Score > team1Score) {
            turn = 3;
            gameFinished();
            cheerAudio.play();
        }
    }
};

resetBtn.onclick = () => {
    window.location.reload();
};
