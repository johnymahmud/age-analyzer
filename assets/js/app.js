/**
 * Main Application Controller (Entry Point)
 * Progressive 3-Stage User Journey & Dual-Language (i18n) Engine
 */
import { initTheme } from './theme.js';
import { initI18n, toggleLanguage, getLanguage, t, formatDigits, translateDOM } from './i18n.js';
import { calculateExactAge, calculateNextBirthday, getZodiac, getDecan, toBnDigits } from './calculator.js';
import { 
  saveProfile, 
  loadSavedProfile, 
  clearProfile, 
  getState, 
  setBirthDate, 
  setLiveTicker, 
  setUnlockLevel, 
  getUnlockLevel 
} from './state.js';
import { renderBioCard } from './components/bioCard.js';
import { updateAgeStats } from './components/ageStats.js';
import { updateBirthdayCountdown, renderZodiacCard } from './components/countdown.js';
import { renderHistoricalInsights } from './components/historicalView.js';
import { renderBenchmarkTable } from './components/milestonesTable.js';
import { renderCompletionMeter } from './components/completionMeter.js';
import { openSocialStoryModal } from './components/socialStory.js';
import { initAdSlots } from './components/adSlots.js';
import { openZodiacModal } from './components/zodiacModal.js';
import { openArchetypeModal } from './components/archetypeModal.js';
import { openHistoricalModal, closeHistoricalModal } from './components/historicalModal.js';
import { openMilestonesModal, closeMilestonesModal } from './components/milestonesModal.js';
import { openAstroInputModal, closeAstroInputModal } from './components/astroInputModal.js';
import { closeAllModals } from './components/modalManager.js';

function initApp() {
  // 1. Initialize Theme (Light / Dark)
  initTheme();

  // 2. Initialize i18n & Localization
  initI18n();

  // 3. Initialize Ad Slots
  initAdSlots();

  // 5. Populate Days Dropdown (1 to 31)
  populateDaysDropdown();

  // 6. Restore Saved Profile if available
  const savedData = loadSavedProfile();
  if (savedData && savedData.day && savedData.month && savedData.year) {
    restoreSlimFormData(savedData);
    executeAnalysis(savedData, false);
  }

  // 7. Setup Event Listeners
  setupEventListeners();

  // 8. Listen for language changes to re-render dynamic parts
  window.addEventListener('languageChanged', () => {
    populateDaysDropdown();
    const currentState = getState();
    if (currentState.profile && currentState.birthDate) {
      const bday = calculateNextBirthday(currentState.birthDate);
      const level = getUnlockLevel();
      renderBioCard(currentState.profile, formatDigits(bday.days));
      renderZodiacCard(currentState.profile.month, currentState.profile.day, level);
      renderCompletionMeter(level);
      updateAgeStats(currentState.birthDate);
      updateBirthdayCountdown(currentState.birthDate);
      renderHistoricalInsights(currentState.profile.month, currentState.profile.day, currentState.profile.year);
      renderBenchmarkTable(calculateExactAge(currentState.birthDate).years, false);
      
      const archBadge = document.getElementById('hookArchetypeBadge');
      const archBtnText = document.getElementById('hookArchetypeBtnText');
      if (level >= 100) {
        if (archBadge) {
          archBadge.textContent = t('hookArchetypeCardBadgeUnlocked');
          archBadge.className = "text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20";
        }
        if (archBtnText) {
          archBtnText.textContent = getLanguage() === 'bn' ? 'আর্কিটাইপ ড্যাশবোর্ড ↗' : 'View Archetype ↗';
        }
      } else {
        if (archBadge) {
          archBadge.textContent = t('hookArchetypeCardBadgeLocked');
          archBadge.className = "text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20";
        }
        if (archBtnText) {
          archBtnText.textContent = t('hookArchetypeBtn');
        }
      }
    }
  });
}

function populateDaysDropdown() {
  const dobDaySelect = document.getElementById('dobDay');
  if (!dobDaySelect) return;

  const currentVal = dobDaySelect.value;
  const lang = getLanguage();
  dobDaySelect.innerHTML = `<option value="" disabled selected>${t('dayPlaceholder')}</option>`;
  
  for (let d = 1; d <= 31; d++) {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = lang === 'bn' ? `${formatDigits(d)} তারিখ` : `Day ${d}`;
    if (currentVal && parseInt(currentVal, 10) === d) {
      opt.selected = true;
    }
    dobDaySelect.appendChild(opt);
  }
}

