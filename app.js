"use strict";

/*
 * ZineROM Project device and build data.
 * Only add a downloadUrl after the build has been published and verified.
 * Add or remove entries here to maintain the supported device catalog.
 */
const ONE_UI_VERSIONS = ["6.1", "7.0", "8.0", "8.5", "9.0"];
const TELEGRAM_URL = "https://t.me/ZineROMProject/109";
const devices = [
  {
    id: "a15-4g", name: "Galaxy A15 4G", family: "Galaxy A15", variant: "4G / LTE",
    model: "Regional model code not supplied", image: "device-a15.webp", type: "phone", builds: {}
  },
  {
    id: "a15-5g", name: "Galaxy A15 5G", family: "Galaxy A15", variant: "5G",
    model: "Regional model code not supplied", image: "device-a15.webp", type: "phone", builds: {}
  },
  {
    id: "a16-4g", name: "Galaxy A16 4G", family: "Galaxy A16", variant: "4G / LTE",
    model: "Regional model code not supplied", image: "device-a16.webp", type: "phone", builds: {}
  },
  {
    id: "a16-5g", name: "Galaxy A16 5G", family: "Galaxy A16", variant: "5G",
    model: "Regional model code not supplied", image: "device-a16.webp", type: "phone", builds: {}
  },
  {
    id: "a25-5g", name: "Galaxy A25 5G", family: "Galaxy A25", variant: "5G",
    model: "SM-A256 family", image: "device-a25.webp", type: "phone", builds: {}
  },
  {
    id: "a34-5g", name: "Galaxy A34 5G", family: "Galaxy A34", variant: "5G",
    model: "SM-A346 family", image: "device-a34.webp", type: "phone", builds: {}
  },
  {
    id: "a53-5g", name: "Galaxy A53 5G", family: "Galaxy A53", variant: "5G",
    model: "SM-A536 family", image: "device-a53.webp", type: "phone", builds: {}
  },
  {
    id: "a52s-5g", name: "Galaxy A52s 5G", family: "Galaxy A52s", variant: "5G",
    model: "SM-A528 family", image: "device-a52s.webp", type: "phone",
    builds: {
      "6.1": {
        status: "test",
        downloadUrl: "https://gofile.io/d/TYKq0wOl",
        noteKey: "noteA52s61",
        warningKey: "warningA52s61",
        downloadKey: "downloadA52s61"
      },
      "7.0": { status: "in-progress", noteKey: "noteWorking" }
    }
  },
  {
    id: "a11-4g", name: "Galaxy A11", family: "Galaxy A11", variant: "4G / LTE",
    model: "SM-A115F", image: "device-a11.webp", type: "phone",
    builds: {
      "7.0": {
        status: "test",
        androidVersion: "15",
        downloadUrl: "https://github.com/nova-arch008/ZineROM-A115F-OneUI7-boot-test/releases/download/a115f-boot-test/ZineROM_OneUI7_A115F-Port-A057F.zip",
        sha256: "f51460eff376466d24c12d39902e954e6037e5de22b3a7aef68088346f26fa95",
        noteKey: "noteA11",
        downloadKey: "download"
      }
    }
  },
  {
    id: "a24-4g", name: "Galaxy A24", family: "Galaxy A24", variant: "4G / LTE",
    model: "SM-A245 family", image: "device-a24.webp", type: "phone", builds: {}
  },
  {
    id: "tab-a9-plus-5g-x216b", name: "Galaxy Tab A9+ 5G", family: "Galaxy Tab A9+", variant: "5G",
    model: "SM-X216B", image: "device-tab-a9plus-5g.webp", type: "tablet", builds: {}
  }
];

