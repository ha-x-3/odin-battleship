export default function Ship(length, name, hits = 0) {
	let sunk = false;

    return {
        length,
        name,
        hits,
        sunk
    };
}
