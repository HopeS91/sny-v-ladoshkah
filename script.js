const anchorElements = document.querySelectorAll('[href^="#"]'); //выбираем все ссылки к якорям на странице
let speed = 1; // скорость прокрутки, может иметь дробное значение

function scrollToAnchor(e) {
	e.preventDefault(); // отменяем стандартное поведение

	let y = window.pageYOffset; // возвращает число пикселей, на которое документ прокручен по оси y
	let hash = this.href.replace(/[^#]*(.*)/, '$1'); // id элемента, к которому нужно перейти
	let indent = document.querySelector(hash).getBoundingClientRect().top; // отступ от окна браузера до id
	let start = null;

	requestAnimationFrame(step); // указывает браузеру на то, что вы хотите произвести анимацию, и просит его запланировать перерисовку на следующем кадре анимации

	function step(time) {
		if (start === null) start = time;

		let progress = time - start;
		let scroll = (indent < 0 ? Math.max(y - progress/speed, y + indent) : Math.min(y + progress/speed, y + indent));

		window.scrollTo(0, scroll);

		if (scroll !== y + indent) requestAnimationFrame(step);
		else location.hash = hash;
	}
}

anchorElements.forEach(anchorElement => anchorElement.addEventListener('click', scrollToAnchor, false)); //по клику на ссылку