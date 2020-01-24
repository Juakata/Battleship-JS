import GameBoard from './gameBoard';
import Player from './player';
import Computer from './computer'
import Ship from './ship'

let player, computer;

const domManager = (() => {
  let smart = [];

  const getAllTdAfter = first => {
    let text = first.id;

    const firstId = first.id.split('-').splice(1, 2);
    const down = document.getElementById(`td-${parseInt(firstId[0])+1}-${firstId[1]}`);

    text += ` ${down.id}`;
    return text;
  }

  const getAllTdBefore = first => {
    let text = first.id;

    const firstId = first.id.split('-').splice(1, 2);

    let i = 1;
    let down, up, right, left, flag, x, y;
    let upCount = 0;
    let downCount = 0;
    let rightCount = 0;
    let leftCount = 0;
    const forget = [];
    do {
      flag = 0;
      down = document.getElementById(`td-${(parseInt(firstId[0]) + i)}-${firstId[1]}`);
      up = document.getElementById(`td-${(parseInt(firstId[0]) - i)}-${firstId[1]}`);
      right = document.getElementById(`td-${firstId[0]}-${(parseInt(firstId[1]) + i)}`);
      left = document.getElementById(`td-${firstId[0]}-${(parseInt(firstId[1]) - i)}`);

      if (down && down.className === 'ship move' && !forget.includes('down')) {
        text += ` ${down.id}`;
        downCount += 1;
        flag += 1;
      } else {
        if (!forget.includes('down')) {
          forget.push('down');
        }
      }
      if (up && up.className === 'ship move' && !forget.includes('up') ) {
        text += ` ${up.id}`;
        upCount += 1;
        flag += 1;
      } else {
        if (!forget.includes('up')) {
          forget.push('up');
        }
      }
      if (right && right.className === 'ship move' && !forget.includes('right')) {
        text += ` ${right.id}`;
        rightCount += 1;
        flag += 1;
      } else {
        if (!forget.includes('right')) {
          forget.push('right');
        }
      }

      if (left && left.className === 'ship move' && !forget.includes('left')) {
        text += ` ${left.id}`;
        leftCount += 1;
        flag += 1;
      } else {
        if (!forget.includes('left')) {
          forget.push('left');
        }
      }
      i += 1;

    } while (flag > 0);
    text += `_up-${upCount} down-${downCount} right-${rightCount} left-${leftCount}`;
    return text;
  }

  const addProperties = (first, steps) => {
      addTdProperties(first);
      const x = parseInt(first.id.split('-')[1]);
      const y = parseInt(first.id.split('-')[2]);
      let td;

      steps.forEach(step => {
        const go = step.split('-')[0];
        const max = step.split('-')[1];
        for (let i = 0; i <= max; i += 1) {
          switch (go) {
            case 'up':
                td = document.getElementById(`td-${(x - i)}-${y}`);
                addTdProperties(td);
                break;
            case 'down':
                td = document.getElementById(`td-${(x + i)}-${y}`);
                addTdProperties(td);
                break;
            case 'right':
                td = document.getElementById(`td-${x}-${(y + i)}`);
                addTdProperties(td);
                break;
            case 'left':
                td = document.getElementById(`td-${x}-${(y - i)}`);
                addTdProperties(td);
                break;
          }
        }
      });
  }

  const addTdProperties = td => {
      td.classList.add('ship');
      td.classList.add('move');
      td.draggable = true;

      td.addEventListener('dragstart', () => {
        const text = getAllTdBefore(td);
        event.dataTransfer.setData("text", text);
      });

      td.addEventListener('dragend', () => {

      }, false);
  }

  const removeTdProperties = all => {
    all.forEach(element => {
      const id = element.split('-');
      const td = document.getElementById(`td-${id[1]}-${id[2]}`);
      td.className = '';
      td.draggable = false;
    });
  }

  const displaykShips = (player) => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (typeof player.board[i][j] === 'string') {
          const current_td = document.getElementById(`td-${i}-${j}`);
          addTdProperties(current_td);
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

    table.addEventListener('dragover', () => {
      event.preventDefault();
    }, false);

    table.addEventListener('drop', () => {
      event.preventDefault();
      const text = event.dataTransfer.getData("text");
      const array = text.split('_');
      const allBefore = array[0].split(' ');
      const originId = allBefore[0].split('-');
      const origin = document.getElementById(`td-${originId[1]}-${originId[2]}`);

      if(origin && origin.className === 'ship move'){
        const steps = array[1].split(' ');
        const result = player.changeShip(origin, event.target, steps);
        if (result) {
          removeTdProperties(allBefore);
          addProperties(event.target, steps);        
        }
      }
    }, false);



    random.addEventListener('click', () => {
      player.placeShips();
      displaykShips(player);
    }, false);

    start.addEventListener('click', () => {
      editContainer.classList.add('display-none');
      containerTableShips.removeChild(table);
      editContainer.removeChild(random);
      editContainer.removeChild(start);
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
  document.getElementById('edit-container').className = 'edit-container';
  domManager.setPlayerBoard(player, computer);
};

export default gameLoop;
