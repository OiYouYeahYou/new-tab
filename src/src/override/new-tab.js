let domLoaded = false
let imageLoaded = false
const { innerWidth, innerHeight } = window
const img = document.createElement('img')
img.addEventListener('load', contentLoaded)
img.src = `https://source.unsplash.com/random/${innerWidth}x${innerHeight}`

window.addEventListener('DOMContentLoaded', domLoad)

function contentLoaded() {
	imageLoaded = true
	appendImage()
}

function domLoad() {
	domLoaded = true
	appendImage()
}

function appendImage() {
	if (domLoaded && imageLoaded) {
		document.body.appendChild(img)
	}
}
