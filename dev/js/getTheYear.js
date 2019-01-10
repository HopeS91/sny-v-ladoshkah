let spanYear = document.getElementById('year');

const getTheYear = () => {
  let today = new Date();
  let year = today.getFullYear();

  spanYear.textContent = year;
}

window.addEventListener('load', getTheYear);
