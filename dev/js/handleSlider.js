const photoIcons = document.querySelectorAll('.photo-icon');
const back = document.getElementById('back');
const slides = document.querySelectorAll('.slide');
const closeIcon = document.getElementById('close');

let mainSlide = null;
let start = null;

const showFirstSlideOnKeyDown = event => {
	if (event.key === 'Enter') {
		showFirstSlide(event);
	}
}

const showFirstSlide = event => {
	back.style.display = 'block';

	let clickedAlt = event.target.getAttribute('alt');
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
}

const handleArrowsOnKeyDown = event => {
	if (event.key === 'ArrowLeft') {
		handleArrows(-1);
	} else if (event.key === 'ArrowRight') {
		handleArrows(1);
	}
}

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

	if (mainSlide === 0) {
		prevSlide.style.display = 'none';
	} else {
		prevSlide.style.display = 'block';
	}

	if (mainSlide === slides.length - 1) {
		nextSlide.style.display = 'none';
	} else {
		nextSlide.style.display = 'block';
	}

	showSlides();
}

const showSlides = () => {
	slides.forEach(slide => slide.style.display = 'none');

	for (let i = start; i < slides.length; i++) {
		slides[mainSlide].style.display = 'block';
		currentSlide();
	}
}

const currentSlide = () => {
	let dots = document.querySelectorAll('.dot');

	dots.forEach(dot => dot.style.backgroundColor = 'oldlace');

	for (let i = start; i < dots.length; i++) {
		dots[mainSlide].style.backgroundColor = 'saddlebrown';
	}
}

const hideSliderOnKeyDown = event => {
	if (event.key === 'Escape') {
		hideSlider();
	}
}

const hideSlider = () => {
	mainSlide = null;
	start = null;
	back.style.display = 'none';
}

if (back) {
	photoIcons.forEach(photo => photo.addEventListener('keydown', showFirstSlideOnKeyDown));
	photoIcons.forEach(photo => photo.addEventListener('click', showFirstSlide));
	window.addEventListener('keydown', handleArrowsOnKeyDown);
	window.addEventListener('keydown', hideSliderOnKeyDown);
	closeIcon.addEventListener('click', hideSlider);
}
