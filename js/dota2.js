const urlDota = `https://api.opendota.com/api/heroStats?api_key=${DOTA_API_KEY}`;

const elDotaList = document.querySelector("[data-dota-list]");

getDotaCharacters();

async function getDotaCharacters() {
  renderState(elDotaList, "loading", "Загружаем героев Dota 2...");
  try {
    const dotaData = await fetchJson(urlDota);
    renderDotaCharacters(dotaData);
  } catch (err) {
    renderState(
      elDotaList,
      "error",
      "Не удалось загрузить героев. Попробуйте позже."
    );
  }
}

function renderDotaCharacters(characters) {
  if (!characters || characters.length === 0) {
    renderState(elDotaList, "empty", "Герои не найдены.");
    return;
  }

  let html = "";
  characters.forEach((character) => {
    html += `
<div class="char-card">
  <div class="char-card__img"><img src="https://api.opendota.com${character.img}" alt="${character.localized_name}" loading="lazy" /></div>
  <div class="char-card__content">
    <h2 class="char-card__title">${character.localized_name}</h2>
  </div>
</div>
      `;
  });

  elDotaList.innerHTML = html;
}
