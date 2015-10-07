function lineIntersectsInfinitePlane(startPositionVector, endPositionVector, planeNormalVector, planePointVector){

	var displacementVector = endPositionVector.clone().sub(startPositionVector)
	var denominator = planeNormalVector.dot(displacementVector)

	if(denominator == 0)
		return false;

	var t = (planePointVector.dot(planeNormalVector) - planeNormalVector.dot(startPositionVector)) / denominator

	return t
}

function compareVectors(vectorA, vectorB, thresholdSquared){
	return vectorA.clone().sub(vectorB).lengthSq() <= thresholdSquared
}

var vectorThresholdSquared = 1e-12

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
	})
}

function pointOnLineVector(lineStartVector, lineDirectionVector, t){
	return lineStartVector.clone().add(lineDirectionVector.clone().multiplyScalar(t))
}

function hasCollided(planeA, planeB, planeC, planeNormal, startPoint, endPoint){

	var intersectionTime = lineIntersectsInfinitePlane(pointP, pointQ, planeNormal, planeA)

	if(intersectionTime < 0 || intersectionTime > 1)
		return false

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
	var t = lineIntersectsInfinitePlane(pointP, pointQ, planeNormal, planeA)
	console.log(t)
	var intersectionPoint = pointOnLineVector(pointP, displacementVector, t)
	console.log(intersectionPoint)
	var insideOfPlane = pointInPlane(intersectionPoint, planeA, planeB, planeC)
	console.log(insideOfPlane)

	// console.log(pointInPlane())




}