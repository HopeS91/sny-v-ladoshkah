const photoIcons = document.querySelectorAll('.photo-icon');
const back = document.getElementById('back');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevSlide = document.querySelector('.prev-slide');
const nextSlide = document.querySelector('.next-slide');
const closeIcon = document.getElementById('close');

let mainSlide = null; // индекс активной картинки
let start = null; // с какой фотографии начать листать

// по клику на мини-фото показывать слайдер
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

photoIcons.forEach(photoIcon => photoIcon.addEventListener('click', showFirstSlide));
closeIcon.addEventListener('click', hideSlides);
