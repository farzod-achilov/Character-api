const elCharacterList = document.querySelector("[data-charcter]");

function getIdCharcter() {
  const searchParams = new URLSearchParams(window.location.search);

  //   getCharacter(searchParams.get("marvelId"));
  return searchParams.get("marvelId");
}

getCharacter();

async function getCharacter(characterId) {
  characterId = getIdCharcter();
  let response = await fetch(`${url}&id=${characterId}`);
  let data = await response.json();

  console.log(data);
  renderMarvelCharacter(data.data.results);
}

function renderMarvelCharacter(character) {
  elCharacterList.innerHTML = "";
  let html = "";
  character.forEach((hero) => {
    html += `
   <div>${hero.name}</div>
   `;
  });
  elCharacterList.innerHTML = html;
}

async function getComicsById(characterId) {
  characterId = getIdCharcter();
  let res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${apikey}&ts=${ts}&hash=${hash}`
  );
  let data = await res.json();
  fillModalComics(data.data.results);
}

function fillModalComics(comicses) {
  let html = "";
  comicses.forEach((comics) => {
    html += `
     <li>${comics.title}</li>
     `;
    elCharacterList.innerHTML = html;
  });
}

// function onTextClick(evt) {
//   const el = evt.target.closest("[data-text]");

//   if (!el) return;

//   let modalSelector = el.dataset.text;
//   document.querySelector(modalSelector).classList.toggle("show-modal");
// }

// async function getSerialById(characterId) {
//   let res = await fetch(
//     `https://gateway.marvel.com/v1/public/characters/${characterId}/series?apikey=${apikey}&ts=${ts}&hash=${hash}`
//   );
//   let data = await res.json();
//   fillModalSerial(data.data.results);
// }

// function fillModalSerial(serials) {
//   ModalSerial = document.querySelector("[data-modal-serial]");
//   let html = "";
//   serials.forEach((serial) => {
//     html += `

//     <li>${serial.title}</li>
//     `;
//     ModalSerial.innerHTML = html;
//   });
// }

// async function getEventsById(characterId) {
//   let res = await fetch(
//     `https://gateway.marvel.com/v1/public/characters/${characterId}/events?apikey=${apikey}&ts=${ts}&hash=${hash}`
//   );
//   let data = await res.json();
//   fillModalEvents(data.data.results);
// }

// function fillModalEvents(eventses) {
//   ModalEvents = document.querySelector("[data-modal-events]");
//   let html = "";
//   eventses.forEach((events) => {
//     html += `

//     <li>${events.title}</li>
//     `;
//     ModalEvents.innerHTML = html;
//   });
// }

// async function getStoriesById(characterId) {
//   let res = await fetch(
//     `https://gateway.marvel.com/v1/public/characters/${characterId}/stories?apikey=${apikey}&ts=${ts}&hash=${hash}`
//   );
//   let data = await res.json();
//   fillModalStories(data.data.results);
// }

// function fillModalStories(storieses) {
//   ModalStories = document.querySelector("[data-modal-stories]");
//   let html = "";
//   storieses.forEach((stories) => {
//     html += `

//     <li>${stories.title}</li>
//     `;
//     ModalStories.innerHTML = html;
//   });
// }
