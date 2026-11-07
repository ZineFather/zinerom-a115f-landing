"use strict";

window.ZINE_SCREENSHOT_GALLERY = (() => {
  const REPO_API = "https://api.github.com/repos/ZineFather/zinerom-a115f-landing/contents/screenshots?ref=main";
  const RAW_BASE = "https://raw.githubusercontent.com/ZineFather/zinerom-a115f-landing/main/screenshots/";
  const GENERATIONS = {
    oneUi7: { title: "One UI 7", subtitleKey: "screenshotsPreviousGeneration" },
    oneUi9: { title: "One UI 9", subtitleKey: "screenshotsLatestGeneration" }
  };
  const GENERATION_IDS = Object.keys(GENERATIONS);
  const IMAGE_EXTENSION = /\.(?:png|jpe?g|webp|avif)$/i;

  function safeFilename(name) {
    return typeof name === "string" && name.length <= 240 && !name.includes("/") && name !== "." && name !== ".." && IMAGE_EXTENSION.test(name);
  }

  function validGeneration(value) {
    return GENERATION_IDS.includes(value);
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
    const manifestItems = Array.isArray(manifest.screenshots) ? manifest.screenshots : [];
    const metadata = new Map(manifestItems.filter(item => safeFilename(item.filename)).map(item => [item.filename, item]));
    const directoryAvailable = directoryResult.status === "fulfilled" && Array.isArray(directoryResult.value);
    const discoveredFilenames = directoryAvailable
      ? directoryResult.value.filter(item => item.type === "file" && safeFilename(item.name)).map(item => item.name)
      : [...metadata.keys()];
    const filenames = [...new Set(discoveredFilenames)];
    const order = new Map(manifestItems.map((item, index) => [item.filename, index]));
    const items = filenames.map(filename => {
      const info = metadata.get(filename) || {};
      if (!validGeneration(info.generation)) return null;
      const stem = filename.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
      return {
        filename,
        url: RAW_BASE + encodeURIComponent(filename),
        title: info.title || stem,
        description: info.description || info.title || stem,
        generation: info.generation
      };
    }).filter(Boolean);
    items.sort((a, b) => (order.get(a.filename) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.filename) ?? Number.MAX_SAFE_INTEGER) || a.filename.localeCompare(b.filename));
    const assigned = new Set(items.map(item => item.filename));
    return {
      items,
      directoryAvailable,
      unassignedFilenames: filenames.filter(filename => !assigned.has(filename))
    };
  }

  function render(container, t, escapeHTML) {
    let allItems = [];
    let visibleItems = [];
    let activeGeneration = "oneUi9";
    let previewIndex = 0;
    container.innerHTML = `
      <section class="shell editorial-page screenshot-page" aria-labelledby="screenshots-title">
        <p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>${escapeHTML(t("screenshotsEyebrow"))}</p>
        <h1 id="screenshots-title">${escapeHTML(t("screenshotsTitle"))}</h1>
        <p class="editorial-lead">${escapeHTML(t("screenshotsIntro"))}</p>
        <p class="screenshot-load-status" id="screenshot-load-status" role="status" aria-live="polite">${escapeHTML(t("screenshotsLoading"))}</p>
        <p class="screenshot-unassigned-note" id="screenshot-unassigned-note" role="status" aria-live="polite" hidden></p>
        <div class="screenshot-generation-tabs" id="screenshot-generation-tabs" role="tablist" aria-label="${escapeHTML(t("screenshotsGenerationNavigation"))}"></div>
        <section class="screenshot-generation-panel" id="screenshot-generation-panel" role="tabpanel" tabindex="0">
          <header class="screenshot-generation-heading">
            <div class="screenshot-generation-heading-copy">
              <p class="screenshot-generation-overline" id="screenshot-generation-overline"></p>
              <h2 id="screenshot-generation-title"></h2>
              <p class="screenshot-generation-subtitle" id="screenshot-generation-subtitle"></p>
            </div>
            <span class="screenshot-generation-count" id="screenshot-generation-count" aria-live="polite"></span>
          </header>
          <p class="screenshot-status" id="screenshot-status" role="status" aria-live="polite"></p>
          <div class="screenshot-grid" id="screenshot-grid"></div>
        </section>
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
            <figcaption><strong id="screenshot-caption-title"></strong><span id="screenshot-caption-generation"></span></figcaption>
          </figure>
          <button class="lightbox-arrow" type="button" data-lightbox-next aria-label="${escapeHTML(t("lightboxNext"))}">›</button>
        </div>
      </dialog>`;

    const tabsHost = container.querySelector("#screenshot-generation-tabs");
    const panel = container.querySelector("#screenshot-generation-panel");
    const grid = container.querySelector("#screenshot-grid");
    const loadStatus = container.querySelector("#screenshot-load-status");
    const unassignedNote = container.querySelector("#screenshot-unassigned-note");
    const status = container.querySelector("#screenshot-status");
    const dialog = container.querySelector("#screenshot-lightbox");

    function renderPreview() {
      const item = visibleItems[previewIndex];
      if (!item) return;
      container.querySelector("#lightbox-image").src = item.url;
      container.querySelector("#lightbox-image").alt = item.description;
      container.querySelector("#screenshot-caption-title").textContent = item.title;
      container.querySelector("#screenshot-caption-generation").textContent = GENERATIONS[item.generation].title;
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
      visibleItems = allItems.filter(item => item.generation === activeGeneration);
      const activeIndex = GENERATION_IDS.indexOf(activeGeneration);
      tabsHost.innerHTML = GENERATION_IDS.map((id, index) => {
        const count = allItems.filter(item => item.generation === id).length;
        return `<button class="screenshot-generation-tab${id === activeGeneration ? " is-active" : ""}" type="button" role="tab" id="screenshot-tab-${id}" data-generation="${id}" aria-selected="${id === activeGeneration}" aria-controls="screenshot-generation-panel" tabindex="${id === activeGeneration ? "0" : "-1"}">
          <span class="generation-tab-index" aria-hidden="true">0${index + 1}</span>
          <span class="generation-tab-title">${escapeHTML(GENERATIONS[id].title)}</span>
          <span class="generation-tab-count" aria-label="${escapeHTML(String(count))}">${count}</span>
        </button>`;
      }).join("");
      panel.setAttribute("aria-labelledby", `screenshot-tab-${activeGeneration}`);
      container.querySelector("#screenshot-generation-overline").textContent = `ZINEROM · GENERATION 0${activeIndex + 1}`;
      container.querySelector("#screenshot-generation-title").textContent = GENERATIONS[activeGeneration].title;
      container.querySelector("#screenshot-generation-subtitle").textContent = t(GENERATIONS[activeGeneration].subtitleKey);
      container.querySelector("#screenshot-generation-count").textContent = String(visibleItems.length).padStart(2, "0");
      if (!visibleItems.length) {
        grid.innerHTML = "";
        status.textContent = t("screenshotsGenerationEmpty").replace("{generation}", GENERATIONS[activeGeneration].title);
        status.hidden = false;
        return;
      }
      status.hidden = true;
      grid.innerHTML = visibleItems.map((item, index) => `
        <article class="screenshot-card">
          <button class="screenshot-open" type="button" data-gallery-open="${index}" aria-label="${escapeHTML(t("screenshotPreview"))}: ${escapeHTML(item.title)}">
            <span class="screenshot-thumb"><img src="${escapeHTML(item.url)}" alt="${escapeHTML(item.description)}" loading="lazy" decoding="async"></span>
            <span class="screenshot-card-copy"><span class="screenshot-generation-tag">${escapeHTML(GENERATIONS[item.generation].title)}</span><strong>${escapeHTML(item.title)}</strong><span class="screenshot-card-cta">${escapeHTML(t("screenshotPreview"))}<span aria-hidden="true">↗</span></span></span>
          </button>
        </article>`).join("");
    }

    function selectGeneration(id, focusTab = false) {
      if (!validGeneration(id)) return;
      activeGeneration = id;
      if (dialog.open) dialog.close?.();
      renderGallery();
      if (focusTab) tabsHost.querySelector(`[data-generation="${id}"]`)?.focus();
    }

    tabsHost.addEventListener("click", event => {
      const button = event.target.closest("[data-generation]");
      if (button) selectGeneration(button.dataset.generation);
    });
    tabsHost.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const current = GENERATION_IDS.indexOf(activeGeneration);
      const next = event.key === "Home" ? 0 : event.key === "End" ? GENERATION_IDS.length - 1
        : (current + (event.key === "ArrowRight" ? 1 : -1) + GENERATION_IDS.length) % GENERATION_IDS.length;
      selectGeneration(GENERATION_IDS[next], true);
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
      if (allItems.some(item => item.generation === "oneUi9")) activeGeneration = "oneUi9";
      else if (allItems.some(item => item.generation === "oneUi7")) activeGeneration = "oneUi7";
      loadStatus.hidden = true;
      if (!result.directoryAvailable && allItems.length) {
        loadStatus.textContent = t("screenshotsFallback");
        loadStatus.hidden = false;
      }
      if (!result.directoryAvailable && !allItems.length && !result.unassignedFilenames.length) {
        loadStatus.textContent = t("screenshotsError");
        loadStatus.hidden = false;
      } else if (result.directoryAvailable && !allItems.length && !result.unassignedFilenames.length) {
        loadStatus.textContent = t("screenshotsEmpty");
        loadStatus.hidden = false;
      }
      if (result.unassignedFilenames.length) {
        unassignedNote.textContent = t("screenshotsUnassigned").replace("{count}", String(result.unassignedFilenames.length));
        unassignedNote.hidden = false;
        unassignedNote.title = result.unassignedFilenames.join(", ");
      }
      renderGallery();
    }).catch(() => {
      if (!grid.isConnected) return;
      loadStatus.textContent = t("screenshotsError");
      loadStatus.hidden = false;
      renderGallery();
    });
  }

  return { render };
})();
