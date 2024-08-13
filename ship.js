export default function Ship(length, name) {
	let hits = 0;

	const hit = () => {
		if (hits < length) {
			hits++;
		}
	};

	const isSunk = () => hits >= length;

	return {
		get length() {
			return length;
		},
		get name() {
			return name;
		},
		get hits() {
			return hits;
		},
		get sunk() {
			return isSunk();
		},
		hit,
		isSunk,
	};
}
