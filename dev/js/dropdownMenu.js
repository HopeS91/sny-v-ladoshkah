// для IE
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

let burger = document.getElementById('burger');

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

burger.addEventListener('click', toggleBurger);
