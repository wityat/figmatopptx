// Product analytics (PostHog), cookieless. Loaded on every page.
//
// What it answers: do visitors reach the Pro page, does the Paddle checkout
// actually load, and where do they drop out before paying.
//
// Privacy contract (mirrored in privacy.html §3 — keep the two in sync):
//   - no cookies, no localStorage identity: the anonymous id lives in
//     sessionStorage and dies with the tab;
//   - no autocapture, no session replay, no surveys;
//   - only the named events below, never emails or payment details.
//
// Exclude your own traffic: open any page once with ?notrack=1
// (undo with ?notrack=0). The flag is per browser.
(function () {
  // Project API key (phc_...). Public by design, same as the Paddle token.
  // Empty key = analytics off, track() is a no-op.
  var POSTHOG_KEY = '';
  // Must match the region the PostHog project was created in.
  var POSTHOG_HOST = 'https://eu.i.posthog.com';

  var queue = [];
  var ready = false;
  window.track = function (name, props) {
    if (ready) window.posthog.capture(name, props || {});
    else queue.push([name, props || {}]);
  };

  var params = new URLSearchParams(location.search);
  try {
    if (params.get('notrack') === '1') localStorage.setItem('notrack', '1');
    if (params.get('notrack') === '0') localStorage.removeItem('notrack');
    if (localStorage.getItem('notrack') === '1') POSTHOG_KEY = '';
  } catch (e) {}

  if (!POSTHOG_KEY || navigator.webdriver) {
    window.track = function () {};
    return;
  }

  var s = document.createElement('script');
  s.async = true;
  s.src = POSTHOG_HOST.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js';
  s.onload = function () {
    if (!window.posthog || !window.posthog.init) return;
    window.posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      persistence: 'sessionStorage',
      person_profiles: 'identified_only',
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: true,
      disable_session_recording: true,
      disable_surveys: true,
      advanced_disable_flags: true,
      loaded: function () {
        ready = true;
        for (var i = 0; i < queue.length; i++) window.posthog.capture(queue[i][0], queue[i][1]);
        queue = [];
      }
    });
  };
  document.head.appendChild(s);

  // `src` is how the plugin (or a post) can mark its links: /pro.html?src=plugin
  var source = params.get('src') || (document.referrer ? new URL(document.referrer).hostname : 'direct');

  if (location.pathname === '/pro.html' || location.pathname === '/pro') {
    window.track('pricing_viewed', { source: source });
  }

  // Every "Install on Figma Community" link, wherever it sits.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="figma.com/community/plugin/"]');
    if (a) window.track('install_clicked', { source: source });
  });
})();
