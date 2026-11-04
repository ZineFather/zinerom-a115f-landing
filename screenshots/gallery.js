"use strict";

window.ZINE_SCREENSHOT_GALLERY = (() => {
  const REPO_API = "https://api.github.com/repos/ZineFather/zinerom-a115f-landing/contents/screenshots?ref=main";
  const RAW_BASE = "https://raw.githubusercontent.com/ZineFather/zinerom-a115f-landing/main/screenshots/";
  const CATEGORIES = {
    lockScreen: "categoryLockScreen",
    homeSystemUi: "categoryHomeSystemUi",
    samsungDex: "categorySamsungDex",
    galaxyAi: "categoryGalaxyAi",
    samsungApps: "categorySamsungApps",
    settingsCustomization: "categorySettingsCustomization",
    performanceSystem: "categoryPerformanceSystem",
    additionalRom: "categoryAdditionalRom",
    otherFeatures: "categoryOtherFeatures"
  };
  const IMAGE_EXTENSION = /\.(?:png|jpe?g|webp|avif)$/i;

  function safeFilename(name) {
    return typeof name === "string" && name.length <= 240 && !name.includes("/") && name !== "." && name !== ".." && IMAGE_EXTENSION.test(name);
  }

  async function loadItems() {
    const [manifestResult, directoryResult] = await Promise.allSettled([
      fetch("screenshots/metadata.json", { cache: "no-cache" }).then(response => {
        if (!response.ok) throw new Error("Screenshot metadata unavailable");
        return response.json();
      }),
      fetch(REPO_API, { cache: "no-store", headers: { Accept: "application/vnd.github+json" } }).then(response => {
        if (!response.ok) throw new Error("GitHub screenshot directory unavailable");
        return response.json();
      })
    ]);
    const manifest = manifestResult.status === "fulfilled" ? manifestResult.value : { screenshots: [] };
    const metadata = new Map((manifest.screenshots || []).filter(item => safeFilename(item.filename)).map(item => [item.filename, item]));
    const directoryAvailable = directoryResult.status === "fulfilled" && Array.isArray(directoryResult.value);
    const filenames = directoryAvailable
      ? directoryResult.value.filter(item => item.type === "file" && safeFilename(item.name)).map(item => item.name)
      : [...metadata.keys()];
    const items = filenames.map(filename => {
      const info = metadata.get(filename) || {};
      const category = Object.prototype.hasOwnProperty.call(CATEGORIES, info.category) ? info.category : "otherFeatures";
      const stem = filename.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
      return {
        filename,
        url: RAW_BASE + encodeURIComponent(filename),
        title: info.title || stem,
        description: info.description || info.title || stem,
        category
      };
    });
    const order = new Map((manifest.screenshots || []).map((item, index) => [item.filename, index]));
    items.sort((a, b) => (order.get(a.filename) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.filename) ?? Number.MAX_SAFE_INTEGER) || a.filename.localeCompare(b.filename));
    return { items, directoryAvailable };
  }

  function render(container, t, escapeHTML) {
    let allItems = [];
    let visibleItems = [];
    let filter = "all";
    let previewIndex = 0;
    container.innerHTML = `
      <section class="shell editorial-page screenshot-page" aria-labelledby="screenshots-title">
        <p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>${escapeHTML(t("screenshotsEyebrow"))}</p>
        <h1 id="screenshots-title">${escapeHTML(t("screenshotsTitle"))}</h1>
        <p class="editorial-lead">${escapeHTML(t("screenshotsIntro"))}</p>
        <div class="screenshot-filter-row" id="screenshot-filters" role="group" aria-label="${escapeHTML(t("screenshotsFilterLabel"))}"></div>
        <p class="screenshot-status" id="screenshot-status" role="status" aria-live="polite">${escapeHTML(t("screenshotsLoading"))}</p>
        <div class="screenshot-grid" id="screenshot-grid"></div>
      </section>
      <dialog class="screenshot-lightbox" id="screenshot-lightbox" aria-labelledby="screenshot-caption-title">
        <div class="lightbox-toolbar">
          <span class="lightbox-count" id="lightbox-count"></span>
          <button class="lightbox-close" type="button" data-lightbox-close aria-label="${escapeHTML(t("lightboxClose"))}">×</button>
        </div>
        <div class="lightbox-stage">
          <button class="lightbox-arrow" type="button" data-lightbox-prev aria-label="${escapeHTML(t("lightboxPrevious"))}">‹</button>
          <figure class="lightbox-figure">
            <img id="lightbox-image" alt="" decoding="async">
            <figcaption><strong id="screenshot-caption-title"></strong><span id="screenshot-caption-category"></span></figcaption>
          </figure>
          <button class="lightbox-arrow" type="button" data-lightbox-next aria-label="${escapeHTML(t("lightboxNext"))}">›</button>
        </div>
      </dialog>`;

    const grid = container.querySelector("#screenshot-grid");
    const filterHost = container.querySelector("#screenshot-filters");
    const status = container.querySelector("#screenshot-status");
    const dialog = container.querySelector("#screenshot-lightbox");

    function renderPreview() {
      const item = visibleItems[previewIndex];
      if (!item) return;
      container.querySelector("#lightbox-image").src = item.url;
      container.querySelector("#lightbox-image").alt = item.description;
      container.querySelector("#screenshot-caption-title").textContent = item.title;
      container.querySelector("#screenshot-caption-category").textContent = t(CATEGORIES[item.category]);
      container.querySelector("#lightbox-count").textContent = `${previewIndex + 1} / ${visibleItems.length}`;
    }

    function showPreview(index) {
      if (!visibleItems.length) return;
      previewIndex = (index + visibleItems.length) % visibleItems.length;
      renderPreview();
      if (!dialog.open && typeof dialog.showModal === "function") dialog.showModal();
      else if (!dialog.open) dialog.setAttribute("open", "open");
    }

    function renderGallery() {
      visibleItems = filter === "all" ? allItems : allItems.filter(item => item.category === filter);
      const categories = [...new Set(allItems.map(item => item.category))];
      filterHost.innerHTML = [["all", t("screenshotsAll")], ...categories.map(category => [category, t(CATEGORIES[category])])]
        .map(([id, label]) => `<button class="filter-button${filter === id ? " is-active" : ""}" type="button" data-gallery-filter="${escapeHTML(id)}" aria-pressed="${filter === id}">${escapeHTML(label)}<span class="filter-count">${id === "all" ? allItems.length : allItems.filter(item => item.category === id).length}</span></button>`).join("");
      if (!visibleItems.length) {
        grid.innerHTML = "";
        status.textContent = t("screenshotsEmpty");
        status.hidden = false;
        return;
      }
      status.hidden = true;
      grid.innerHTML = visibleItems.map((item, index) => `
        <article class="screenshot-card">
          <button class="screenshot-open" type="button" data-gallery-open="${index}" aria-label="${escapeHTML(t("screenshotPreview"))}: ${escapeHTML(item.title)}">
            <span class="screenshot-thumb"><img src="${escapeHTML(item.url)}" alt="${escapeHTML(item.description)}" loading="lazy" decoding="async"></span>
            <span class="screenshot-card-copy"><span class="screenshot-category">${escapeHTML(t(CATEGORIES[item.category]))}</span><strong>${escapeHTML(item.title)}</strong><span class="screenshot-card-cta">${escapeHTML(t("screenshotPreview"))}<span aria-hidden="true">↗</span></span></span>
          </button>
        </article>`).join("");
    }

    filterHost.addEventListener("click", event => {
      const button = event.target.closest("[data-gallery-filter]");
      if (!button) return;
      filter = button.dataset.galleryFilter;
      renderGallery();
    });
    grid.addEventListener("click", event => {
      const button = event.target.closest("[data-gallery-open]");
      if (button) showPreview(Number(button.dataset.galleryOpen));
    });
    container.querySelector("[data-lightbox-close]").addEventListener("click", () => dialog.close?.());
    container.querySelector("[data-lightbox-prev]").addEventListener("click", () => showPreview(previewIndex - 1));
    container.querySelector("[data-lightbox-next]").addEventListener("click", () => showPreview(previewIndex + 1));
    dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close?.(); });
    dialog.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); showPreview(previewIndex - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); showPreview(previewIndex + 1); }
    });

    loadItems().then(result => {
      if (!grid.isConnected) return;
      allItems = result.items;
      if (!result.directoryAvailable && allItems.length) status.textContent = t("screenshotsFallback");
      else if (!allItems.length) { status.textContent = t("screenshotsEmpty"); return; }
      else status.hidden = true;
      renderGallery();
    }).catch(() => {
      if (!grid.isConnected) return;
      status.textContent = t("screenshotsError");
    });
  }

  return { render };
})();
