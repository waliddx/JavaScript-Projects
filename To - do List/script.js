const inputHolder = document.querySelector(".input-holder");
const orderedList = document.querySelector(".ordered-list");
const checked = document.querySelector(".check");
const deleted = document.querySelector(".delete");

const spanInner = "\u00d7";

// enter button
inputHolder.addEventListener('keypress', click => {
	if(click.key === "Enter") {
		myList()
	}
})

// add notes
function myList() {
	let li = document.createElement('li')
	let span = document.createElement('span')
	if (inputHolder.value !== '') {
		li.innerHTML = inputHolder.value;
		orderedList.appendChild(li)
		span.innerHTML = spanInner
		li.appendChild(span)
	}
	inputHolder.value = ''
	setStorage()
}

// checking the notes
orderedList.addEventListener('click', e => {
	if (e.target.tagName === 'LI') {
		e.target.classList.toggle('checked')
	} else if (e.target.tagName === 'SPAN') {
		e.target.parentElement.remove()
	}
	setStorage()
})

// check all
checked.addEventListener('click', () => {
	let childElements = orderedList.children
	for (let i = 0; i < childElements.length; i++) {
		if (!childElements[i].classList.contains('checked')) {
			childElements[i].classList.add('checked')
		} else {
			childElements[i].classList.remove('checked')
		}
		setStorage()
	}
})

// delete all
deleted.addEventListener('click', () => {
	while(orderedList.firstChild) {
		orderedList.firstChild.remove()
	}
})

// local storage
function setStorage() {
	localStorage.setItem('data', orderedList.innerHTML)
}

function getStorage() {
	orderedList.innerHTML = localStorage.getItem('data')
}

getStorage()
// recall main function
