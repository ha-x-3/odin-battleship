export default function Ship(length, name, initalHits = 0) {
    let hits = initalHits;
	let sunk = false;

    const hit = () => {
		if (hits < length) {
			hits++;
		}
		return hits;
	};

	const isSunk = () => {
		sunk = length === hits;
		return sunk;
	};

    return {
		length,
		name,
		get hits() {
			return hits;
		},
		get sunk() {
			return sunk;
		},
		hit,
		isSunk,
	};
}
