let photoIcons = document.querySelectorAll('.photo-icon');
let back = document.getElementById('back');
let slides = document.querySelectorAll('.slide');
let prevSlide = document.querySelector('.prev-slide');
let nextSlide = document.querySelector('.next-slide');
let closeIcon = document.getElementById('close');

let mainSlide = null; // индекс активной картинки
let start = null; // с какой фотографии начать листать

const showFirstSlideOnKeyDown = event => {
	if (event.key === 'Enter') {
		showFirstSlide(event);
	}
}

const showFirstSlide = event => {
	back.style.display = 'block';

	let clickedAlt = event.target.getAttribute('alt');
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

const moveSlidesOnKeyDown = event => {
	if (event.key === 'ArrowLeft') {
		moveSlides(-1);
	} else if (event.key === 'ArrowRight') {
		moveSlides(1);
	}
}

const moveSlides = index => {
	mainSlide += index;

	if (mainSlide < 1) {
		prevSlide.style.display = 'none';
	} else {
		prevSlide.style.display = 'block';
	}

	if (mainSlide > slides.length - 2) {
		nextSlide.style.display = 'none';
	} else {
		nextSlide.style.display = 'block';
	}

	slides.forEach(slide => slide.style.display = 'none');

	for (let i = start; i < slides.length; i++) {
		slides[mainSlide].style.display = 'block';
		currentSlide(mainSlide);
	}
}

const currentSlide = () => {
	let dots = document.querySelectorAll('.dot');

	dots.forEach(dot => dot.style.backgroundColor = '#ccc');

	for (let i = start; i < dots.length; i++) {
		dots[mainSlide].style.backgroundColor = '#c471a3';
	}
}

const hideSlidesOnKeyDown = event => {
	if (event.key === 'Escape') {
		hideSlides(event);
	}
}

const hideSlides = event => {
	mainSlide = null;
	start = null;
	back.style.display = 'none';
}

if (back) {
	photoIcons.forEach(photoIcon => photoIcon.addEventListener('keydown', showFirstSlideOnKeyDown));
	photoIcons.forEach(photoIcon => photoIcon.addEventListener('click', showFirstSlide));
	window.addEventListener('keydown', moveSlidesOnKeyDown);
	window.addEventListener('keydown', hideSlidesOnKeyDown);
	closeIcon.addEventListener('click', hideSlides);
}
