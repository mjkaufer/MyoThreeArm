var Finger = function(fingerName){
	this.fingerName = fingerName;
	this.group = new THREE.Object3D();

	// the indenting is intentional, to make the object hierarchy clearer - I promise I'm not a bad programmer

		this.lowerDigit = new THREE.Object3D();

			this.middleDigit = new THREE.Object3D();

				this.upperDigit = new THREE.Object3D();

				this.middleDigit.add(this.upperDigit);

			this.lowerDigit.add(this.middleDigit);

		this.group.add(this.lowerDigit);
	
}