function restoreSlimFormData(data) {
  const dobDaySelect = document.getElementById('dobDay');
  const dobMonthSelect = document.getElementById('dobMonth');
  const dobYearInput = document.getElementById('dobYear');

  if (data.day && dobDaySelect) dobDaySelect.value = data.day;
  if (data.month && dobMonthSelect) dobMonthSelect.value = data.month;
  if (data.year && dobYearInput) dobYearInput.value = data.year;
}

function setupEventListeners() {
  const form = document.getElementById('lifeTimelineForm');
  const resetBtn = document.getElementById('resetStorageBtn');
  const langToggleBtn = document.getElementById('langToggleBtn');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  const copySummaryBtn = document.getElementById('copySummaryBtn');
  const socialStoryBtn = document.getElementById('socialStoryBtn');
  const editAstroBtn = document.getElementById('editAstroDetailsBtn');
  const filterAll = document.getElementById('filterAllMilestones');
  const filterNear = document.getElementById('filterNearMilestones');

  // Language Switcher
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      toggleLanguage();
    });
  }

  // Social Story Modal Trigger
  if (socialStoryBtn) {
    socialStoryBtn.addEventListener('click', openSocialStoryModal);
  }

  // Edit Astro Details Trigger
  if (editAstroBtn) {
    editAstroBtn.addEventListener('click', openAstroInputModal);
  }

  // Card 1: Historical Insights Modal Trigger
  const cardHist = document.getElementById('cardHookHistorical');
  const openHistBtn = document.getElementById('openHistoricalModalBtn');
  const triggerHistoricalFlow = () => {
    const currentState = getState();
    if (!currentState.profile) return;
    const { month, day, year } = currentState.profile;
    openHistoricalModal(month, day, year);
  };
  if (openHistBtn) openHistBtn.addEventListener('click', (e) => { e.stopPropagation(); triggerHistoricalFlow(); });
  if (cardHist) cardHist.addEventListener('click', triggerHistoricalFlow);

  // Card 2: Milestones Benchmark Modal Trigger
  const cardMile = document.getElementById('cardHookMilestones');
  const openMileBtn = document.getElementById('openMilestonesModalBtn');
  const triggerMilestonesFlow = () => {
    const currentState = getState();
    if (!currentState.birthDate) return;
    const age = calculateExactAge(currentState.birthDate);
    openMilestonesModal(age.years);
  };
  if (openMileBtn) openMileBtn.addEventListener('click', (e) => { e.stopPropagation(); triggerMilestonesFlow(); });
  if (cardMile) cardMile.addEventListener('click', triggerMilestonesFlow);

  // Card 3: Trigger Zodiac Flow (Checks if locked or unlocked)
  const cardZodiac = document.getElementById('cardHookZodiac');
  const hookZodiacBtn = document.getElementById('hookZodiacBtn');
  const zodiacPill = document.getElementById('resultZodiacPill');
  const badgeMeterZodiac = document.getElementById('badgeMeterZodiac');

  const triggerZodiacFlow = () => {
    const currentState = getState();
    if (!currentState.profile) return;

    const level = getUnlockLevel();
    if (level < 70) {
      // Prompt user with Stage 2 coordinates modal
      openAstroInputModal();
    } else {
      // Already unlocked, open full 7-tab modal directly
      const { month, day, year, relationship, gender, name, bloodGroup } = currentState.profile;
      const zodiac = getZodiac(month, day);
      openZodiacModal(zodiac, month, day, year, relationship, gender, name, bloodGroup, currentState.birthDate);
    }
  };

  if (cardZodiac) cardZodiac.addEventListener('click', triggerZodiacFlow);
  if (hookZodiacBtn) hookZodiacBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerZodiacFlow();
  });
  if (zodiacPill) zodiacPill.addEventListener('click', triggerZodiacFlow);
  if (badgeMeterZodiac) badgeMeterZodiac.addEventListener('click', triggerZodiacFlow);

  // Card 4: Trigger Archetype Flow
  const cardArchetype = document.getElementById('cardHookArchetype');
  const hookArchetypeBtn = document.getElementById('hookArchetypeBtn');
  const badgeMeterArchetype = document.getElementById('badgeMeterArchetype');

  const triggerArchetypeFlow = () => {
    const currentState = getState();
    if (!currentState.profile) return;
    const { month, day, year, relationship, gender, name, bloodGroup, avatar } = currentState.profile;
    const zodiac = getZodiac(month, day);
    const userData = { month, day, year, relationship, gender, name, bloodGroup, zodiac, birthDate: currentState.birthDate };
    openArchetypeModal(userData, avatar || '');
  };

  if (hookArchetypeBtn) hookArchetypeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerArchetypeFlow();
  });
  if (cardArchetype) cardArchetype.addEventListener('click', triggerArchetypeFlow);
  if (badgeMeterArchetype) badgeMeterArchetype.addEventListener('click', triggerArchetypeFlow);

  // Escape key global listener for all modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeHistoricalModal();
      closeMilestonesModal();
    }
  });

  // Stage 1: Ultra-Slim Form Submit (Day, Month, Year only)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const day = parseInt(document.getElementById('dobDay').value, 10);
      const month = parseInt(document.getElementById('dobMonth').value, 10);
      const year = parseInt(document.getElementById('dobYear').value, 10);

      if (!day || !month || !year) {
        alert(t('validationError'));
        return;
      }

      // Preserve existing profile details if user previously filled them
      const existing = getState().profile || {};
      const userData = {
        ...existing,
        day,
        month,
        year,
        country: existing.country || 'BD',
        name: existing.name || '',
        gender: existing.gender || 'male',
        relationship: existing.relationship || 'single',
        bloodGroup: existing.bloodGroup || 'unknown',
        time: existing.time || '00:00',
        avatar: existing.avatar || '',
        unlockLevel: existing.unlockLevel || 35
      };

      executeAnalysis(userData, true);
    });
  }

  // Reset Storage Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm(t('resetConfirm'))) {
        clearProfile();
        if (form) form.reset();
        const results = document.getElementById('resultsContainer');
        if (results) results.classList.add('hidden');
        showToast(t('resetSuccess'));
      }
    });
  }

  // PDF Print Download
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => window.print());
  }

  // Copy Summary to Clipboard
  if (copySummaryBtn) {
    copySummaryBtn.addEventListener('click', handleCopySummary);
  }

  // Milestone Filters
  if (filterAll && filterNear) {
    filterAll.addEventListener('click', () => {
      filterAll.className = 'text-xs px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm transition-all';
      filterNear.className = 'text-xs px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all';
      const bDate = getState().birthDate;
      if (bDate) renderBenchmarkTable(calculateExactAge(bDate).years, false);
    });

    filterNear.addEventListener('click', () => {
      filterNear.className = 'text-xs px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm transition-all';
      filterAll.className = 'text-xs px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all';
      const bDate = getState().birthDate;
      if (bDate) renderBenchmarkTable(calculateExactAge(bDate).years, true);
    });
  }
}

