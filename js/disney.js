const DIS_URL = `https://api.disneyapi.dev/characters`;
const DIS_URL_NAME = `https://api.disneyapi.dev/character?name=`;

const elListDisney = document.querySelector("[data-disney]");
const elDisneyForm = document.querySelector("[data-disney-form]");
const elPaginationDisney = document.querySelector("[data-disney-pagination]");
getCharactersDisney();

async function getCharactersDisney() {
  const disneyCharacters = await fetch(DIS_URL);
  const disneyData = await disneyCharacters.json();

  renderDisneyCharacters(disneyData.data);
}

function renderDisneyCharacters(characters) {
  elListDisney.innerHTML = "";
  let html = "";
  characters.forEach((character) => {
    if (character.imageUrl === "") {
      return character;
    }
    html += `
<div class="disnay__card">
  <div class="disnay__card-img">
    <img src="${character.imageUrl}" alt="${character.name}" />
</div>
  <div class="disnay__card-content">
    <p class="disnay__card-content-name">${character.name}</p>
  </div>
</div>

      `;
  });
  elListDisney.innerHTML = html;
}

elDisneyForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formdata = new FormData(elDisneyForm);
  const name = formdata.get("name");
  searchDisneyCharacters(name);
});
async function searchDisneyCharacters(quary) {
  if (quary === "") {
    return;
  }
  const res = await fetch(`${DIS_URL_NAME}${quary}`);
  const searchResult = await res.json();

  renderDisneyCharacters(searchResult.data);
}

function renderPagination(totalPages) {
  elPaginationDisney.innerHTML = "";
  let html = "";

  for (let i = 0; i <= totalPages; i++) {
    html += `
    <li class="page-item"><a class="page-link" data-marvel-page="${i}" href="?page=${i}">${i}</a></li>
    `;
  }

  elPaginationDisney.innerHTML = html;
}
