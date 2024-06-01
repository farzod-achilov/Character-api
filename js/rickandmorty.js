ellist = document.querySelector("[data-list-rickAndMorty]");
elPagination = document.querySelector("[data-rickandmorty-pagination]");

getCharacter(BaseRickAndMorty);

async function getCharacter(url, page = 1) {
  const character = await fetch(`${url}/character?page=${page}`);
  const characterData = await character.json();
  console.log(characterData);
  renderCharacter(characterData.results);
  renderPagination(characterData.info.pages);
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

function renderPagination(page) {
  elPagination.innerHTML = "";
  let html = "";

  for (let i = 1; i <= page; i++) {
    html += `
    <li class="page-item"><a class="page-link" data-rickandmorty-page="${i}" href="?page=${i}">${i}</a></li>
    `;
  }

  elPagination.innerHTML = html;
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
