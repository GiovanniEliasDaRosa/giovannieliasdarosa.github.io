export function setRuntimeMeta() {
  const origin = window.location.origin;
  const pageUrl = origin + window.location.pathname + window.location.search;
  const imageUrl = `${origin}/assets/images/cover.png`;
  const hostName = window.location.hostname;

  function set(selector, attribute, value) {
    return document.querySelector(selector)?.setAttribute(attribute, value);
  }

  set("link[rel='canonical']", "href", pageUrl);
  set("meta[property='og:url']", "content", pageUrl);
  set("meta[property='og:image']", "content", imageUrl);
  set("meta[property='twitter:domain']", "content", hostName);
  set("meta[name='twitter:card']", "content", imageUrl);
  set("meta[property='twitter:url']", "content", pageUrl);
  set("meta[name='twitter:image']", "content", imageUrl);
}
