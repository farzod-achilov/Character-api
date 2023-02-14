const comicsList = document.querySelector("[data-comics]");

function getIdComics() {
  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.get("comicsId") === null) {
    return;
  }

  getComics(searchParams.get("comicsId"));
}
getIdComics();

async function getComics(comicsId) {
  //   comicsId = getIdComics();
  const res = await fetch(
    `https://gateway.marvel.com:443/v1/public/comics?apikey=${apikey}&ts=${ts}&hash=${hash}&limit=100&id=${comicsId}`
  );
  const data = await res.json();
  renderComics(data.data.results[0]);
}

function renderComics(comics) {
  console.log(comics);
  let html = "";
  html += `
  <div>${comics.description}</div>
  <img src="${comics.thumbnail.path}.${comics.thumbnail.extension}" />
  `;
  comics.characters.items.forEach((character) => {
    html += `
    <div>${character.name}</div>
    `;
  });
  comics.images.forEach((images) => [
    (html += `
    <img src="${images.path}.${images.extension}" alt="${images}" />
    `),
  ]);
  comicsList.innerHTML = html;
}
