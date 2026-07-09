const BaseRickAndMorty = "https://rickandmortyapi.com/api";

// Общий helper: fetch + разбор JSON с проверкой статуса ответа
async function fetchJson(requestUrl) {
  const res = await fetch(requestUrl);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}

// Общий helper: рисует состояние "загрузка" / "ошибка" / "пусто" в контейнере списка
function renderState(container, type, message) {
  if (!container) return;
  container.innerHTML = `
    <div class="state-message state-message--${type}">
      <p>${message}</p>
    </div>
  `;
}

// Прячем картинки с битыми ссылками (сторонние API периодически отдают мёртвые URL)
document.addEventListener(
  "error",
  (evt) => {
    if (evt.target.tagName === "IMG") {
      evt.target.style.visibility = "hidden";
    }
  },
  true
);

// Общий helper: рисует пагинацию по одному и тому же шаблону для всех разделов
function renderPagination(container, totalPages, dataAttr) {
  if (!container) return;
  container.innerHTML = "";
  if (!totalPages || totalPages <= 1) return;

  let html = "";
  for (let i = 1; i <= totalPages; i++) {
    html += `
    <li class="page-item"><a class="page-link" data-${dataAttr}-page="${i}" href="?page=${i}">${i}</a></li>
    `;
  }
  container.innerHTML = html;
}
