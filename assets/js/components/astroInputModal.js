/**
 * Stage 2: Astrological & Horoscope Coordinates Modal Component
 * Collects precise birth time, country, relationship, and name for deep cosmic insights.
 */
import { mountModal, closeModal } from './modalManager.js';
import { getState, saveProfile, setBirthDate, setUnlockLevel } from '../state.js';
import { getZodiac, calculateNextBirthday } from '../calculator.js';
import { renderBioCard } from './bioCard.js';
import { renderZodiacCard } from './countdown.js';
import { renderCompletionMeter } from './completionMeter.js';
import { openZodiacModal } from './zodiacModal.js';
import { getLanguage, t, formatDigits } from '../i18n.js';

function getTemplate() {
  return `
  <div id="astroInputModal" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 hidden">
    <div id="astroInputModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"></div>
    <div class="relative w-full max-w-2xl max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex items-center justify-between">
        <div class="flex items-center space-x-3.5">
          <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl text-cyan-600 dark:text-cyan-300 shadow-inner">
            🔮
          </div>
          <div>
            <h3 data-i18n="astroModalTitle" class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              জ্যোতির্বৈজ্ঞানিক ও কোষ্ঠী তথ্য ফর্ম
            </h3>
            <p data-i18n="astroModalSubtitle" class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              সঠিক লগ্ন, সাব-প্ল্যানেট ও সাপ্তাহিক ভবিষ্যৎবাণীর জন্য আপনার তথ্যগুলো প্রয়োজন।
            </p>
          </div>
        </div>
        <button type="button" id="closeAstroModalBtn"
          class="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-base font-bold transition-all shadow-sm cursor-pointer"
          title="বন্ধ করুন (Esc)">
          ✕
        </button>
      </div>

      <!-- Modal Body (Scrollable Form) -->
      <form id="astroCoordinatesForm" class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Full Name -->
          <div>
            <label for="astroUserName" data-i18n="userNameLabel"
              class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              আপনার পুরো নাম (Name)
            </label>
            <input type="text" id="astroUserName" placeholder="যেমন: মোঃ শাহ মাহমুদ" data-i18n-placeholder="userNamePlaceholder"
              class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm text-sm">
          </div>

          <!-- Gender -->
          <div>
            <label for="astroUserGender" data-i18n="userGenderLabel"
              class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              লিঙ্গ (Gender / Sex)
            </label>
            <select id="astroUserGender"
              class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm text-sm cursor-pointer">
              <option value="male" selected>👨 পুরুষ (Male)</option>
              <option value="female">👩 মহিলা (Female)</option>
              <option value="other">✨ অন্যান্য (Other)</option>
            </select>
          </div>

          <!-- Birth Time -->
          <div>
            <label for="astroBirthTime" data-i18n="birthTimeLabel"
              class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              জন্ম সময় (যদি জানা থাকে - ঐচ্ছিক)
            </label>
            <input type="time" id="astroBirthTime" value="00:00"
              class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm text-sm">
          </div>

          <!-- Region / Country -->
          <div>
            <label for="astroUserCountry" data-i18n="countryLabel"
              class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              দেশ / অঞ্চল (Region)
            </label>
            <select id="astroUserCountry"
              class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm text-sm cursor-pointer">
              <option value="BD" selected>🇧🇩 বাংলাদেশ (Bangladesh)</option>
              <option value="IN">🇮🇳 ভারত (India)</option>
              <option value="GLOBAL">🌐 বৈশ্বিক (Global / Others)</option>
            </select>
          </div>

          <!-- Relationship Status -->
          <div>
            <label for="astroUserRelationship" data-i18n="relLabel"
              class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              সম্পর্কের অবস্থা (Status)
            </label>
            <select id="astroUserRelationship"
              class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm text-sm cursor-pointer">
              <option value="single" selected>💎 সিঙ্গেল (Single)</option>
              <option value="relationship">❤️ সম্পর্কে আছেন (In a Relationship)</option>
              <option value="married">💍 বিবাহিত (Married)</option>
              <option value="living_together">🤝 লিভিং টুগেদার (Living Together)</option>
              <option value="divorced">🕊️ বিচ্ছেদপ্রাপ্ত (Divorced)</option>
              <option value="widowed">🥀 সঙ্গীহারা (Widowed)</option>
            </select>
          </div>

          <!-- Blood Group -->
          <div>
            <label for="astroUserBloodGroup" data-i18n="bloodGroupLabel"
              class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              রক্তের গ্রুপ (Blood Group)
            </label>
            <select id="astroUserBloodGroup"
              class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm text-sm cursor-pointer">
              <option value="unknown" selected>জানি না / উল্লেখ নেই (ঐচ্ছিক)</option>
              <option value="A+">🅰️ A+ (এ পজিটিভ)</option>
              <option value="A-">🅰️ A- (এ নেগেটিভ)</option>
              <option value="B+">🅱️ B+ (বি পজিটিভ)</option>
              <option value="B-">🅱️ B- (বি নেগেটিভ)</option>
              <option value="O+">🅾️ O+ (ও পজিটিভ)</option>
              <option value="O-">🅾️ O- (ও নেগেটিভ)</option>
              <option value="AB+">🆎 AB+ (এবি পজিটিভ)</option>
              <option value="AB-">🆎 AB- (এবি নেগেটিভ)</option>
            </select>
          </div>
        </div>

        <div class="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-800 dark:text-cyan-300 flex items-center gap-2">
          <span class="text-base">🔒</span>
          <span>আপনার সকল ব্যক্তিগত তথ্য সম্পূর্ণ সুরক্ষিত এবং কেবল আপনার ব্রাউজারের মেমোরিতেই সংরক্ষিত থাকে।</span>
        </div>

        <!-- Modal Footer -->
        <div class="pt-3 flex items-center justify-end space-x-3 border-t border-slate-200 dark:border-slate-800">
          <button type="button" id="cancelAstroModalBtn" data-i18n="modalCancelBtn"
            class="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all cursor-pointer">
            ${t('modalCancelBtn') || 'বাতিল করুন'}
          </button>
          <button type="submit" id="unlockAstroSubmitBtn"
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-cyan-600/30 transition-all flex items-center gap-2 cursor-pointer">
            <span data-i18n="unlockSubmitBtn">${t('unlockSubmitBtn') || '✨ সম্পূর্ণ রাশিফল ও কোষ্ঠী উন্মোচন করুন'}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
  `;
}

