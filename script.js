const anchorElements = document.querySelectorAll('[href^="#"]');
const arrowUp = document.getElementById('arrow-up');

// const photoAlbum = document.querySelector('.photo-album');
const photoIcons = document.querySelectorAll('.photo-icon');

const back = document.getElementById('back');
const front = document.getElementById('front');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevSlide = document.querySelector('.prev-slide');
const nextSlide = document.querySelector('.next-slide');
const close = document.getElementById('close');

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

function showHideArrowUp() {
	if (window.pageYOffset > window.innerHeight / 3) arrowUp.style.display = 'inline-block';
	else if (window.pageYOffset === 0) arrowUp.style.display = 'none';
}

function showSlider() {
	back.style.display = 'block';

	slides.forEach(slide => {
		if (this.getAttribute('alt') === slide.getAttribute('alt')) {
			slide.style.display = 'block';
		}
	});
}

function hideSlider() {
	back.style.display = 'none';
}

anchorElements.forEach(anchorElement => anchorElement.addEventListener('click', scrollToAnchor));
window.addEventListener('scroll', showHideArrowUp);
photoIcons.forEach(photoIcon => photoIcon.addEventListener('click', showSlider));
close.addEventListener('click', hideSlider);