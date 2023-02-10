// PRIVATEKEY = `aaa48316379abee3e253d565d626c799a8958a41`
// PUBLICKEY = `2916c9e0417f61774e61f7a9ba72d384`
const elListMarvel = document.querySelector("[data-marval-characters]");
const elForm = document.querySelector("[data-marvel-form]");
const elPagination = document.querySelector("[data-marvel-pagination]");
const elMarvelModalContent = document.querySelector(
  "[data-marvel-modal-content]"
);
getMarvelCharacters();

async function getMarvelCharacters(page = 0) {
  const marvelCharacters = await fetch(`${url}&offset=${page * 100}`);
  const marvelData = await marvelCharacters.json();
  renderMarvelCharacters(marvelData.data.results);
  renderPagination(Math.ceil(+marvelData.data.total / 100));
}

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
    <button data-marvel-modal-open="#marvel-modal" data-character-id="${character.id}">
    <div class="marvel">
      <div class="marvel-img">
        <img src="${marvelImg}" alt="${marvelName}" />
      </div>
      <div class="marvel-content">
        <h2 class="marvel-name">${marvelName}</h2>
      </div>
    </div>
  </button>
    `;
  });

  elListMarvel.innerHTML = html;
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  elPagination.classList.add("d-none");
  const formdata = new FormData(elForm);
  const name = formdata.get("name");
  searchMarvelCharacters(name);
});

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

  for (let i = 0; i <= totalPages; i++) {
    html += `
    <li class="page-item"><a class="page-link" data-marvel-page="${i}" href="?page=${i}">${i}</a></li>
    `;
  }

  elPagination.innerHTML = html;
}

document.addEventListener("click", (evt) => {
  onPageClick(evt);
  onMarvelModalOpen(evt);
  onMarvelModalClose(evt);
  onCloseOutsideClick(evt);
  onTextClick(evt);
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
  // await getComicsById(characterId);
  // await getSerialById(characterId);
  // await getEventsById(characterId);
  // await getStoriesById(characterId);

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
    <div class="modal-btn-wrapper">
    <button
          type="button"
          data-marvel-modal-close
          class="btn btn-close"
        ></button>
    </div>
    
<div class="marvel__modal">
  <div>
    <img style="
    width: 150px;
    height: 200px;
    object-fit: cover;
" src="${characterImg}" alt="${characterName}">
  </div>
  <div class="marvel__modal-content">
    <h2 class="marvel__modal-name"><b> ${characterName}</h2>
    <p class="marvel__modal-description"><b>Description:</b> ${characterDescription}</p>
    <a href="/marvel-character.html?marvelId=${infCharacter.id}">Show More</a>
    <div>
    `;
  });

  elMarvelModalContent.innerHTML = html;
  elModalSpiner.classList.add("d-none");
}
