const dropdown = document.querySelectorAll('.dropdown');
const burgerSpans = document.querySelectorAll('#burger span');
const dropdownMenu = document.getElementById('drop-menu');

// трансформировать иконку-бургер
function toggleBurger(event) {
	burgerSpans[0].classList.toggle('span-one-active');
	burgerSpans[2].classList.toggle('span-three-active');
	setTimeout(function() {
		burgerSpans[1].classList.toggle('span-two-active');
	}, 200);

	if (event.target.closest('#burger')) showDropdown();
	else hideDropdown();
}

// показать dropdown-меню
function showDropdown() {
	dropdownMenu.style.display = 'none' ? 'block' : 'none';
}

// спрятать dropdown-меню
function hideDropdown() {
	dropdownMenu.style.display = 'block' ? 'none' : 'block';
}

dropdown.forEach(element => element.addEventListener('click', toggleBurger));

