const amiiboBaseUrl = `https://www.amiiboapi.com/api/amiibo/`;
const amiiboList = document.querySelector("[data-amiibo-list]");

getAmiiboCharacters();

async function getAmiiboCharacters() {
  renderState(amiiboList, "loading", "Загружаем фигурки Amiibo...");
  try {
    const amiiboData = await fetchJson(amiiboBaseUrl);
    renderAmiibo(amiiboData.amiibo);
  } catch (err) {
    renderState(
      amiiboList,
      "error",
      "Не удалось загрузить список Amiibo. Попробуйте позже."
    );
  }
}

function renderAmiibo(amiibos) {
  if (!amiibos || amiibos.length === 0) {
    renderState(amiiboList, "empty", "Фигурки не найдены.");
    return;
  }

  let html = "";
  amiibos.forEach((amiibo) => {
    html += `
    <div class="char-card">
    <div class="char-card__img">
      <img src="${amiibo.image}" alt="${amiibo.name}" loading="lazy" />
    </div>
    <div class="char-card__content">
      <h2 class="char-card__title">${amiibo.name}</h2>
      <p class="char-card__subtitle">${amiibo.gameSeries}</p>
    </div>
  </div>
   `;
  });
  amiiboList.innerHTML = html;
}
