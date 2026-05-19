(function () {
  const COOKIE_NAME = 'hits_nav_announce_dismissed';
  const DISMISS_DAYS = 1;
  const VISIBLE_CLASS = 'nav-announce-visible';
  const DISMISSED_CLASS = 'nav-announce-dismissed';

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
      name +
      '=' +
      encodeURIComponent(value) +
      '; expires=' +
      expires +
      '; path=/; SameSite=Lax';
  }

  function getCookie(name) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = document.cookie.match(
      new RegExp('(?:^|; )' + escaped + '=([^;]*)')
    );
    return match ? decodeURIComponent(match[1]) : null;
  }

  function isDismissed() {
    return getCookie(COOKIE_NAME) === '1';
  }

  function setVisible(show) {
    document.documentElement.classList.toggle(VISIBLE_CLASS, show);
    document.documentElement.classList.toggle(DISMISSED_CLASS, !show);
  }

  function markDismissed() {
    setCookie(COOKIE_NAME, '1', DISMISS_DAYS);
    setVisible(false);
  }

  function injectStyles() {
    const style = document.createElement('style');
    // Base .nav-announce { height: 0 } lives in Webflow — only override when allowed to show
    style.textContent =
      'html.' +
      VISIBLE_CLASS +
      ' .nav-announce{height:auto!important;overflow:visible!important;opacity:1;pointer-events:auto}';
    (document.head || document.documentElement).appendChild(style);
  }

  injectStyles();
  setVisible(!isDismissed());

  window.HitsNavAnnounce = {
    isDismissed,
    markDismissed,
    show: () => setVisible(true),
    hide: () => setVisible(false),
  };
})();
