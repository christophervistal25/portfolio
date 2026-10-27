/* Logs one anonymous page view to a Google Sheet (via Apps Script).
   No IPs, names or cookies. Opt yourself out by visiting any page with ?notrack=1
   (?notrack=0 turns it back on). */
(function () {
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbzbEmsXfuRrC_gigF5omUZag2wUoD70ar2OADWJuD64dfQ5jAdseFaF5GyE8DjT0KiiQQ/exec';
  try {
    var params = new URLSearchParams(location.search);
    if (params.get('notrack') === '1') localStorage.setItem('notrack', '1');
    if (params.get('notrack') === '0') localStorage.removeItem('notrack');
    if (localStorage.getItem('notrack') === '1') return;
    if (!/netlify\.app$/.test(location.hostname)) return;
    var ua = navigator.userAgent || '';
    if (navigator.webdriver || /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|embedly|curl|wget/i.test(ua)) return;

    function id(store, key) {
      var v = store.getItem(key);
      if (!v) { v = Math.random().toString(36).slice(2, 10) + Date.now().toString(36); store.setItem(key, v); }
      return v;
    }
    var browser = /Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /SamsungBrowser/.test(ua) ? 'Samsung Internet'
      : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Other';
    var os = /Android/.test(ua) ? 'Android' : /iPhone|iPad|iPod/.test(ua) ? 'iOS' : /Windows/.test(ua) ? 'Windows'
      : /Mac OS X/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'Other';
    var device = /iPad|Tablet/.test(ua) ? 'tablet' : /Mobi|Android|iPhone/.test(ua) ? 'mobile' : 'desktop';
    var ref = document.referrer && document.referrer.indexOf(location.origin) !== 0 ? document.referrer : '';

    var data = JSON.stringify({
      page: location.pathname + location.hash,
      title: document.title,
      ref: ref,
      device: device,
      browser: browser,
      os: os,
      screen: screen.width + 'x' + screen.height,
      lang: navigator.language || '',
      tz: (Intl.DateTimeFormat().resolvedOptions().timeZone) || '',
      vid: id(localStorage, 'vid'),
      sid: id(sessionStorage, 'sid')
    });
    var blob = new Blob([data], { type: 'text/plain' });
    if (!(navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, blob))) {
      fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', keepalive: true, body: data, headers: { 'Content-Type': 'text/plain' } });
    }
  } catch (e) { /* never break the page */ }
})();
