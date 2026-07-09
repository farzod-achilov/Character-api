// https://bobs-burgers-api-ui.herokuapp.com/documentation Documitation

const elList = document.querySelector("[data-bobBurger-list]");

const Base_URL = "https://bobsburgers-api.herokuapp.com/";

getCharacter(Base_URL);

async function getCharacter(url) {
  renderState(elList, "loading", "Загружаем персонажей...");
  try {
    const characterData = await fetchJson(`${url}characters`);
    renderBobCharacter(characterData);
  } catch (err) {
    renderState(
      elList,
      "error",
      "Не удалось загрузить персонажей. Попробуйте позже."
    );
  }
}

function renderBobCharacter(characters) {
  if (!characters || characters.length === 0) {
    renderState(elList, "empty", "Персонажи не найдены.");
    return;
  }

  let html = "";
  characters.forEach((character) => {
    html += `
    <div class="char-card">
    <div class="char-card__img"><img src="${character.image}" alt="${character.name}" loading="lazy" /></div>
    <div class="char-card__content">
      <h2 class="char-card__title">${character.name}</h2>
      <p class="char-card__subtitle">${character.occupation || ""}</p>
    </div>
  </div>
   `;
  });
  elList.innerHTML = html;
}