const translations = window.ZINE_TRANSLATIONS || {};
const extraCopy = {
  en: {
    navHome: "Home", navAbout: "About", navSupport: "Support", catalogLabel: "SUPPORTED DEVICE CATALOG",
    catalogIntro: "Choose a device to see only the ROM information and downloads configured for that model.",
    searchLabel: "Search devices", searchPlaceholder: "Search by device or model", filterLabel: "Filter device catalog",
    filterAll: "All devices", filterPhones: "Phones", filterTablets: "Tablets", viewDevice: "View device",
    deviceCount: "supported devices", versionCount: "One UI versions", testBuildCount: "verified test build", noResults: "No devices match your search.",
    backCatalog: "Back to device catalog", modelLabel: "Model", variantLabel: "Network variant", versionTitle: "One UI version",
    versionIntro: "Select a version to see its configured ROM status and download information.", chooseVersion: "Choose a One UI version to view its status.",
    noVersionDetails: "ROM details are not configured for this One UI version.", noBuildStatus: "No public builds",
    releaseProgress: "Work in progress. No public download is configured for this version.", missingDownload: "Download link not available yet.",
    requestSupport: "Request Support", downloadWarning: "Experimental diagnostic test build — not a stable release. Confirm the exact model before flashing.",
    downloadA52s61: "Download One UI 6.1 for A52s", noteA52s61: "Community One UI 6.1 build for Galaxy A52s 5G. The GoFile share lists ZineROM_SM-A528B_V3.2.3.zip.",
    warningA52s61: "The linked file is labeled SM-A528B. Confirm your exact model and follow the source instructions before flashing.",
    checksumLabel: "SHA-256 checksum", copyChecksum: "Copy checksum", catalogStrip: "A catalog built on clear device matching and honest release status.",
    aboutTitle: "Built around the device, not the other way around.", aboutStripTitle: "Device-specific work. Clear release information.",
    aboutCopy: "ZineROM Project is an independent community custom-ROM effort. This catalog separates published test builds from work in progress and devices with no configured release. A listed device does not mean that every One UI version has a ROM available.",
    deviceDetailIntro: "Review the device variant and choose a One UI version to see the release information currently configured for this model.",
    aboutPrinciple: "Clear device matching", aboutPrincipleText: "Model and variant information is shown where it has been configured; unconfirmed details are identified rather than guessed.",
    aboutRelease: "Honest release status", aboutReleaseText: "Download buttons appear only for a configured public link. Missing releases are labeled plainly.",
    aboutCommunity: "Community support", aboutCommunityText: "Support requests are routed to the Telegram request page through the six categories provided by the project.",
    githubProject: "GitHub repository", supportTitle: "Project support", supportCopy: "Choose the request category that fits best, then continue to the ZineROM Telegram request page to submit the complete details.",
    supportCopyShort: "Need help with this device or build?", categoriesTitle: "Request categories", dialogTitle: "Request Support",
    dialogIntro: "Choose a category before continuing. Telegram is where you can submit your full request details.",
    supportEyebrow: "PROJECT SUPPORT", categoryLabel: "Request category", categoryPlaceholder: "Choose a category", continueTelegram: "Continue to Telegram", cancel: "Cancel",
    releaseOverline: "BUILD SELECTOR", contextDevice: "Device", contextVersion: "One UI", modelNotProvided: "Regional model code not supplied",
    themeLight: "Switch to light theme", themeDark: "Switch to dark theme", openMenu: "Open navigation", closeMenu: "Close navigation"
  },
  ar: {
    navHome: "الرئيسية", navAbout: "عن المشروع", navSupport: "الدعم", catalogLabel: "كتالوج الأجهزة المدعومة",
    catalogIntro: "اختر جهازًا للاطّلاع على معلومات الروم وروابط التنزيل المُعدّة فعليًا لهذا الطراز فقط.",
    searchLabel: "البحث عن الأجهزة", searchPlaceholder: "ابحث باسم الجهاز أو الطراز", filterLabel: "تصفية كتالوج الأجهزة",
    filterAll: "كل الأجهزة", filterPhones: "الهواتف", filterTablets: "الأجهزة اللوحية", viewDevice: "عرض الجهاز",
    deviceCount: "أجهزة مدعومة", versionCount: "إصدارات One UI", testBuildCount: "نسخة اختبار موثقة", noResults: "لا توجد أجهزة تطابق بحثك.",
    backCatalog: "العودة إلى كتالوج الأجهزة", modelLabel: "الطراز", variantLabel: "نسخة الشبكة", versionTitle: "إصدار One UI",
    versionIntro: "اختر إصدارًا لعرض حالة الروم ومعلومات التنزيل المُعدّة له.", chooseVersion: "اختر إصدار One UI لعرض حالته.",
    noVersionDetails: "لم تُعدّ تفاصيل روم لهذا الإصدار من One UI.", noBuildStatus: "لا توجد نسخ عامة",
    releaseProgress: "العمل جارٍ. لا يوجد رابط تنزيل عام مُعدّ لهذا الإصدار.", missingDownload: "رابط التنزيل غير متاح بعد.",
    requestSupport: "طلب الدعم", downloadWarning: "نسخة اختبار تشخيصية وتجريبية وليست إصدارًا مستقرًا. تأكد من الطراز الدقيق قبل التفليش.",
    downloadA52s61: "تنزيل One UI 6.1 لهاتف A52s", noteA52s61: "إصدار مجتمعي من One UI 6.1 لهاتف Galaxy A52s 5G. تعرض صفحة GoFile الملف ZineROM_SM-A528B_V3.2.3.zip.",
    warningA52s61: "الملف المرتبط يحمل الرمز SM-A528B. تأكد من الطراز الدقيق واتبع تعليمات المصدر قبل التفليش.",
    checksumLabel: "بصمة SHA-256", copyChecksum: "نسخ البصمة", catalogStrip: "كتالوج يركز على مطابقة الجهاز ووضوح حالة الإصدارات.",
    aboutTitle: "الروم يبدأ من الجهاز، لا العكس.", aboutStripTitle: "عمل مخصص للأجهزة ومعلومات إصدار واضحة.",
    aboutCopy: "مشروع ZineROM مبادرة مجتمعية مستقلة لتطوير رومات مخصصة. يميّز هذا الكتالوج بين نسخ الاختبار المنشورة والعمل الجاري والأجهزة التي لا يتوفر لها إصدار مُعدّ. ظهور الجهاز في القائمة لا يعني توافر روم لكل إصدار من One UI.",
    deviceDetailIntro: "راجع نسخة الجهاز واختر إصدار One UI لعرض معلومات الإصدار المُعدّة حاليًا لهذا الطراز.",
    aboutPrinciple: "مطابقة واضحة للجهاز", aboutPrincipleText: "تظهر معلومات الطراز والنسخة عندما تكون مُعدّة؛ أما المعلومات غير المؤكدة فيتم توضيحها بدل التخمين.",
    aboutRelease: "حالة إصدار واضحة", aboutReleaseText: "لا يظهر زر التنزيل إلا عند إعداد رابط عام حقيقي. وتُعرض الإصدارات غير المتاحة بوضوح.",
    aboutCommunity: "دعم المجتمع", aboutCommunityText: "تُوجّه طلبات الدعم إلى صفحة طلبات Telegram باستخدام الفئات الست التي حددها المشروع.",
    githubProject: "مستودع GitHub", supportTitle: "دعم المشروع", supportCopy: "اختر فئة الطلب المناسبة، ثم انتقل إلى صفحة طلبات ZineROM على Telegram لإرسال التفاصيل كاملة.",
    supportCopyShort: "هل تحتاج إلى مساعدة بشأن هذا الجهاز أو الإصدار؟", categoriesTitle: "فئات الطلبات", dialogTitle: "طلب الدعم",
    dialogIntro: "اختر فئة قبل المتابعة. أرسل تفاصيل طلبك كاملة عبر Telegram.", supportEyebrow: "دعم المشروع", categoryLabel: "فئة الطلب", categoryPlaceholder: "اختر فئة",
    continueTelegram: "المتابعة إلى Telegram", cancel: "إلغاء", releaseOverline: "اختيار الإصدار", contextDevice: "الجهاز", contextVersion: "One UI",
    modelNotProvided: "رمز الطراز الإقليمي غير مُقدّم", themeLight: "التبديل إلى المظهر الفاتح", themeDark: "التبديل إلى المظهر الداكن", openMenu: "فتح القائمة", closeMenu: "إغلاق القائمة"
  }
};
Object.assign(extraCopy, window.ZINE_EXTRA_COPY || {});

