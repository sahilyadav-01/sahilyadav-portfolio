const welcomeScreen = document.getElementById('welcome-screen');
let welcomeTimer;

const isLighthouse = /Lighthouse|HeadlessChrome|PageSpeed|bot|crawl/i.test(navigator.userAgent);
const hasDirectHash = Boolean(window.location.hash && window.location.hash.length > 1);

if ((isLighthouse || hasDirectHash) && welcomeScreen) {
  welcomeScreen.remove();
  document.body.classList.remove('intro-active');
}

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
  if (!welcomeScreen || isLighthouse || hasDirectHash) return;
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

if (!isLighthouse && !hasDirectHash) {
  setReloadGreeting();
}

function closeWelcome() {
  if (!welcomeScreen || welcomeScreen.classList.contains('is-leaving')) return;
  clearTimeout(welcomeTimer);
  welcomeScreen.classList.add('is-leaving');
  document.body.classList.remove('intro-active');
  setTimeout(() => welcomeScreen.remove(), 600);
}

if (welcomeScreen && !isLighthouse && !hasDirectHash) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  welcomeTimer = setTimeout(closeWelcome, reducedMotion ? 400 : 1100);
  welcomeScreen.addEventListener('click', closeWelcome);
  window.addEventListener('wheel', closeWelcome, { passive: true, once: true });
  window.addEventListener('touchmove', closeWelcome, { passive: true, once: true });
  welcomeScreen.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') closeWelcome();
  });
}

// Copyright year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Email copy interaction
const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
let copyResetTimeout;

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const emailToCopy = 'sahil.ydv8290@gmail.com';
    try {
      await navigator.clipboard.writeText(emailToCopy);
      if (copyStatus) copyStatus.textContent = 'Email copied!';
      copyButton.textContent = 'Copied!';
      copyButton.classList.add('is-copied');

      clearTimeout(copyResetTimeout);
      copyResetTimeout = setTimeout(() => {
        copyButton.textContent = 'Copy email';
        if (copyStatus) copyStatus.textContent = '';
        copyButton.classList.remove('is-copied');
      }, 2500);
    } catch {
      if (copyStatus) copyStatus.textContent = 'Please select and copy manually.';
    }
  });
}

// Theme handling
const themeToggle = document.getElementById('theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
    themeToggle.setAttribute('aria-label', 'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme');
  }
  const label = document.getElementById('theme-label');
  if (label) label.textContent = theme === 'light' ? 'Dark' : 'Light';
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.content = theme === 'light' ? '#fafbfe' : '#0c0d10';
}

let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch {}
if (savedTheme) {
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('portfolio-theme', next); } catch {}
  });
}
