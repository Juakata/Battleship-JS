const Player = (ships, gameBoard) => ({
  ships,
  board: gameBoard.createBoard(),
  options: gameBoard.getOptions(),
  getRandomPositions() {
    const r1 = Math.floor(Math.random() * 10);
    const r2 = Math.floor(Math.random() * 10);
    let r3 = Math.floor(Math.random() * 2);
    if (r3 === 0) {
      r3 = "horizontal";
    } else {
      r3 = "vertical";
    }

    return [r1, r2, r3]
  },
  resetBoard(){

    this.board.forEach(row => {
      row.forEach(element => {
        element = false;
        console.log(element);
      });
    });

  },
  placeShips() {
    this.board = gameBoard.createBoard();
    let randoms;
    let result;
    let i = 0;
    while (i < 5) {
      randoms = this.getRandomPositions();
      result = gameBoard.canPlace(randoms[0], randoms[1], this.board, randoms[2], ships[i]);
      if (result) {
        gameBoard.addShip(randoms[0], randoms[1], this.board, randoms[2], ships[i])
        i += 1;
      }
    }
    this.options = gameBoard.getOptions();
  },
  removeFromOption(arr) {
    let i = 0;
    while (i < this.options.length) {
      if (arr[0] === this.options[i][0] && arr[1] === this.options[i][1]) {
        this.options.splice(i, 1);
        i = 100;
      }
      i += 1;
    }
  },
  makeMove(x, y, board, ships) {
    if (this.options.length > 0) {
      this.removeFromOption([x, y]);
      gameBoard.receiveAttack(x, y, board, ships);
    }
  },
  makeAttacks(ship, computer) {
    const board = computer.board;
    const ships = computer.ships;
    const elements = [];
    if(ship.orientation === 'v'){
      for (let i = ship.first[0]; i < ship.size + ship.first[0]; i += 1) {
        elements.push([i, ship.first[1]]);
      }
    } else {
      for (let i = ship.first[1]; i < ship.size + ship.first[1]; i += 1) {
        elements.push([ship.first[0], i]);
      }
    }
    elements.forEach(e => {
      if (!gameBoard.checkNull(e[0] + 1, e[1], board) && typeof board[e[0] + 1][e[1]] !== 'number') {
        this.makeMove(e[0] + 1, e[1], board, ships);
        document.getElementById(`C-${e[0] + 1}-${e[1]}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1], board) && typeof board[e[0] - 1][e[1]] !== 'number') {
        this.makeMove(e[0] - 1, e[1], board, ships);
        document.getElementById(`C-${e[0] - 1}-${e[1]}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0], e[1] + 1, board) && typeof board[e[0]][e[1] + 1] !== 'number') {
        this.makeMove(e[0], e[1] + 1, board, ships);
        document.getElementById(`C-${e[0]}-${e[1] + 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0], e[1] - 1, board) && typeof board[e[0]][e[1] - 1] !== 'number') {
        this.makeMove(e[0], e[1] - 1, board, ships);
        document.getElementById(`C-${e[0]}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] + 1, e[1] + 1, board) && typeof board[e[0] + 1][e[1] + 1] !== 'number') {
        this.makeMove(e[0] + 1, e[1] + 1, board, ships);
        document.getElementById(`C-${e[0] + 1}-${e[1] + 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1] - 1, board) && typeof board[e[0] - 1][e[1] - 1] !== 'number') {
        this.makeMove(e[0] - 1, e[1] - 1, board, ships);
        document.getElementById(`C-${e[0] - 1}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] + 1, e[1] - 1, board) && typeof board[e[0] + 1][e[1] - 1] !== 'number') {
        this.makeMove(e[0] + 1, e[1] - 1, board, ships);
        document.getElementById(`C-${e[0] + 1}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1 , e[1] + 1, board) && typeof board[e[0] - 1][e[1] + 1] !== 'number') {
        this.makeMove(e[0] - 1, e[1] + 1, board, ships);
        document.getElementById(`C-${e[0] - 1}-${e[1] + 1}`).className = 'water';
      }
    });
  },
  gameOver() {
    return gameBoard.allShipsSunk(ships);
  }
});

module.exports = Player;
