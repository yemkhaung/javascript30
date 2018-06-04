function playSound(e) {

	// play the audio
	const audioElm = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	if (!audioElm) {
		console.log(`unsupported key : ${e.keyCode}`);
		return; // exits the function since no key bindings to audio
	}
	audioElm.currentTime = 0; // rewind to start
	audioElm.play();

	// button animation
	const keyElm = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	keyElm.classList.add("playing");

}

function removeTransform(e) {
	
	if(e.propertyName !== "transform") return; // skip if not transform event
	this.classList.remove("playing");
}

window.addEventListener("keydown", playSound);

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransform));
