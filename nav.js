(function() {
  var links = [
    { href: 'index.html',        label: 'Home' },
    { href: 'comeprocede.html',  label: 'Come procede' },
    { href: 'contratto.html',    label: 'Il contratto' },
    { href: 'delibera.html',     label: 'La delibera' },
    { href: 'faq.html',          label: 'FAQ' }
  ];

  var current = location.pathname.split('/').pop() || 'index.html';

  var nav = document.createElement('nav');
  links.forEach(function(link) {
    var a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    if (link.href === current) a.className = 'active';
    nav.appendChild(a);
  });

  var container = document.querySelector('header .container');
  var toggle = container.querySelector('.nav-toggle');
  container.insertBefore(nav, toggle);

  toggle.addEventListener('click', function() {
    nav.classList.toggle('open');
  });
})();

// Accordion pillole
document.querySelectorAll('.pill-toggle').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    var pill = this.closest('.pill');
    var body = pill.querySelector('.pill-body');
    var isOpen = !body.hidden;

    // Cattura la pillola aperta prima di chiudere tutto (caso 3)
    var previouslyOpenPill = null;
    document.querySelectorAll('.pill-body').forEach(function(b) {
      if (!b.hidden) previouslyOpenPill = b.closest('.pill');
    });

    // Chiudi tutti
    document.querySelectorAll('.pill-body').forEach(function(b) {
      b.hidden = true;
    });
    document.querySelectorAll('.pill-toggle:not(.pill-toggle--close)').forEach(function(t) {
      t.setAttribute('aria-expanded', 'false');
    });

    // Resetta testo di tutti i bottoni principali
    document.querySelectorAll('.pill-toggle:not(.pill-toggle--close)').forEach(function(t) {
      t.textContent = 'Approfondimento ↓';
    });

    // Se era chiuso, aprilo
    if (!isOpen) {
      // Scroll all'inizio della pillola che si sta chiudendo (caso 3)
      if (previouslyOpenPill && previouslyOpenPill !== pill) {
        previouslyOpenPill.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      body.hidden = false;
      var openBtn = pill.querySelector('.pill-toggle:not(.pill-toggle--close)');
      if (openBtn) {
        openBtn.setAttribute('aria-expanded', 'true');
        openBtn.textContent = 'Approfondimento ↑';
      }
      setTimeout(function() {
        body.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    } else {
      // Chiusura diretta (caso 1: --close o toggle della stessa pillola)
      setTimeout(function() {
        pill.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  });
});

// Click sul body espanso → chiude
document.querySelectorAll('.pill-body').forEach(function(body) {
  body.addEventListener('click', function(e) {
    if (e.target.closest('.pill-toggle--close')) return;
    this.hidden = true;
    var pill = this.closest('.pill');
    var openBtn = pill.querySelector('.pill-toggle:not(.pill-toggle--close)');
    if (openBtn) {
      openBtn.setAttribute('aria-expanded', 'false');
      openBtn.textContent = 'Approfondimento ↓';
    }
    // Scroll all'inizio della pillola chiusa (caso 2)
    setTimeout(function() {
      pill.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  });
});
