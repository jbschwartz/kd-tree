import Node from './Node';

function next(axis) {
	return (axis == 'x') ? 'y' : 'x';
}

// Assumes points are sorted
function segment(points) {
	const index = Math.floor(points.length / 2);

	return {
		left: points.slice(0, index),
		middle: points[index],
		right: points.slice(index + 1)
	};
}

function kd(points, axis = 'x') {
	if(points.length === 0) { return null }
	if(points.length === 1) {
		return new Node(points[0], null, null);
	}

	points.sort((a, b) => a[axis] - b[axis])

	const {left, middle, right} = segment(points);
	const nextAxis = next(axis);

	return new Node(middle, kd(left, nextAxis), kd(right, nextAxis));
}

export {next, segment, kd}
