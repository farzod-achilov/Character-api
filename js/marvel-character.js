const elCharacterList = document.querySelector("[data-charcter]");
const elCharacterModal = document.querySelector(
  "[data-character-modal-content]"
);

function getIdCharcter() {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get("marvelId");
}

getCharacter();

async function getCharacter(characterId) {
  characterId = getIdCharcter();
  let response = await fetch(`${url}&id=${characterId}`);
  let data = await response.json();

  renderMarvelCharacter(data.data.results);
}

function renderMarvelCharacter(character) {
  getComicsById();
  getEventsById();
  getSerialById();
  getStoriesById();
  elCharacterList.innerHTML = "";
  let html = "";
  character.forEach((hero) => {
    html += `
<div class="marvel__character">
  <div class="marvel__character-header">
    <div class="marvel__character-img">
      <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" />
    </div>
    <div class="marvel__character-content">
      <h2>${hero.name}</h2>
      <p>${hero.description}</p>
    </div>
  </div>
  <div class="marvel__character-list">
  <div>
  <h2>Comisc List</h2>
  <ul class="marvel__character-projects-list" data-character-comisc></ul>
  </div>
  <div>
  <h2>Serial List</h2>
  <ul class="marvel__character-projects-list" data-character-serial></ul>
  </div>
  <div>
  <h2>Events List</h2>
  <ul class="marvel__character-projects-list" data-character-events></ul>
  </div>
  <div>
  <h2>Stories List</h2>
  <ul class="marvel__character-projects-list" data-character-stories></ul>
  </div>
  </div>
</div>
   `;
  });
  elCharacterList.innerHTML = html;
}

async function getComicsById(characterId) {
  characterId = getIdCharcter();
  let res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${apikey}&ts=${ts}&hash=${hash}&limit=100`
  );
  let data = await res.json();
  fillModalComics(data.data.results);
}

function fillModalComics(comicses) {
  const elCharacterList = document.querySelector("[data-character-comisc]");
  let html = "";
  comicses.forEach((comics) => {
    html += `
<div class="marvel__character-projects">
  <img
    src="${comics.thumbnail.path}.${comics.thumbnail.extension}"
    alt="${comics.title}"
  />  
  <li>${comics.title}</li>
  <a href="/marvel-comics.html?comicsId=${comics.id}">Show More  </a>
  <button data-comics-id=${comics.id} data-marvel-open="#character-modal">pass</button>
</div>
     `;
    elCharacterList.innerHTML = html;
  });
}

async function onCharacterModalOpen(evt) {
  const el = evt.target.closest("[data-marvel-open]");

  if (!el) return;

  let characterId = el.dataset.comicsId;

  await getModalComics(characterId);
  await getModalCharacter(characterId);

  let modalSelector = el.dataset.marvelOpen;
  document.querySelector(modalSelector).classList.add("show");
}

function onCloseOutsideClick(evt) {
  const el = evt.target;

  if (!el.matches("[data-character-modal]")) return;

  el.classList.remove("show");
}

document.addEventListener("click", (evt) => {
  onCharacterModalOpen(evt);
  onCloseOutsideClick(evt);
});

async function getSerialById(characterId) {
  characterId = getIdCharcter();
  let res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${characterId}/series?apikey=${apikey}&ts=${ts}&hash=${hash}&limit=100`
  );
  let data = await res.json();
  fillModalSerial(data.data.results);
}

function fillModalSerial(serials) {
  ModalSerial = document.querySelector("[data-character-serial]");
  let html = "";
  serials.forEach((serial) => {
    html += `
    <div class="marvel__character-projects">
    <img
      src="${serial.thumbnail.path}.${serial.thumbnail.extension}"
      alt="${serial.title}"
    />
    <li>${serial.title}</li>
  </div>
    `;
    ModalSerial.innerHTML = html;
  });
}

async function getEventsById(characterId) {
  characterId = getIdCharcter();
  let res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${characterId}/events?apikey=${apikey}&ts=${ts}&hash=${hash}&limit=100`
  );
  let data = await res.json();
  fillModalEvents(data.data.results);
}

function fillModalEvents(eventses) {
  ModalEvents = document.querySelector("[data-character-events]");
  let html = "";
  eventses.forEach((events) => {
    html += `
    <div class="marvel__character-projects">
    <img
      src="${events.thumbnail.path}.${events.thumbnail.extension}"
      alt="${events.title}"
    />
    <li>${events.title}</li>
  </div>
    `;
    ModalEvents.innerHTML = html;
  });
}

async function getStoriesById(characterId) {
  characterId = getIdCharcter();
  let res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${characterId}/stories?apikey=${apikey}&ts=${ts}&hash=${hash}&limit=100`
  );
  let data = await res.json();
  fillModalStories(data.data.results);
}

function fillModalStories(storieses) {
  ModalStories = document.querySelector("[data-character-stories]");
  let html = "";
  storieses.forEach((stories) => {
    html += `
    <div class="marvel__character-projects">
    <img
      src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      alt="${stories.title}"
    />
    <li>${stories.title}</li>
  </div>
    `;
    ModalStories.innerHTML = html;
  });
}

async function getModalComics(comicsId) {
  const res = await fetch(
    `https://gateway.marvel.com:443/v1/public/comics?apikey=${apikey}&ts=${ts}&hash=${hash}&limit=100&id=${comicsId}`
  );

  const data = await res.json();

  FillComicsModal(data.data.results[0]);
}

async function getModalCharacter(comicsId) {
  const resCharacter = await fetch(
    `https://gateway.marvel.com/v1/public/comics/${comicsId}/characters?apikey=${apikey}&ts=${ts}&hash=${hash}&limit=100`
  );
  const characterData = await resCharacter.json();
  console.log(characterData.data.results);
  renderCharacter(characterData.data.results);
}

function FillComicsModal(comics) {
  console.log(comics);
  let html = "";
  html += `
<div class="marvel__character-modal-inside">
  <div class="marvel__character-modal-inside-img">
    <img src="${comics.thumbnail.path}.${comics.thumbnail.extension}" alt="${comics.title}" />
  </div>
  <div class="marvel__character-modal-inside-content">
    <h2>${comics.title}</h2>
    <p>${comics.description}</p>
  </div>
  <div
    data-modal-charcter
    class="marvel__character-modal-inside-character"
  ></div>
</div>`;

  elCharacterModal.innerHTML = html;
}

function renderCharacter(characters) {
  const elCharacterList = document.querySelector("[data-modal-charcter]");
  let html = "";
  characters.forEach((character) => {
    html += `
<img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
<h2>${character.name}</h2>
  `;
  });
  elCharacterList.innerHTML = html;
}