const UI_LOCALES = ["en", "ar", "es", "fr", "de", "tr", "pt", "id", "hi", "ur", "bn", "ru"];
const state = {
  language: localStorage.getItem("zinerom-language") || "en",
  theme: localStorage.getItem("zinerom-theme") || "dark",
  filter: "all",
  search: ""
};
if (!UI_LOCALES.includes(state.language)) state.language = "en";

const app = document.getElementById("main-content");
const languageSelect = document.getElementById("language-select");
const supportDialog = document.getElementById("support-dialog");
const supportForm = document.getElementById("support-form");
const supportCategory = document.getElementById("support-category");
const continueTelegram = document.getElementById("continue-telegram");
const menuToggle = document.getElementById("menu-toggle");

function t(key) {
  return extraCopy[state.language]?.[key] ?? translations[state.language]?.[key] ?? extraCopy.en[key] ?? translations.en?.[key] ?? key;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>\"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
}

function applyLocale() {
  const rtl = ["ar", "ur"].includes(state.language);
  document.documentElement.lang = state.language;
  document.documentElement.dir = rtl ? "rtl" : "ltr";
  languageSelect.value = state.language;
  languageSelect.setAttribute("aria-label", t("languageLabel"));
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-nav]").forEach(link => {
    const key = ({ home: "navHome", devices: "navDevices", about: "navAbout", support: "navSupport" })[link.dataset.nav];
    if (key) link.textContent = t(key);
  });
  document.getElementById("theme-label").textContent = state.theme === "dark" ? t("themeLight") : t("themeDark");
  document.getElementById("theme-toggle").setAttribute("aria-label", document.getElementById("theme-label").textContent);
  menuToggle.setAttribute("aria-label", menuToggle.getAttribute("aria-expanded") === "true" ? t("closeMenu") : t("openMenu"));
}

