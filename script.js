const anchorElements = document.querySelectorAll('[href^="#"]');
const arrowUp = document.getElementById('arrow-up');
const dropdown = document.querySelectorAll('.dropdown');
const burgerSpans = document.querySelectorAll('#burger span');
const dropdownMenu = document.getElementById('drop-menu');
const photoIcons = document.querySelectorAll('.photo-icon');
const back = document.getElementById('back');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevSlide = document.querySelector('.prev-slide');
const nextSlide = document.querySelector('.next-slide');
const closeIcon = document.getElementById('close');

// автоматическая медленная прокрутка к якорю
function scrollToAnchor(event) {
	event.preventDefault();

	let speed = 1;
	let y = window.pageYOffset;
	let hash = this.href.replace(/[^#]*(.*)/, '$1');
	let indent = document.querySelector(hash).getBoundingClientRect().top;
	let start = null;

	requestAnimationFrame(step);

	function step(time) {
		if (start === null) start = time;

		let progress = time - start;
		let scroll = (indent < 0 ? Math.max(y - progress/speed, y + indent) : Math.min(y + progress/speed, y + indent));

		window.scrollTo(0, scroll);

		if (scroll !== y + indent) requestAnimationFrame(step);
		else location.hash = hash;
	}
}

// прятать/показывать стрелку, которая автоматически прокручивает страницу на самый верх
function showHideArrowUp() {
	if (window.pageYOffset > window.innerHeight / 3) arrowUp.style.display = 'inline-block';
	else if (window.pageYOffset === 0) arrowUp.style.display = 'none';
}

// по клику на мини-фото показывать слайдер
let mainSlide = null;  // индекс активной картинки
let start = null;

function showFirstSlide() {
	back.style.display = 'block';

	let clickedAlt = this.getAttribute('alt');
	let comparedAlt = null;

	slides.forEach((slide, index) => {
		comparedAlt = slide.getAttribute('alt');
		slide.style.display = 'none';

		if (clickedAlt === comparedAlt) {
			slide.style.display = 'block';
			mainSlide = index;
			start = index;
			currentSlide(mainSlide);
		}

		if (start === 0) {
			prevSlide.style.display = 'none';
		} else if (start === photoIcons.length - 1) {
			nextSlide.style.display = 'none';
		} else {
			prevSlide.style.display = 'block';
			nextSlide.style.display = 'block';
		}
	});
}

// листать на кнопки "назад"/"вперёд"
function moveSlides(index) {
	mainSlide += index;

	if (mainSlide < 1) prevSlide.style.display = 'none';
	else prevSlide.style.display = 'block';

	if (mainSlide > slides.length - 2) nextSlide.style.display = 'none';
	else nextSlide.style.display = 'block';

	slides.forEach(slide => slide.style.display = 'none');

	for (let i = start; i < slides.length; i++) {
		slides[mainSlide].style.display = 'block';
		currentSlide(mainSlide);
	}
}

// подсвечивать соответствующую активной фотографии точку
function currentSlide() {
	dots.forEach(dot => dot.style.backgroundColor = '#ccc');

	for (let i = start; i < dots.length; i++) {
		dots[mainSlide].style.backgroundColor = '#c471a3';
	}
}

// прятать слайдер
function hideSlides() {
	mainSlide = null;
	start = null;
	back.style.display = 'none';
}

// трансформировать иконку-бургер
function toggleBurger(event) {
	burgerSpans[0].classList.toggle('span-one-active');
	burgerSpans[2].classList.toggle('span-three-active');
	setTimeout(function() {
		burgerSpans[1].classList.toggle('span-two-active');
	}, 0);

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

anchorElements.forEach(anchorElement => anchorElement.addEventListener('click', scrollToAnchor));
window.addEventListener('scroll', showHideArrowUp);
dropdown.forEach(element => element.addEventListener('click', toggleBurger));
photoIcons.forEach(photoIcon => photoIcon.addEventListener('click', showFirstSlide));
closeIcon.addEventListener('click', hideSlides);