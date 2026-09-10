/**
 * Birthday Countdown & Zodiac Details Component
 * Supports Dual-Language and Progressive Locked/Unlocked States
 */
import { calculateNextBirthday, getZodiac, getDecan } from '../calculator.js';
import { getLanguage, t, formatDigits } from '../i18n.js';
import { LOCALES } from '../data/locales.js';

export function updateBirthdayCountdown(birthDate) {
  if (!birthDate) return null;

  const lang = getLanguage();
  const dict = LOCALES[lang] || LOCALES.bn;
  const bday = calculateNextBirthday(birthDate);

  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMinutes = document.getElementById('cdMinutes');
  const cdSeconds = document.getElementById('cdSeconds');
  const nextBdayDate = document.getElementById('nextBirthdayDate');
  const nextAgeLabel = document.getElementById('nextAgeLabel');

  if (cdDays) cdDays.textContent = formatDigits(bday.days);
  if (cdHours) cdHours.textContent = formatDigits(bday.hours.toString().padStart(2, '0'));
  if (cdMinutes) cdMinutes.textContent = formatDigits(bday.minutes.toString().padStart(2, '0'));
  if (cdSeconds) cdSeconds.textContent = formatDigits(bday.seconds.toString().padStart(2, '0'));

  if (nextBdayDate) {
    const d = bday.nextDate;
    const mName = dict.months[d.getMonth()] || '';
    nextBdayDate.textContent = `${formatDigits(d.getDate())} ${mName} ${formatDigits(d.getFullYear())}`;
  }

  if (nextAgeLabel) {
    const unit = lang === 'bn' ? 'বছর' : 'Years';
    nextAgeLabel.textContent = `${formatDigits(bday.nextAge)} ${unit}`;
  }

  return bday;
}

export function renderZodiacCard(month, day, unlockLevel = 35) {
  const lang = getLanguage();
  const z = getZodiac(month, day);

  const badge = document.getElementById('hookZodiacBadge');
  const btnText = document.getElementById('hookZodiacBtnText');
  const desc = document.getElementById('hookZodiacDesc');

  if (unlockLevel >= 70) {
    if (badge) {
      badge.textContent = t('hookZodiacCardBadgeUnlocked');
      badge.className = "text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20";
    }
    if (btnText) {
      btnText.textContent = t('hookZodiacBtnUnlocked');
    }
    if (desc) {
      const signName = lang === 'bn' ? `${z.nameBn} (${z.sign})` : `${z.name} (${z.sign})`;
      desc.textContent = lang === 'bn' 
        ? `আপনার রাশি ${signName}। উপাদান: ${z.element}, শাসক গ্রহ: ${z.planet}। সম্পূর্ণ ৭-ট্যাব রাশিফল বিশ্লেষণ দেখতে ক্লিক করুন।`
        : `Your sign is ${signName}. Element: ${z.element}, Planet: ${z.planet}. Click to view complete 7-tab horoscope dashboard.`;
    }
  } else {
    if (badge) {
      badge.textContent = t('hookZodiacCardBadgeLocked');
      badge.className = "text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 animate-pulse";
    }
    if (btnText) {
      btnText.textContent = t('hookZodiacBtnLocked');
    }
    if (desc) {
      desc.textContent = t('hookZodiacCardDesc');
    }
  }

  // Update static zodiac card display
  const zodiacSymbol = document.getElementById('zodiacSymbol');
  const zodiacNameBn = document.getElementById('zodiacNameBn');
  const zodiacElement = document.getElementById('zodiacElement');
  const zodiacTraits = document.getElementById('zodiacTraits');

  if (zodiacSymbol) zodiacSymbol.textContent = z.sign || '';
  if (zodiacNameBn) zodiacNameBn.textContent = lang === 'bn' ? (z.nameBn || z.name) : `${z.nameEn || z.name} (${z.sign})`;
  if (zodiacElement) {
    zodiacElement.textContent = lang === 'bn'
      ? `উপাদান: ${z.element} | শাসক গ্রহ: ${z.planet}`
      : `Element: ${z.element} | Ruler: ${z.planet}`;
  }
  if (zodiacTraits) {
    zodiacTraits.textContent = z.traits || '';
  }

  return z;
}