function setTheme(theme) {
  state.theme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = state.theme;
  localStorage.setItem("zinerom-theme", state.theme);
  applyLocale();
}

function statusForDevice(device) {
  const builds = Object.values(device.builds);
  if (builds.some(build => build.status === "test" && build.downloadUrl)) return { label: t("statusAvailable"), type: "available" };
  if (builds.some(build => build.status === "in-progress")) return { label: t("statusWorking"), type: "working" };
  return { label: t("noBuildStatus"), type: "planned" };
}

function configuredVersions(device) {
  return ONE_UI_VERSIONS.filter(version => Object.prototype.hasOwnProperty.call(device.builds, version));
}

function deviceCard(device) {
  const status = statusForDevice(device);
  const versions = configuredVersions(device);
  const versionSummary = versions.length
    ? versions.map(version => `One UI ${escapeHTML(version)}`).join(" · ")
    : escapeHTML(t("noBuildStatus"));
  return `
    <article class="device-card">
      <a class="device-card-link" href="#/devices/${encodeURIComponent(device.id)}" aria-label="${escapeHTML(t("viewDevice"))}: ${escapeHTML(device.name)}">
        <span class="device-card-image">
          <img src="${escapeHTML(device.image)}" alt="${escapeHTML(t("altPrefix"))} ${escapeHTML(device.name)}" loading="lazy" decoding="async">
          <span class="image-index">${String(devices.indexOf(device) + 1).padStart(2, "0")}</span>
        </span>
        <span class="device-card-content">
          <span class="device-card-topline"><span class="device-family">${escapeHTML(device.family)}</span><span class="device-status status-${status.type}">${escapeHTML(status.label)}</span></span>
          <span class="device-card-name">${escapeHTML(device.name)}</span>
          <span class="device-card-variant">${escapeHTML(device.variant)}</span>
          <span class="device-card-version">${versionSummary}</span>
          <span class="card-cta">${escapeHTML(t("viewDevice"))}<span aria-hidden="true">↗</span></span>
        </span>
      </a>
    </article>`;
}

function attachImageFallbacks(scope = document) {
  scope.querySelectorAll("img").forEach(image => {
    image.addEventListener("error", () => {
      image.hidden = true;
      image.parentElement?.classList.add("image-unavailable");
    }, { once: true });
  });
}

