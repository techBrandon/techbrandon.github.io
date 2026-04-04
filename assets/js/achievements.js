/**
 * Passkey Path Achievement System
 * Tracks page reads, calculates progress, shows achievements.
 * All data stored in localStorage - no backend required.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'passkeyPath';

  // ---------------------------------------------------------------
  // Track and page definitions
  // ---------------------------------------------------------------

  var SHARED_PAGES = [
    '/passkey-path/shared/what-is-a-passkey/',
    '/passkey-path/shared/how-entra-passkeys-work/',
    '/passkey-path/shared/device-bound-vs-sync/',
    '/passkey-path/shared/glossary/'
  ];

  var TRACKS = {
    'it-admin': {
      name: 'IT Admin',
      color: '#58a6ff',
      pages: [
        '/passkey-path/it-admin/',
        '/passkey-path/it-admin/entra-policy-setup/',
        '/passkey-path/it-admin/rollout-planning/',
        '/passkey-path/it-admin/attestation-aaguids/',
        '/passkey-path/it-admin/conditional-access/',
        '/passkey-path/it-admin/device-compat/',
        '/passkey-path/it-admin/legacy-coexistence/'
      ]
    },
    'end-user': {
      name: 'End User',
      color: '#3fb950',
      pages: [
        '/passkey-path/end-user/',
        '/passkey-path/end-user/what-changes/',
        '/passkey-path/end-user/setup-authenticator/',
        '/passkey-path/end-user/setup-security-key/',
        '/passkey-path/end-user/setup-windows-hello/',
        '/passkey-path/end-user/signing-in/',
        '/passkey-path/end-user/lost-device/'
      ]
    },
    'security': {
      name: 'Security Lead',
      color: '#d29922',
      pages: [
        '/passkey-path/security/',
        '/passkey-path/security/risk-assessment/',
        '/passkey-path/security/downgrade-attacks/',
        '/passkey-path/security/phishing-resistant/',
        '/passkey-path/security/compliance/',
        '/passkey-path/security/credential-lifecycle/'
      ]
    },
    'helpdesk': {
      name: 'Helpdesk',
      color: '#f85149',
      pages: [
        '/passkey-path/helpdesk/',
        '/passkey-path/helpdesk/device-loss/',
        '/passkey-path/helpdesk/tap-issuance/',
        '/passkey-path/helpdesk/identity-verify/',
        '/passkey-path/helpdesk/troubleshooting/',
        '/passkey-path/helpdesk/escalation/'
      ]
    }
  };

  var ACHIEVEMENTS = [
    { id: 'first-steps', name: 'First Steps', desc: "You're on your way", icon: '👣' },
    { id: 'foundation-builder', name: 'Foundation Builder', desc: 'All basics covered', icon: '🧱' },
    { id: 'admin-ready', name: 'Admin Ready', desc: 'IT Admin Track complete', icon: '⚙️', track: 'it-admin' },
    { id: 'user-champion', name: 'User Champion', desc: 'End User Track complete', icon: '🏅', track: 'end-user' },
    { id: 'security-minded', name: 'Security Minded', desc: 'Security Lead Track complete', icon: '🛡️', track: 'security' },
    { id: 'support-pro', name: 'Support Pro', desc: 'Helpdesk Track complete', icon: '🎧', track: 'helpdesk' },
    { id: 'explorer', name: 'Explorer', desc: "You've visited every track", icon: '🧭' },
    { id: 'passkey-expert', name: 'Passkey Expert', desc: "You've read everything", icon: '🏆' }
  ];

  // ---------------------------------------------------------------
  // Data persistence
  // ---------------------------------------------------------------

  function loadData() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { pages: {}, achievements: [] };
    } catch (e) {
      return { pages: {}, achievements: [] };
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // Storage full or unavailable - silent fail
    }
  }

  // ---------------------------------------------------------------
  // Page tracking
  // ---------------------------------------------------------------

  function isPasskeyPage(path) {
    return path.indexOf('/passkey-path/') === 0;
  }

  function recordVisit(data, path) {
    if (!data.pages[path]) {
      data.pages[path] = { firstVisit: Date.now(), read: false };
      saveData(data);
    }
  }

  function markRead(data, path) {
    if (data.pages[path] && data.pages[path].read) return false;
    if (!data.pages[path]) {
      data.pages[path] = { firstVisit: Date.now() };
    }
    data.pages[path].read = true;
    data.pages[path].readAt = Date.now();
    saveData(data);
    return true;
  }

  function isRead(data, path) {
    return data.pages[path] && data.pages[path].read;
  }

  // ---------------------------------------------------------------
  // Progress calculation
  // ---------------------------------------------------------------

  function getTrackProgress(data, trackId) {
    var track = TRACKS[trackId];
    if (!track) return { read: 0, total: 0, unread: [] };
    // Track progress only counts track-specific pages, not shared foundations
    var readCount = 0;
    var unread = [];
    for (var i = 0; i < track.pages.length; i++) {
      if (isRead(data, track.pages[i])) {
        readCount++;
      } else {
        unread.push(track.pages[i]);
      }
    }
    return { read: readCount, total: track.pages.length, unread: unread };
  }

  function getSharedProgress(data) {
    var readCount = 0;
    for (var i = 0; i < SHARED_PAGES.length; i++) {
      if (isRead(data, SHARED_PAGES[i])) readCount++;
    }
    return { read: readCount, total: SHARED_PAGES.length };
  }

  function getTotalProgress(data) {
    var allPages = SHARED_PAGES.slice();
    var keys = Object.keys(TRACKS);
    for (var k = 0; k < keys.length; k++) {
      var pages = TRACKS[keys[k]].pages;
      for (var p = 0; p < pages.length; p++) {
        if (allPages.indexOf(pages[p]) === -1) allPages.push(pages[p]);
      }
    }
    var readCount = 0;
    for (var i = 0; i < allPages.length; i++) {
      if (isRead(data, allPages[i])) readCount++;
    }
    return { read: readCount, total: allPages.length };
  }

  function isTrackComplete(data, trackId) {
    var prog = getTrackProgress(data, trackId);
    var shared = getSharedProgress(data);
    return prog.read === prog.total && shared.read === shared.total;
  }

  function hasPageInEachTrack(data) {
    var keys = Object.keys(TRACKS);
    for (var k = 0; k < keys.length; k++) {
      var pages = TRACKS[keys[k]].pages;
      var found = false;
      for (var p = 0; p < pages.length; p++) {
        if (isRead(data, pages[p])) { found = true; break; }
      }
      if (!found) return false;
    }
    return true;
  }

  // ---------------------------------------------------------------
  // Achievement checks
  // ---------------------------------------------------------------

  function checkAchievements(data) {
    var newAchievements = [];

    function grant(id) {
      if (data.achievements.indexOf(id) === -1) {
        data.achievements.push(id);
        newAchievements.push(id);
      }
    }

    // First Steps - any 1 page read
    var total = getTotalProgress(data);
    if (total.read >= 1) grant('first-steps');

    // Foundation Builder - all shared pages
    var shared = getSharedProgress(data);
    if (shared.read === shared.total) grant('foundation-builder');

    // Track completions
    if (isTrackComplete(data, 'it-admin')) grant('admin-ready');
    if (isTrackComplete(data, 'end-user')) grant('user-champion');
    if (isTrackComplete(data, 'security')) grant('security-minded');
    if (isTrackComplete(data, 'helpdesk')) grant('support-pro');

    // Explorer - at least 1 page from each track
    if (hasPageInEachTrack(data)) grant('explorer');

    // Passkey Expert - all pages
    if (total.read === total.total) grant('passkey-expert');

    if (newAchievements.length > 0) saveData(data);
    return newAchievements;
  }

  // ---------------------------------------------------------------
  // UI: Mark cards as read
  // ---------------------------------------------------------------

  function updateCards(data) {
    var cards = document.querySelectorAll('[data-href]');
    for (var i = 0; i < cards.length; i++) {
      var href = cards[i].getAttribute('data-href');
      // Normalize: ensure trailing slash
      if (href && href.charAt(href.length - 1) !== '/') href += '/';
      if (isRead(data, href)) {
        cards[i].classList.add('is-read');
        // Update CTA text
        var cta = cards[i].querySelector('.card-cta');
        if (cta && cta.textContent.indexOf('Read') !== -1) {
          cta.textContent = cta.textContent.replace('Read', 'Revisit');
        }
      }
    }
  }

  // ---------------------------------------------------------------
  // UI: Progress bars on hub pages
  // ---------------------------------------------------------------

  function renderProgressBar(data) {
    var el = document.querySelector('.track-progress');
    if (!el) return;
    var trackId = el.getAttribute('data-track');
    if (!trackId) return;

    var prog = getTrackProgress(data, trackId);
    var pct = prog.total > 0 ? Math.round((prog.read / prog.total) * 100) : 0;

    el.innerHTML =
      '<div class="progress-bar"><div class="progress-fill" style="width: ' + pct + '%"></div></div>' +
      '<span class="progress-text">' + prog.read + '/' + prog.total + ' pages read</span>';
  }

  // ---------------------------------------------------------------
  // UI: Toast notifications
  // ---------------------------------------------------------------

  function showToast(achievement) {
    var def = null;
    for (var i = 0; i < ACHIEVEMENTS.length; i++) {
      if (ACHIEVEMENTS[i].id === achievement) { def = ACHIEVEMENTS[i]; break; }
    }
    if (!def) return;

    var color = '#8b949e';
    if (def.track && TRACKS[def.track]) {
      color = TRACKS[def.track].color;
    } else if (def.id === 'foundation-builder') {
      color = '#8b949e';
    } else if (def.id === 'passkey-expert' || def.id === 'explorer') {
      color = '#d29922';
    } else if (def.id === 'first-steps') {
      color = '#3fb950';
    }

    var container = document.getElementById('achievement-toast-container');
    if (!container) return;

    var toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.style.borderLeftColor = color;
    toast.innerHTML =
      '<span class="achievement-toast-icon">' + def.icon + '</span>' +
      '<div class="achievement-toast-body">' +
        '<strong class="achievement-toast-title">' + def.name + '</strong>' +
        '<span class="achievement-toast-desc">' + def.desc + '</span>' +
      '</div>';

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(function () {
      toast.classList.add('is-visible');
    });

    // Auto-dismiss
    setTimeout(function () {
      toast.classList.remove('is-visible');
      toast.classList.add('is-leaving');
      setTimeout(function () { toast.remove(); }, 300);
    }, 4000);
  }

  // ---------------------------------------------------------------
  // UI: Mark-as-read button
  // ---------------------------------------------------------------

  function setupMarkReadButton(data, path) {
    var placeholder = document.querySelector('.mark-read-placeholder');
    if (!placeholder) return;
    if (isRead(data, path)) {
      placeholder.innerHTML =
        '<div class="mark-read-done"><span class="mark-read-check">&#10003;</span> Page read</div>';
      return;
    }

    var btn = document.createElement('button');
    btn.className = 'mark-read-btn';
    btn.textContent = 'Mark as read';
    btn.style.display = 'none';

    btn.addEventListener('click', function () {
      var isNew = markRead(data, path);
      placeholder.innerHTML =
        '<div class="mark-read-done"><span class="mark-read-check">&#10003;</span> Page read</div>';
      if (isNew) {
        var newAchievements = checkAchievements(data);
        for (var i = 0; i < newAchievements.length; i++) {
          showToast(newAchievements[i]);
        }
        updateCards(data);
        renderProgressBar(data);
      }
    });

    placeholder.appendChild(btn);

    // Show button after 80% scroll
    var btnShown = false;
    document.addEventListener('scroll', function () {
      if (btnShown) return;
      var scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      if (scrollPct > 80) {
        btn.style.display = '';
        btnShown = true;
      }
    });
  }

  // ---------------------------------------------------------------
  // Scroll + time auto-read detection
  // ---------------------------------------------------------------

  function setupAutoRead(data, path) {
    if (isRead(data, path)) return;

    var scrolledPast80 = false;
    var startTime = Date.now();

    document.addEventListener('scroll', function () {
      if (isRead(data, path)) return;
      var scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      if (scrollPct > 80) scrolledPast80 = true;

      var elapsed = Date.now() - startTime;
      if (scrolledPast80 && elapsed > 15000) {
        var isNew = markRead(data, path);
        if (isNew) {
          // Update the button if it exists
          var placeholder = document.querySelector('.mark-read-placeholder');
          if (placeholder) {
            placeholder.innerHTML =
              '<div class="mark-read-done"><span class="mark-read-check">&#10003;</span> Page read</div>';
          }
          var newAchievements = checkAchievements(data);
          for (var i = 0; i < newAchievements.length; i++) {
            showToast(newAchievements[i]);
          }
          updateCards(data);
          renderProgressBar(data);
        }
      }
    });
  }

  // ---------------------------------------------------------------
  // Progress page rendering
  // ---------------------------------------------------------------

  function renderProgressPage(data) {
    var container = document.getElementById('progress-page-content');
    if (!container) return;

    var total = getTotalProgress(data);
    var totalPct = total.total > 0 ? Math.round((total.read / total.total) * 100) : 0;

    // Overall progress donut
    var circumference = 2 * Math.PI * 45;
    var offset = circumference - (totalPct / 100) * circumference;

    var html = '<section class="progress-overall">';
    html += '<div class="progress-donut">';
    html += '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" class="donut-bg"/>';
    html += '<circle cx="50" cy="50" r="45" class="donut-fill" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '"/></svg>';
    html += '<div class="donut-label"><span class="donut-pct">' + totalPct + '%</span><span class="donut-sub">' + total.read + '/' + total.total + ' pages</span></div>';
    html += '</div></section>';

    // Per-track progress
    html += '<section class="progress-tracks"><h2>Track Progress</h2>';
    var trackKeys = Object.keys(TRACKS);
    for (var t = 0; t < trackKeys.length; t++) {
      var tid = trackKeys[t];
      var track = TRACKS[tid];
      var prog = getTrackProgress(data, tid);
      var pct = prog.total > 0 ? Math.round((prog.read / prog.total) * 100) : 0;
      html += '<div class="progress-track-item">';
      html += '<div class="progress-track-header"><span class="progress-track-name" style="color: ' + track.color + '">' + track.name + '</span>';
      html += '<span class="progress-track-count">' + prog.read + '/' + prog.total + '</span></div>';
      html += '<div class="progress-bar"><div class="progress-fill" style="width: ' + pct + '%; background: ' + track.color + '"></div></div>';
      if (prog.unread && prog.unread.length > 0) {
        html += '<div class="progress-unread"><span class="progress-unread-label">Still to read:</span><ul>';
        for (var u = 0; u < prog.unread.length; u++) {
          var slug = prog.unread[u].replace(/^\/passkey-path\/[^/]+\//, '').replace(/\/$/, '') || 'hub';
          var label = slug.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
          html += '<li><a href="' + prog.unread[u] + '">' + label + '</a></li>';
        }
        html += '</ul></div>';
      }
      html += '</div>';
    }

    // Shared foundations
    var shared = getSharedProgress(data);
    var sharedPct = shared.total > 0 ? Math.round((shared.read / shared.total) * 100) : 0;
    html += '<div class="progress-track-item">';
    html += '<div class="progress-track-header"><span class="progress-track-name" style="color: #8b949e">Foundations</span>';
    html += '<span class="progress-track-count">' + shared.read + '/' + shared.total + '</span></div>';
    html += '<div class="progress-bar"><div class="progress-fill" style="width: ' + sharedPct + '%; background: #8b949e"></div></div>';
    var sharedUnread = [];
    for (var s = 0; s < SHARED_PAGES.length; s++) {
      if (!isRead(data, SHARED_PAGES[s])) sharedUnread.push(SHARED_PAGES[s]);
    }
    if (sharedUnread.length > 0) {
      html += '<div class="progress-unread"><span class="progress-unread-label">Still to read:</span><ul>';
      for (var su = 0; su < sharedUnread.length; su++) {
        var sslug = sharedUnread[su].replace(/^\/passkey-path\/shared\//, '').replace(/\/$/, '');
        var slabel = sslug.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
        html += '<li><a href="' + sharedUnread[su] + '">' + slabel + '</a></li>';
      }
      html += '</ul></div>';
    }
    html += '</div>';
    html += '</section>';

    // Achievements
    html += '<section class="progress-achievements"><h2>Achievements</h2><div class="achievement-grid">';
    for (var a = 0; a < ACHIEVEMENTS.length; a++) {
      var ach = ACHIEVEMENTS[a];
      var unlocked = data.achievements.indexOf(ach.id) !== -1;
      html += '<div class="achievement-card' + (unlocked ? ' is-unlocked' : '') + '">';
      html += '<span class="achievement-card-icon">' + ach.icon + '</span>';
      html += '<strong class="achievement-card-name">' + ach.name + '</strong>';
      html += '<span class="achievement-card-desc">' + ach.desc + '</span>';
      html += '</div>';
    }
    html += '</div></section>';

    // Clear progress
    html += '<section class="progress-actions">';
    html += '<button class="clear-progress-btn" id="clear-progress">Clear all progress</button>';
    html += '</section>';

    container.innerHTML = html;

    // Bind clear button
    var clearBtn = document.getElementById('clear-progress');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Clear all visited pages and achievements? This cannot be undone.')) {
          localStorage.removeItem(STORAGE_KEY);
          location.reload();
        }
      });
    }
  }

  // ---------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------

  function init() {
    var path = window.location.pathname;
    // Ensure trailing slash
    if (path.charAt(path.length - 1) !== '/') path += '/';

    var data = loadData();

    // Only track passkey-path pages
    if (isPasskeyPage(path)) {
      recordVisit(data, path);
      setupAutoRead(data, path);
      setupMarkReadButton(data, path);
    }

    // Update UI on any page (cards might link to passkey-path content)
    updateCards(data);
    renderProgressBar(data);

    // Render progress page if on it
    renderProgressPage(data);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for clearing from console if needed
  window.passkeyPathReset = function () {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  };
})();
