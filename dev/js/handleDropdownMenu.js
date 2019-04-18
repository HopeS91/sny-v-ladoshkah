// для IE
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

let burger = document.getElementById('burger');

const toggleTubindex = () => {
	if (burger && window.innerWidth <= 800) {
		burger.setAttribute('tabindex', '0');
	} else if (burger && window.innerWidth > 800) {
		burger.setAttribute('tabindex', '-1');
	}
}

const toggleBurgerOnKeyDown = event => {
	if (event.key === 'Enter') {
    toggleBurger(event);
  }
}

const toggleBurger = event => {
	let parentId = event.target.parentNode.id;

	if (event.target.id === 'burger' || parentId === 'burger') {
		let burgerSpans = document.querySelectorAll('#burger span');

		burgerSpans[0].classList.toggle('span-one-active');
		burgerSpans[2].classList.toggle('span-three-active');
		setTimeout(() => {
			burgerSpans[1].classList.toggle('span-two-active');
		}, 200);

		toggleDropdownMenu();
	}
}

const toggleDropdownMenu = () => {
	let dropdownMenu = document.getElementById('drop-menu');

	if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
		dropdownMenu.style.display = 'block';
	} else {
		dropdownMenu.style.display = 'none';
	}
}

if (burger) {
  window.addEventListener('resize', toggleTubindex);
  burger.addEventListener('keydown', toggleBurgerOnKeyDown);
  burger.addEventListener('click', toggleBurger);
}
