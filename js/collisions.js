
function vectorToGlobalVector(vector, matrixWorld){
	return vector.clone().applyMatrix4(matrixWorld)
}

function globalPosition(obj){
	return vectorToGlobalVector(obj.position, obj.matrixWorld)
}

function globalGeometry(obj){
	var vertices = obj.geometry.vertices
	var matrixWorld = obj.matrixWorld
	var globalVertices = []

	for(var i = 0; i < vertices.length; i++){
		var vertex = vertices[i]
		globalVertices.push(vectorToGlobalVector(vertex, matrixWorld))
	}

	return globalVertices

}

function isVector(object){
	return THREE.Vector3.prototype.isPrototypeOf(object)
}

function getLineVectorPairs(object){
	//traverses the object's children, looking for lines
	//returns an array of position arrays
	//e.g.
	/*
	[
		[pointAStart, pointAEnd],
		[pointBStart, pointBEnd]
	]
	*/



	if(object.type == "Line")
		return globalGeometry(object)

	var vectorPairArray = []

	for(var i = 0; i < object.children.length; i++){
		
		var potentialLineVectorPairs = getLineVectorPairs(object.children[i])

		if(potentialLineVectorPairs.length > 0){
			if(isVector(potentialLineVectorPairs[0]))
				vectorPairArray.push(potentialLineVectorPairs)
			else
				vectorPairArray = vectorPairArray.concat(potentialLineVectorPairs)
		}
	}


	return vectorPairArray

}