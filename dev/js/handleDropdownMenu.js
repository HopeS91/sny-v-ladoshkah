// для IE
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const burger = document.getElementById('burger');

const toggleTabIndex = () => {
	window.innerWidth <= 800 ?
		burger.setAttribute('tabindex', '0') :
	  burger.setAttribute('tabindex', '-1');
}

const toggleBurgerOnKeyDown = event => {
	event.key === 'Enter' &&
    toggleBurger(event);
}

const toggleBurger = event => {
  const burgerSpans = document.querySelectorAll('#burger span');

  const dropMenu = event.currentTarget.nextElementSibling;

	if (dropMenu.style.display !== 'block') {
		burgerSpans[0].className = 'span-one-active';
		burgerSpans[2].className = 'span-three-active';
		setTimeout(() => {
			burgerSpans[1].className = 'span-two-active';
		}, 200);
  } else {
    burgerSpans.forEach(span => span.className = '');
  }

  toggleDropdownMenu();
}

const toggleDropdownMenu = () => {
	const dropdownMenu = document.getElementById('drop-menu');

	dropdownMenu.style.display !== 'block' ?
		dropdownMenu.style.display = 'block' :
	  dropdownMenu.style.display = 'none';
}

if (burger) {
  window.addEventListener('resize', toggleTabIndex);
  burger.addEventListener('keydown', toggleBurgerOnKeyDown);
  burger.addEventListener('click', toggleBurger);
}
