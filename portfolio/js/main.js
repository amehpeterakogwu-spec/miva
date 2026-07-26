// ============================================================
// main.js — shared behaviour across all pages
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.mainnav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Typewriter effect for the homepage terminal hero
  var typeTarget = document.querySelector('[data-typewriter]');
  if (typeTarget) {
    var fullText = typeTarget.getAttribute('data-typewriter');
    typeTarget.textContent = '';
    var i = 0;
    function typeChar() {
      if (i <= fullText.length) {
        typeTarget.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeChar, 45);
      }
    }
    typeChar();
  }

  // Footer year
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
