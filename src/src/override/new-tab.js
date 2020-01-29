let domLoaded = false
let imageLoaded = false
const { innerWidth, innerHeight } = window
const img = image(
	`https://source.unsplash.com/random/${innerWidth}x${innerHeight}`
)
img.addEventListener('load', contentLoaded)

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

chrome.windows.getCurrent({ populate: true }, function(window) {
	const { tabs } = window
	let list = document.getElementById('tab-list')
	tabs.forEach(tab => {
		const item = document.createElement('li')
		item.appendChild(image(tab.favIconUrl))
		item.appendChild(document.createTextNode(tab.title))
		list.appendChild(item)
	})
})

function image(url) {
	const img = document.createElement('img')
	img.src = url
	img.referrerPolicy = 'no-referer'
	return img
}
