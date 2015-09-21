var fingerScalarMap = {
	"pointer": 1,
	"middle": 1.1,
	"ring": 1,
	"pinky": 0.8
}

var fingerDistance = 40;

var angleSpread = Math.PI / 2

var lowerToMiddleDigitSpacing = 15;
var middleToUpperDigitSpacing = 15;

var angleScalar = 1 / 2.5;// used to bring fingers closer together

var initialAngle = Math.PI / 15

var Finger = function(fingerName){

	var fingerScalar = fingerScalarMap[fingerName] || 1

	var fingerNumber = Object.keys(fingerScalarMap).indexOf(fingerName)


	var angle = makeAngle(fingerNumber)
	var scaledAngle = makeAngle(fingerNumber, angleScalar)
	
	// the indenting is intentional, to make the object hierarchy clearer - I promise I'm not a bad programmer

	var lowerDigit = ballGroup()
	lowerDigit.position.add(xzVector(fingerDistance * (1 + fingerScalar) / 2, angle))
	// lowerDigit.position.add(xzVector(fingerDistance / 3, angle))
	

		var middleDigit = ballGroup()
		// middleDigit.position.add(xzVector(lowerToMiddleDigitSpacing * fingerScalar, scaledAngle))
		middleDigit.position.add(xzVector(lowerToMiddleDigitSpacing * fingerScalar, angle))

			var upperDigit = ballGroup()
			// upperDigit.position.add(xzVector(middleToUpperDigitSpacing * fingerScalar, scaledAngle))
			upperDigit.position.add(xzVector(middleToUpperDigitSpacing * fingerScalar, angle))

			middleDigit.add(upperDigit);
			middleDigit.add(lineTo(new THREE.Vector3(), upperDigit.position))

		lowerDigit.add(middleDigit);
		lowerDigit.add(lineTo(new THREE.Vector3(), middleDigit.position))

	lowerDigit.middleDigit = middleDigit
	lowerDigit.upperDigit = upperDigit

	return lowerDigit

	
}

function makeAngle(fingerNumber, scalar){
	scalar = scalar || 1
	return (fingerNumber / Object.keys(fingerScalarMap).length * angleSpread - angleSpread / 2) * scalar + initialAngle
}