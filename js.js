const search = document.getElementById("search");
const page = document.querySelector(".paging");
const kontenjer = document.querySelector(".filmovi");
const moviurl = `http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e546593458598efbf84e3498ddc6db6a`;
const imgPath = `https://image.tmdb.org/t/p/w500`;
const searchApi = `http://api.themoviedb.org/3/search/movie?api_key=e546593458598efbf84e3498ddc6db6a&query=`;
const pageNumber = document.getElementById("page");

let url = moviurl;

dohvatiFilmove(url, 1);

async function dohvatifilm(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=e546593458598efbf84e3498ddc6db6a`
  );
  const respData = await res.json();

  showMoadal(respData);
}

async function dohvatiFilmove(url, page) {
  const response = await fetch(url + "&page=" + page);
  const respData = await response.json();

  showMovies(respData);
}

let totalPages;

function showMovies(response) {
  console.log(response);
  totalPages = response.total_pages;
  let data = response.results;
  let ispis = ``;
  kontenjer.innerHTML = "";
  console.log(data);
  data.forEach((element) => {
    ispis = ``;
    const div = document.createElement("div");
    div.classList.add("film");

    ispis += `<h2> ${element.title}</h2>
   <img src="${imgPath + element.poster_path}" data-id="${element.id}"alt="${
      element.title
    }" class="film_slike">
   <div class="ocena">Ocena: ${element.vote_average}</div>
   `;
    div.innerHTML = ispis;
    kontenjer.appendChild(div);
  });

  const slike = document.querySelectorAll(".film_slike");

  slike.forEach((element) => {
    element.addEventListener("click", ispaliModal);
  });
}

function ispaliModal(e) {
  let id = e.target.dataset.id;

  dohvatifilm(id);
}

async function showMoadal(data) {
  console.log(data);
  let elem = document.getElementById("modalH");
  elem.innerHTML = `<div id="modalPozadina">
    <div id="modal-content">
      <div id="modal-heder">
        <span class="closeBtn">&times</span>
        <h2>Naslov filma</h2>
      </div>
      <div class="modal-body">
        <p>
        <img src="${imgPath + data.poster_path}" alt='test' class="modalSlika">
         ${data.overview}
        </p>
      </div>
      <div class="modal-footer">
        <p>Datum premijere: ${data.release_date}</p>
      </div>
    </div>`;

  document.getElementById("modalPozadina").style.display = "block";
  document.querySelector(".closeBtn").addEventListener("click", function () {
    
    document.getElementById("modalPozadina").style.display = "none";
  });
}

document.getElementById("next").addEventListener("click", nextPage);

function nextPage() {
  console.log(pageNumber.textContent);
  let brojStrane = Number(document.getElementById("page").textContent);

  console.log(brojStrane + 1);

  dohvatiFilmove(url, brojStrane + 1);
  page.innerHTML = `

<span id="previous"> <i class="fa fa-angle-double-left"></i> </span>
<span id="page">${brojStrane + 1}</span>`;

  if (brojStrane < totalPages) {
    page.innerHTML += `
<span id="next"> <i class="fa fa-angle-double-right"></i> </span>`;
  }
  document.getElementById("next").addEventListener("click", nextPage);
  document.getElementById("previous").addEventListener("click", previousPage);

  scroll(0, 0);
}

function previousPage() {
  brojStrane = Number(document.getElementById("page").textContent);

  dohvatiFilmove(url, brojStrane - 1);
  if (brojStrane > 2) {
    page.innerHTML = `
<span id="previous"> <i class="fa fa-angle-double-left"></i> </span>
<span id="page">${brojStrane - 1}</span> 
<span id="next"> <i class="fa fa-angle-double-right"></i> </span>`;
    document.getElementById("previous").addEventListener("click", previousPage);
  } else {
    page.innerHTML = `
    <span id="page">${brojStrane - 1}</span> 
    <span id="next"> <i class="fa fa-angle-double-right"></i> </span>`;
  }
  document.getElementById("next").addEventListener("click", nextPage);

  scroll(0, 0);
}

document.getElementById("forma").addEventListener("submit", function (e) {
  e.preventDefault();
  brojStrane = 1;
  document.getElementById("page").innerHTML = brojStrane;
  console.log(pageNumber);
  const searchTerm = search.value;
  url = searchApi + searchTerm;
  console.log(searchTerm);

  if (searchTerm) {
    // console.log(searchApi + searchTerm)
    dohvatiFilmove(url, 1);
  }
});
