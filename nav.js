// Menu hamburger
const toggle = document.querySelector('.nav-toggle');
const menu   = document.querySelector('.mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

// Accordion pill
document.querySelectorAll('.pill').forEach(pill => {
  const header = pill.querySelector('.pill-header');
  if (!header) return;
  header.addEventListener('click', () => {
    pill.classList.toggle('open');
  });
});
