const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#service-select').value = link.dataset.service;
  });
});

const form = document.querySelector('#order-form');
const result = document.querySelector('#request-result');
const summary = document.querySelector('#request-summary');
const status = document.querySelector('#form-status');

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const request = [
    'VERTEX BOTS — PROJECT REQUEST',
    '',
    `Name: ${data.get('name')}`,
    `Service: ${data.get('service')}`,
    '',
    'Project details:',
    data.get('details')
  ].join('\n');
  summary.value = request;
  result.hidden = false;
  status.textContent = 'Request prepared. Copy it below, then submit it in a Discord ticket.';
  result.scrollIntoView({behavior: 'smooth', block: 'center'});
});

document.querySelector('#copy-request').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(summary.value);
    document.querySelector('#copy-request').textContent = 'Copied ✓';
  } catch {
    summary.select();
    status.textContent = 'Select and copy the request text manually, then submit it in Discord.';
  }
});
