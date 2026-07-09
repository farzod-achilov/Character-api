const MARVEL_DATA_URL = "https://akabab.github.io/superhero-api/api/all.json";

function getIdCharcter() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("marvelId");
}

const elCharacterList = document.querySelector("[data-charcter]");

initMarvelCharacter();

async function initMarvelCharacter() {
  renderState(elCharacterList, "loading", "Загружаем персонажа...");
  try {
    const data = await fetchJson(MARVEL_DATA_URL);
    const characterId = getIdCharcter();
    const character = data.find((c) => String(c.id) === String(characterId));

    if (!character) {
      renderState(elCharacterList, "empty", "Персонаж не найден.");
      return;
    }

    renderMarvelCharacter(character);
  } catch (err) {
    renderState(
      elCharacterList,
      "error",
      "Не удалось загрузить персонажа. Попробуйте позже."
    );
  }
}

function renderMarvelCharacter(hero) {
  const statsHtml = Object.entries(hero.powerstats)
    .map(([key, value]) => {
      const num = Number(value) || 0;
      return `
      <div class="marvel__stat-row">
        <span class="marvel__stat-label">${key}</span>
        <div class="marvel__stat-bar"><span style="width:${num}%"></span></div>
        <span class="marvel__stat-value">${num}</span>
      </div>
      `;
    })
    .join("");

  elCharacterList.innerHTML = `
<div class="marvel__character">
  <div class="marvel__character-header">
    <div class="marvel__character-img">
      <img src="${hero.images.lg}" alt="${hero.name}" />
    </div>
    <div class="marvel__character-content">
      <h2>${hero.name}</h2>
      <ul class="marvel__character-facts">
        <li><b>Full name:</b> ${hero.biography.fullName || "—"}</li>
        <li><b>Occupation:</b> ${hero.work.occupation || "—"}</li>
        <li><b>Place of birth:</b> ${hero.biography.placeOfBirth || "—"}</li>
        <li><b>First appearance:</b> ${hero.biography.firstAppearance || "—"}</li>
        <li><b>Affiliation:</b> ${hero.connections.groupAffiliation || "—"}</li>
        <li><b>Alignment:</b> ${hero.biography.alignment || "—"}</li>
      </ul>
    </div>
  </div>
  <div class="marvel__character-stats">
    <h2>Power stats</h2>
    ${statsHtml}
  </div>
</div>
   `;
}
