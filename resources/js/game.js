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


let win = null;
let turn = 'X';
let moveCount = 0;
let xScoreDisplay = document.getElementById('xScore');
let oScoreDisplay = document.getElementById('oScore');
let xScore = 0;
let oScore = 0;
let winner;



/*------ cached element references ------*/

  // this constant selects all of the squares in the game and creates an array out of them.
const squares = Array.from(document.querySelectorAll('#board div'));

/*------ event listeners ------*/
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);


/*------ functions ------*/

    /*this initializes the game. it attaches an event listener to each square 
    and fills them with blank inner text. it sets the win variable to false and 
    renders the messaging at the top. */

function init() {
  squares.forEach((q) => {
    q.innerText = "";
    q.addEventListener("click", handleTurn);
  })
  win = null;
  moveCount = 0;
  render();
};
init();

  //this function allows the player to select whose turn it is at the beginnning of the game.
function chooseTurn() {
  if (document.getElementById('x').checked) {
    turn = 'X';
  } else if (document.getElementById('o').checked) {
    turn = 'O';
  }
  init();
};

function handleTurn() {
  let index = squares.findIndex(function(square){
    return square === event.target;
  })
  if (squares[index].innerText === "") {
    moveCount++;
    squares[index].innerText = turn;
    squares[index].removeEventListener("click", handleTurn)
  }
  win = getWinner();
  turn = turn === 'X' ? 'O' : 'X';
  render();
}

//this function checks if a win has occurred. 
function check(winIndex) {
  if (
    squares[winIndex[0]].innerText !== "" &&
    squares[winIndex[0]].innerText === squares[winIndex[1]].innerText &&
    squares[winIndex[0]].innerText === squares[winIndex[2]].innerText
  ) {
    return true;
  }
  return false;
}

function getWinner() {
  let winner = null;
  /*this takes the winning combinations and checks the current board against them to see if a win has occurred.
  if one has, then all square clicking is disabled the score is updated and the message is updated at the top;
  if */
  if (moveCount >= 5){
    winningCombos.forEach((w) => {
      if (check(w)) {
        winner = turn;
        removeListener();
        updateScore(winner);
      } else if (moveCount === 9) {
        winner = 'T'
      };
    });}
  return winner ? winner : squares.every((index) => {[index].innerText !== ''}) ? 'T' : null;
  }

const removeListener = () => {
  squares.forEach((q) => {
    q.removeEventListener("click", handleTurn);
  });
};


function render() {
  console.log(win);
  messages.textContent = win === 'T' ? `That's a tie!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
};

function updateScore(winner) {
  if (winner === 'X') {
    xScore++;
  } else if (winner === 'O') {
    oScore++;
  } else if (winner === 'T') {
    return;
  }
  console.log('winner:', winner);
  xScoreDisplay.innerText = xScore;
  oScoreDisplay.innerText = oScore;
}