function renderCatalog() {
  const featuredIds = ["a52s-5g", "a15-5g", "tab-a9-plus-5g-x216b"];
  const featured = featuredIds.map(id => devices.find(device => device.id === id)).filter(Boolean);
  app.innerHTML = `
    <section class="shell hero">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>${escapeHTML(t("eyebrow"))}</p>
        <h1>${escapeHTML(t("heroTitle")).replace(/\n/g, "<br>")}</h1>
        <p class="hero-lead">${escapeHTML(t("heroText"))}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#/devices">${escapeHTML(t("navDevices"))}<span aria-hidden="true">↓</span></a>
          <a class="text-link" href="#/about">${escapeHTML(t("navAbout"))}<span aria-hidden="true">↗</span></a>
        </div>
        <p class="hero-note">${escapeHTML(t("roadmapNotice"))}</p>
      </div>
      <div class="hero-showcase" aria-label="Featured supported Galaxy devices">
        <div class="showcase-orbit" aria-hidden="true"></div>
        ${featured.map((device, index) => `
          <a class="showcase-device showcase-device-${index + 1}" href="#/devices/${encodeURIComponent(device.id)}" aria-label="${escapeHTML(t("viewDevice"))}: ${escapeHTML(device.name)}">
            <span class="showcase-image"><img src="${escapeHTML(device.image)}" alt="" loading="eager" decoding="async"></span>
            <span class="showcase-label"><strong>${escapeHTML(device.name)}</strong><small>${escapeHTML(device.variant)}</small></span>
          </a>`).join("")}
        <span class="showcase-caption">ZINEROM / DEVICE CATALOG</span>
      </div>
    </section>

    <section class="shell catalog-section" id="devices" aria-labelledby="catalog-title">
      <div class="section-rule"><span>${escapeHTML(t("roadmapOverline"))}</span><span class="rule-line"></span><span>${String(devices.length).padStart(2, "0")}</span></div>
      <div class="catalog-heading">
        <div><p class="overline">${escapeHTML(t("catalogLabel"))}</p><h2 id="catalog-title">${escapeHTML(t("devicesTitle"))}</h2></div>
        <p>${escapeHTML(t("catalogIntro"))}</p>
      </div>
      <div class="catalog-toolbar">
        <label class="search-box"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6"/><path d="m16 16 4.5 4.5"/></svg><span class="sr-only">${escapeHTML(t("searchLabel"))}</span><input id="device-search" type="search" placeholder="${escapeHTML(t("searchPlaceholder"))}" value="${escapeHTML(state.search)}"></label>
        <div class="filter-tabs" role="group" aria-label="${escapeHTML(t("filterLabel"))}">
          ${[["all", "filterAll"], ["phone", "filterPhones"], ["tablet", "filterTablets"]].map(([value, key]) => `<button type="button" class="filter-button${state.filter === value ? " is-active" : ""}" data-filter="${value}" aria-pressed="${state.filter === value}">${escapeHTML(t(key))}</button>`).join("")}
        </div>
      </div>
      <p class="result-count" id="result-count"></p>
      <div class="device-grid" id="device-grid" aria-live="polite"></div>
      <div class="catalog-note"><span class="note-mark" aria-hidden="true">i</span><p>${escapeHTML(t("noticeText"))}</p></div>
    </section>

    <section class="about-strip">
      <div class="shell about-strip-inner"><div><p class="eyebrow">ZINEROM PROJECT</p><h2>${escapeHTML(t("aboutStripTitle"))}</h2><p>${escapeHTML(t("aboutCopy"))}</p></div><a class="button button-outline" href="#/about">${escapeHTML(t("navAbout"))}<span aria-hidden="true">↗</span></a></div>
    </section>`;
  attachImageFallbacks(app);
  populateCatalog();
  bindCatalogControls();
}

function populateCatalog() {
  const grid = document.getElementById("device-grid");
  const query = state.search.trim().toLocaleLowerCase();
  const visible = devices.filter(device => {
    const matchesFilter = state.filter === "all" || device.type === state.filter;
    const searchable = `${device.name} ${device.family} ${device.variant} ${device.model}`.toLocaleLowerCase();
    return matchesFilter && (!query || searchable.includes(query));
  });
  grid.innerHTML = visible.map(deviceCard).join("");
  document.getElementById("result-count").textContent = `${visible.length} / ${devices.length} ${t("deviceCount")}`;
  if (!visible.length) grid.innerHTML = `<p class="empty-state">${escapeHTML(t("noResults"))}</p>`;
  attachImageFallbacks(grid);
}

function bindCatalogControls() {
  const search = document.getElementById("device-search");
  search.addEventListener("input", () => {
    state.search = search.value;
    populateCatalog();
    const nextSearch = document.getElementById("device-search");
    nextSearch.focus();
    nextSearch.setSelectionRange(nextSearch.value.length, nextSearch.value.length);
  });
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(item => {
        const active = item.dataset.filter === state.filter;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      populateCatalog();
    });
  });
}

function versionFromHash(hash) {
  const questionIndex = hash.indexOf("?");
  if (questionIndex < 0) return null;
  return new URLSearchParams(hash.slice(questionIndex + 1)).get("ui");
}

function detailDefaultVersion(device) {
  const available = configuredVersions(device);
  return available[0] || null;
}

