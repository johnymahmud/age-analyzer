/**
 * Main Application Controller (Entry Point)
 */
import { initTheme } from './theme.js';
import { initAvatarUpload, getCurrentAvatar, setInitialAvatar } from './upload.js';
import { calculateExactAge, calculateNextBirthday, getZodiac, toBnDigits } from './calculator.js';
import { saveProfile, loadSavedProfile, clearProfile, getState, setBirthDate, setLiveTicker } from './state.js';
import { renderBioCard } from './components/bioCard.js';
import { updateAgeStats } from './components/ageStats.js';
import { updateBirthdayCountdown, renderZodiacCard } from './components/countdown.js';
import { renderHistoricalInsights } from './components/historicalView.js';
import { renderBenchmarkTable } from './components/milestonesTable.js';
import { initAdSlots } from './components/adSlots.js';

function initApp() {
  // 1. Initialize Theme (Light / Dark)
  initTheme();

  // 2. Initialize Ad Slots (Multi-platform: AdSense, Media.net, etc.)
  initAdSlots();

  // 3. Populate Days (1 to 31)
  populateDaysDropdown();

  // 4. Initialize Avatar Upload (click, drag-drop, canvas compression)
  initAvatarUpload((newAvatarBase64) => {
    const currentState = getState();
    if (currentState.profile) {
      currentState.profile.avatar = newAvatarBase64;
      saveProfile(currentState.profile);
      // Update result avatar if displayed
      const resAvatarImg = document.getElementById('resultAvatarImg');
      const resAvatarFallback = document.getElementById('resultAvatarFallback');
      if (newAvatarBase64) {
        if (resAvatarImg) {
          resAvatarImg.src = newAvatarBase64;
          resAvatarImg.classList.remove('hidden');
        }
        if (resAvatarFallback) resAvatarFallback.classList.add('hidden');
      } else {
        if (resAvatarImg) resAvatarImg.classList.add('hidden');
        if (resAvatarFallback) resAvatarFallback.classList.remove('hidden');
      }
    }
  });

  // 5. Restore Saved Data from localStorage
  const savedData = loadSavedProfile();
  if (savedData) {
    restoreFormData(savedData);
    if (savedData.day && savedData.month && savedData.year) {
      executeAnalysis(savedData, false);
    }
  }

  // 6. Bind Event Listeners
  setupEventListeners();
}

function populateDaysDropdown() {
  const dobDaySelect = document.getElementById('dobDay');
  if (!dobDaySelect) return;

  dobDaySelect.innerHTML = '<option value="" disabled selected>দিন নির্বাচন করুন</option>';
  for (let d = 1; d <= 31; d++) {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = `${toBnDigits(d)} তারিখ`;
    dobDaySelect.appendChild(opt);
  }
}

function restoreFormData(data) {
  const dobDaySelect = document.getElementById('dobDay');
  const dobMonthSelect = document.getElementById('dobMonth');
  const dobYearInput = document.getElementById('dobYear');
  const userCountrySelect = document.getElementById('userCountry');
  const userNameInput = document.getElementById('userName');
  const userGenderSelect = document.getElementById('userGender');
  const birthTimeInput = document.getElementById('birthTime');

  if (data.day && dobDaySelect) dobDaySelect.value = data.day;
  if (data.month && dobMonthSelect) dobMonthSelect.value = data.month;
  if (data.year && dobYearInput) dobYearInput.value = data.year;
  if (data.country && userCountrySelect) userCountrySelect.value = data.country;
  if (data.name && userNameInput) userNameInput.value = data.name;
  if (data.gender && userGenderSelect) userGenderSelect.value = data.gender;
  if (data.time && birthTimeInput) birthTimeInput.value = data.time;

  if (data.avatar) {
    setInitialAvatar(data.avatar);
  }
}

