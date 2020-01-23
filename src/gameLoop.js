import GameBoard from './gameBoard';
import Player from './player';
import Computer from './computer'
import Ship from './ship'

let player, computer;

const domManager = (() => {
  let smart = [];

  const displaykShips = (player) => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (typeof player.board[i][j] === 'string') {
          document.getElementById(`td-${i}-${j}`).classList.add('ship');
        } else {
          document.getElementById(`td-${i}-${j}`).className = "";
        }
      }
    }
  }

  const setPlayerBoard = (player, computer) => {
    const table = document.createElement('table');
    table.classList.add('edit-board');
    table.id = 'edit-table';
    const editContainer = document.querySelector('.edit-container');
    const containerTableShips = document.querySelector('.table-ships');
    containerTableShips.appendChild(table);
    let row, td;
    for (let i = 0; i < 10; i += 1) {
      row = document.createElement('tr');
      table.appendChild(row);
      for (let j = 0; j < 10; j += 1) {
        td = document.createElement('td');
        td.id = `td-${i}-${j}`;
        row.appendChild(td);
      }
    }
    player.placeShips();
    displaykShips(player);
    const random = document.createElement('button');
    const start = document.createElement('button');
    random.id = 'btn-place-ships';
    random.innerHTML = 'Place ships randomly';
    start.id = 'start-game';
    start.innerHTML = 'Start Game';
    editContainer.appendChild(random);
    editContainer.appendChild(start);

    random.addEventListener('click', () => {
      player.placeShips();
      displaykShips(player);
    }, false);

    start.addEventListener('click', () => {
      editContainer.classList.add('display-none');
      domManager.renderBoard(player, computer);
    }, false);
  }

  const computerAction = (player, compMove, move, go) => {
    let first = [compMove[0], compMove[1], compMove[2]];
    let shot;
    if (go.length === 0) {
      go = computer.whereToGo(compMove[0], compMove[1], player.board, first, []);
    } else {
      go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    }
    shot = document.getElementById(`P-${go[0][0]}-${go[0][1]}`);
    if (typeof player.board[go[0][0]][go[0][1]] === 'string') {
      shot.className = 'hit disable-event';
    } else {
      shot.className = 'water';
    }
    const name = player.board[go[0][0]][go[0][1]];
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, player.ships, first);
    smart = [compMove, move, go];
    if (!computer.smart) {
      const ship = player.ships.find(ship => ship.name == name);
      computer.makeAttacks(ship, player);
      compMove = computer.makeMove(player.board, player.ships);
      shot = document.getElementById(`P-${compMove[0]}-${compMove[1]}`);
      if (typeof player.board[compMove[0]][compMove[1]] === 'string' || player.board[compMove[0]][compMove[1]] === 1) {
        shot.className = 'hit disable-event';
      } else {
        shot.className = 'water disable-event';
      }
      move = [];
      go = [];
    }

    if (shot.className === 'hit disable-event' && computer.smart) {
      computerAction(player, compMove, move, go);
    }
  }

  const renderBoard = (player, computer) => {
    const tableP = document.createElement('table');
    const tableC = document.createElement('table');
    const radar = `  <div class="radar">
      <div class="first-circle">
        <div class="second-circle">
          <div class="line"></div>
        </div>
    </div>
  </div>`;
    tableP.classList.add('disable-event');
    let rowP, rowC;
    let tdP, tdC;
    const playerBoardContainer = document.querySelector('.player-board');
    const computerBoardContainer = document.querySelector('.computer-board');
    const container = document.querySelector('.container');
    const score = document.querySelector('.scoreboard');
    const h2 = document.createElement('h2');
    score.innerHTML = '';
    container.classList.remove('disable-event');
    playerBoardContainer.innerHTML = '';
    computerBoardContainer.innerHTML = '';
    playerBoardContainer.insertAdjacentElement('afterbegin', tableP);
    playerBoardContainer.insertAdjacentHTML('beforeend', radar);
    computerBoardContainer.insertAdjacentElement('afterbegin', tableC);
    computerBoardContainer.insertAdjacentHTML('beforeend', radar);
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
        rowP.appendChild(tdP);
        rowC.appendChild(tdC);
        tdC.addEventListener('click', () => {

          const coord = event.target.id.split('-');
          if (typeof computer.board[coord[1]][coord[2]] === 'string') {
            event.target.className = 'hit disable-event';
          } else {
            event.target.className = 'water disable-event';
          }
          const name = computer.board[coord[1]][coord[2]];
          player.makeMove(coord[1], coord[2], computer.board, computer.ships);
          if (computer.gameOver() === true) {
            h2.innerText = 'Player 1 won!';
            score.appendChild(h2);
            container.classList.add('disable-event');
          }
          if (computer.board[coord[1]][coord[2]] !== 1) {
            if (!computer.smart) {
              const compMove = computer.makeMove(player.board, player.ships);
              const shot = document.getElementById(`P-${compMove[0]}-${compMove[1]}`);
              if (typeof player.board[compMove[0]][compMove[1]] === 'string' || player.board[compMove[0]][compMove[1]] === 1) {
                shot.className = 'hit disable-event';
              } else {
                shot.className = 'water disable-event';
              }
              if (computer.smart) {
                computerAction(player, compMove, [], []);
              }
            } else {
              computerAction(player, smart[0], smart[1], smart[2]);
            }
          } else {
            const ship = computer.ships.find(ship => ship.name == name);
            if (ship.isSunk()) {
              player.makeAttacks(ship, computer);
            }
          }
          if (player.gameOver() === true) {
            h2.innerText = 'Computer won!';
            score.appendChild(h2);
            container.classList.add('disable-event');
          }
        }, false);
      }
    }
  }

  return { renderBoard, setPlayerBoard };

})();

const gameLoop = () => {
  const gameBoard = GameBoard();
  const shipsPlayer = [Ship(5, 'A'), Ship(4, 'B'), Ship(3, 'C'), Ship(3, 'S'), Ship(2, 'D')];
  const shipsComputer = [Ship(5, 'A'), Ship(4, 'B'), Ship(3, 'C'), Ship(3, 'S'), Ship(2, 'D')];
  const container = document.querySelector('.container');

  player = Player(shipsPlayer, gameBoard);
  computer = Computer(shipsComputer, gameBoard);
  computer.placeShips();
  domManager.setPlayerBoard(player, computer);
};

export default gameLoop;
