/**
 * Internationalization (i18n) Engine & Controller
 */
import { LOCALES } from './data/locales.js';

const LANG_STORAGE_KEY = 'lifeTimeline_lang';
let currentLanguage = 'bn';

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function initI18n() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && (saved === 'bn' || saved === 'en')) {
    currentLanguage = saved;
  } else {
    currentLanguage = 'bn';
  }
  updateLangButtonUI();
  translateDOM();
}

export function getLanguage() {
  return currentLanguage;
}

export function setLanguage(lang) {
  if (lang !== 'bn' && lang !== 'en') return;
  currentLanguage = lang;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {
    console.warn('LocalStorage error saving lang:', e);
  }

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  updateLangButtonUI();
  translateDOM();

  // Dispatch global event for components to re-render
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

export function toggleLanguage() {
  const nextLang = currentLanguage === 'bn' ? 'en' : 'bn';
  setLanguage(nextLang);
  return nextLang;
}

export function t(key) {
  const dict = LOCALES[currentLanguage] || LOCALES.bn;
  return dict[key] !== undefined ? dict[key] : (LOCALES.bn[key] || key);
}

export function formatDigits(number) {
  if (number === null || number === undefined) return '';
  const str = String(number);
  if (currentLanguage === 'en') {
    return str;
  }
  return str.replace(/\d/g, (digit) => BN_DIGITS[parseInt(digit, 10)]);
}

export function formatNumberWithCommas(num) {
  if (num === null || num === undefined) return '';
  const formattedEn = Number(num).toLocaleString('en-US');
  if (currentLanguage === 'en') {
    return formattedEn;
  }
  return formattedEn.replace(/\d/g, (digit) => BN_DIGITS[parseInt(digit, 10)]);
}

function updateLangButtonUI() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langLabel = document.getElementById('langLabel');
  if (!langToggleBtn || !langLabel) return;

  if (currentLanguage === 'bn') {
    langLabel.textContent = 'EN';
    langToggleBtn.title = 'Switch to English';
  } else {
    langLabel.textContent = 'বাংলা';
    langToggleBtn.title = 'বাংলায় পরিবর্তন করুন';
  }
}

export function translateDOM() {
  // Elements with data-i18n (textContent)
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (text) {
      el.textContent = text;
    }
  });

  // Elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = t(key);
    if (text) {
      el.placeholder = text;
    }
  });

  // Elements with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    const text = t(key);
    if (text) {
      el.title = text;
    }
  });
}
