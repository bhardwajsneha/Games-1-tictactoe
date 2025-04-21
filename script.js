/**const cells = document.querySelectorAll('.cell');
const playerText = document.querySelector('.player');
const resetButton = document.querySelector('.reset');
const message = document.querySelector('.message');

let currentPlayer = 'X';
let gameOver = false;
let board = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5], 
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameOver && board[index] === '') {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkWin();
      togglePlayer();
    }
  });
});

resetButton.addEventListener('click', resetGame);

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      message.textContent = `Player ${currentPlayer} wins!`;
      gameOver = true;
      disableBoard();
      break;
    }
  }

  if (!board.includes('') && !gameOver) {
    message.textContent = "It's a tie!";
    gameOver = true;
    disableBoard();
  }
}

function disableBoard() {
  cells.forEach(cell => {
    cell.style.pointerEvents = 'none'; // Disable further clicks on cells
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.pointerEvents = 'auto'; // Re-enable cell clicks
  });
  currentPlayer = 'X';
  playerText.textContent = `Player X's turn`;
  message.textContent = '';
  gameOver = false;
}
**/

const cells = document.querySelectorAll('.cell');
const playerText = document.querySelector('.player');
const message = document.querySelector('.message');
const resetBtn = document.querySelector('.reset');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(e) {
  const index = Array.from(cells).indexOf(e.target);

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    playerText.textContent = '';
    message.textContent = `🎉 Player ${currentPlayer} wins! 🎀`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== '')) {
    playerText.textContent = '';
    message.textContent = "🤍 It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      cells[a].classList.add('winning');
      cells[b].classList.add('winning');
      cells[c].classList.add('winning');
      return true;
    }
  }
  return false;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  playerText.textContent = "Player X's turn";
  message.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
