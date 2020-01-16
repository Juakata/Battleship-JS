const Ship = (size, name) => ({
  size,
  name,
  life: size,
  hit() { this.life -= 1 },
  isSunk() {
    if (this.life == 0) {
      return true;
    } else {
      return false;
    }
  }
});

module.exports = Ship;
