// для IE
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

let burger = document.getElementById('burger');
let burgerSpans = document.querySelectorAll('#burger span');
let dropdownMenu = document.getElementById('drop-menu');

const toggleTubindex = () => {
	if (window.innerWidth <= 800) {
		burger.setAttribute('tabindex', '0');
	} else {
		burger.setAttribute('tabindex', '-1');
	}
}

const toggleBurger = event => {
	let parentId = event.target.parentNode.id;

	if (event.target.id === 'burger' || parentId === 'burger') {
		burgerSpans[0].classList.toggle('span-one-active');
		burgerSpans[2].classList.toggle('span-three-active');
		setTimeout(() => {
			burgerSpans[1].classList.toggle('span-two-active');
		}, 200);

		toggleDropdownMenu();
	}
}

const toggleDropdownMenu = () => {
	if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
		dropdownMenu.style.display = 'block';
	} else {
		dropdownMenu.style.display = 'none';
	}
}

burger.addEventListener('click', toggleBurger);
window.addEventListener('resize', toggleTubindex);
