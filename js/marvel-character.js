const elCharacterList = document.querySelector("[data-charcter]");

function getIdCharcter() {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get("marvelId");
}

getCharacter();

async function getCharacter(characterId) {
  characterId = getIdCharcter();
  let response = await fetch(`${url}&id=${characterId}`);
  let data = await response.json();

  console.log(data.data.results[0]);
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
<div>
  <div>
    <div>
      <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" />
    </div>
    <div>
      <h2>${hero.name}</h2>
      <p>${hero.description}</p>
    </div>
  </div>
  <div>
    <ul data-character-comisc></ul>
    <ul data-character-serial></ul>
    <ul data-character-events></ul>
    <ul data-character-stories></ul>
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
    <img src="${comics.thumbnail.path}.${comics.thumbnail.extension}" alt="${comics.title}">
     <li>${comics.title}</li>
     `;
    elCharacterList.innerHTML = html;
  });
}

async function getSerialById(characterId) {
  characterId = getIdCharcter();
  let res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${characterId}/series?apikey=${apikey}&ts=${ts}&hash=${hash}`
  );
  let data = await res.json();
  fillModalSerial(data.data.results);
}

function fillModalSerial(serials) {
  ModalSerial = document.querySelector("[data-character-serial]");
  let html = "";
  serials.forEach((serial) => {
    html += `
    <img src="${serial.thumbnail.path}.${serial.thumbnail.extension}" alt="${serial.title}">
    <li>${serial.title}</li>
    `;
    ModalSerial.innerHTML = html;
  });
}

async function getEventsById(characterId) {
  characterId = getIdCharcter();
  let res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${characterId}/events?apikey=${apikey}&ts=${ts}&hash=${hash}`
  );
  let data = await res.json();
  fillModalEvents(data.data.results);
}

function fillModalEvents(eventses) {
  ModalEvents = document.querySelector("[data-character-events]");
  let html = "";
  eventses.forEach((events) => {
    html += `
    <img src="${events.thumbnail.path}.${events.thumbnail.extension}" alt="${events.title}">
    <li>${events.title}</li>
    `;
    ModalEvents.innerHTML = html;
  });
}

async function getStoriesById(characterId) {
  characterId = getIdCharcter();
  let res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${characterId}/stories?apikey=${apikey}&ts=${ts}&hash=${hash}`
  );
  let data = await res.json();
  fillModalStories(data.data.results);
}

function fillModalStories(storieses) {
  ModalStories = document.querySelector("[data-character-stories]");
  let html = "";
  storieses.forEach((stories) => {
    html += `
    <img src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" alt="${stories.title}">
    <li>${stories.title}</li>
    `;
    ModalStories.innerHTML = html;
  });
}

// function onTextClick(evt) {
//   const el = evt.target.closest("[data-text]");

//   if (!el) return;

//   let modalSelector = el.dataset.text;
//   document.querySelector(modalSelector).classList.toggle("show-modal");
// }
