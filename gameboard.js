import Ship from './ship.js';

export default function Gameboard() {
	// Initialize board, shipsArray, hitCoords, and allSunk
	const board = createBoard(10);
	const shipsArray = [
		{ ship: Ship(1, 'Patrol-boat'), coordPairs: [] },
		{ ship: Ship(2, 'Submarine'), coordPairs: [] },
		{ ship: Ship(3, 'Destroyer'), coordPairs: [] },
		{ ship: Ship(4, 'Battleship'), coordPairs: [] },
		{ ship: Ship(5, 'Carrier'), coordPairs: [] },
	];
	const hitCoords = {
		missedHits: [],
		shipHits: [],
	};
	let allSunk = false;

	// Create board function
	function createBoard(size) {
		return Array.from({ length: size }, () => Array(size).fill('o'));
	}

	// Place ship function
	function placeShip(length, x, y, direction) {
		const shipIndex = shipsArray.findIndex(
			(ship) =>
				ship.ship.length === length && ship.coordPairs.length === 0
		);

		if (shipIndex === -1) return false;

		if (direction === 'H') {
			if (x + length > 10) return false;
			for (let i = x; i < x + length; i++) {
				if (board[i][y] !== 'o') return false;
			}
			for (let i = x; i < x + length; i++) {
				shipsArray[shipIndex].coordPairs.push({ x: i, y });
				board[i][y] = 'H';
			}
		} else if (direction === 'V') {
			if (y + length > 10) return false;
			for (let j = y; j < y + length; j++) {
				if (board[x][j] !== 'o') return false;
			}
			for (let j = y; j < y + length; j++) {
				shipsArray[shipIndex].coordPairs.push({ x, y: j });
				board[x][j] = 'V';
			}
		} else {
			return false;
		}
		return true;
	}

	// Receive attack function
	function receiveAttack(xHit, yHit) {
		if (board[xHit][yHit] === 'x' || board[xHit][yHit] === 's-x') return;

		let shipHit = false;
		for (const oneShip of shipsArray) {
			if (
				oneShip.coordPairs.some(
					(coord) => coord.x === xHit && coord.y === yHit
				)
			) {
				shipHit = true;
				oneShip.ship.hit();
				break;
			}
		}

		if (shipHit) {
			board[xHit][yHit] = 's-x';
			hitCoords.shipHits.push({ xHit, yHit });
		} else {
			board[xHit][yHit] = 'x';
			hitCoords.missedHits.push({ xHit, yHit });
		}

		checkAllSunk();
	}

	// Check if all ships are sunk
	function checkAllSunk() {
		allSunk = shipsArray.every(
			(ship) => ship.coordPairs.length === 0 || ship.ship.sunk
		);
	}

	// Return the public API
	return {
		get board() {
			return board;
		},
		get shipsArray() {
			return shipsArray;
		},
		get hitCoords() {
			return hitCoords;
		},
		get allSunk() {
			return allSunk;
		},
		placeShip,
		receiveAttack,
		checkAllSunk,
	};
}
