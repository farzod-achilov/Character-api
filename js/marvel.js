// PRIVATEKEY = `aaa48316379abee3e253d565d626c799a8958a41`
// PUBLICKEY = `2916c9e0417f61774e61f7a9ba72d384`

const apikey = "2916c9e0417f61774e61f7a9ba72d384";
const ts = "25/01/2023, 05:58:15";
const hash = "4c1b759a2e5f993858c77f6c20f934b6";
const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apikey}&ts=${ts}&hash=${hash}&limit=100`;

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
  await getComicsById(characterId);
  await getSerialById(characterId);
  await getEventsById(characterId);
  await getStoriesById(characterId);

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
    <div>
    <div class="comics-name"><p data-text="#content">Comics</p>
    <img class="more-icon"  width="25px"; height="25px"; src="./img/more.svg" alt="more" /></div>
    <div id="content" class="marvel-modal-comics" data-modal-comics>Comics </div>
    </div>
    <div>
    <div class="comics-name"><p data-text="#serial">Serial</p>
    <img class="more-icon"  width="25px"; height="25px"; src="./img/more.svg" alt="more" /></div>
    <div id="serial" class="marvel-modal-comics" data-modal-serial></div>
    </div>
    <div>
    <div class="comics-name"><p data-text="#events">Events</p>
    <img class="more-icon"  width="25px"; height="25px"; src="./img/more.svg" alt="more" /></div>
    <div id="events" class="marvel-modal-comics" data-modal-events></div>
    </div>
    <div class="comics-name"><p data-text="#stories">Stories</p>
    <img class="more-icon"  width="25px"; height="25px"; src="./img/more.svg" alt="more" /></div>
    <div id="stories" class="marvel-modal-comics" data-modal-stories></div>
    </div>
  </div>
</div>
    `;
  });

  elMarvelModalContent.innerHTML = html;
  elModalSpiner.classList.add("d-none");
}

async function getComicsById(characterId) {
  let res = await fetch(
    `http://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${apikey}&ts=${ts}&hash=${hash}`
  );
  let data = await res.json();
  fillModalComics(data.data.results);
}

function fillModalComics(comicses) {
  ModalComics = document.querySelector("[data-modal-comics]");
  let html = "";
  comicses.forEach((comics) => {
    html += `
    
    <li>${comics.title}</li>  
    `;
    ModalComics.innerHTML = html;
  });
}

function onTextClick(evt) {
  const el = evt.target.closest("[data-text]");

  if (!el) return;

  let modalSelector = el.dataset.text;
  document.querySelector(modalSelector).classList.toggle("show-modal");
}

async function getSerialById(characterId) {
  let res = await fetch(
    `http://gateway.marvel.com/v1/public/characters/${characterId}/series?apikey=${apikey}&ts=${ts}&hash=${hash}`
  );
  let data = await res.json();
  fillModalSerial(data.data.results);
}

function fillModalSerial(serials) {
  ModalSerial = document.querySelector("[data-modal-serial]");
  let html = "";
  serials.forEach((serial) => {
    html += `
    
    <li>${serial.title}</li>  
    `;
    ModalSerial.innerHTML = html;
  });
}

async function getEventsById(characterId) {
  let res = await fetch(
    `http://gateway.marvel.com/v1/public/characters/${characterId}/events?apikey=${apikey}&ts=${ts}&hash=${hash}`
  );
  let data = await res.json();
  fillModalEvents(data.data.results);
}

function fillModalEvents(eventses) {
  ModalEvents = document.querySelector("[data-modal-events]");
  let html = "";
  eventses.forEach((events) => {
    html += `
    
    <li>${events.title}</li>  
    `;
    ModalEvents.innerHTML = html;
  });
}

async function getStoriesById(characterId) {
  let res = await fetch(
    `http://gateway.marvel.com/v1/public/characters/${characterId}/stories?apikey=${apikey}&ts=${ts}&hash=${hash}`
  );
  let data = await res.json();
  fillModalStories(data.data.results);
}

function fillModalStories(storieses) {
  ModalStories = document.querySelector("[data-modal-stories]");
  let html = "";
  storieses.forEach((stories) => {
    html += `
    
    <li>${stories.title}</li>  
    `;
    ModalStories.innerHTML = html;
  });
}
