const getTheYear = () => {
  const spanYear = document.getElementById('year');

  const today = new Date();
  const year = today.getFullYear();

  spanYear.textContent = year;
}

window.addEventListener('load', getTheYear);
