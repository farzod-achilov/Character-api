const MARVEL_DATA_URL = "https://akabab.github.io/superhero-api/api/all.json";
const MarvelSwiperWrapper = document.querySelector("[data-marvel-wrapper]");

getTopCharacter();

async function getTopCharacter() {
  try {
    const data = await fetchJson(MARVEL_DATA_URL);
    const marvelCharacters = data.filter(
      (character) => character.biography.publisher === "Marvel Comics"
    );
    const spiderVerse = marvelCharacters.filter((character) =>
      character.name.toLowerCase().includes("spider")
    );
    renderCharacter(
      spiderVerse.length ? spiderVerse : marvelCharacters.slice(0, 15)
    );
  } catch (err) {
    renderState(MarvelSwiperWrapper, "error", "Marvel данные сейчас недоступны.");
  }
}

function renderCharacter(characters) {
  let html = "";
  characters.forEach((character) => {
    html += `
   <swiper-slide>
    <img src="${character.images.md}" alt="${character.name}">
    <h2>${character.name}</h2>
  </swiper-slide>
    `;
  });
  MarvelSwiperWrapper.innerHTML = html;
}
