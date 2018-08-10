const arrowUp = document.getElementById('arrow-up');

// показывать/прятать стрелку, которая автоматически прокручивает страницу на самый верх
function showHideArrowUp() {
	if (window.pageYOffset > window.innerHeight / 3) arrowUp.style.display = 'inline-block';
	else if (window.pageYOffset === 0) arrowUp.style.display = 'none';
}

window.addEventListener('scroll', showHideArrowUp);