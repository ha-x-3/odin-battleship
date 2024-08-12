import Ship from './ship.js';

let newShip = new Ship(2);

it("Should create a new ship object", () => {
    expect(typeof newShip).toBe('object');
});