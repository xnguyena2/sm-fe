(function () {
    'use strict';

    var header = document.getElementById('header');
    var nav = document.getElementById('nav');
    var btn = document.getElementById('menuBtn');

    function setMenu(open) {
        nav.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    }
    if (btn && nav) {
        btn.addEventListener('click', function () {
            setMenu(btn.getAttribute('aria-expanded') !== 'true');
        });
        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) setMenu(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
                setMenu(false);
                btn.focus();
            }
        });
    }

    function onScroll() {
        if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Tabs
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
        tabs.forEach(function (t) {
            var on = t === tab;
            t.classList.toggle('is-active', on);
            t.setAttribute('aria-selected', on ? 'true' : 'false');
            t.tabIndex = on ? 0 : -1;
            var p = document.getElementById(t.getAttribute('aria-controls'));
            if (p) p.hidden = !on;
        });
        if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab, false); });
        tab.addEventListener('keydown', function (e) {
            var n = null;
            if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
            else if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
            else if (e.key === 'Home') n = tabs[0];
            else if (e.key === 'End') n = tabs[tabs.length - 1];
            if (n) { e.preventDefault(); select(n, true); }
        });
    });

    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
})();
