const Computer = (ships, gameBoard) => ({
  ships,
  board: gameBoard.createBoard(),
  options: gameBoard.getOptions(),
  smart: false,
  getRandomPositions() {
    const r1 = Math.floor(Math.random() * this.options.length);
    let r2 = Math.floor(Math.random() * 2);
    if (r2 === 0) {
      r2 = "horizontal";
    } else {
      r2 = "vertical";
    }

    return [r1, r2]
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
  placeShips() {
    let randoms;
    let result;
    let i = 0;
    let hitOn;
    while (i < 5) {
      randoms = this.getRandomPositions();
      hitOn = this.options[randoms[0]];
      this.options.splice(randoms[0], 1)
      result = gameBoard.canPlace(hitOn[0], hitOn[1], this.board, randoms[1], ships[i]);
      if (result) {
        gameBoard.addShip(hitOn[0], hitOn[1], this.board, randoms[1], ships[i])
        i += 1;
      }
    }
    this.options = gameBoard.getOptions();
  },
  makeMove(board, ships) {
    if (this.options.length > 0) {
      let randoms = this.getRandomPositions();
      let hitOn = this.options[randoms[0]];
      this.options.splice(randoms[0], 1);
      const name = board[hitOn[0]][hitOn[1]];
      gameBoard.receiveAttack(hitOn[0], hitOn[1], board, ships);
      if (board[hitOn[0]][hitOn[1]] == 1) {
        this.smart = true;
        return [hitOn[0], hitOn[1], name];
      } else {
        return [hitOn[0], hitOn[1]];
      }
    }
  },
  whereToGo(x, y, board, first, not) {
    let send;
    let count;
    if (!gameBoard.checkNull(x + 1, y, board) && typeof board[x + 1][y] !== 'number' && !not.includes(0)) {
      send = [x + 1, y];
    } else if (!gameBoard.checkNull(x - 1, y, board) && typeof board[x - 1][y] !== 'number' && !not.includes(1)) {
      if (!not.includes(0)) {
        not.push(0);
      }
      send = [x - 1, y];
    } else if (!gameBoard.checkNull(x, y + 1, board) && typeof board[x][y + 1] !== 'number' && !not.includes(2)) {
      for (let i = 0; i < 2; i += 1) {
        if (!not.includes(i)) {
          not.push(i);
        }
      }
      send = [x, y + 1];
    } else if (!gameBoard.checkNull(x, y - 1, board) && typeof board[x][y - 1] !== 'number') {
      for (let i = 0; i < 3; i += 1) {
        if (!not.includes(i)) {
          not.push(i);
        }
      }
      send = [x, y - 1];
    } else {
      not = [];
      x = first[0];
      y = first[1];
      if (!gameBoard.checkNull(x - 1, y, board) && typeof board[x - 1][y] !== 'integer') {
        send = [x - 1, y];
        not.push(0);
      } else {
        send = [x, y - 1];
        for (let i = 1; i <= 3; i += 1) {
          not.push(i);
        }
      }
    }
    return [send, not];
  },
  makeSmartMove(x, y, board, ships, first) {
    if (this.options.length > 0) {
      let send;
      if (typeof board[x][y] === 'string') {
        send = [x, y];
      } else {
        send = [first[0], first[1]];
      }
      this.removeFromOption([x, y]);
      gameBoard.receiveAttack(x, y, board, ships);
      const ship = ships.find(ship => ship.name == first[2]);
      if (ship.isSunk()) {
        this.smart = false;
      }
      return send;
    }
  }
});

module.exports = Computer;
