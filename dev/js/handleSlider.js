const photoIcons = document.querySelectorAll('.photo-icon');
const back = document.getElementById('back');
const slides = document.querySelectorAll('.slide');
const closeIcon = document.getElementById('close');

let mainSlide = null;
let start = null;

const showFirstSlideOnKeyDown = event => {
	event.key === 'Enter' &&
		showFirstSlide(event);
};

const showFirstSlide = event => {
	back.style.display = 'block';

	const clickedAlt = event.target.getAttribute('alt');
	let altToCompare = null;

	slides.forEach((slide, index) => {
		altToCompare = slide.getAttribute('alt');
		slide.style.display = 'none';

		if (clickedAlt === altToCompare) {
			slide.style.display = 'block';
			mainSlide = index;
			start = index;

			handleArrows();
		}
	});
};

const handleArrowsOnKeyDown = event => {
	event.key === 'ArrowLeft' &&
		handleArrows(-1);

	event.key === 'ArrowRight' &&
		handleArrows(1);
};

const handleArrows = index => {
	const prevSlide = document.querySelector('.prev-slide');
	const nextSlide = document.querySelector('.next-slide');

	if ((index === -1 && mainSlide === 0) ||
			(index === 1 && mainSlide === slides.length - 1)) {
		index = null;
	} else if (index === undefined) {
		mainSlide = start;
	} else {
		mainSlide += index;
	}

	mainSlide === 0 ?
		prevSlide.style.display = 'none' :
		prevSlide.style.display = 'block';

	mainSlide === slides.length - 1 ?
		nextSlide.style.display = 'none' :
		nextSlide.style.display = 'block';

	showSlides();
};

const showSlides = () => {
	slides.forEach(slide => slide.style.display = 'none');

	for (let i = start; i < slides.length; i++) {
		slides[mainSlide].style.display = 'block';

		currentSlide();
	}
};

const currentSlide = () => {
	const dots = document.querySelectorAll('.dot');

	dots.forEach(dot => dot.style.backgroundColor = '#ccc');

	for (let i = start; i < dots.length; i++) {
		dots[mainSlide].style.backgroundColor = '#c471a3';
	}
};

const hideSliderOnKeyDown = event => {
	event.key === 'Escape' &&
		hideSlider();
};

const hideSlider = () => {
	mainSlide = null;
	start = null;
	back.style.display = 'none';
};

if (back) {
	photoIcons.forEach(photo => photo.addEventListener('keydown', showFirstSlideOnKeyDown));
	photoIcons.forEach(photo => photo.addEventListener('click', showFirstSlide));
	window.addEventListener('keydown', handleArrowsOnKeyDown);
	window.addEventListener('keydown', hideSliderOnKeyDown);
	closeIcon.addEventListener('click', hideSlider);
}
