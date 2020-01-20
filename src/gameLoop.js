import GameBoard from './gameBoard';
import Player from './player';
import Computer from './computer'

let player, computer;

const domManager = (() => {

  const renderBoard = () => {
    const tableP = document.createElement('table');
    const tableC = document.createElement('table');
    tableP.classList.add('player-board');
    tableC.classList.add('computer-board');
    let rowP, rowC;
    let tdP, tdC;
    const container = document.querySelector('.container');
    container.insertAdjacentElement('afterbegin', tableP);
    container.insertAdjacentElement('beforeend', tableC);
    for (let i = 0; i < 10; i += 1) {
      rowP = document.createElement('tr');
      rowC = document.createElement('tr');
      tableP.appendChild(rowP);
      tableC.appendChild(rowC);
      for (let j = 0; j < 10; j += 1) {
        tdP = document.createElement('td');
        tdC = document.createElement('td');
        tdP.id = `P-${i}-${j}`;
        tdC.id = `C-${i}-${j}`;
        rowP.appendChild(tdP);
        rowC.appendChild(tdC);
        tdP.addEventListener('click', () => {
          alert(`You clicked ${event.target.id}`);
        }, false);
        tdC.addEventListener('click', () => {
          alert(`You clicked ${event.target.id}`);
        }, false);
      }
    }
  }

  return { renderBoard };

})();

const gameLoop = () => {

  const pBoard = GameBoard.createBoard();
  const cBoard = GameBoard.createBoard();
  const playerShips = GameBoard.getShips();
  const computerShips = GameBoard.getShips();
  player = Player(playerShips, pBoard);
  computer = Computer(computerShips, cBoard);

  player.placeShips();
  computer.placeShips();
};

export default domManager;
