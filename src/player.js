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
  placeShips() {
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
      if (arr[0] === this.options[i][0] && arr[1] === this.options[i][1]){
        this.options.splice(i, 1);
        i = 100;
      }
      i += 1;
    }
  },
  makeMove(x, y, board, n, ships) {
    if(this.options.length > 0) {
      this.removeFromOption([x, y]);
      gameBoard.receiveAttack(x, y, board, n, ships);
    }
  }
});

module.exports = Player;
