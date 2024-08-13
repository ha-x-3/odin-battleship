import "./styles.css";
import AI from "../AI.js";
import Player from "../player.js";

const computerBoard = document.querySelector('.computer-array');
const playerBoard = document.querySelector('.player-array');
const placeShipsInfo = document.querySelector('.place-ships-info');
const canStartGame = document.querySelector('.can-start');
const winnerLabel = document.querySelector('.winner');
const playerPanel = document.querySelector('.player-board');
const computerPanel = document.querySelector('.computer-board');

const modal = document.querySelector('.modal');
const modalMobile = document.querySelector('.modal-mobile');
const closeModalMobile = document.querySelector('.close-modal');

const lengthSelectors = document.querySelectorAll('.length-selector');
let newGame = document.querySelector('.new-game');

let player = Player('player');
let computer = AI('computer');
let shipLength = null;
let shipDirection = 'V';

const game = () => {
	player = Player('player');
	computer = AI('computer');
	gameStart();
};

const gameStart = () => {
	clearBoard(player);
	renderBoard(player);
	clearBoard(computer);
	renderBoard(computer);
};

const renderBoard = (boardName) => {
	let targetArray = boardName.playerBoard.board;
	const targetAppend = document.querySelector(`.${boardName.name}-array`);
	targetArray.forEach((row, rowIndex) => {
		const myRow = document.createElement('div');
		myRow.classList.add('row');
		row.forEach((cell, columnIndex) => {
			const myCell = document.createElement('div');
			myCell.classList.add('cell');
			myCell.setAttribute('data-x', rowIndex);
			myCell.setAttribute('data-y', columnIndex);
			let thisCell = targetArray[rowIndex][columnIndex];
			if (thisCell === 'x') {
				myCell.classList.add('unclickable');
				myCell.classList.add('missed-hit');
				myCell.classList.add('fa-regular');
				myCell.classList.add('fa-x');
			} else if (thisCell === 's-x') {
				myCell.classList.add('unclickable');
				myCell.classList.add('correct-hit');
				myCell.classList.add('fa-regular');
				myCell.classList.add('fa-x');
				myCell.classList.add('ship-style');
			}
			myRow.appendChild(myCell);
			if (boardName.name === 'computer') {
				myCell.addEventListener('click', (e) => {
					if (thisCell !== 'x' || thisCell !== 's-x') {
						attackEvent(e);
						updateBoard(boardName);
					}
				});
			}
			if (boardName.name === 'player') {
				if (thisCell === 'H') {
					myCell.classList.add('ship-style');
					myCell.classList.add('invalid-placement');
				} else if (thisCell === 'V') {
					myCell.classList.add('ship-style');
					myCell.classList.add('invalid-placement');
				}
				myCell.addEventListener('click', (e) => {
					e.preventDefault();
					placeShipEvent(e);
					updateBoard(boardName);
				});
			}
		});
		targetAppend.appendChild(myRow);
	});
};

// CHECKING IF ALL SHIPS WERE PLACED SO WE CAN START ATTACKING
const checkPlayerShips = () => {
	let targetCheck = player.playerBoard.shipsArray;
	let response = targetCheck.every((ship) => ship.coordPairs.length > 0);

	if (response) {
		//when you place all ships, hide my panel
		playerPanel.classList.add('hide-on-mobile');
		// display the comp panel for first move
		computerPanel.classList.remove('hide-on-mobile');
	}
	return response;
};

// ATTACKING AN ENEMY, BEING ATTACKED BY COMPUTER, AND CHECKING FOR WIN CONDITION
const attackEvent = (e) => {
	let x = parseInt(e.target.getAttribute('data-x'));
	let y = parseInt(e.target.getAttribute('data-y'));
	let canAttack = checkPlayerShips();
	if (canAttack) {
		// PLAYER TURN
		// when player's turn is on, i already see the comp panel
		//i attack
		player.playerShot(computer, x, y);
		setTimeout(() => {
			// after attack, i hide the comp board and display mine
			computerPanel.classList.remove('display-on-mobile');
			computerPanel.classList.add('hide-on-mobile');
			playerPanel.classList.remove('hide-on-mobile');
			playerPanel.classList.add('display-on-mobile');
			console.log(
				'hiding the computer board after my attack and showing mine'
			);
		}, 300);
		if (computer.playerBoard.allSunk) {
			endGame(player);
		}
		// AI TURN
		computer.computerShot(player);
		setTimeout(() => {
			playerPanel.classList.remove('display-on-mobile');
			playerPanel.classList.add('hide-on-mobile');
			computerPanel.classList.remove('hide-on-mobile');
			computerPanel.classList.add('display-on-mobile');
		}, 1000);
		updateBoard(player);
		if (player.playerBoard.allSunk) {
			endGame(computer);
		}
	}
};

// END GAME (MAYBE ADD "PLAY AGAIN?")
const endGame = (winnerName) => {
	computerBoard.classList.add('unclickable');
	canStartGame.style.display = 'none';
	winnerLabel.style.display = 'block';
	if (winnerName.name === 'player') {
		winnerLabel.innerText = `You Won!`;
	} else winnerLabel.innerText = `You Lost! Try again? ->`;
};

// PLACING PLAYER SHIP ON CLICK
const placeShipEvent = (e) => {
	let x = parseInt(e.target.getAttribute('data-x'));
	let y = parseInt(e.target.getAttribute('data-y'));
	player.placePlayerShip(shipLength, x, y, shipDirection);
	let allShipsPlaced = checkPlayerShips();
	if (allShipsPlaced) {
		placeShipsInfo.style.display = 'none';
		canStartGame.style.display = 'block';
		computerBoard.classList.remove('unclickable');
		playerBoard.classList.add('unclickable');
		directionSelector.classList.add('unclickable');
	}
	shipLength = null;
};

const clearBoard = (board) => {
	const targetDiv = board.name;
	const targetClear = document.querySelector(`.${targetDiv}-array`);
	targetClear.innerHTML = '';
};

const updateBoard = (board) => {
	clearBoard(board);
	renderBoard(board);
};

// NEW GAME BUTTON

newGame.addEventListener('click', () => {
	lengthSelectors.forEach((selector) => {
		selector.style.backgroundColor = '#1a5091';
	});
	placeShipsInfo.style.display = 'block';
	canStartGame.style.display = 'none';
	winnerLabel.style.display = 'none';
	playerBoard.classList.remove('unclickable');
	game();
});

// DOM TOGGLE SHIPS SELECTORS

lengthSelectors.forEach((selector) => {
	selector.addEventListener('click', (e) => {
		shipLength = parseInt(e.target.id);
	});
});

// DOM TOGGLE DIRECTION
const directionSelector = document.querySelector('.player-direction');
directionSelector.addEventListener('click', () => {
	if (directionSelector.innerText === 'H') {
		shipDirection = 'V';
		directionSelector.innerText = 'V';
	} else if (directionSelector.innerText === 'V') {
		shipDirection = 'H';
		directionSelector.innerText = 'H';
	}
});
// HOW TO PLAY TOGGLE

placeShipsInfo.addEventListener('mouseover', () => {
	modal.style.visibility = 'visible';
});
modal.addEventListener('mouseout', () => {
	modal.style.visibility = 'hidden';
});
modal.addEventListener('mouseover', () => {
	modal.style.visibility = 'visible';
});

placeShipsInfo.addEventListener('click', () => {
	modalMobile.style.visibility = 'visible';
});
closeModalMobile.addEventListener('click', () => {
	modalMobile.style.visibility = 'hidden';
});
game();
