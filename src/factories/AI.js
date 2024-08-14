import Gameboard from './gameboard.js';

export default function AI(name) {
	const playerBoard = Gameboard();
	const AIPastShots = [];

	const getRandomX = () => Math.floor(Math.random() * 10);
	const getRandomY = () => Math.floor(Math.random() * 10);
	const getRandomDirection = () => (Math.random() < 0.5 ? 'V' : 'H');

	const placeRandomShips = () => {
		let targetArray = playerBoard.shipsArray;
		targetArray.forEach((currentShip) => {
			let isShipPlaced = currentShip.coordPairs.length;
			while (isShipPlaced === 0) {
				let randomDirection = getRandomDirection();
				let ranX = getRandomX();
				let ranY = getRandomY();
				let pushLength = currentShip.ship.length;
				playerBoard.placeShip(pushLength, ranX, ranY, randomDirection);
				isShipPlaced = currentShip.coordPairs.length;
			}
		});
	};

	const computerShot = (myTarget) => {
		let shotExists = false;
		let hitX = getRandomX();
		let hitY = getRandomY();
		let pairOfShot = [hitX, hitY];
		if (AIPastShots.some((shot) => shot[0] === hitX && shot[1] === hitY)) {
			shotExists = true;
			while (shotExists) {
				hitX = getRandomX();
				hitY = getRandomY();
				pairOfShot = [hitX, hitY];
				shotExists = AIPastShots.some(
					(shot) => shot[0] === hitX && shot[1] === hitY
				);
			}
		}
		myTarget.playerBoard.receiveAttack(hitX, hitY);
		AIPastShots.push(pairOfShot);
	};

	placeRandomShips();

	return {
		name,
		playerBoard,
		AIPastShots,
		computerShot,
	};
}
