const Ship = require('../ship');

describe('ship validity tests', () => {
  let ship;

  beforeEach(() => {
    ship = Ship(5, 'A');
  });

  test("Test length of ship", () => {
    expect(ship.size).toBe(5);
  })

  test("Checks if ship is hit", () => {
    expect(ship.life).toBe(ship.size);
    ship.hit();
    expect(ship.life).toBe(ship.size - 1);
  })

  test("Checks if ship is sunk", () => {
    expect(ship.isSunk()).toBe(false)
    for (let i = 0; i < 5; i += 1) {
      ship.hit(i);
    }
    expect(ship.isSunk()).toBe(true);
  })
});
