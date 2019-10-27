const getTheYear = () => {
  const spanYear = document.getElementById('year');

  spanYear.textContent = new Date().getFullYear();
}

window.addEventListener('load', getTheYear);
