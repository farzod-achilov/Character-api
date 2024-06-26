const elListMarvel = document.querySelector("[data-marval-characters]");
const elForm = document.querySelector("[data-marvel-form]");
const elPagination = document.querySelector("[data-marvel-pagination]");
const elMarvelModalContent = document.querySelector(
  "[data-marvel-modal-content]"
);

getMarvelCharacters();

// get Marvel Characters
async function getMarvelCharacters(page = 1) {
  const marvelCharacters = await fetch(`${url}&offset=${page * 75 - 75}`);
  const marvelData = await marvelCharacters.json();
  renderMarvelCharacters(marvelData.data.results);
  renderPagination(Math.ceil(+marvelData.data.total / 75));
}

// render Main Page
function renderMarvelCharacters(characters) {
  elListMarvel.innerHTML = "";
  let html = "";
  characters.forEach((character) => {
    const marvelImg = ` ${character.thumbnail.path}.${character.thumbnail.extension}`;
    const marvelName = `${character.name}`;
    if (
      character.thumbnail.path ===
      `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available`
    ) {
      return character;
    }
    html += `
    <button class="marvel__card-btn" data-marvel-modal-open="#marvel-modal" data-character-id="${character.id}">
    <div class="marvel__card">
      <div class="marvel__card-img">
        <img src="${marvelImg}" alt="${marvelName}" />
      </div>
      <div class="marvel__card-content">
        <h2 class="marvel-name">${marvelName}</h2>
      </div>
    </div>
  </button>
    `;
  });
  elListMarvel.innerHTML = html;
}

async function searchMarvelCharacters(quary) {
  if (quary === "") {
    return;
  }
  const res = await fetch(`${url}&nameStartsWith=${quary}`);
  const searchResult = await res.json();

  renderMarvelCharacters(searchResult.data.results);
}

function renderPagination(totalPages) {
  elPagination.innerHTML = "";
  let html = "";

  for (let i = 1; i <= totalPages; i++) {
    html += `
    <li class="page-item"><a class="page-link" data-marvel-page="${i}" href="?page=${i}">${i}</a></li>
    `;
  }

  elPagination.innerHTML = html;
}

async function getCharacter(characterId) {
  let res = await fetch(`${url}&id=${characterId}`);
  let data = await res.json();
  const character = data;
  const elModalSpiner = document.querySelector("[data-spiner]");

  fillMarvelModal(character.data.results, elModalSpiner);
}

function fillMarvelModal(character, elModalSpiner) {
  elModalSpiner.classList.remove("d-none");
  elMarvelModalContent.innerHTML = "";
  let html = "";
  character.forEach((infCharacter) => {
    const characterName = `${infCharacter.name}`;
    const characterDescription = `${infCharacter.description}`;
    const characterImg = `${infCharacter.thumbnail.path}.${infCharacter.thumbnail.extension}`;
    html += `
    <div class="marvel__modal-btn-wrapper">
    <button
          type="button"
          data-marvel-modal-close
          class="btn btn-close"
        ></button>
    </div>
    
<div class="marvel__open-modal">
  <div>
    <img style="
    object-fit: cover;
" src="${characterImg}" alt="${characterName}">
  </div>
  <div class="marvel__open-modal-content">
    <h2 class="marvel__modal-name"><b> ${characterName}</h2>
    <p class="marvel__modal-description"><b>Description:</b> ${characterDescription}</p>
    <a href="/marvel-character.html?marvelId=${infCharacter.id}">Show More</a>
    <div>
    `;
  });

  elMarvelModalContent.innerHTML = html;
  elModalSpiner.classList.add("d-none");
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  elPagination.classList.add("d-none");
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
  getMarvelCharacters(el.dataset.marvelPage);
}

async function onMarvelModalOpen(evt) {
  const el = evt.target.closest("[data-marvel-modal-open]");

  if (!el) return;

  let characterId = el.dataset.characterId;

  await getCharacter(characterId);

  let modalSelector = el.dataset.marvelModalOpen;
  document.querySelector(modalSelector).classList.add("show");
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
