const anchorElements = document.querySelectorAll('[href^="#"]');

// автоматическая медленная прокрутка к якорю
function scrollToAnchor(event) {
	event.preventDefault();

	let speed = 1; // скорость прокрутки
	let y = window.pageYOffset;
	let hash = this.href.replace(/[^#]*(.*)/, '$1'); // id элемента, к которому нужно перейти
	let indent = document.querySelector(hash).getBoundingClientRect().top; // отступ от окна браузера до id
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

anchorElements.forEach(anchorElement => anchorElement.addEventListener('click', scrollToAnchor));

