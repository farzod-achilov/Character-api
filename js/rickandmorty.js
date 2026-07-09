const ellist = document.querySelector("[data-list-rickAndMorty]");
const elPagination = document.querySelector("[data-rickandmorty-pagination]");

getCharacter(BaseRickAndMorty);

async function getCharacter(url, page = 1) {
  renderState(ellist, "loading", "Загружаем персонажей...");
  elPagination.innerHTML = "";
  try {
    const characterData = await fetchJson(`${url}/character?page=${page}`);
    renderCharacter(characterData.results);
    renderPagination(elPagination, characterData.info.pages, "rickandmorty");
  } catch (err) {
    renderState(
      ellist,
      "error",
      "Не удалось загрузить персонажей. Попробуйте позже."
    );
  }
}

function renderCharacter(characters) {
  let html = "";
  characters.forEach((character) => {
    html += `
     <div class="rickAndMorty_character">
      <div class="rickAndMorty_character-imgWrapper">
        <img class="rickAndMorty_character-img" src="${character.image}" alt="${character.id}"/>
        <img width="350px" height="350px" src="./img/portal.png" alt="portal" />
      </div>
      <h2 class="rickAndMorty_name">${character.name}</h2>
     </div>
     `;
  });
  ellist.innerHTML = html;
}

document.addEventListener("click", (evt) => {
  onPageClick(evt);
});

function onPageClick(evt) {
  const el = evt.target.closest("[data-rickandmorty-page]");

  if (!el) return;

  evt.preventDefault();
  getCharacter(BaseRickAndMorty, el.dataset.rickandmortyPage);
}
