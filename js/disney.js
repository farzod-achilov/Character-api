const DIS_URL = `https://api.disneyapi.dev/character`;
const DIS_URL_NAME = `https://api.disneyapi.dev/character?name=`;

const elListDisney = document.querySelector("[data-disney]");
const elDisneyForm = document.querySelector("[data-disney-form]");
const elPaginationDisney = document.querySelector("[data-disney-pagination]");

getCharactersDisney();

async function getCharactersDisney(page = 1) {
  renderState(elListDisney, "loading", "Загружаем персонажей Disney...");
  elPaginationDisney.innerHTML = "";
  try {
    const disneyData = await fetchJson(`${DIS_URL}?page=${page}`);
    renderDisneyCharacters(disneyData.data);
    renderPagination(elPaginationDisney, disneyData.info.totalPages, "disney");
  } catch (err) {
    renderState(
      elListDisney,
      "error",
      "Не удалось загрузить персонажей Disney. Попробуйте позже."
    );
  }
}

function renderDisneyCharacters(characters) {
  const visibleCharacters = characters.filter((character) => character.imageUrl);

  if (visibleCharacters.length === 0) {
    renderState(elListDisney, "empty", "Персонажи не найдены.");
    return;
  }

  let html = "";
  visibleCharacters.forEach((character) => {
    html += `
<div class="disnay__card">
  <div class="disnay__card-img">
    <img src="${character.imageUrl}" alt="${character.name}" loading="lazy" />
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
  elPaginationDisney.classList.add("d-none");
  const formdata = new FormData(elDisneyForm);
  const name = formdata.get("name");
  searchDisneyCharacters(name);
});

async function searchDisneyCharacters(quary) {
  if (quary === "") {
    return;
  }
  renderState(elListDisney, "loading", "Ищем персонажей...");
  try {
    const searchResult = await fetchJson(`${DIS_URL_NAME}${quary}`);
    renderDisneyCharacters(
      Array.isArray(searchResult.data) ? searchResult.data : [searchResult.data]
    );
  } catch (err) {
    renderState(
      elListDisney,
      "error",
      "Не удалось выполнить поиск. Попробуйте позже."
    );
  }
}

document.addEventListener("click", (evt) => {
  onPageClick(evt);
});

function onPageClick(evt) {
  const el = evt.target.closest("[data-disney-page]");

  if (!el) return;

  evt.preventDefault();
  elPaginationDisney.classList.remove("d-none");
  getCharactersDisney(el.dataset.disneyPage);
}
