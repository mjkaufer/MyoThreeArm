function ballGroup(){//balls are at centers of group, and show where the group pivots
	var group = new THREE.Object3D();

	var ball = new THREE.Mesh(geometry, material)

	group.add(ball)

	return group;
}

function lineTo(startVector, endVector){
	var lineGeo = new THREE.Geometry()
	lineGeo.vertices.push(startVector)
	lineGeo.vertices.push(endVector)
	return new THREE.Line(lineGeo, material)
}

function xzVector(magnitude, angle){
	return new THREE.Vector3(Math.cos(angle) * magnitude, 0, Math.sin(angle) * magnitude)
}