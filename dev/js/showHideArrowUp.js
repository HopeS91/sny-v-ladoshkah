let arrowUp = document.getElementById('arrow-up');

const showHideArrowUp = () => {
	if (window.pageYOffset > window.innerHeight / 3) {
		arrowUp.style.display = 'inline-block';
	} else if (window.pageYOffset === 0) {
		arrowUp.style.display = 'none';
	}
}

window.addEventListener('scroll', showHideArrowUp);