function renderRelease(device, version) {
  const host = document.getElementById("release-content");
  if (!version) {
    host.innerHTML = `<div class="release-empty"><span class="release-state">${escapeHTML(t("versionTitle"))}</span><p>${escapeHTML(t("chooseVersion"))}</p></div>`;
    return;
  }
  const release = device.builds[version];
  const versionLabel = `One UI ${escapeHTML(version)}`;
  if (!release) {
    host.innerHTML = `
      <div class="release-empty">
        <div class="release-empty-heading"><span class="release-state">${versionLabel}</span><span class="state-pill status-planned">${escapeHTML(t("noBuildStatus"))}</span></div>
        <p>${escapeHTML(t("noVersionDetails"))}</p>
        <p class="download-missing">${escapeHTML(t("missingDownload"))}</p>
        <button class="button button-primary" type="button" data-request-support>${escapeHTML(t("requestSupport"))}<span aria-hidden="true">↗</span></button>
      </div>`;
    return;
  }
  const note = release.noteKey ? t(release.noteKey) : t("noVersionDetails");
  const warning = release.warningKey ? t(release.warningKey) : t("downloadWarning");
  if (release.status === "test" && release.downloadUrl) {
    host.innerHTML = `
      <div class="release-configured">
        <div class="release-empty-heading"><span class="release-state">${versionLabel}</span><span class="state-pill status-available">${escapeHTML(t("statusAvailable"))}</span></div>
        <p class="release-copy">${escapeHTML(note)}</p>
        ${release.androidVersion ? `<div class="release-meta"><span>${escapeHTML(t("targetAndroid"))}</span><strong>Android ${escapeHTML(release.androidVersion)}</strong></div>` : ""}
        <div class="experimental-warning"><span aria-hidden="true">!</span><p>${escapeHTML(warning)}</p></div>
        <a class="button button-primary download-button" href="${escapeHTML(release.downloadUrl)}" target="_blank" rel="noopener noreferrer"><span>${escapeHTML(t(release.downloadKey || "download"))}</span><span aria-hidden="true">↓</span></a>
        ${release.sha256 ? `<div class="checksum-block"><div><span class="checksum-title">${escapeHTML(t("checksumLabel"))}</span><code id="checksum-value">${escapeHTML(release.sha256)}</code></div><button class="copy-button" id="copy-checksum" type="button">${escapeHTML(t("copyChecksum"))}</button></div>` : ""}
        <div class="release-support"><p>${escapeHTML(t("supportCopyShort"))}</p><button class="button button-quiet" type="button" data-request-support>${escapeHTML(t("requestSupport"))}</button></div>
      </div>`;
    const copyButton = document.getElementById("copy-checksum");
    if (copyButton) copyButton.addEventListener("click", copyChecksum);
    return;
  }
  const progress = release.status === "in-progress";
  host.innerHTML = `
    <div class="release-empty">
      <div class="release-empty-heading"><span class="release-state">${versionLabel}</span><span class="state-pill ${progress ? "status-working" : "status-planned"}">${escapeHTML(progress ? t("statusWorking") : t("noBuildStatus"))}</span></div>
      <p>${escapeHTML(note || t("releaseProgress"))}</p>
      <p class="download-missing">${escapeHTML(t("missingDownload"))}</p>
      <button class="button button-primary" type="button" data-request-support>${escapeHTML(t("requestSupport"))}<span aria-hidden="true">↗</span></button>
    </div>`;
}

function bindSupportButtons(device, version) {
  document.querySelectorAll("[data-request-support]").forEach(button => {
    button.addEventListener("click", () => openSupportDialog(`${device.name} · One UI ${version || ""}`.trim()));
  });
}

