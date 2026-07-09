const SITE_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "marvel.html", label: "Marvel" },
  { href: "rickandmorty.html", label: "Rick and Morty" },
  { href: "disney.html", label: "Disney" },
  { href: "dota2.html", label: "Dota 2" },
  { href: "amiibo.html", label: "Amiibo" },
  { href: "bobs-burger.html", label: "Bob's Burgers" },
];

function renderSiteNav() {
  const el = document.getElementById("site-header");
  if (!el) return;

  const current = location.pathname.split("/").pop() || "index.html";

  el.innerHTML = `
    <div class="site-nav">
      <a class="site-nav__brand" href="index.html">Character API</a>
      <button class="site-nav__toggle" type="button" data-nav-toggle aria-label="Toggle navigation">☰</button>
      <ul class="site-nav__list" data-nav-list>
        ${SITE_LINKS.map(
          (link) => `
        <li>
          <a class="site-nav__link${
            link.href === current ? " is-active" : ""
          }" href="${link.href}">${link.label}</a>
        </li>`
        ).join("")}
      </ul>
    </div>
  `;

  const toggle = el.querySelector("[data-nav-toggle]");
  const list = el.querySelector("[data-nav-list]");
  toggle.addEventListener("click", () => {
    list.classList.toggle("is-open");
  });
}

document.addEventListener("DOMContentLoaded", renderSiteNav);
