// "We Are" links point at /about. Clicked while already on the About page
// (e.g. at /about#services) the browser would only smooth-scroll back up and
// the hero intro wouldn't replay, unlike arriving from another page. Instead
// jump to the top, drop the hash and ask the hero to replay its intro.
export const ABOUT_HERO_REPLAY = "about-hero:replay";

export function handleAboutLinkClick(e, pathname) {
  if (pathname !== "/about") return;
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "instant" });
  if (window.location.hash) window.history.replaceState(null, "", "/about");
  window.dispatchEvent(new Event(ABOUT_HERO_REPLAY));
}
