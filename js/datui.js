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
	this["hand"] = 0.5
	this["toggle animate"] = function(){
		animating = !animating
	}
}


var gui = new dat.GUI();

var fingerControl = new FingerControls();
var fingerFolder = gui.addFolder('Fingers')

for(var i = 0; i < fingerList.length; i++){
	//time for closures!
	(function(fingerName){
		var finger = fingerFolder.add(fingerControl, fingerName, 0, 1)

		finger.step(stepSize).onChange(function(val){
			animating = false
			curlFinger(fingerName, val)

		})

		finger.listen()
	})(fingerList[i])
}

fingerFolder.open()

var miscControls = new MiscControls()

var hand = gui.add(miscControls, 'hand', -1, 1)
var toggleAnimate = gui.add(miscControls, 'toggle animate')

hand.step(stepSize).onChange(function(val){
	animating = false
	curlHand(val)
})



hand.listen()


var datDom = document.getElementsByClassName('dg ac')[0]

datDom.onmouseenter = function(){
	controls.enabled = false
}

datDom.onmouseleave = function(){
	controls.enabled = true
}
