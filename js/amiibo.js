const amilboBaseUrl = `https://www.amiiboapi.com//api/`;
const amilboList = document.querySelector("[data-amiibo-list]");
getDotaCharacters(amilboBaseUrl);

async function getDotaCharacters(url) {
  const getAmiibo = await fetch(`${url}/amiibo/`);
  const amilboData = await getAmiibo.json();
  console.log(amilboData.amiibo[0]);
  renderAmilbo(amilboData.amiibo);
}

function renderAmilbo(amiibos) {
  let html = "";

  amiibos.forEach((amiibo) => {
    html += `
    <div class="amiibo-card">
    <div class="amiibo-card__img">
      <img src="${amiibo.image}" alt="${amiibo.name}" />
    </div>
    <div class="amiibo-card__content">
      <h2 class="amiibo-card__header">${amiibo.name}</h2>
      <p class="amiibo-card__subtitle">${amiibo.gameSeries}</p>
    </div>
  </div>
   `;
  });
  amilboList.innerHTML = html;
}
