# Character API

Статический многостраничный сайт на чистом JavaScript, HTML и SCSS: каждая страница получает данные с публичного API про персонажей определённой вселенной и рисует карточки со списком, поиском и (для Marvel) детальной модалкой.

## Разделы

| Страница | Источник данных | Возможности | Статус |
|---|---|---|---|
| [`index.html`](index.html) | akabab/superhero-api | карусель Человека-Паука и его вселенной (Swiper) | ✅ работает |
| [`marvel.html`](marvel.html) | akabab/superhero-api | список, клиентские поиск и пагинация, модалка с powerstats | ✅ работает |
| [`marvel-character.html`](marvel-character.html) | akabab/superhero-api | полный профиль персонажа: биография + шкалы характеристик | ✅ работает |
| [`rickandmorty.html`](rickandmorty.html) | Rick and Morty API | список персонажей, пагинация | ✅ работает |
| [`disney.html`](disney.html) | Disney API | список, пагинация, поиск по имени | ✅ работает |
| [`dota2.html`](dota2.html) | OpenDota API | список героев Dota 2 | ✅ работает |
| [`amiibo.html`](amiibo.html) | AmiiboAPI | список фигурок Amiibo | ⚠️ см. ниже |
| [`bobs-burger.html`](bobs-burger.html) | Bob's Burgers API | список персонажей мультсериала | ✅ работает |

### О смене источника данных для Marvel

Изначально раздел Marvel был построен на официальном [Marvel Comics API](https://developer.marvel.com) (`gateway.marvel.com`). Он требует пару ключей — публичный и приватный — и подписи запроса (`hash = md5(ts + приватный_ключ + публичный_ключ)`), которую без приватного ключа пересчитать нельзя. Раздобыть рабочую пару ключей не вышло, поэтому Marvel-раздел переведён на **[akabab/superhero-api](https://akabab.github.io/superhero-api/api/)** — открытый статический датасет (269 персонажей издательства Marvel Comics, без ключей, с открытым CORS, хостится на GitHub Pages). Из-за смены источника пропала функциональность, которой не было в новом датасете (просмотр комиксов/сериалов/событий персонажа — страница `marvel-comics.html` удалена), но появилась новая: у каждого персонажа теперь есть шкалы характеристик (`powerstats`) на детальной странице.

Если в будущем захочется вернуться на официальный Marvel API — понадобятся собственные `publicKey`/`privateKey` с developer.marvel.com, и `url` в `js/marvel.js`/`js/marvel-character.js`/`js/swipper-index.js` нужно будет собрать заново по их схеме подписи запроса.

### ⚠️ Известные ограничения сторонних API

- **AmiiboAPI** (`amiiboapi.com`) — на момент написания README сайт переехал на новый фронтенд, старый путь `/api/amiibo/` отдаёт 404, а по HTTPS вообще не устанавливается соединение. Как только у сервиса появится актуальная документация с новым эндпоинтом — нужно поправить `amiiboBaseUrl` в `js/amiibo.js`.

Все страницы обрабатывают отказ API корректно: вместо белого экрана показывается сообщение об ошибке (см. `renderState()` в `js/main.js`).

## Стек

- Ванильный JavaScript (`fetch`, делегирование событий через `data-*` атрибуты)
- SCSS (компилируется в `css/main.css`, см. «Разработка» ниже)
- Bootstrap CSS (пагинация, сетки) и Swiper (карусель на главной) — подключены через CDN

## Структура

```
js/
  main.js         — общие хелперы: fetchJson, renderState, renderPagination
  nav.js          — общая навигация, рендерится в <div id="site-header">
  config.js       — API-ключи (не коммитится, см. .gitignore)
  config.example.js — шаблон для config.js
  <section>.js    — логика конкретного раздела
scss/
  base/           — контейнер, шрифты, навигация, состояния loading/error/empty
  blocks/         — стили конкретных разделов + общая сетка карточек (charGrid)
```

## Настройка и запуск

1. Склонируй репозиторий.
2. Скопируй `js/config.example.js` в `js/config.js` и подставь свой ключ OpenDota (см. комментарии в файле) — нужен только для раздела Dota 2, остальные разделы ключей не требуют.
3. Запусти любой статический сервер в корне проекта, например:

   ```bash
   npx http-server .
   ```

   Открывать файлы напрямую через `file://` не стоит — некоторые API-запросы могут блокироваться CORS-политикой браузера при этом протоколе. Также не годится `npx serve` — он по умолчанию делает redirect с `/page.html?query` на `/page` и обрезает query-параметры, из-за чего `marvel-character.html?marvelId=...` перестаёт получать id персонажа.

## Разработка (SCSS)

Стили лежат в `scss/`, скомпилированный `css/main.css` закоммичен в репозиторий. Пересобрать после правок:

```bash
npx sass scss/main.scss css/main.css --style=expanded
```

Либо используй расширение VS Code **Live Sass Compiler** — настройки уже есть в `.vscode/settings.json`.
