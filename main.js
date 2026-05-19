/**
 * 1. Переключатель темы (светлая/тёмная)
 */
const ThemeToggle = (() => {
  const root = document.documentElement;
  const toggleBtn = document.querySelector('.theme-toggle');
  const STORAGE_KEY = 'theme-preference';

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const init = () => {
    const theme = getPreferredTheme();
    applyTheme(theme);

    toggleBtn?.addEventListener('click', () => {
      const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
    });
  };

  return { init };
})();

/**
 * 2. Кнопка "Наверх"
 */
const ScrollToTop = (() => {
  const btn = document.querySelector('.scroll-to-top');
  const SHOW_THRESHOLD = 300;

  const onScroll = () => {
    if (window.scrollY > SHOW_THRESHOLD) {
      btn?.classList.add('visible');
    } else {
      btn?.classList.remove('visible');
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const init = () => {
    window.addEventListener('scroll', onScroll, { passive: true });
    btn?.addEventListener('click', scrollToTop);
    onScroll();
  };

  return { init };
})();

/**
 * 3. Запуск при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', () => {
  ThemeToggle.init();
  ScrollToTop.init();
  // ScrollAnimations удалён, так как анимация теперь на чистом CSS
});