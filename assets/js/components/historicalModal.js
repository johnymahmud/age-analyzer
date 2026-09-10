/**
 * Historical Insights Modal Component
 * Displays famous personalities born on the same date and historical events of the era.
 */
import { mountModal, closeModal } from './modalManager.js';
import { renderHistoricalInsights } from './historicalView.js';
import { t } from '../i18n.js';

function getTemplate() {
  return `
  <div id="historicalModal" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 hidden">
    <div id="historicalModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"></div>
    <div class="relative w-full max-w-6xl max-h-[94vh] bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex items-center justify-between">
        <div class="flex items-center space-x-3.5">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl text-emerald-600 dark:text-emerald-400">
            📜
          </div>
          <div>
            <h2 data-i18n="historicalSectionTitle" class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              ঐতিহাসিক মেলবন্ধন (Historical Insights)
            </h2>
            <p data-i18n="historicalSectionSub" class="text-xs text-slate-500 dark:text-slate-400">
              আপনার জন্মদিনের তারিখে বিশ্ব ইতিহাসের বিশিষ্ট ব্যক্তিত্ব ও যুগান্তকারী ঘটনা
            </p>
          </div>
        </div>
        <button type="button" id="closeHistoricalModalBtn"
          class="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-base font-bold transition-all shadow-sm cursor-pointer"
          title="বন্ধ করুন (Esc)">
          ✕
        </button>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
        <!-- Personalities Grid -->
        <div class="space-y-3">
          <h3 data-i18n="famousPeopleTitle" class="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span>🌟</span>
            <span>আপনার জন্মদিনে জন্ম নেওয়া বিখ্যাত ব্যক্তিত্ব</span>
          </h3>
          <div id="famousPersonalitiesGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </div>

        <!-- Events Container -->
        <div class="space-y-3">
          <h3 data-i18n="eventsTitle" class="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span>📜</span>
            <span>উল্লেখযোগ্য ঐতিহাসিক ঘটনা ও আবিষ্কার</span>
          </h3>
          <div id="historicalEventsContainer" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50 flex items-center justify-end">
        <button type="button" id="closeHistoricalFooterBtn" data-i18n="closeBtn"
          class="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer">
          ${t('closeBtn')}
        </button>
      </div>
    </div>
  </div>
  `;
}

export function openHistoricalModal(month, day, year) {
  mountModal('historicalModal', getTemplate(), (modalEl) => {
    const closeBtn = modalEl.querySelector('#closeHistoricalModalBtn');
    const footerBtn = modalEl.querySelector('#closeHistoricalFooterBtn');
    const backdrop = modalEl.querySelector('#historicalModalBackdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeHistoricalModal);
    if (footerBtn) footerBtn.addEventListener('click', closeHistoricalModal);
    if (backdrop) backdrop.addEventListener('click', closeHistoricalModal);
  });

  if (month && day && year) {
    renderHistoricalInsights(month, day, year);
  }
}

export function closeHistoricalModal() {
  closeModal('historicalModal');
}
