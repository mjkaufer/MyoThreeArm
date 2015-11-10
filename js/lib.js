var geometry = new THREE.SphereGeometry( 2, 10, 10 );
var lineMaterial = new THREE.LineBasicMaterial({
	color: new THREE.Color().setHSL(0, 0.5, 0.5),
	linewidth: 20
});
var material = new THREE.MeshBasicMaterial({
	color: new THREE.Color().setHSL(0.5, 0.5, 0.5),
	side: THREE.DoubleSide
});

var blueColor = new THREE.Color(0x00ffff)
var redColor = new THREE.Color(0xff0000)
var blueMaterial = new THREE.MeshLambertMaterial( {color: blueColor, opacity: 0.8, transparent: true} );
var redMaterial = new THREE.MeshLambertMaterial( {color: redColor, opacity: 0.8, transparent: true} );

var rotationValues = {
	"hand":0,
	"arm": 0,
	"thumb": 0,
	"pointer": 0,
	"middle": 0,
	"ring": 0,
	"pinky": 0,
}

var gestures = {
	fist : {
		"hand":0,
		"arm": 0,
		"thumb": 1,
		"pointer": 1,
		"middle": 1,
		"ring": 1,
		"pinky": 1,
	},
	open : {
		"hand":0,
		"arm": 0,
		"thumb": 0,
		"pointer": 0,
		"middle": 0,
		"ring": 0,
		"pinky": 0,
	}
}

function animateTo(animationValues){
	for(var key in animationValues)
		animateObject(key, animationValues[key])
}


//animates object from its current position to the end position specified, over a given time (in ms) with a given amount of updates per second
//possible names are the keys of rotationValues
function animateObject(name, destinationValue, time, updatesPerSecond){

	var curlFunction = null;
	if(name == "hand")
		curlFunction = curlHand
	else if(name == "arm")
		curlFunction = rotateArm
	else if(name in rotationValues)
		curlFunction = curlFinger
	else
		return false

	if(!updatesPerSecond)
		updatesPerSecond = 100

	if(!time)
		time = 1000

	var initialRotationValue = rotationValues[name]

	var steps = time * updatesPerSecond / 1000

	var delta = (destinationValue - initialRotationValue) / (steps)

	var currentStep = 0;

	var animationInterval = setInterval(function(){

		var currentRotationValue = rotationValues[name]

		curlFunction(currentRotationValue + delta, name)

		currentStep++

		if(currentStep >= steps)
			return clearInterval(animationInterval)

	}, time / steps)



}

function updateColors(dh){
	
	material.color.offsetHSL(dh, 0, 0)
	lineMaterial.color.offsetHSL(dh, 0, 0)
}

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
	return new THREE.Line(lineGeo, lineMaterial)
}

function xzVector(magnitude, angle){
	return new THREE.Vector3(Math.cos(angle) * magnitude, 0, Math.sin(angle) * magnitude)
}

function vectorToGlobalVector(vector, matrixWorld){
	return vector.clone().applyMatrix4(matrixWorld)
}

function globalPosition(obj){
	return vectorToGlobalVector(obj.position, obj.matrixWorld)
}

function globalGeometry(obj){//obj is geometry, returns vertex array
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

function faceGeometry(vectorA, vectorB, vectorC){
	var geo = new THREE.Geometry()

	geo.vertices.push(vectorA)
	geo.vertices.push(vectorB)
	geo.vertices.push(vectorC)
	var normal = vectorA.clone().sub(vectorB).cross(vectorA.clone().sub(vectorC)).normalize()
	var color = new THREE.Color(0xff0000)

	geo.faces.push(
		new THREE.Face3( 0, 1, 2, normal, color, 0 )
	)

	return geo

}
