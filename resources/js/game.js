//credit: https://github.com/annaelizabeth2019/tictactoetwo


/*------ constants ------*/ 
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*------ app's state ------*/

let board;
let turn = 'X';
let win;
let xScoreDisplay = document.getElementById('xScore');
let oScoreDisplay = document.getElementById('oScore');
let xScore = 0;
let oScore = 0;
let winner;


/*------ cached element references ------*/

const squares = Array.from(document.querySelectorAll('#board div'));

/*------ event listeners ------*/
document.getElementById('board').addEventListener('click', handleTurn)
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);

/*------ functions ------*/
function getWinner() {
  let winner = null;
  winningCombos.forEach(function(combo, index) {
    if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
      winner = board[combo[0]];
      updateScore(winner);
      document.getElementById('board').removeEventListener('click', handleTurn);
    }
  })
  board.includes('') ? null : document.getElementById('board').removeEventListener('click', handleTurn);
  return winner ? winner : board.includes('') ? null : 'T';
}

function handleTurn() {
  let idx = squares.findIndex(function(square) {
    return square === event.target;
  });
  board[idx] = turn;
  turn = turn === 'X' ? 'O' : 'X';
  win = getWinner();
  render();
}

function init() {
  board = [
    '', '', '',
    '', '', '',
    '', '', '',
  ];
  document.getElementById('board').addEventListener('click', handleTurn)
  render();
};

function render() {
  board.forEach(function(mark, index){
      //this moves the value of the board item into the squares[idx]
    squares[index].textContent = mark;
  });
  messages.textContent = win === 'T' ? `That's a tie!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
};

function updateScore(winner) {
  if (winner === 'X') {
    xScore++;
  } else if (winner === 'O') {
    oScore++;
  }
  xScoreDisplay.innerText = xScore;
  oScoreDisplay.innerText = oScore;
}

init();