function renderDevicePage(device, hash) {
  const requestedVersion = versionFromHash(hash);
  const selectedVersion = ONE_UI_VERSIONS.includes(requestedVersion) ? requestedVersion : detailDefaultVersion(device);
  app.innerHTML = `
    <section class="shell detail-page">
      <a class="back-link" href="#/devices"><span aria-hidden="true">←</span>${escapeHTML(t("backCatalog"))}</a>
      <div class="detail-hero">
        <div class="detail-image-panel"><span class="detail-image-label">${escapeHTML(device.family)}</span><img src="${escapeHTML(device.image)}" alt="${escapeHTML(t("altPrefix"))} ${escapeHTML(device.name)}" fetchpriority="high"></div>
        <div class="detail-copy">
          <p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>${escapeHTML(t("selectedDevice"))}</p>
          <div class="detail-title-row"><h1>${escapeHTML(device.name)}</h1><span class="state-pill status-${statusForDevice(device).type}">${escapeHTML(statusForDevice(device).label)}</span></div>
          <p class="detail-lead">${escapeHTML(t("deviceDetailIntro"))}</p>
          <div class="detail-specs">
            <div><span>${escapeHTML(t("variantLabel"))}</span><strong>${escapeHTML(device.variant)}</strong></div>
            <div><span>${escapeHTML(t("modelLabel"))}</span><code>${escapeHTML(device.model)}</code></div>
          </div>
          ${device.id === "a11-4g" ? `<p class="detail-note">${escapeHTML(t("noteA11"))}</p>` : ""}
          <button class="button button-outline" type="button" data-request-support>${escapeHTML(t("requestSupport"))}<span aria-hidden="true">↗</span></button>
        </div>
      </div>

      <section class="version-section" aria-labelledby="version-title">
        <div class="version-heading"><div><p class="overline">${escapeHTML(t("releaseOverline"))}</p><h2 id="version-title">${escapeHTML(t("versionTitle"))}</h2></div><p>${escapeHTML(t("versionIntro"))}</p></div>
        <div class="version-selector" role="group" aria-label="${escapeHTML(t("versionTitle"))}">
          ${ONE_UI_VERSIONS.map(version => `<button type="button" class="version-button${selectedVersion === version ? " is-active" : ""}" data-version="${version}" aria-pressed="${selectedVersion === version}">One UI <strong>${version}</strong></button>`).join("")}
        </div>
        <div class="release-panel" id="release-content"></div>
      </section>
      <section class="detail-support-strip"><div><p class="overline">${escapeHTML(t("supportEyebrow"))}</p><h2>${escapeHTML(t("supportTitle"))}</h2><p>${escapeHTML(t("supportCopy"))}</p></div><button class="button button-primary" type="button" data-request-support>${escapeHTML(t("requestSupport"))}<span aria-hidden="true">↗</span></button></section>
    </section>`;
  attachImageFallbacks(app);
  renderRelease(device, selectedVersion);
  bindSupportButtons(device, selectedVersion);
  document.querySelectorAll("[data-version]").forEach(button => {
    button.addEventListener("click", () => {
      const nextHash = `#/devices/${encodeURIComponent(device.id)}?ui=${encodeURIComponent(button.dataset.version)}`;
      if (window.location.hash === nextHash) renderRoute(false);
      else window.location.hash = nextHash;
    });
  });
}

function renderAbout() {
  app.innerHTML = `
    <section class="shell editorial-page about-page">
      <p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>ZINEROM PROJECT</p>
      <h1>${escapeHTML(t("aboutTitle"))}</h1>
      <p class="editorial-lead">${escapeHTML(t("aboutCopy"))}</p>
      <div class="principles-grid">
        <article><span class="principle-number">01</span><h2>${escapeHTML(t("aboutPrinciple"))}</h2><p>${escapeHTML(t("aboutPrincipleText"))}</p></article>
        <article><span class="principle-number">02</span><h2>${escapeHTML(t("aboutRelease"))}</h2><p>${escapeHTML(t("aboutReleaseText"))}</p></article>
        <article><span class="principle-number">03</span><h2>${escapeHTML(t("aboutCommunity"))}</h2><p>${escapeHTML(t("aboutCommunityText"))}</p></article>
      </div>
      <div class="about-actions"><a class="button button-primary" href="#/devices">${escapeHTML(t("navDevices"))}<span aria-hidden="true">↗</span></a><a class="text-link" href="https://github.com/ZineFather/zinerom-a115f-landing" target="_blank" rel="noopener noreferrer">${escapeHTML(t("githubProject"))}<span aria-hidden="true">↗</span></a></div>
      <p class="disclaimer">${escapeHTML(t("footerText"))}</p>
    </section>`;
}

function renderSupport() {
  const categories = ["S21", "S21 FE", "S23", "S23 FE", "A73", "Stock ROM Modifications"];
  app.innerHTML = `
    <section class="shell editorial-page support-page">
      <p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>${escapeHTML(t("supportEyebrow"))}</p>
      <h1>${escapeHTML(t("supportTitle"))}</h1>
      <p class="editorial-lead">${escapeHTML(t("supportCopy"))}</p>
      <h2 class="categories-heading">${escapeHTML(t("categoriesTitle"))}</h2>
      <div class="support-category-grid" aria-label="${escapeHTML(t("categoriesTitle"))}">
        ${categories.map((category, index) => `<div class="support-category"><span class="category-index">0${index + 1}</span><strong>${escapeHTML(category)}</strong></div>`).join("")}
      </div>
      <div class="support-action-panel"><div><h2>${escapeHTML(t("dialogTitle"))}</h2><p>${escapeHTML(t("dialogIntro"))}</p></div><button class="button button-primary" type="button" id="open-support-dialog">${escapeHTML(t("requestSupport"))}<span aria-hidden="true">↗</span></button></div>
    </section>`;
  document.getElementById("open-support-dialog").addEventListener("click", () => openSupportDialog(""));
}