function setupEventListeners() {
  const form = document.getElementById('lifeTimelineForm');
  const resetBtn = document.getElementById('resetStorageBtn');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  const copySummaryBtn = document.getElementById('copySummaryBtn');
  const filterAll = document.getElementById('filterAllMilestones');
  const filterNear = document.getElementById('filterNearMilestones');

  // Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const day = parseInt(document.getElementById('dobDay').value, 10);
      const month = parseInt(document.getElementById('dobMonth').value, 10);
      const year = parseInt(document.getElementById('dobYear').value, 10);
      const country = document.getElementById('userCountry').value;
      const name = document.getElementById('userName').value.trim();
      const gender = document.getElementById('userGender').value;
      const time = document.getElementById('birthTime').value || '00:00';
      const avatar = getCurrentAvatar();

      if (!day || !month || !year) {
        alert('অনুগ্রহ করে দিন, মাস ও বছর সঠিকভাবে নির্বাচন করুন।');
        return;
      }

      const userData = { day, month, year, country, name, gender, time, avatar };
      executeAnalysis(userData, true);
    });
  }

  // Reset Storage Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('সংরক্ষিত সব তথ্য ও ছবি মুছে ফেলতে চান?')) {
        clearProfile();
        if (form) form.reset();
        setInitialAvatar('');
        const results = document.getElementById('resultsContainer');
        if (results) results.classList.add('hidden');
        showToast('সব লোকাল ডেটা রিসেট করা হয়েছে।');
      }
    });
  }

  // PDF Print Download
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => window.print());
  }

  // Copy Summary to Clipboard
  if (copySummaryBtn) {
    copySummaryBtn.addEventListener('click', () => {
      const currentState = getState();
      if (!currentState.birthDate || !currentState.profile) return;

      const profile = currentState.profile;
      const age = calculateExactAge(currentState.birthDate);
      const zodiac = getZodiac(profile.month, profile.day);
      const bday = calculateNextBirthday(currentState.birthDate);
      const genderLabel = profile.gender === 'female' ? 'মহিলা' : (profile.gender === 'other' ? 'অন্যান্য' : 'পুরুষ');

      const summary = `🌟 লাইফ-টাইমলাইন ও এজ অ্যানালাইসিস 🌟\n` +
        `👤 নাম: ${profile.name || 'ইউজার'} (${genderLabel})\n` +
        `📅 জন্মতারিখ: ${toBnDigits(profile.day)}/${toBnDigits(profile.month)}/${toBnDigits(profile.year)}\n` +
        `⏳ বর্তমান বয়স: ${toBnDigits(age.years)} বছর, ${toBnDigits(age.months)} মাস, ${toBnDigits(age.days)} দিন\n` +
        `⏱️ অতিবাহিত সময়: ${toBnDigits(age.totalDays.toLocaleString('en-US'))} দিন (${toBnDigits(age.totalHours.toLocaleString('en-US'))} ঘণ্টা)\n` +
        `✨ রাশিচক্র: ${zodiac.nameBn} (${zodiac.sign})\n` +
        `🎂 পরবর্তী জন্মদিন: আর ${toBnDigits(bday.days)} দিন বাকি (হবে ${toBnDigits(bday.nextAge)} বছর)\n\n` +
        `🌐 লাইফ-টাইমলাইন ও হিস্টোরিক্যাল এজ অ্যানালাইজার দ্বারা বিশ্লেষিত`;

      navigator.clipboard.writeText(summary)
        .then(() => showToast('সারাংশ ক্লিপবোর্ডে কপি করা হয়েছে!'))
        .catch(() => showToast('কপি করতে ব্যর্থ হয়েছে।'));
    });
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
  // Parse time
  const [h, m] = (data.time || '00:00').split(':').map(Number);
  const birthDate = new Date(data.year, data.month - 1, data.day, h || 0, m || 0, 0);

  setBirthDate(birthDate);
  saveProfile(data);

  const resultsContainer = document.getElementById('resultsContainer');
  if (resultsContainer) resultsContainer.classList.remove('hidden');

  // 1. Calculate next birthday & render Bio Card
  const bday = calculateNextBirthday(birthDate);
  renderBioCard(data, toBnDigits(bday.days));

  // 2. Render Zodiac details
  renderZodiacCard(data.month, data.day);

  // 3. Render Historical Insights & Milestones
  renderHistoricalInsights(data.month, data.day, data.year);
  renderBenchmarkTable(calculateExactAge(birthDate).years, false);

  // 4. Update Live Stats & Start Live Ticker
  const tick = () => {
    const bDate = getState().birthDate;
    if (!bDate) return;
    updateAgeStats(bDate);
    updateBirthdayCountdown(bDate);
  };
  tick();
  const intervalId = setInterval(tick, 1000);
  setLiveTicker(intervalId);

  // 5. Scroll smoothly to results
  if (shouldScroll && resultsContainer) {
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
