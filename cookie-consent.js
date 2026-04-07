/* ══════════════════════════════════════════
   Cookie Consent — CNIL/RGPD Compliant
   Marion Balsaux · marionbalsaux.fr
══════════════════════════════════════════ */

(function() {
  'use strict';

  var COOKIE_NAME = 'mb_cookie_consent';
  var COOKIE_MAX_AGE = 13 * 30 * 24 * 60 * 60; // 13 months in seconds

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setCookie(name, value, maxAge) {
    document.cookie = name + '=' + value + '; max-age=' + maxAge + '; path=/; SameSite=Lax';
  }

  function enableAnalytics() {
    // Consent Mode v2 — grant all types after user acceptance
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'denied',        // Pas de pub — on reste RGPD-friendly
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  }

  function disableAnalytics() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.transform = 'translateY(calc(100% + 20px))';
      banner.style.opacity = '0';
      setTimeout(function() { banner.style.display = 'none'; }, 400);
    }
  }

  function acceptCookies() {
    setCookie(COOKIE_NAME, 'accepted', COOKIE_MAX_AGE);
    enableAnalytics();
    hideBanner();
  }

  function rejectCookies() {
    setCookie(COOKIE_NAME, 'rejected', COOKIE_MAX_AGE);
    disableAnalytics();
    hideBanner();
  }

  function showBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'flex';
      setTimeout(function() {
        banner.style.transform = 'translateY(0)';
        banner.style.opacity = '1';
      }, 100);
    }
  }

  window.addEventListener('DOMContentLoaded', function() {
    var consent = getCookie(COOKIE_NAME);

    if (consent === 'accepted') {
      enableAnalytics();
    } else if (consent === 'rejected') {
      disableAnalytics();
    } else {
      // No choice yet — show banner
      showBanner();
    }

    var btnAccept = document.getElementById('cookie-accept');
    var btnReject = document.getElementById('cookie-reject');
    if (btnAccept) btnAccept.addEventListener('click', acceptCookies);
    if (btnReject) btnReject.addEventListener('click', rejectCookies);
  });
})();
