var lowerThumbAngle = -Math.PI / 2 + Math.PI / 24
var thumbAngle = -Math.PI / 2 + Math.PI / 6

var thumbHandJointPosition = xzVector(10, lowerThumbAngle);
var lowerThumbJointPosition = xzVector(10, lowerThumbAngle);
var middleThumbJointPosition = xzVector(8, thumbAngle);
var upperThumbJointPosition = xzVector(8, thumbAngle);

var thumbHandJointMaxPercent = 0.55
var maxThumbHandJointAngle = Math.PI / 2.5

var lowerThumbJointMinPercent = 0.45
var maxLowerThumbJointAngle = Math.PI / 2

var thumbParts = []

var Thumb = function(fingerName){

	var thumbHandJoint = ballGroup()
	thumbHandJoint.position.add(thumbHandJointPosition)
	thumbParts.push(thumbHandJoint)
	fingers["thumb"] = thumbHandJoint

		lowerThumbJoint = ballGroup()
		lowerThumbJoint.position.add(lowerThumbJointPosition)
		thumbParts.push(lowerThumbJoint)

			middleThumbJoint = ballGroup()
			middleThumbJoint.position.add(middleThumbJointPosition)
			thumbParts.push(middleThumbJoint)

				upperThumbJoint = ballGroup()
				upperThumbJoint.position.add(upperThumbJointPosition)
				thumbParts.push(upperThumbJoint)

				middleThumbJoint.add(upperThumbJoint)
				middleThumbJoint.add(lineTo(new THREE.Vector3(), upperThumbJoint.position))

			lowerThumbJoint.add(middleThumbJoint)
			lowerThumbJoint.add(lineTo(new THREE.Vector3(), middleThumbJoint.position))

			lowerThumbJoint.middleJoint = middleThumbJoint
			lowerThumbJoint.upperJoint = upperThumbJoint


		thumbHandJoint.add(lowerThumbJoint)
		thumbHandJoint.add(lineTo(new THREE.Vector3(), lowerThumbJoint.position))


	return thumbHandJoint
	
}


function curlThumb(percent){



	for(var i = 0; i < thumbParts.length; i++){
		
		thumbParts[i].rotation.set(0, 0, 0, "XYZ")

	}

	var thumbHandJointPercent = Math.min(percent, thumbHandJointMaxPercent)
	var thumbHandJointAngle = Math.sin(thumbHandJointPercent / thumbHandJointMaxPercent * Math.PI / 2) * maxThumbHandJointAngle
	thumbHandJoint.rotateOnAxis(fingers["pinky"].position.clone().normalize(), thumbHandJointAngle)

	var lowerThumbJointRotationAxis = upperThumbJoint.position.clone().cross(handGroup.position).normalize()


	if(percent >= lowerThumbJointMinPercent){
		var lowerDigitAngle = Math.sin(
			(percent - lowerThumbJointMinPercent) / (1 - lowerThumbJointMinPercent) * Math.PI / 2
		) * maxLowerThumbJointAngle

		lowerThumbJoint.rotateOnAxis(lowerThumbJointRotationAxis, lowerDigitAngle)
	}				




}