export function openAstroInputModal() {
  mountModal('astroInputModal', getTemplate(), (modalEl) => {
    const closeBtn = modalEl.querySelector('#closeAstroModalBtn');
    const cancelBtn = modalEl.querySelector('#cancelAstroModalBtn');
    const backdrop = modalEl.querySelector('#astroInputModalBackdrop');
    const form = modalEl.querySelector('#astroCoordinatesForm');

    if (closeBtn) closeBtn.addEventListener('click', closeAstroInputModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeAstroInputModal);
    if (backdrop) backdrop.addEventListener('click', closeAstroInputModal);

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const currentState = getState();
        if (!currentState.profile) return;

        const name = modalEl.querySelector('#astroUserName').value.trim();
        const gender = modalEl.querySelector('#astroUserGender').value;
        const time = modalEl.querySelector('#astroBirthTime').value || '00:00';
        const country = modalEl.querySelector('#astroUserCountry').value;
        const relationship = modalEl.querySelector('#astroUserRelationship').value;
        const bloodGroup = modalEl.querySelector('#astroUserBloodGroup').value;

        const updated = {
          ...currentState.profile,
          name,
          gender,
          time,
          country,
          relationship,
          bloodGroup,
          unlockLevel: 70
        };

        setUnlockLevel(70);
        saveProfile(updated);

        const [h, m] = (time || '00:00').split(':').map(Number);
        const newBirthDate = new Date(updated.year, updated.month - 1, updated.day, h || 0, m || 0, 0);
        setBirthDate(newBirthDate);

        const bday = calculateNextBirthday(newBirthDate);
        renderBioCard(updated, formatDigits(bday.days));
        renderZodiacCard(updated.month, updated.day, 70);
        renderCompletionMeter(70);

        closeAstroInputModal();

        const zodiac = getZodiac(updated.month, updated.day);
        openZodiacModal(zodiac, updated.month, updated.day, updated.year, relationship, gender, name, bloodGroup, newBirthDate);

        if (typeof window.showToast === 'function') {
          window.showToast(getLanguage() === 'bn' ? '✨ রাশিচক্র ও কোষ্ঠী তথ্য সফলভাবে আনলক করা হয়েছে!' : '✨ Horoscope & Zodiac Blueprint Successfully Unlocked!');
        }
      });
    }
  });

  // Pre-fill values
  const profile = getState().profile;
  if (profile) {
    const nameInput = document.getElementById('astroUserName');
    const genderSelect = document.getElementById('astroUserGender');
    const timeInput = document.getElementById('astroBirthTime');
    const countrySelect = document.getElementById('astroUserCountry');
    const relSelect = document.getElementById('astroUserRelationship');
    const bloodSelect = document.getElementById('astroUserBloodGroup');

    if (nameInput && profile.name) nameInput.value = profile.name;
    if (genderSelect && profile.gender) genderSelect.value = profile.gender;
    if (timeInput && profile.time) timeInput.value = profile.time;
    if (countrySelect && profile.country) countrySelect.value = profile.country;
    if (relSelect && profile.relationship) relSelect.value = profile.relationship;
    if (bloodSelect && profile.bloodGroup) bloodSelect.value = profile.bloodGroup;
  }
}

export function closeAstroInputModal() {
  closeModal('astroInputModal');
}