function executeAnalysis(data, shouldScroll = true) {
  const [h, m] = (data.time || '00:00').split(':').map(Number);
  const birthDate = new Date(data.year, data.month - 1, data.day, h || 0, m || 0, 0);

  setBirthDate(birthDate);
  saveProfile(data);

  const resultsContainer = document.getElementById('resultsContainer');
  if (resultsContainer) resultsContainer.classList.remove('hidden');

  // 1. Render Completion Meter
  const level = getUnlockLevel();
  renderCompletionMeter(level);

  // 2. Calculate next birthday & render Bio Card
  const bday = calculateNextBirthday(birthDate);
  renderBioCard(data, formatDigits(bday.days));

  // 3. Render Zodiac Card (with teaser/locked state if level < 70)
  renderZodiacCard(data.month, data.day, level);

  // 4. Render Historical Insights & Milestones
  renderHistoricalInsights(data.month, data.day, data.year);
  renderBenchmarkTable(calculateExactAge(birthDate).years, false);

  // Sync Card 4 Archetype Hook Badge
  const archBadge = document.getElementById('hookArchetypeBadge');
  const archBtnText = document.getElementById('hookArchetypeBtnText');
  if (level >= 100) {
    if (archBadge) {
      archBadge.textContent = t('hookArchetypeCardBadgeUnlocked');
      archBadge.className = "text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20";
    }
    if (archBtnText) {
      archBtnText.textContent = getLanguage() === 'bn' ? 'আর্কিটাইপ ড্যাশবোর্ড ↗' : 'View Archetype ↗';
    }
  } else {
    if (archBadge) {
      archBadge.textContent = t('hookArchetypeCardBadgeLocked');
      archBadge.className = "text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20";
    }
    if (archBtnText) {
      archBtnText.textContent = t('hookArchetypeBtn');
    }
  }

  // 5. Update Live Stats & Start Live Ticker
  const tick = () => {
    const bDate = getState().birthDate;
    if (!bDate) return;
    updateAgeStats(bDate);
    updateBirthdayCountdown(bDate);
  };
  tick();
  const intervalId = setInterval(tick, 1000);
  setLiveTicker(intervalId);

  // 6. Scroll smoothly to results
  if (shouldScroll && resultsContainer) {
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Stage 2: Astrological Coordinates Modal Management


function handleCopySummary() {
  const currentState = getState();
  if (!currentState.birthDate || !currentState.profile) return;

  const lang = getLanguage();
  const profile = currentState.profile;
  const age = calculateExactAge(currentState.birthDate);
  const zodiac = getZodiac(profile.month, profile.day);
  const decan = getDecan(zodiac, profile.month, profile.day);
  const bday = calculateNextBirthday(currentState.birthDate);

  const daysOfWeekBn = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const daysOfWeekEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const bDayOfWeek = lang === 'bn' ? daysOfWeekBn[currentState.birthDate.getDay()] : daysOfWeekEn[currentState.birthDate.getDay()];

  let summary = '';
  if (lang === 'bn') {
    summary = `🌟 লাইফ-টাইমলাইন ও এজ অ্যানালাইসিস 🌟\n` +
      `👤 নাম: ${profile.name || 'ইউজার'}\n` +
      `📅 জন্মতারিখ: ${formatDigits(profile.day)}/${formatDigits(profile.month)}/${formatDigits(profile.year)} (${bDayOfWeek})\n` +
      `⏳ বর্তমান বয়স: ${formatDigits(age.years)} বছর, ${formatDigits(age.months)} মাস, ${formatDigits(age.days)} দিন\n` +
      `⏱️ অতিবাহিত সময়: ${formatDigits(age.totalDays.toLocaleString('en-US'))} দিন (${formatDigits(age.totalHours.toLocaleString('en-US'))} ঘণ্টা)\n` +
      `✨ রাশিচক্র: ${zodiac.nameBn} (${zodiac.sign}) • দ্রেক্বাণ: ${formatDigits(decan?.decanNumber || 1)}ম ভাগ\n` +
      `🪐 শাসক গ্রহ: ${zodiac.planet} (উপ-গ্রহ: ${decan?.subPlanet || zodiac.planet})\n` +
      `🎂 পরবর্তী জন্মদিন: আর ${formatDigits(bday.days)} দিন বাকি (হবে ${formatDigits(bday.nextAge)} বছর)\n\n` +
      `🌐 লাইফ-টাইমলাইন ও হিস্টোরিক্যাল এজ অ্যানালাইজার দ্বারা বিশ্লেষিত`;
  } else {
    summary = `🌟 Life Timeline & Age Analysis 🌟\n` +
      `👤 Name: ${profile.name || 'Explorer'}\n` +
      `📅 Date of Birth: ${profile.day}/${profile.month}/${profile.year} (${bDayOfWeek})\n` +
      `⏳ Current Age: ${age.years} Years, ${age.months} Months, ${age.days} Days\n` +
      `⏱️ Total Elapsed: ${age.totalDays.toLocaleString('en-US')} Days (${age.totalHours.toLocaleString('en-US')} Hours)\n` +
      `✨ Zodiac Sign: ${zodiac.name} (${zodiac.sign}) • Decanate: ${decan?.decanNumber || 1}\n` +
      `🪐 Ruling Planet: ${zodiac.planet} (Sub-planet: ${decan?.subPlanet || zodiac.planet})\n` +
      `🎂 Next Birthday: in ${bday.days} Days (Turning ${bday.nextAge})\n\n` +
      `🌐 Analyzed by Life Timeline Pro`;
  }

  navigator.clipboard.writeText(summary)
    .then(() => showToast(t('summaryCopied')))
    .catch(() => showToast(t('summaryCopyFailed')));
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}

// Start application when DOM is ready in browser
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initApp);
}
