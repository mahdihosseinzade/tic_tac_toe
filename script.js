const statusDisplay = document.querySelector('.game--status');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleCellClick(clickedCellEvent) {
  if(!gameActive){
    return;
  }
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );

  if (gameState[clickedCellIndex] !== '') {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handlePlayerChange();
  checkGame();
}

function handleRestartGame() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => (cell.innerHTML = ''));
}

const checkGame =()=>{
  if (gameState[0]!=='' && gameState[0] === gameState[1] && gameState[0] === gameState[2]){
    playerWin(gameState[0]);
  }
  else if (gameState[0] !== '' && gameState[0] === gameState[3] && gameState[0] === gameState[6]){
    playerWin(gameState[0]);
  }
  else if (gameState[0] !== '' && gameState[0] === gameState[4] && gameState[0] === gameState[8]){
    playerWin(gameState[0]);
  }
  else if (gameState[1] !== '' && gameState[1] === gameState[4] && gameState[1] === gameState[7]){
    playerWin(gameState[1]);
  }
  else if (gameState[2] !== '' && gameState[2] === gameState[5] && gameState[2] === gameState[8]){
    playerWin(gameState[2]);
  }
  else if (gameState[2] !== '' && gameState[2] === gameState[4] && gameState[2] === gameState[6]){
    playerWin(gameState[2]);
  }
  else if (gameState[3] !== '' && gameState[3] === gameState[4] && gameState[3] === gameState[5]){
    playerWin(gameState[3]);
  }
  else if (gameState[6] !== '' && gameState[6] === gameState[7] && gameState[6] === gameState[8]){
    playerWin(gameState[6]);
  }
  else{
    for(const g in gameState){
      if(gameState[g]==='')
      {
        return;
      }
    }
    gameActive = false;
    statusDisplay.innerHTML = "Game ended in a draw";
  }
}

const playerWin =(player)=>{
  statusDisplay.innerHTML = `Player ${player} has won`;
  gameActive = false;
}

document
  .querySelectorAll('.cell')
  .forEach(cell => cell.addEventListener('click', handleCellClick));
document
  .querySelector('.game--restart')
  .addEventListener('click', handleRestartGame);

  