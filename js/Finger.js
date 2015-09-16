var fingerScalarMap = {
	"pointer": 1,
	"middle": 1.2,
	"ring": 1,
	"pinky": 0.8
}

var fingerDistance = 40;

var angleSpread = Math.PI / 2

var lowerToMiddleDigitSpacing = 15;
var middleToUpperDigitSpacing = 15;

var angleScalar = 2.5;// used to bring fingers closer together

var Finger = function(fingerName){

	var fingerScalar = fingerScalarMap[fingerName] || 1

	this.fingerName = fingerName;
	this.fingerNumber = Object.keys(fingerScalarMap).indexOf(fingerName)


	var angle = this.fingerNumber / Object.keys(fingerScalarMap).length * angleSpread - angleSpread / 2
	
	// the indenting is intentional, to make the object hierarchy clearer - I promise I'm not a bad programmer

	this.lowerDigit = ballGroup()
	this.lowerDigit.position.add(xzVector(fingerDistance * (1 + fingerScalar) / 2, angle))
	// this.lowerDigit.position.add(xzVector(fingerDistance / 3, angle))
	

		this.middleDigit = ballGroup()
		this.middleDigit.position.add(xzVector(lowerToMiddleDigitSpacing * fingerScalar, angle / angleScalar))

			this.upperDigit = ballGroup()
			this.upperDigit.position.add(xzVector(middleToUpperDigitSpacing * fingerScalar, angle / angleScalar))

			this.middleDigit.add(this.upperDigit);
			this.middleDigit.add(lineTo(new THREE.Vector3(), this.upperDigit.position))

		this.lowerDigit.add(this.middleDigit);
		this.lowerDigit.add(lineTo(new THREE.Vector3(), this.middleDigit.position))

	
}

function xzVector(magnitude, angle){
	return new THREE.Vector3(Math.cos(angle) * magnitude, 0, Math.sin(angle) * magnitude)
}