const MarvelSwiperWrapper = document.querySelector("[data-marvel-wrapper]");
const MarvelSwiper = document.querySelector("[data-marvel-swiper]");

// topCharacterid = [
//   1009664, 1009351, 1009610, 1009368, 1009268, 1009187, 1009577, 1009282,
//   1009185, 1009718,
// ];

// topCharacter = [];
getTopCharacter();
async function getTopCharacter() {
  const res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?apikey=${apikey}&ts=${ts}&hash=${hash}&limit=15&nameStartsWith=spider`
  );
  const data = await res.json();
  // topCharacter.push(data.data.results);
  console.log(data.data.results);
  renderCharacter(data.data.results);
}

async function renderCharacter(characters) {
  let html = "";
  characters.forEach((Character) => {
    // getTopCharacter(Character);
    if (
      Character.thumbnail.path ===
      `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available`
    ) {
      return Character;
    }
    html += `
   <swiper-slide>
    <img src="${Character.thumbnail.path}.${Character.thumbnail.extension}" alt="${Character.name}">
    <h2>${Character.name}</h2>
  </swiper-slide>
    `;
  });
  MarvelSwiperWrapper.innerHTML = html;
}
