import Gameboard from './gameboard.js';

let testBoard = new Gameboard();

it('Should create a new gameboard class which generates a gameboard array', () => {
	expect(testBoard.board).toBeInstanceOf(Array);
});

it('Should place horizontal and vertical ships correctly', () => {
	testBoard.placeShip(5, 0, 5, 'V');
	testBoard.placeShip(4, 1, 5, 'H');
	expect(testBoard.board).toEqual([
		['o', 'o', 'o', 'o', 'o', 'V', 'V', 'V', 'V', 'V'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
	]);
});

it('Should not allow placing ships outside the board', () => {
	testBoard.placeShip(5, 8, 6, 'H');
	expect(testBoard.board).toEqual([
		['o', 'o', 'o', 'o', 'o', 'V', 'V', 'V', 'V', 'V'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
	]);
});

it('Should not place on already existing ship', () => {
	testBoard.placeShip(3, 0, 6, 'H');
	expect(testBoard.board).toEqual([
		['o', 'o', 'o', 'o', 'o', 'V', 'V', 'V', 'V', 'V'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
	]);
});

it('Should receive hits in both ship and non-ship coordonates', () => {
	testBoard.receiveAttack(0, 0);
	testBoard.receiveAttack(0, 5);
	expect(testBoard.board).toEqual([
		['x', 'o', 'o', 'o', 'o', 's-x', 'V', 'V', 'V', 'V'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'H', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
	]);
});

it('Should store the correct hit in the ship class', () => {
	let testShip = testBoard.shipsArray[4].ship;
	expect(testShip.hits).toEqual(1);
});

it('Should store the hits individually based on miss or hit status', () => {
	let missedHit = testBoard.hitCoords.missedHits[0];
	let shipHit = testBoard.hitCoords.shipHits[0];
	expect(missedHit).toEqual({ xHit: 0, yHit: 0 });
	expect(shipHit).toEqual({ xHit: 0, yHit: 5 });
});

it('Should sink a ship after it has been fully hit', () => {
	testBoard.placeShip(2, 1, 1, 'H');
	// l5 = [4], l4 = [3],l3 = [2],l2 = [1],l1 = [0]
	testBoard.receiveAttack(1, 1);
	testBoard.receiveAttack(2, 1);
	expect(testBoard.shipsArray[1].ship.sunk).toBeTruthy();
});

it('Should be able to report by itself when all the ships have been sunk', () => {
	testBoard.receiveAttack(1, 5);
	testBoard.receiveAttack(2, 5);
	testBoard.receiveAttack(3, 5);
	testBoard.receiveAttack(4, 5);
	testBoard.receiveAttack(0, 5);
	testBoard.receiveAttack(0, 6);
	testBoard.receiveAttack(0, 7);
	testBoard.receiveAttack(0, 8);
	testBoard.receiveAttack(0, 9);
	expect(testBoard.allSunk).toBeTruthy();
});
