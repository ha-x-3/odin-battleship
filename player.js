import Gameboard from "./gameboard.js";

export default function Player(name) {
	const playerBoard = Gameboard();

	const placePlayerShip = (newL, newX, newY, newD) => {
		playerBoard.placeShip(newL, newX, newY, newD);
		let placedShips = playerBoard.shipsArray.filter(
			(ship) => ship.coordPairs.length > 0
		);
		placedShips.forEach((ship) => {
			document.getElementById(ship.coordPairs.length).style.backgroundColor = "#70717c";
			//console.log('here');
		});

		//console.log(playerBoard.shipsArray);
	};

	const playerShot = (myTarget, myX, myY) => {
		myTarget.playerBoard.receiveAttack(myX, myY);
	};

	return {
		name,
		playerBoard,
		placePlayerShip,
		playerShot,
	};
}