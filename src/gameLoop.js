import GameBoard from './gameBoard';
import Player from './player';
import Computer from './computer'
import Ship from './ship'

let player, computer;

const domManager = (() => {

  const renderBoard = (player, computer) => {
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
        if (typeof player.board[i][j] === 'string') {
          tdP.classList.add('ship');
        }
        if (typeof computer.board[i][j] === 'string') {
          tdC.classList.add('ship');
        }
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
  const gameBoard = GameBoard();
  const ships = [Ship(5, 'A'), Ship(4, 'B'), Ship(3, 'C'), Ship(3, 'S'), Ship(2, 'D')];
  player = Player(ships, gameBoard);
  computer = Computer(ships, gameBoard);

  player.placeShips();
  computer.placeShips();

  domManager.renderBoard(player, computer);
};

export default gameLoop;
