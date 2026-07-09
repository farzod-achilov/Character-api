// Marvel Comics API (developer.marvel.com) требует приватный ключ, которого в этом
// проекте нет, поэтому раздел работает на открытом статическом датасете
// akabab/superhero-api — без ключей, с открытым CORS, 269 персонажей Marvel Comics.
const MARVEL_DATA_URL = "https://akabab.github.io/superhero-api/api/all.json";
const MARVEL_PAGE_SIZE = 24;

const elListMarvel = document.querySelector("[data-marval-characters]");
const elForm = document.querySelector("[data-marvel-form]");
const elPagination = document.querySelector("[data-marvel-pagination]");
const elMarvelModalContent = document.querySelector(
  "[data-marvel-modal-content]"
);

let allMarvelCharacters = [];
let filteredMarvelCharacters = [];

initMarvel();

async function initMarvel() {
  renderState(elListMarvel, "loading", "Загружаем персонажей Marvel...");
  try {
    const data = await fetchJson(MARVEL_DATA_URL);
    allMarvelCharacters = data
      .filter((character) => character.biography.publisher === "Marvel Comics")
      .sort((a, b) => a.name.localeCompare(b.name));
    filteredMarvelCharacters = allMarvelCharacters;
    renderMarvelPage(1);
  } catch (err) {
    renderState(
      elListMarvel,
      "error",
      "Не удалось загрузить персонажей Marvel. Попробуйте позже."
    );
  }
}

function renderMarvelPage(page) {
  const totalPages = Math.ceil(
    filteredMarvelCharacters.length / MARVEL_PAGE_SIZE
  );
  const start = (page - 1) * MARVEL_PAGE_SIZE;
  const pageItems = filteredMarvelCharacters.slice(
    start,
    start + MARVEL_PAGE_SIZE
  );
  renderMarvelCharacters(pageItems);
  renderPagination(elPagination, totalPages, "marvel");
}

function renderMarvelCharacters(characters) {
  if (characters.length === 0) {
    renderState(elListMarvel, "empty", "Персонажи не найдены.");
    return;
  }

  let html = "";
  characters.forEach((character) => {
    html += `
    <button class="marvel__card-btn" data-marvel-modal-open="#marvel-modal" data-character-id="${character.id}">
    <div class="marvel__card">
      <div class="marvel__card-img">
        <img src="${character.images.md}" alt="${character.name}" loading="lazy" />
      </div>
      <div class="marvel__card-content">
        <h2 class="marvel-name">${character.name}</h2>
      </div>
    </div>
  </button>
    `;
  });
  elListMarvel.innerHTML = html;
}

function searchMarvelCharacters(quary) {
  elPagination.classList.remove("d-none");
  if (quary === "") {
    filteredMarvelCharacters = allMarvelCharacters;
  } else {
    const q = quary.toLowerCase();
    filteredMarvelCharacters = allMarvelCharacters.filter((character) =>
      character.name.toLowerCase().includes(q)
    );
  }
  renderMarvelPage(1);
}

function getCharacter(characterId) {
  const character = allMarvelCharacters.find(
    (c) => String(c.id) === String(characterId)
  );
  if (!character) {
    renderState(elMarvelModalContent, "error", "Персонаж не найден.");
    return;
  }
  fillMarvelModal(character);
}

function fillMarvelModal(character) {
  const statsHtml = Object.entries(character.powerstats)
    .map(([key, value]) => {
      const num = Number(value) || 0;
      return `
      <div class="marvel__stat-row">
        <span class="marvel__stat-label">${key}</span>
        <div class="marvel__stat-bar"><span style="width:${num}%"></span></div>
        <span class="marvel__stat-value">${num}</span>
      </div>
      `;
    })
    .join("");

  elMarvelModalContent.innerHTML = `
    <div class="marvel__modal-btn-wrapper">
    <button
          type="button"
          data-marvel-modal-close
          class="btn btn-close"
        ></button>
    </div>

<div class="marvel__open-modal">
  <div>
    <img style="object-fit: cover;" src="${character.images.lg}" alt="${character.name}">
  </div>
  <div class="marvel__open-modal-content">
    <h2 class="marvel__modal-name"><b>${character.name}</b></h2>
    <p class="marvel__modal-description"><b>Occupation:</b> ${character.work.occupation || "—"}</p>
    <p class="marvel__modal-description"><b>Affiliation:</b> ${character.connections.groupAffiliation || "—"}</p>
    <div class="marvel__stats">${statsHtml}</div>
    <a href="./marvel-character.html?marvelId=${character.id}">Show More</a>
  </div>
</div>
    `;
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formdata = new FormData(elForm);
  const name = formdata.get("name");
  searchMarvelCharacters(name);
});

document.addEventListener("click", (evt) => {
  onPageClick(evt);
  onMarvelModalOpen(evt);
  onMarvelModalClose(evt);
  onCloseOutsideClick(evt);
});

function onPageClick(evt) {
  const el = evt.target.closest("[data-marvel-page]");

  if (!el) return;

  evt.preventDefault();
  renderMarvelPage(Number(el.dataset.marvelPage));
}

function onMarvelModalOpen(evt) {
  const el = evt.target.closest("[data-marvel-modal-open]");

  if (!el) return;

  let characterId = el.dataset.characterId;

  let modalSelector = el.dataset.marvelModalOpen;
  document.querySelector(modalSelector).classList.add("show");

  getCharacter(characterId);
}

function onMarvelModalClose(evt) {
  const el = evt.target.closest("[data-marvel-modal-close]");

  if (!el) return;

  el.parentElement.parentElement.parentElement.classList.remove("show");
}

function onCloseOutsideClick(evt) {
  const el = evt.target;

  if (!el.matches("[data-marvel-modal]")) return;

  el.classList.remove("show");
}
