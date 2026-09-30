const welcomeScreen = document.getElementById('welcome-screen');
let welcomeTimer;

const greetings = [
  { text: 'Hello', language: 'English', code: 'en' },
  { text: 'Bonjour', language: 'French', code: 'fr' },
  { text: 'Hola', language: 'Spanish', code: 'es' },
  { text: 'Ciao', language: 'Italian', code: 'it' },
  { text: 'Hallo', language: 'German', code: 'de' },
  { text: 'Olá', language: 'Portuguese', code: 'pt' },
  { text: 'नमस्ते', language: 'Hindi', code: 'hi' },
  { text: '你好', language: 'Chinese', code: 'zh' },
  { text: 'こんにちは', language: 'Japanese', code: 'ja' },
  { text: '안녕하세요', language: 'Korean', code: 'ko' }
];

function setReloadGreeting() {
  if (!welcomeScreen) return;
  let previous = -1;
  try { previous = Number(sessionStorage.getItem('previous-greeting')); } catch {}
  const choices = greetings.map((_, index) => index).filter(index => index !== previous);
  const selectedIndex = choices[Math.floor(Math.random() * choices.length)];
  const greeting = greetings[selectedIndex];
  welcomeScreen.querySelectorAll('.welcome-hello text').forEach(text => {
    text.textContent = greeting.text;
    text.setAttribute('lang', greeting.code);
  });
  welcomeScreen.setAttribute('aria-label', `Welcome. ${greeting.text}, in ${greeting.language}.`);
  welcomeScreen.classList.toggle('long-greeting', greeting.text.length > 6);
  try { sessionStorage.setItem('previous-greeting', String(selectedIndex)); } catch {}
}

setReloadGreeting();

function closeWelcome() {
  if (!welcomeScreen || welcomeScreen.classList.contains('is-leaving')) return;
  clearTimeout(welcomeTimer);
  welcomeScreen.classList.add('is-leaving');
  document.body.classList.remove('intro-active');
  setTimeout(() => welcomeScreen.remove(), 950);
}
if (welcomeScreen) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  welcomeTimer = setTimeout(closeWelcome, reducedMotion ? 900 : 3800);
  welcomeScreen.addEventListener('click', closeWelcome);
  welcomeScreen.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') closeWelcome();
  });
}

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
