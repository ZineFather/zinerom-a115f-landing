"use strict";

window.ZINE_COMMUNITY_PAGE = (() => {
  const DESTINATIONS = Object.freeze({
    community: "https://t.me/ZineROMProject",
    announcements: "https://t.me/zineromupdates",
    tutorial: "https://t.me/ZineROMProject/139",
    bugs: "https://t.me/ZineROMProject/9"
  });
  const ICONS = {
    community: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-5.1A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8 10h8M8 13.5h5"/></svg>',
    announcements: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/><path d="M20 4l1.5-1.5M4 4 2.5 2.5"/></svg>',
    tutorial: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"/><path d="M4 4.5v17M8 6h8M8 9.5h6"/><path d="m11 13 4 2.5-4 2.5z"/></svg>',
    bug: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 8 7 5M15 8l2-3M5 10H2M22 10h-3M5 15H2m20 0h-3M7 19l-2 2m14-2 2 2"/><path d="M6 12a6 6 0 0 1 12 0v4a6 6 0 0 1-12 0v-4ZM9 12h6M9 16h6"/></svg>',
    features: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-9 12h7l-1 8 10-13h-7z"/><path d="M19 3v4m-2-2h4"/></svg>',
    ideas: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6m-5 3h4m-2-19a7 7 0 0 0-4 12.7c.7.5 1 1.2 1 2.3h6c0-1.1.3-1.8 1-2.3A7 7 0 0 0 12 2Z"/><path d="M12 6v5m-2-3 2 3 2-3"/></svg>'
  };
  const RESOURCES = [
    { title: "resourceCommunityTitle", description: "resourceCommunityDescription", url: DESTINATIONS.community, icon: "community" },
    { title: "resourceAnnouncementsTitle", description: "resourceAnnouncementsDescription", url: DESTINATIONS.announcements, icon: "announcements" },
    { title: "resourceTutorialTitle", description: "resourceTutorialDescription", url: DESTINATIONS.tutorial, icon: "tutorial" },
    { title: "resourceBugTitle", description: "resourceBugDescription", url: DESTINATIONS.bugs, icon: "bug" }
  ];
  const CONTRIBUTIONS = [
    { title: "resourceBugTitle", description: "resourceBugDescription", url: DESTINATIONS.bugs, icon: "bug" },
    { title: "feedbackFeatureTitle", description: "feedbackFeatureDescription", url: DESTINATIONS.community, icon: "features" },
    { title: "feedbackIdeasTitle", description: "feedbackIdeasDescription", url: DESTINATIONS.community, icon: "ideas" }
  ];

  function card(item, t, escapeHTML, className) {
    const title = t(item.title);
    return `<a class="community-link-card ${className}" href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(title)}: ${escapeHTML(t(item.description))}">
      <span class="community-link-icon" aria-hidden="true">${ICONS[item.icon]}</span>
      <strong>${escapeHTML(title)}</strong>
      <span class="community-link-description">${escapeHTML(t(item.description))}</span>
      <span class="community-link-action">${escapeHTML(t("resourceOpenTelegram"))}<span aria-hidden="true">↗</span></span>
    </a>`;
  }

  function render(container, t, escapeHTML) {
    container.innerHTML = `
      <section class="shell editorial-page community-page" aria-labelledby="community-title">
        <p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>${escapeHTML(t("communityEyebrow"))}</p>
        <h1 id="community-title">${escapeHTML(t("communityTitle"))}</h1>
        <p class="editorial-lead">${escapeHTML(t("communityIntro"))}</p>
        <section class="community-block" id="community-resources" aria-labelledby="community-resources-title">
          <div class="community-block-heading"><p class="overline" id="community-resources-title">${escapeHTML(t("communityResourcesTitle"))}</p></div>
          <div class="community-resource-grid">${RESOURCES.map(item => card(item, t, escapeHTML, "resource-card")).join("")}</div>
        </section>
        <section class="community-block feedback-block" id="feedback-contributions" aria-labelledby="feedback-title">
          <div class="community-block-heading"><p class="overline">${escapeHTML(t("feedbackTitle"))}</p><h2 id="feedback-title">${escapeHTML(t("feedbackTitle"))}</h2><p>${escapeHTML(t("feedbackIntro"))}</p></div>
          <div class="contribution-grid">${CONTRIBUTIONS.map(item => card(item, t, escapeHTML, "contribution-card")).join("")}</div>
        </section>
        <aside class="community-support-strip"><div><p class="overline">${escapeHTML(t("supportEyebrow"))}</p><h2>${escapeHTML(t("supportCopyShort"))}</h2></div><a class="button button-primary" href="#/support">${escapeHTML(t("requestSupport"))}<span aria-hidden="true">↗</span></a></aside>
      </section>`;
  }

  return { render, destinations: DESTINATIONS };
})();