function updateNavigation(routeName) {
  document.querySelectorAll("[data-nav]").forEach(link => {
    const active = link.dataset.nav === routeName || (routeName === "device" && link.dataset.nav === "devices");
    link.classList.toggle("is-current", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function renderRoute(scroll = true) {
  const hash = window.location.hash.slice(1) || "/";
  const route = hash.split("?")[0];
  let routeName = "home";
  if (route.startsWith("/devices/")) {
    const id = decodeURIComponent(route.slice("/devices/".length));
    const device = devices.find(item => item.id === id);
    if (device) {
      routeName = "device";
      renderDevicePage(device, hash);
      document.title = `${device.name} — ZineROM Project`;
    } else {
      renderCatalog();
      document.title = "ZineROM Project — Galaxy Device Catalog";
      window.location.hash = "#/devices";
    }
  } else if (route === "/about") {
    routeName = "about";
    renderAbout();
    document.title = `${t("navAbout")} — ZineROM Project`;
  } else if (route === "/support") {
    routeName = "support";
    renderSupport();
    document.title = `${t("navSupport")} — ZineROM Project`;
  } else {
    routeName = route === "/devices" ? "devices" : "home";
    renderCatalog();
    document.title = "ZineROM Project — Galaxy Device Catalog";
  }
  updateNavigation(routeName);
  applyLocale();
  if (scroll) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const catalog = routeName === "devices" ? document.getElementById("devices") : null;
    const target = catalog ? catalog.getBoundingClientRect().top + window.scrollY : 0;
    window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
    document.getElementById("main-content").focus({ preventScroll: true });
  }
}

function openSupportDialog(context) {
  supportForm.reset();
  continueTelegram.disabled = true;
  document.getElementById("dialog-context").textContent = context ? `${t("contextDevice")}: ${context}` : "";
  if (typeof supportDialog.showModal === "function") supportDialog.showModal();
  else supportDialog.setAttribute("open", "open");
  supportCategory.focus();
}

async function copyChecksum() {
  const value = document.getElementById("checksum-value")?.textContent;
  if (!value) return;
  const button = document.getElementById("copy-checksum");
  try {
    await navigator.clipboard.writeText(value);
    button.textContent = t("copied");
  } catch {
    const selection = document.createRange();
    selection.selectNodeContents(document.getElementById("checksum-value"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(selection);
    button.textContent = value;
  }
  window.setTimeout(() => { if (button.isConnected) button.textContent = t("copyChecksum"); }, 1800);
}

function toggleMenu(force) {
  const open = typeof force === "boolean" ? force : menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  document.getElementById("primary-nav").classList.toggle("is-open", open);
  applyLocale();
}

languageSelect.addEventListener("change", () => {
  state.language = UI_LOCALES.includes(languageSelect.value) ? languageSelect.value : "en";
  localStorage.setItem("zinerom-language", state.language);
  renderRoute(false);
});

document.getElementById("theme-toggle").addEventListener("click", () => setTheme(state.theme === "dark" ? "light" : "dark"));
window.addEventListener("hashchange", () => {
  toggleMenu(false);
  renderRoute(true);
});
menuToggle.addEventListener("click", () => toggleMenu());
document.getElementById("back-to-top").addEventListener("click", event => {
  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});
document.getElementById("dialog-close").addEventListener("click", () => supportDialog.close());
document.getElementById("dialog-cancel").addEventListener("click", () => supportDialog.close());
supportCategory.addEventListener("change", () => { continueTelegram.disabled = !supportCategory.value; });
supportForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!supportCategory.value) {
    supportCategory.reportValidity();
    return;
  }
  window.location.assign(TELEGRAM_URL);
  if (typeof supportDialog.close === "function") supportDialog.close();
});
document.getElementById("current-year").textContent = new Date().getFullYear();

setTheme(state.theme);
renderRoute(true);
