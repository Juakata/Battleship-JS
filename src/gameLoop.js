import GameBoard from './gameBoard';
import Player from './player';
import Computer from './computer'
import Ship from './ship';
import domManager from './domManager';

let player, computer;

const gameLoop = () => {
  const gameBoard = GameBoard();
  const shipsPlayer = [Ship(5, 'A'), Ship(4, 'B'), Ship(3, 'C'), Ship(3, 'S'), Ship(2, 'D')];
  const shipsComputer = [Ship(5, 'A'), Ship(4, 'B'), Ship(3, 'C'), Ship(3, 'S'), Ship(2, 'D')];

  player = Player(shipsPlayer, gameBoard);
  computer = Computer(shipsComputer, gameBoard);
  computer.placeShips();
  document.getElementById('edit-container').className = 'edit-container';
  domManager.setPlayerBoard(player, computer);
};

export default gameLoop;
