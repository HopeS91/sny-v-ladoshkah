// для IE
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

let dropdown = document.querySelectorAll('.dropdown');
let burgerSpans = document.querySelectorAll('#burger span');
let dropdownMenu = document.getElementById('drop-menu');

const toggleBurger = event => {
	burgerSpans[0].classList.toggle('span-one-active');
	burgerSpans[2].classList.toggle('span-three-active');
	setTimeout(() => {
		burgerSpans[1].classList.toggle('span-two-active');
	}, 200);

	let parentId = event.target.parentNode.id;

	if (event.target === burger || parentId === 'burger') {
		showDropdown();
	} else if (event.target === dropdownMenu) {
		hideDropdown();
	}
}

const showDropdown = () => {
	dropdownMenu.style.display = 'block';
}

const hideDropdown = () => {
	dropdownMenu.style.display = 'none';
}

dropdown.forEach(element => element.addEventListener('click', toggleBurger));
