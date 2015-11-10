var fingerList = ["thumb", "pointer", "middle", "ring", "pinky"]
var animating = true
var stepSize = 0.01


var FingerControls = function() {
	for(var i = 0; i < fingerList.length; i++){
		var fingerName = fingerList[i]
		this[fingerName] = 0.5
	}
};

var MiscControls = function(){
	this["hand"] = -0.1
	this["arm rotation"] = 0.1
	this["opacity"] = 0.8
	this["toggle animate"] = function(){
		animating = !animating
	}
}

// var TrainingControls = function(){

// 	this["train name"] = ""

// 	this["train"] = function(){
// 		//train model with "train name"
// 	}

// 	this["stream"] = function(){
// 		//stream
// 	}

// 	this["stop stream"] = function(){
// 		//stop stream
// 	}
// }


var gui = new dat.GUI();

var fingerControl = new FingerControls();
var fingerFolder = gui.addFolder('Fingers')

for(var i = 0; i < fingerList.length; i++){
	//time for closures!
	(function(fingerName){
		var finger = fingerFolder.add(fingerControl, fingerName, 0, 1)

		finger.step(stepSize).onChange(function(val){
			animating = false
			curlFinger(val, fingerName)

		})

		finger.listen()
	})(fingerList[i])
}

fingerFolder.open()

var miscControls = new MiscControls()

var hand = gui.add(miscControls, 'hand', -1, 1)
var armRotation = gui.add(miscControls, 'arm rotation', -1, 1)

var opacity = gui.add(miscControls, 'opacity', 0, 1)
var toggleAnimate = gui.add(miscControls, 'toggle animate')

hand.step(stepSize).onChange(function(val){
	animating = false
	curlHand(val)
})

armRotation.step(stepSize).onChange(function(val){
	animating = false
	rotateArm(val)
})

opacity.step(stepSize).onChange(function(val){
	redMaterial.opacity = val
	blueMaterial.opacity = val
})


armRotation.listen()
hand.listen()

// var trainingControl = new TrainingControls()
// var trainingFolder = gui.addFolder('TrainingControls')

// trainingFolder.add(trainingControl, 'train name')
// trainingFolder.add(trainingControl, 'train')
// trainingFolder.add(trainingControl, 'stream')
// trainingFolder.add(trainingControl, 'stop stream')

// trainingFolder.open()

var datDom = document.getElementsByClassName('dg ac')[0]

datDom.onmouseenter = function(){
	controls.enabled = false
}

datDom.onmouseleave = function(){
	controls.enabled = true
}
