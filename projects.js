// Shared by every page. Expects `projects`, `previews` and `copy`
// to be defined by the language file (en.js / id.js) loaded before this one.
const $ = (selector) => document.querySelector(selector);

const isEnglish = document.documentElement.lang === "en";
const FEATURED_COUNT = 3; // projects shown on the home page
const PAGE_SIZE = 3; // projects per page on the catalog page
const THUMB_COLORS = ["olive", "violet", "blue"];

// External link per project id; null means "not available yet".
// Both language versions use the same destinations.
const projectUrls = {
  perdiknas: null,
  "hr-mobile": null,
  ecommerce: null,
};

// ---------------------------------------------------------------------------
// Project cards
// ---------------------------------------------------------------------------
function cardMarkup(project, index) {
  return `
    <div aria-hidden="true" class="thumb ${THUMB_COLORS[index % THUMB_COLORS.length]}">
      ${previews[index] || ""}
    </div>
    <div class="cardcopy">
      <span class="category">${project.type}</span>
      <h3>${project.name}</h3>
      <p>${project.summary}</p>
    </div>`;
}

function detailMarkup(project) {
  return `
    <div class="eyebrow">${project.type}</div>
    <h2>${project.name}<span>.</span></h2>
    <p>${project.detail}</p>
    <p><b>${copy.stage}</b> · ${project.status}</p>
    <p>${project.tech}</p>
    <small>${copy.illustration}</small>`;
}

// "Open project" link, or a disabled button plus a note when no URL exists.
function createProjectAction(project, container) {
  const destination = projectUrls[project.id];
  const action = document.createElement(destination ? "a" : "button");
  action.className = "outline project-link";
  action.textContent = isEnglish ? "Open project" : "Buka proyek";
  action.setAttribute("aria-label", `${action.textContent} · ${project.name}`);
  container.append(action);

  if (destination) {
    action.href = destination;
    action.target = "_blank";
    action.rel = "noopener noreferrer";
    return;
  }

  action.type = "button";
  action.disabled = true;

  const note = document.createElement("small");
  note.className = "project-link-note";
  note.id = `link-status-${project.id}`;
  note.textContent = isEnglish ? "Link not yet available" : "Tautan belum tersedia";
  action.setAttribute("aria-describedby", note.id);
  container.append(note);
}

function renderProject(project, index) {
  const container = document.createElement("article");
  container.className = "card project-card";

  const details = document.createElement("button");
  details.className = "project-details";
  details.type = "button";
  details.innerHTML = cardMarkup(project, index);
  details.onclick = () => {
    $("#bodydetail").innerHTML = detailMarkup(project);
    $("#detail").showModal();
  };
  container.append(details);

  createProjectAction(project, container);
  $("#cards").append(container);
}

// ---------------------------------------------------------------------------
// Dialogs: close with the × button or by clicking the backdrop
// ---------------------------------------------------------------------------
function isOutside(event, element) {
  const rect = element.getBoundingClientRect();
  return (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
}

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.querySelector(".close").onclick = () => dialog.close();
  dialog.onclick = (event) => {
    if (event.target === dialog && isOutside(event, dialog)) dialog.close();
  };
});

// ---------------------------------------------------------------------------
// Page setup
// ---------------------------------------------------------------------------
function pageControl(label, page, totalPages, pathname) {
  const enabled = page >= 1 && page <= totalPages;
  const control = document.createElement(enabled ? "a" : "span");
  control.className = "page-control";
  control.textContent = label;
  if (enabled) control.href = pathname + (page === 1 ? "" : `?page=${page}`);
  else control.setAttribute("aria-disabled", "true");
  return control;
}

function renderCatalog(pagination) {
  const url = new URL(location.href);
  const requested = Number(url.searchParams.get("page"));
  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
  const current = Number.isInteger(requested)
    ? Math.min(totalPages, Math.max(1, requested))
    : 1;
  const offset = (current - 1) * PAGE_SIZE;

  projects
    .slice(offset, offset + PAGE_SIZE)
    .forEach((project, index) => renderProject(project, offset + index));

  // Normalize the address bar (e.g. ?page=99 -> last page, ?page=1 -> none).
  const query = current === 1 ? "" : `?page=${current}`;
  if (url.searchParams.has("page") && url.search !== query) {
    history.replaceState(null, "", url.pathname + query + url.hash);
  }

  // Keep the current page when switching language.
  document.querySelectorAll(".languages a").forEach((link) => {
    link.search = query;
  });

  $("#project-count").textContent = projects.length + (isEnglish ? " projects" : " proyek");
  $("#page-state").textContent = isEnglish
    ? `Page ${current} of ${totalPages}`
    : `Halaman ${current} dari ${totalPages}`;

  pagination.prepend(
    pageControl(isEnglish ? "Previous" : "Sebelumnya", current - 1, totalPages, url.pathname),
  );
  pagination.append(
    pageControl(isEnglish ? "Next" : "Berikutnya", current + 1, totalPages, url.pathname),
  );
}

const pagination = $("#pagination");
if (pagination) renderCatalog(pagination);
else projects.slice(0, FEATURED_COUNT).forEach(renderProject);
