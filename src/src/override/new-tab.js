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

updateTabList()

function updateTabList() {
	chrome.windows.getCurrent({ populate: true }, windowHandler)
}

/**
 * @param {chrome.windows.Window} window
 */
function windowHandler(window) {
	const { tabs } = window
	Array.from(document.getElementsByClassName('tab-list')).forEach(node => {
		node.remove()
	})
	let wrapper = document.getElementById('tab-list-wrapper')
	let list = document.createElement('ul')
	list.classList.add('tab-list')
	wrapper.appendChild(list)

	tabs.forEach(tab => {
		list.appendChild(createTabDomItem(tab))
	})
}

/**
 * @param {chrome.tabs.Tab} tab
 */
function createTabDomItem(tab) {
	const btnClose = document.createElement('button')
	btnClose.appendChild(document.createTextNode('close'))
	btnClose.addEventListener('click', () => {
		chrome.tabs.remove(tab.id, () => {
			console.log(`closed tab: ${tab.title}`)
			item.remove()
		})
	})

	const favicon = image(tab.favIconUrl || '../../icons/icon19.png')
	favicon.classList.add('tab-favicon')
	favicon.addEventListener('onerror', err => {
		console.log(err)
	})

	const title = document.createElement('span')
	title.appendChild(document.createTextNode(tab.title))
	title.addEventListener('click', () => {
		chrome.tabs.update(tab.id, { active: true }, win => {
			console.log(`highlighted tab: ${tab.title}`)
			console.log(win)
		})
	})

	const item = document.createElement('li')
	item.appendChild(favicon)
	item.appendChild(btnClose)
	item.appendChild(title)

	return item
}

function image(url) {
	const img = document.createElement('img')
	img.src = url
	img.referrerPolicy = 'no-referer'
	return img
}
