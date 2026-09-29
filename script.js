document.getElementById('year').textContent = new Date().getFullYear();
const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('sahil.ydv8290@gmail.com');
    copyStatus.textContent = 'Email copied';
    copyButton.textContent = 'Copied!';
  } catch {
    copyStatus.textContent = 'Please select and copy the email address.';
  }
});

const themeToggle = document.getElementById('theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
  themeToggle.setAttribute('aria-label', 'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme');
  document.getElementById('theme-label').textContent = theme === 'light' ? 'Dark' : 'Light';
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#fafbfe' : '#0c0d10';
}
let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch {}
setTheme(savedTheme === 'light' ? 'light' : 'dark');
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('portfolio-theme', next); } catch {}
});
