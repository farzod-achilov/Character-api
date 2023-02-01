const api_key_dota = `07ecf9da-64f5-48a6-a0a9-782abe529228`;
const urlDota = `https://api.opendota.com/api/heroStats?api_key=${api_key_dota}`;

const elDotaList = document.querySelector("[data-dota-list]");

getDotaCharacters();

async function getDotaCharacters() {
  const dotaCharacters = await fetch(`${urlDota}`);
  const dotaData = await dotaCharacters.json();
  console.log(dotaData);
  renderDotaCharacters(dotaData);
}

function renderDotaCharacters(characters) {
  elDotaList.innerHTML = "";
  let html = "";
  characters.forEach((character) => {
    html += `
<div>
  <img src="https://api.opendota.com${character.img}" alt="${character.localized_name}">
  <h2>${character.localized_name}</h2>
</div>
      `;
  });

  elDotaList.innerHTML = html;
}
