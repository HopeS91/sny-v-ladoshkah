const anchorElements = document.querySelectorAll('[href^="#"]');
const arrowUp = document.getElementById('arrow-up');
const photoIcons = document.querySelectorAll('.photo-icon');
const back = document.getElementById('back');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevSlide = document.querySelector('.prev-slide');
const nextSlide = document.querySelector('.next-slide');
const closeIcon = document.getElementById('close');

// автоматическая медленная прокрутка к якорю
function scrollToAnchor(e) {
	e.preventDefault();

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
let mainSlide = 1;  // индекс активной картинки

function moveSlides(index) {
	showSlides(mainSlide += index);
}

function currentSlide(index) {
	showSlides(mainSlide = index);
}

function showSlides(index) {
	back.style.display = 'block';

	if (index > slides.length) mainSlide = 1;
	if (index < 1) mainSlide = slides.length;
	
	// ИСПРАВИТЬ НА: начать просмотр с той, по которой был клик
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
		slides[mainSlide - 1].style.display = 'block';
	}

	// ИСПРАВИТЬ НА: окрасить ту, по которой был клик
	for (let i = 0; i < dots.length; i++) {
		dots[i].style.backgroundColor = '#ccc';
		dots[index - 1].style.backgroundColor = '#000';
	}
}

function hideSlides() {
	back.style.display = 'none';
}

anchorElements.forEach(anchorElement => anchorElement.addEventListener('click', scrollToAnchor));
window.addEventListener('scroll', showHideArrowUp);
photoIcons.forEach(photoIcon => photoIcon.addEventListener('click', showSlides));
closeIcon.addEventListener('click', hideSlides);