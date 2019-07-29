const showHideArrowUp = () => {
	const arrowUp = document.getElementById('arrow-up');

	if (window.pageYOffset > window.innerHeight / 3) {
		arrowUp.style.display = 'inline-block';
    arrowUp.setAttribute('tabindex', '0');
	} else if (window.pageYOffset === 0) {
		arrowUp.style.display = 'none';
    arrowUp.setAttribute('tabindex', '-1');
	}
}

window.addEventListener('scroll', showHideArrowUp);
