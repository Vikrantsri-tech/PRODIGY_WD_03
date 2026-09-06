const cells = document.querySelectorAll(".cell");

const currentPlayerText = document.getElementById("currentPlayer");

const resultText = document.getElementById("result");

const restartButton = document.getElementById("restart");

const resetScoreButton = document.getElementById("resetScore");

const scoreXText = document.getElementById("scoreX");

const scoreOText = document.getElementById("scoreO");

const drawScoreText = document.getElementById("drawScore");


let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameActive = true;

let scoreX = 0;

let scoreO = 0;

let draws = 0;


// Winning combinations

const winningPatterns = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


// Handle cell click

cells.forEach(cell => {

    cell.addEventListener("click", () => {

        const index = cell.getAttribute("data-index");

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        cell.classList.add(currentPlayer.toLowerCase());

        checkWinner();

    });

});


// Check winner

function checkWinner() {

    let winner = null;

    let winningCells = [];


    for (let pattern of winningPatterns) {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            winner = board[a];

            winningCells = pattern;

            break;
        }
    }


    // Winner found

    if (winner !== null) {

        gameActive = false;

        resultText.textContent = `🎉 Player ${winner} Wins!`;

        winningCells.forEach(index => {
            cells[index].classList.add("winner");
        });


        if (winner === "X") {
            scoreX++;
            scoreXText.textContent = scoreX;
        } else {
            scoreO++;
            scoreOText.textContent = scoreO;
        }

        return;
    }


    // Check draw

    if (!board.includes("")) {

        gameActive = false;

        resultText.textContent = "🤝 It's a Draw!";

        draws++;

        drawScoreText.textContent = draws;

        return;
    }


    // Change player

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    currentPlayerText.textContent = currentPlayer;
}


// Restart game

restartButton.addEventListener("click", restartGame);


function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameActive = true;

    currentPlayerText.textContent = "X";

    resultText.textContent = "";


    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x");

        cell.classList.remove("o");

        cell.classList.remove("winner");

    });

}


// Reset score

resetScoreButton.addEventListener("click", () => {

    scoreX = 0;

    scoreO = 0;

    draws = 0;

    scoreXText.textContent = "0";

    scoreOText.textContent = "0";

    drawScoreText.textContent = "0";

    restartGame();

});
