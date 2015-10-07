function lineIntersectsInfinitePlane(startPositionVector, endPositionVector, planeNormalVector, planePointVector){

	var displacementVector = endPositionVector.clone().sub(startPositionVector)
	var denominator = planeNormalVector.dot(displacementVector)

	if(denominator == 0)
		return false;

	var t = (planePointVector.dot(planeNormalVector) - planeNormalVector.dot(startPositionVector)) / denominator

	return t >= 0 && t <= 1
}

function pointInPlane(displacementVector, collisionTime, planeAVector, planeBVector, planeCVector){
	var ABVector = planeBVector.clone().sub(planeAVector)
	var BCVector = planeCVector.clone().sub(planeBVector)
	var CAVector = planeAVector.clone().sub(planeCVector)

	//unfinished, will implement later

}