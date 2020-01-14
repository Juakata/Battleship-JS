const Ship = require('../ship');
describe('returns an object', () => {
  const ship = Ship(5);

  test("Test length of ship", () => {
    expect(ship.obj.length).toBe(5);
  })

  test("Checks if ship is hit", () => {
    const lifes = ship.obj.life;
    expect(lifes[3]).toBe(false);
    ship.hit(3);
    expect(lifes[3]).toBe(true);
  })

  test("Checks if ship is sunk", () => {
    expect(ship.isSunk()).toBe(false)
    for (let i = 0; i < 5; i += 1) {
      ship.hit(i);
    }
    expect(ship.isSunk()).toBe(true);
  })
});
