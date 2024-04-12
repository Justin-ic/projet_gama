
var map = document.querySelector('#map')
var paths = document.querySelectorAll('.path')

// Polyfill pour redre le forEach partout

if (NodeList.prototype.forEach === undefined) {
	// Création du polyfill
	NodeList.prototype.forEach = function (collback){
		[].forEach.call(this, collback)
	}
}
paths.forEach(function (path) {
	path.addEventListener('mouseenter', function (e){
		console.log("Salut");
		console.log(this);

	})
})


