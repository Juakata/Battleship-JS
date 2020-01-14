const Ship = (length) => {
  const obj = {
    length,
    life: new Array(length).fill(false),
    sunk: false
  }

  const hit = n => {
    obj.life[n] = true;
  }

  const isSunk = () => {
    for (let i = 0; i < obj.length; i += 1) {
      if (obj.life[i] === false) {
        return false;
      }
    }
    return true;
  }

  return {obj, hit, isSunk}
}

module.exports = Ship;
