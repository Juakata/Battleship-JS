const Ship = (size, name, first, orientation) => ({
  size,
  name,
  first,
  orientation,
  life: size,
  hit() { this.life -= 1; },
  isSunk() {
    if (this.life === 0) {
      return true;
    }
    return false;
  },
});

module.exports = Ship;
