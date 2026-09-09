/**
 * Theme Controller (Light / Dark Mode Manager)
 */

const THEME_KEY = 'lifeTimeline_theme';

export function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const sunIcon = document.getElementById('themeIconSun');
  const moonIcon = document.getElementById('themeIconMoon');

  // Determine initial theme: saved in localStorage or system preference
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : (prefersDark !== false);

  applyTheme(isDark);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentDark = document.documentElement.classList.contains('dark');
      const nextDark = !currentDark;
      applyTheme(nextDark);
      localStorage.setItem(THEME_KEY, nextDark ? 'dark' : 'light');
    });
  }

  // Listen for system theme changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches);
      }
    });
  }

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark');
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
    }
  }
}
