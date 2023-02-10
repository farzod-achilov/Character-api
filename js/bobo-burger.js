// https://bobs-burgers-api-ui.herokuapp.com/documentation Documitation

const elList = document.querySelector("[data-bobBurger-list]");

const Base_URL = "https://bobsburgers-api.herokuapp.com/";

getCharacter(Base_URL);

async function getCharacter(url) {
  const getCharacter = await fetch(`${url}characters`);
  const characterData = await getCharacter.json();

  renderBobCharacter(characterData);
  console.log(characterData[0]);
}

function renderBobCharacter(characters) {
  let html = "";
  characters.forEach((character) => {
    html += `
    <div>
    <img src="${character.image}" alt="${character.name}" />
    <div>
      <h2>${character.name}</h2>
      <p>${character.occupation}</p>
    </div>
  </div>
   `;
  });
  elList.innerHTML = html;
}
