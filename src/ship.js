const Ship = (size, name) => ({
  size,
  name,
  life: Array(size).fill(false),
  hit(n) { this.life[n] = true },
  isSunk() {
    for (let i = 0; i < this.size; i += 1) {
      if (this.life[i] === false) {
        return false;
      }
    }
    return true;
  }
});

module.exports = Ship;
