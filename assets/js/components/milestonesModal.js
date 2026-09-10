/**
 * Milestone Benchmark Modal Component
 * Compares user's age with historical achievements of famous personalities.
 */
import { mountModal, closeModal } from './modalManager.js';
import { renderBenchmarkTable } from './milestonesTable.js';
import { t } from '../i18n.js';

let currentUserAgeYears = 0;
let currentFilterNearOnly = false;

function getTemplate() {
  return `
  <div id="milestonesModal" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 hidden">
    <div id="milestonesModalBackdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"></div>
    <div class="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex items-center justify-between">
        <div class="flex items-center space-x-3.5">
          <div class="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl text-purple-600 dark:text-purple-400">
            🏆
          </div>
          <div>
            <h2 data-i18n="milestonesTitle" class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              "আপনার বয়সে তাঁরা যা করেছিলেন" (Milestone Benchmark)
            </h2>
            <p data-i18n="milestonesSub" class="text-xs text-slate-500 dark:text-slate-400">
              আপনার বর্তমান বয়সের সাথে মনীষীদের অর্জনের তুলনামূলক পর্যবেক্ষণ
            </p>
          </div>
        </div>
        <button type="button" id="closeMilestonesModalBtn"
          class="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-base font-bold transition-all shadow-sm cursor-pointer"
          title="বন্ধ করুন (Esc)">
          ✕
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950/40 flex items-center justify-between gap-3">
        <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">ফিল্টার নির্বাচন করুন:</span>
        <div class="flex items-center space-x-2">
          <button id="filterAllMilestones" type="button" data-i18n="filterAll"
            class="text-xs px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm transition-all cursor-pointer">
            ${t('filterAll') || 'সব দেখুন'}
          </button>
          <button id="filterNearMilestones" type="button" data-i18n="filterNear"
            class="text-xs px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all font-semibold cursor-pointer">
            ${t('filterNear') || 'আপনার বয়সের কাছাকাছি'}
          </button>
        </div>
      </div>

      <!-- Table Container -->
      <div class="flex-1 overflow-y-auto p-5 sm:p-6">
        <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-inner">
          <table class="w-full text-left border-collapse text-sm">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
                <th class="py-3.5 px-4 font-bold" data-i18n="thAge">বয়স (Age)</th>
                <th class="py-3.5 px-4 font-bold" data-i18n="thPerson">মনীষী / ব্যক্তিত্ব</th>
                <th class="py-3.5 px-4 font-bold" data-i18n="thField">ক্ষেত্র</th>
                <th class="py-3.5 px-4 font-bold" data-i18n="thAchievement">ঐতিহাসিক কীর্তি ও যুগান্তকারী অর্জন</th>
                <th class="py-3.5 px-4 font-bold text-right" data-i18n="thStatus">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody id="benchmarkTableBody" class="divide-y divide-slate-200 dark:divide-slate-800/60"></tbody>
          </table>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50 flex items-center justify-end">
        <button type="button" id="closeMilestonesFooterBtn" data-i18n="closeBtn"
          class="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer">
          ${t('closeBtn')}
        </button>
      </div>
    </div>
  </div>
  `;
}

export function openMilestonesModal(userAgeYears) {
  if (typeof userAgeYears === 'number') {
    currentUserAgeYears = userAgeYears;
  }

  mountModal('milestonesModal', getTemplate(), (modalEl) => {
    const closeBtn = modalEl.querySelector('#closeMilestonesModalBtn');
    const footerBtn = modalEl.querySelector('#closeMilestonesFooterBtn');
    const backdrop = modalEl.querySelector('#milestonesModalBackdrop');
    const btnAll = modalEl.querySelector('#filterAllMilestones');
    const btnNear = modalEl.querySelector('#filterNearMilestones');

    if (closeBtn) closeBtn.addEventListener('click', closeMilestonesModal);
    if (footerBtn) footerBtn.addEventListener('click', closeMilestonesModal);
    if (backdrop) backdrop.addEventListener('click', closeMilestonesModal);

    const updateFilterUI = (nearOnly) => {
      currentFilterNearOnly = nearOnly;
      if (btnAll && btnNear) {
        if (!nearOnly) {
          btnAll.className = "text-xs px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm transition-all cursor-pointer";
          btnNear.className = "text-xs px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all font-semibold cursor-pointer";
        } else {
          btnNear.className = "text-xs px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm transition-all cursor-pointer";
          btnAll.className = "text-xs px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all font-semibold cursor-pointer";
        }
      }
      renderBenchmarkTable(currentUserAgeYears, nearOnly);
    };

    if (btnAll) btnAll.addEventListener('click', () => updateFilterUI(false));
    if (btnNear) btnNear.addEventListener('click', () => updateFilterUI(true));
  });

  renderBenchmarkTable(currentUserAgeYears, currentFilterNearOnly);
}

export function closeMilestonesModal() {
  closeModal('milestonesModal');
}
