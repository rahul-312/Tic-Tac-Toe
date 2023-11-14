// Variables
const board = document.getElementById('board');
const cells = [];

let currentPlayer = 'X';
let gameActive = true;

// Define audio elements
const clickSoundX = new Audio('clickx.wav');
const clickSoundO = new Audio('clicko.mp3');

// Initialize the game board
function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}

// Handle cell click
function handleCellClick(index) {
    if (!gameActive || cells[index].textContent !== '') return;

    // Play sound based on the current player
    if (currentPlayer === 'X') {
        clickSoundX.play();
    } else {
        clickSoundO.play();
    }

    cells[index].textContent = currentPlayer;

    if (checkForWin()) {
        displayResult(`Player ${currentPlayer} wins!`);
        gameActive = false;
    } else if (checkForTie()) {
        displayResult('It\'s a tie!');
        gameActive = false;
    } else {
        switchPlayer();
    }
}

function checkForWin() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (
            cells[i * 3].textContent !== '' &&
            cells[i * 3].textContent === cells[i * 3 + 1].textContent &&
            cells[i * 3 + 1].textContent === cells[i * 3 + 2].textContent
        ) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (
            cells[i].textContent !== '' &&
            cells[i].textContent === cells[i + 3].textContent &&
            cells[i + 3].textContent === cells[i + 6].textContent
        ) {
            return true;
        }
    }

    // Check diagonals
    if (
        cells[0].textContent !== '' &&
        cells[0].textContent === cells[4].textContent &&
        cells[4].textContent === cells[8].textContent
    ) {
        return true;
    }

    if (
        cells[2].textContent !== '' &&
        cells[2].textContent === cells[4].textContent &&
        cells[4].textContent === cells[6].textContent
    ) {
        return true;
    }

    return false;
}

// Check for a tie
function checkForTie() {
    for (const cell of cells) {
        if (cell.textContent === '') {
            // If there is an empty cell, the game is not a tie
            return false;
        }
    }

    // If all cells are filled and there is no winner, it's a tie
    return true;
}


// Display game result 
function displayResult(result) {
    const resultElement = document.getElementById('game-result');
    resultElement.textContent = result;
}

// Switch to the next player 
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const currentPlayerElement = document.getElementById('current-player');
    currentPlayerElement.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset the game
function resetGame() {
    // Reset variables and clear the board 
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    displayResult('');
    const currentPlayerElement = document.getElementById('current-player');
    currentPlayerElement.textContent = `Player ${currentPlayer}'s turn`;
}

// Initialize the board on page load
window.onload = initializeBoard;
