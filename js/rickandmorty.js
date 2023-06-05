ellist = document.querySelector("[data-list-rickAndMorty]");

getCharacter(BaseRickAndMorty);

async function getCharacter(url) {
  const character = await fetch(`${url}/character`);
  const characterData = await character.json();
  console.log(characterData);
  renderCharacter(characterData.results);
}

function renderCharacter(characters) {
  let html = "";
  characters.forEach((character) => {
    html += `
     <div class="character">${character.id}</div>
     <img src="${character.image}" alt="${character.id}"/>
     <h2>${character.name}</h2>
     `;
    console.log(character);
  });
  ellist.innerHTML = html;
}
