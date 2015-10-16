function timeLineIntersectsInfinitePlane(startPositionVector, endPositionVector, planeNormalVector, planePointVector){

	var displacementVector = endPositionVector.clone().sub(startPositionVector)
	var denominator = planeNormalVector.dot(displacementVector)

	if(denominator == 0)//does not intersect!
		return -1;

	var t = (planePointVector.dot(planeNormalVector) - planeNormalVector.dot(startPositionVector)) / denominator

	return t
}

function compareVectors(vectorA, vectorB, thresholdSquared){
	return vectorA.clone().sub(vectorB).lengthSq() <= thresholdSquared
}

var vectorThresholdSquared = 0.75

function pointInPlane(collisionPointVector, planeAVector, planeBVector, planeCVector){

	var vectors = [planeAVector, planeBVector, planeCVector]
	var unitVectors = []
	for(var i = 0; i < vectors.length; i++){
		var j = (i + 1) % vectors.length

		var planeComponentVector = vectors[j].clone().sub(vectors[i])
		var pointToPlanePointVector = collisionPointVector.clone().sub(vectors[i])

		unitVectors.push(planeComponentVector.clone().cross(pointToPlanePointVector).normalize())
	}


	return unitVectors.every(function(e){
		return compareVectors(unitVectors[0], e, vectorThresholdSquared)
	}) && collisionPointVector
}

function pointOnLineVector(lineStartVector, lineDirectionVector, t){
	return lineStartVector.clone().add(lineDirectionVector.clone().multiplyScalar(t))
}

function hasCollided(planeA, planeB, planeC, planeNormal, startPoint, endPoint){

	var intersectionTime = timeLineIntersectsInfinitePlane(startPoint, endPoint, planeNormal, planeA)

	if(intersectionTime < 0 || intersectionTime > 1)
		return false

	// console.log("Intersected at",intersectionTime)

	var displacementVector = endPoint.clone().sub(startPoint)

	var intersectionPoint = pointOnLineVector(startPoint, displacementVector, intersectionTime)



	return pointInPlane(intersectionPoint, planeA, planeB, planeC)

}

function test(){

	var planeA = new THREE.Vector3(0, 20, 0)
	var planeB = new THREE.Vector3(20, 0, 0)
	var planeC = new THREE.Vector3(-20, -20, 0)

	var pointP = new THREE.Vector3(100, 10, 10)
	var pointQ = new THREE.Vector3(100, 0, -10)
	
	var displacementVector = pointQ.clone().sub(pointP)

	var planeNormal = planeA.clone().sub(planeB).cross(planeA.clone().sub(planeC))
	var t = timeLineIntersectsInfinitePlane(pointP, pointQ, planeNormal, planeA)
	console.log(t)
	var intersectionPoint = pointOnLineVector(pointP, displacementVector, t)
	console.log(intersectionPoint)
	var insideOfPlane = pointInPlane(intersectionPoint, planeA, planeB, planeC)
	console.log(insideOfPlane)

	// console.log(pointInPlane())

}

function checkCollision(vectorPairArray, mesh){

	// var vertices = mesh.geometry.vertices
	var vertices = globalGeometry(mesh)

	for(var i = 0; i < mesh.geometry.faces.length; i++){
		var face = mesh.geometry.faces[i]

		var aVector = vertices[face.a]
		var bVector = vertices[face.b]
		var cVector = vertices[face.c]

		var normal = face.normal

		for(var j = 0; j < vectorPairArray.length; j++){

			var vectorPair = vectorPairArray[j]

			var p = vectorPair[0]
			var q = vectorPair[1]

			var collided = hasCollided(aVector, bVector, cVector, normal, p, q)

			if(collided)
				return collided
			

		}

	}

	return false


}

function testCollision(collisionGroup){
	var collisionChildren = []
	var vectorPairs = getLineVectorPairs(armGroup)
	for(var i = 0; i < collisionGroup.children.length; i++){

		var object = collisionGroup.children[i]
		if(object.type != "Mesh" || object.ignore === true)
			continue
		var collision = checkCollision(vectorPairs, object)
		if(collision){
			// console.log("Child",i,"collided at",collision)
			collisionChildren.push(i)
		}

	}

	return collisionChildren.length && collisionChildren || false//returns array with indices of collisionGroup which have collided, otherwise false
}