// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('is-open');
    });
  }
})();

// Page view counter (CounterAPI.dev)
(function () {
  try {
    var path = window.location.pathname;
    var slug = path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '--');
    fetch('https://api.counterapi.dev/v1/techbrandon/' + slug + '/up').catch(function () {});
  } catch (e) {
    // Silent fail - counter outage should never affect the site
  }
})();
