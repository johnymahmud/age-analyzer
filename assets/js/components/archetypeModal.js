/**
 * Royal Archetype & Samudrika Shastra Modal Component
 * Stage 3: Biometric Canvas Scanner, Laser HUD Animation & 7 Royal Archetypes Dashboard
 */
import { analyzeImageAura, calculateArchetypeProfile } from './morphologyEngine.js';
import { SAMUDRIKA_FEATURES } from '../data/archetypes.js';
import { toBnDigits } from '../calculator.js';
import { setUnlockLevel, getState, saveProfile } from '../state.js';
import { renderCompletionMeter } from './completionMeter.js';
import { getLanguage, t, formatDigits } from '../i18n.js';
import { mountModal, closeModal } from './modalManager.js';

let currentArchetypeProfile = null;
let currentModalUserData = null;
let currentAvatar = null;
let stagedScanImage = null;

function getArchetypeModalTemplate() {
  const lang = getLanguage();
  return `
  <div id="archetypeModal" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 hidden">
    <div id="archetypeModalBackdrop" class="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"></div>
    <div class="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
      
      <!-- ==========================================
           VIEW 1: BIOMETRIC SCANNER & UPLOAD INTAKE
           ========================================== -->
      <div id="archetypeScannerIntakeView" class="flex-1 flex flex-col overflow-y-auto">
        <!-- Scanner Header -->
        <div class="p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-amber-950/50 to-slate-900 text-white flex items-center justify-between">
          <div class="flex items-center space-x-3.5">
            <div class="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl text-amber-400 shadow-inner">
              👑
            </div>
            <div>
              <h2 class="text-lg sm:text-xl font-extrabold text-amber-300">
                ${lang === 'bn' ? 'AI ফেসিয়াল অরা ও সামুদ্রিক আর্কিটাইপ স্ক্যানার' : 'AI Facial Aura & Archetype Scanner'}
              </h2>
              <p class="text-xs text-amber-200/80 mt-0.5">
                ${lang === 'bn' ? 'প্রাচীন সামুদ্রিক শাস্ত্রীয় লক্ষণ ও মহাজাগতিক ৭টি রাজকীয় আর্কিটাইপ স্ক্যান' : 'Scan ancient Samudrika traits and discover your Royal Persona'}
              </p>
            </div>
          </div>
          <button type="button" id="closeScannerIntakeBtn"
            class="w-10 h-10 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-base font-bold transition-all cursor-pointer shadow-sm"
            title="বন্ধ করুন (Esc)">
            ✕
          </button>
        </div>

        <!-- Scanner Body -->
        <div class="p-6 sm:p-8 space-y-6 flex-1 flex flex-col items-center justify-center">
          
          <!-- Central Interactive Dropzone / Laser Target Box -->
          <div id="scannerDropzoneContainer"
            class="relative w-full max-w-md aspect-square sm:aspect-[4/3] rounded-3xl bg-slate-900/90 border-2 border-dashed border-amber-500/50 hover:border-amber-400 overflow-hidden flex flex-col items-center justify-center p-4 transition-all duration-300 shadow-2xl cursor-pointer group">
            
            <!-- HUD Targeting Corner Brackets -->
            <div class="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400 pointer-events-none"></div>
            <div class="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400 pointer-events-none"></div>
            <div class="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400 pointer-events-none"></div>
            <div class="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400 pointer-events-none"></div>

            <!-- Background Biometric Grid (shown in idle & scanning) -->
            <div class="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

            <!-- Uploaded Image Preview -->
            <img id="scannerImagePreview" src="" alt="Scanner Target" class="w-full h-full object-cover rounded-2xl hidden z-0">

            <!-- Idle Placeholder Content -->
            <div id="scannerIdlePlaceholder" class="flex flex-col items-center justify-center text-center p-6 space-y-3 pointer-events-none z-10">
              <div class="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl text-amber-400 group-hover:scale-110 transition-transform shadow-lg">
                📸
              </div>
              <div>
                <h3 class="text-sm sm:text-base font-bold text-white mb-1">
                  ${lang === 'bn' ? 'ছবি নির্বাচন বা ড্র্যাগ করে ড্রপ করুন' : 'Upload or Drag & Drop Photo'}
                </h3>
                <p class="text-xs text-slate-400 max-w-xs">
                  ${lang === 'bn' ? 'আপনার মুখের স্পষ্ট ছবি বা সেলফি আপলোড করুন (১০০% প্রাইভেট ও ক্লায়েন্ট-সাইড)' : 'Upload a clear face photo or selfie (100% private in browser)'}
                </p>
              </div>
              <span class="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 group-hover:bg-amber-500/30 transition-all">
                ${lang === 'bn' ? '📁 ব্রাউজ করতে ক্লিক করুন' : '📁 Click to Browse'}
              </span>
            </div>

            <!-- Active Laser Scanner Animation Layer -->
            <div id="scannerActiveLaserLayer" class="absolute inset-0 pointer-events-none hidden z-20">
              <div class="scanner-laser-line"></div>
              <div class="absolute inset-0 bg-amber-500/10 scanner-grid-anim"></div>
              <div class="absolute inset-x-0 bottom-3 text-center">
                <span class="px-3 py-1 rounded-full bg-black/80 text-amber-300 text-[11px] font-mono font-bold border border-amber-400/40 shadow-lg">
                  ⚡ BIOMETRIC SCANNING ACTIVE
                </span>
              </div>
            </div>

            <input type="file" id="scannerPhotoFileInput" accept="image/jpeg,image/png,image/webp" class="hidden">
          </div>

          <!-- Live Scanning Progress & Status Bar -->
          <div id="scannerProgressArea" class="w-full max-w-md space-y-2.5 hidden">
            <div class="flex items-center justify-between text-xs">
              <span id="scannerStatusText" class="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span>পিক্সেল ও হিস্টোগ্রাম বিশ্লেষণ হচ্ছে...</span>
              </span>
              <span id="scannerPercentText" class="font-mono font-extrabold text-amber-500">০%</span>
            </div>
            <div class="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-amber-500/20 shadow-inner">
              <div id="scannerProgressBar" class="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 transition-all duration-300 shadow-md" style="width: 0%"></div>
            </div>
          </div>

          <!-- Scanner Action Controls -->
          <div id="scannerControlsArea" class="w-full max-w-md flex flex-col items-center gap-3">
            <button type="button" id="startLaserScanBtn"
              class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span>🔍</span>
              <span id="startScanBtnText">${lang === 'bn' ? 'ফেসিয়াল আর্কিটাইপ ও অরা স্ক্যান করুন' : 'Start Biometric Aura Scan'}</span>
            </button>

            <button type="button" id="skipPhotoScanBtn"
              class="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 underline font-medium transition-colors cursor-pointer">
              ${lang === 'bn' ? 'ছবি ছাড়া অ্যাস্ট্রো মরফোলজি দিয়ে বিশ্লেষণ দেখতে ক্লিক করুন' : 'Or analyze with default astrological morphology'}
            </button>
          </div>

        </div>
      </div>

      <!-- ==========================================
           VIEW 2: FULL REVEALED ARCHETYPE DASHBOARD
           ========================================== -->
      <div id="archetypeDashboardView" class="flex-1 flex flex-col overflow-hidden hidden">
        <!-- Dashboard Header -->
        <div class="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center space-x-4">
            <div id="archetypeDashboardAvatarBox" class="relative w-16 h-16 rounded-2xl bg-slate-800 border-2 border-amber-500/50 overflow-hidden flex items-center justify-center shadow-lg cursor-pointer hover:border-amber-400 transition-all group"
              title="নতুন ছবি দিয়ে পুনরায় স্ক্যান করতে ক্লিক করুন 📸">
              <img id="archetypeAvatarPreview" src="" alt="Avatar" class="w-full h-full object-cover hidden">
              <div id="archetypeAvatarFallback" class="text-3xl flex items-center justify-center text-amber-400">👑</div>
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                🔄
              </div>
            </div>

            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span id="archetypePrimaryIcon" class="text-2xl">👑</span>
                <h2 id="archetypePrimaryTitle" class="text-xl sm:text-2xl font-extrabold text-amber-300">রাজকীয় অধিপতি (The Sovereign)</h2>
              </div>
              <p id="archetypeTagline" class="text-xs text-amber-200/80 font-medium mt-0.5">জন্মগত শাসক, মহিমান্বিত ব্যক্তিত্ব ও অটল প্রতিষ্ঠাতা</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <button type="button" id="rescanPhotoBtn"
              class="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer">
              <span>🔄</span>
              <span>${lang === 'bn' ? 'পুনরায় স্ক্যান' : 'Rescan'}</span>
            </button>
            <button type="button" id="closeArchetypeDashboardBtn"
              class="w-10 h-10 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-lg font-bold transition-all shadow-sm cursor-pointer"
              title="বন্ধ করুন (Esc)">
              ✕
            </button>
          </div>
        </div>

        <!-- Dashboard Scrollable Body -->
        <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <!-- Top Archetype Overview & Quote -->
          <div class="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-slate-900/40 border border-amber-500/30 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span id="archetypeSecondaryBadge" class="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/30">
                সহকারী প্রভাব
              </span>
              <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                অরা বর্ণচ্ছটা: <strong id="archetypeAuraColorText" class="text-amber-600 dark:text-amber-400">গোল্ডেন অরা</strong>
              </span>
            </div>

            <blockquote id="archetypeQuoteText" class="text-xs sm:text-sm font-serif italic text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed"></blockquote>
            <p id="archetypeNatureText" class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"></p>
          </div>

          <!-- 6 Core Dimensional Metrics -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span>📊 মহাজাগতিক মেধার ৬টি ডাইমেনশন</span>
              </h4>
              <span class="text-[11px] text-slate-400">১০০% বায়োমেট্রিক ও অ্যাস্ট্রো স্কেল</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <!-- Leadership -->
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-800 dark:text-slate-200">👑 নেতৃত্ব ও রাজকীয় তেজ</span>
                  <span id="metricLeadershipText" class="font-mono font-bold text-amber-500">০%</span>
                </div>
                <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div id="metricLeadershipBar" class="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>

              <!-- Creativity -->
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-800 dark:text-slate-200">🎨 সৃজনশীলতা ও শিল্পবোধ</span>
                  <span id="metricCreativityText" class="font-mono font-bold text-pink-500">০%</span>
                </div>
                <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div id="metricCreativityBar" class="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>

              <!-- Spirituality -->
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-800 dark:text-slate-200">🔮 আধ্যাত্মিক অন্তর্দৃষ্টি</span>
                  <span id="metricSpiritualityText" class="font-mono font-bold text-purple-500">০%</span>
                </div>
                <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div id="metricSpiritualityBar" class="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>

              <!-- Magnetism -->
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-800 dark:text-slate-200">✨ বাচনভঙ্গি ও আকর্ষণ ক্ষমতা</span>
                  <span id="metricMagnetismText" class="font-mono font-bold text-cyan-500">০%</span>
                </div>
                <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div id="metricMagnetismBar" class="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>

              <!-- Willpower -->
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-800 dark:text-slate-200">⚔️ ইচ্ছাশক্তি ও মানসিক দৃঢ়তা</span>
                  <span id="metricWillpowerText" class="font-mono font-bold text-red-500">০%</span>
                </div>
                <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div id="metricWillpowerBar" class="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>

              <!-- Wisdom -->
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-800 dark:text-slate-200">🧠 দূরদর্শিতা ও প্রজ্ঞা</span>
                  <span id="metricWisdomText" class="font-mono font-bold text-emerald-500">০%</span>
                </div>
                <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div id="metricWisdomBar" class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Samudrika Shastra Facial Signatures -->
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span>📜 সামুদ্রিক লক্ষণ বিচার (Facial Morpho-Signatures)</span>
            </h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span class="text-slate-500 block font-semibold">মুখের গড়ন (Face Shape):</span>
                <p id="samudrikaFaceShapeText" class="font-medium text-slate-800 dark:text-slate-200"></p>
              </div>
              <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span class="text-slate-500 block font-semibold">দৃষ্টি ও চোখের অরা (Eyes):</span>
                <p id="samudrikaEyeAuraText" class="font-medium text-slate-800 dark:text-slate-200"></p>
              </div>
              <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span class="text-slate-500 block font-semibold">কপাল ও প্রজ্ঞা প্যালেস:</span>
                <p id="samudrikaForeheadText" class="font-medium text-slate-800 dark:text-slate-200"></p>
              </div>
            </div>
          </div>

          <!-- Strengths vs Challenges -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                💎 রাজকীয় শক্তি ও দক্ষতা
              </h4>
              <ul id="archetypeStrengthsList" class="space-y-1.5"></ul>
            </div>

            <div class="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                ⚠️ সচেতনতা ও ভারসাম্য রক্ষার দিক
              </h4>
              <ul id="archetypeChallengesList" class="space-y-1.5"></ul>
            </div>
          </div>

          <!-- Career & Domain Guidance -->
          <div class="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            <strong class="block mb-1">🏛️ সেরা কর্মক্ষেত্র ও সামাজিক ভূমিকা:</strong>
            <p id="archetypeDomainsText"></p>
          </div>

          <!-- Interactive Manual Tuner Mode -->
          <div class="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300">🎭 ম্যানুয়াল ফেসিয়াল টিউনিং (ঐচ্ছিক কাস্টমাইজার)</span>
              <span class="text-[10px] text-slate-400">লাইভ টিউন করে দেখতে পারেন</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label for="tuneFaceShape" class="block text-[11px] text-slate-500 mb-1">মুখের আকৃতি পরিবর্তন করুন:</label>
                <select id="tuneFaceShape" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200"></select>
              </div>
              <div>
                <label for="tuneEyeAura" class="block text-[11px] text-slate-500 mb-1">চোখ ও দৃষ্টির ধরন পরিবর্তন করুন:</label>
                <select id="tuneEyeAura" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200"></select>
              </div>
            </div>
          </div>
        </div>

        <!-- Dashboard Footer -->
        <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <button type="button" id="copyArchetypeCardBtn"
            class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer">
            <span>👑</span>
            <span>${lang === 'bn' ? 'রয়্যাল আর্কিটাইপ কার্ড কপি করুন' : 'Copy Archetype Card'}</span>
          </button>

          <button type="button" id="closeArchetypeModalFooterBtn"
            class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-all cursor-pointer">
            ${t('closeBtn') || 'বন্ধ করুন'}
          </button>
        </div>
      </div>

    </div>
  </div>
  `;
}

export function openArchetypeModal(userData, avatarBase64) {
  if (!userData) return;

  currentModalUserData = userData;
  currentAvatar = avatarBase64 || userData.avatar || '';
  stagedScanImage = currentAvatar;

  mountModal('archetypeModal', getArchetypeModalTemplate(), (modalEl) => {
    initArchetypeModalListeners(modalEl);

    const unlockLevel = getState().unlockLevel || 35;
    // If user is already level 100 and has profile, go straight to dashboard; otherwise show the interactive scanner intake
    if (unlockLevel >= 100 && currentAvatar) {
      showDashboardView(modalEl);
    } else {
      showScannerIntakeView(modalEl);
    }
  });
}

function showScannerIntakeView(modalEl) {
  const intakeView = modalEl.querySelector('#archetypeScannerIntakeView');
  const dashboardView = modalEl.querySelector('#archetypeDashboardView');
  if (intakeView) intakeView.classList.remove('hidden');
  if (dashboardView) dashboardView.classList.add('hidden');

  const preview = modalEl.querySelector('#scannerImagePreview');
  const placeholder = modalEl.querySelector('#scannerIdlePlaceholder');
  if (stagedScanImage && preview && placeholder) {
    preview.src = stagedScanImage;
    preview.classList.remove('hidden');
    placeholder.classList.add('hidden');
  }
}

function showDashboardView(modalEl) {
  const intakeView = modalEl.querySelector('#archetypeScannerIntakeView');
  const dashboardView = modalEl.querySelector('#archetypeDashboardView');
  if (intakeView) intakeView.classList.add('hidden');
  if (dashboardView) dashboardView.classList.remove('hidden');

  analyzeImageAura(currentAvatar, (visualFeatures) => {
    const profile = calculateArchetypeProfile(currentModalUserData, visualFeatures);
    currentArchetypeProfile = profile;
    renderArchetypeContent(profile, currentModalUserData, currentAvatar);
  });
}

function initArchetypeModalListeners(modalEl) {
  const closeIntakeBtn = modalEl.querySelector('#closeScannerIntakeBtn');
  const closeDashboardBtn = modalEl.querySelector('#closeArchetypeDashboardBtn');
  const footerCloseBtn = modalEl.querySelector('#closeArchetypeModalFooterBtn');
  const backdrop = modalEl.querySelector('#archetypeModalBackdrop');
  const copyBtn = modalEl.querySelector('#copyArchetypeCardBtn');
  const tuneFaceShape = modalEl.querySelector('#tuneFaceShape');
  const tuneEyeAura = modalEl.querySelector('#tuneEyeAura');
  const rescanBtn = modalEl.querySelector('#rescanPhotoBtn');
  const dashboardAvatarBox = modalEl.querySelector('#archetypeDashboardAvatarBox');

  const closeHandler = () => closeArchetypeModal();
  if (closeIntakeBtn) closeIntakeBtn.addEventListener('click', closeHandler);
  if (closeDashboardBtn) closeDashboardBtn.addEventListener('click', closeHandler);
  if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeHandler);
  if (backdrop) backdrop.addEventListener('click', closeHandler);

  if (rescanBtn) rescanBtn.addEventListener('click', () => showScannerIntakeView(modalEl));
  if (dashboardAvatarBox) dashboardAvatarBox.addEventListener('click', () => showScannerIntakeView(modalEl));

  if (copyBtn) copyBtn.addEventListener('click', handleCopyArchetypePersona);
  if (tuneFaceShape) tuneFaceShape.addEventListener('change', handleManualTuning);
  if (tuneEyeAura) tuneEyeAura.addEventListener('change', handleManualTuning);

  // File Upload Handling on Dropzone
  const dropzone = modalEl.querySelector('#scannerDropzoneContainer');
  const fileInput = modalEl.querySelector('#scannerPhotoFileInput');
  const preview = modalEl.querySelector('#scannerImagePreview');
  const placeholder = modalEl.querySelector('#scannerIdlePlaceholder');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    
    // Drag & Drop
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('border-amber-400', 'bg-slate-800');
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('border-amber-400', 'bg-slate-800');
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('border-amber-400', 'bg-slate-800');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImageFile(e.target.files[0]);
      }
    });
  }

  function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      stagedScanImage = base64;
      if (preview) {
        preview.src = base64;
        preview.classList.remove('hidden');
      }
      if (placeholder) placeholder.classList.add('hidden');
    };
    reader.readAsDataURL(file);
  }

  // Laser Scan Execution
  const startScanBtn = modalEl.querySelector('#startLaserScanBtn');
  const skipScanBtn = modalEl.querySelector('#skipPhotoScanBtn');

  if (startScanBtn) {
    startScanBtn.addEventListener('click', () => {
      runBiometricLaserScan(modalEl, stagedScanImage);
    });
  }

  if (skipScanBtn) {
    skipScanBtn.addEventListener('click', () => {
      runBiometricLaserScan(modalEl, '');
    });
  }
}

function runBiometricLaserScan(modalEl, imageToScan) {
  const lang = getLanguage();
  const laserLayer = modalEl.querySelector('#scannerActiveLaserLayer');
  const progressArea = modalEl.querySelector('#scannerProgressArea');
  const controlsArea = modalEl.querySelector('#scannerControlsArea');
  const statusText = modalEl.querySelector('#scannerStatusText');
  const percentText = modalEl.querySelector('#scannerPercentText');
  const progressBar = modalEl.querySelector('#scannerProgressBar');

  if (laserLayer) laserLayer.classList.remove('hidden');
  if (progressArea) progressArea.classList.remove('hidden');
  if (controlsArea) controlsArea.classList.add('hidden');

  const steps = [
    {
      pct: 25,
      msg: lang === 'bn' ? 'ক্যানভাস পিক্সেল ও কালার হিস্টোগ্রাম বিশ্লেষণ হচ্ছে...' : 'Analyzing offscreen canvas pixels & luma histogram...'
    },
    {
      pct: 55,
      msg: lang === 'bn' ? 'সামুদ্রিক লক্ষণ বিচার ও ফেসিয়াল অনুপাত পরিমাপ...' : 'Measuring Samudrika facial ratios & forehead palace...'
    },
    {
      pct: 85,
      msg: lang === 'bn' ? '৭টি রাজকীয় মহাজাগতিক আর্কিটাইপ ও ৬টি মেধা ডাইমেনশন গণনা...' : 'Mapping 7 Royal Archetypes & 6 Core Dimensions...'
    },
    {
      pct: 100,
      msg: lang === 'bn' ? 'স্ক্যান সম্পন্ন! আর্কিটাইপ ব্লুপ্রিন্ট প্রস্তুত ✓' : 'Scan Complete! 100% Royal Persona Unlocked ✓'
    }
  ];

  let currentStep = 0;

  function advanceStep() {
    if (currentStep < steps.length) {
      const s = steps[currentStep];
      if (statusText) {
        statusText.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span><span>[${currentStep + 1}/4] ${s.msg}</span>`;
      }
      if (percentText) percentText.textContent = `${formatDigits(s.pct)}%`;
      if (progressBar) progressBar.style.width = `${s.pct}%`;

      currentStep++;
      if (currentStep < steps.length) {
        setTimeout(advanceStep, 600);
      } else {
        setTimeout(() => {
          completeScan(modalEl, imageToScan);
        }, 500);
      }
    }
  }

  advanceStep();
}

function completeScan(modalEl, finalAvatar) {
  currentAvatar = finalAvatar || '';
  
  // Persist avatar to app state
  const currentState = getState();
  if (currentState.profile) {
    currentState.profile.avatar = currentAvatar;
    currentState.profile.unlockLevel = 100;
    saveProfile(currentState.profile);

    // Update avatar on user bio card
    const avatarImg = document.getElementById('resultAvatarImg');
    const avatarFallback = document.getElementById('resultAvatarFallback');
    if (currentAvatar && avatarImg) {
      avatarImg.src = currentAvatar;
      avatarImg.classList.remove('hidden');
      if (avatarFallback) avatarFallback.classList.add('hidden');
    }
  }

  // Unlock Level 100 in Gamification Meter
  setUnlockLevel(100);
  renderCompletionMeter(100);

  // Update Card 4 Hook Badge & Button
  const archBadge = document.getElementById('hookArchetypeBadge');
  const archBtnText = document.getElementById('hookArchetypeBtnText');
  if (archBadge) {
    archBadge.textContent = t('hookArchetypeCardBadgeUnlocked');
    archBadge.className = "text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20";
  }
  if (archBtnText) {
    archBtnText.textContent = getLanguage() === 'bn' ? 'আর্কিটাইপ ড্যাশবোর্ড ↗' : 'View Archetype ↗';
  }

  // Switch to Dashboard View
  showDashboardView(modalEl);

  if (typeof window.showToast === 'function') {
    window.showToast(getLanguage() === 'bn' ? '👑 ফেসিয়াল আর্কিটাইপ ও সামুদ্রিক ব্লুপ্রিন্ট সফলভাবে স্ক্যান হয়েছে!' : '👑 Royal Archetype Persona Successfully Scanned!');
  }
}

export function closeArchetypeModal() {
  closeModal('archetypeModal');
}

function renderArchetypeContent(profile, userData, avatarBase64) {
  const { primaryArchetype, secondaryArchetype, metrics, samudrika } = profile;

  // Avatar View
  const avatarImg = document.getElementById('archetypeAvatarPreview');
  const avatarFallback = document.getElementById('archetypeAvatarFallback');
  if (avatarBase64) {
    if (avatarImg) {
      avatarImg.src = avatarBase64;
      avatarImg.classList.remove('hidden');
    }
    if (avatarFallback) avatarFallback.classList.add('hidden');
  } else {
    if (avatarImg) avatarImg.classList.add('hidden');
    if (avatarFallback) {
      avatarFallback.classList.remove('hidden');
      avatarFallback.textContent = primaryArchetype.icon;
    }
  }

  // Header and Archetype Badge
  const titleEl = document.getElementById('archetypePrimaryTitle');
  const iconEl = document.getElementById('archetypePrimaryIcon');
  const taglineEl = document.getElementById('archetypeTagline');
  const auraText = document.getElementById('archetypeAuraColorText');
  const secondaryEl = document.getElementById('archetypeSecondaryBadge');
  const quoteEl = document.getElementById('archetypeQuoteText');
  const natureEl = document.getElementById('archetypeNatureText');
  const domainsEl = document.getElementById('archetypeDomainsText');

  if (titleEl) titleEl.textContent = primaryArchetype.nameBn;
  if (iconEl) iconEl.textContent = primaryArchetype.icon;
  if (taglineEl) taglineEl.textContent = primaryArchetype.tagline;
  if (auraText) auraText.textContent = primaryArchetype.auraColor;
  if (secondaryEl) {
    secondaryEl.textContent = `সহকারী প্রভাব: ${secondaryArchetype.icon} ${secondaryArchetype.nameBn}`;
  }
  if (quoteEl) quoteEl.textContent = primaryArchetype.quote;
  if (natureEl) natureEl.textContent = primaryArchetype.nature;
  if (domainsEl) domainsEl.textContent = primaryArchetype.domains;

  // 6 Metric Bars
  setMetricBar('metricCreativity', metrics.creativity);
  setMetricBar('metricLeadership', metrics.leadership);
  setMetricBar('metricSpirituality', metrics.spirituality);
  setMetricBar('metricMagnetism', metrics.magnetism);
  setMetricBar('metricWillpower', metrics.willpower);
  setMetricBar('metricWisdom', metrics.wisdom);

  // Samudrika Shastra Facial Features
  const fShape = document.getElementById('samudrikaFaceShapeText');
  const fEye = document.getElementById('samudrikaEyeAuraText');
  const fForehead = document.getElementById('samudrikaForeheadText');

  if (fShape) fShape.textContent = `${samudrika.faceShape.nameBn} — ${samudrika.faceShape.traitBn}`;
  if (fEye) fEye.textContent = `${samudrika.eyeAura.nameBn} — ${samudrika.eyeAura.traitBn}`;
  if (fForehead) fForehead.textContent = `${samudrika.foreheadAura.nameBn} — ${samudrika.foreheadAura.traitBn}`;

  // Strengths & Challenges List
  const sList = document.getElementById('archetypeStrengthsList');
  const cList = document.getElementById('archetypeChallengesList');

  if (sList && primaryArchetype.strengths) {
    sList.innerHTML = primaryArchetype.strengths.map(s => `
      <li class="flex items-start gap-2 text-xs sm:text-sm text-emerald-800 dark:text-emerald-200">
        <span class="text-emerald-500 font-bold">✦</span>
        <span>${s}</span>
      </li>
    `).join('');
  }

  if (cList && primaryArchetype.challenges) {
    cList.innerHTML = primaryArchetype.challenges.map(c => `
      <li class="flex items-start gap-2 text-xs sm:text-sm text-amber-800 dark:text-amber-200">
        <span class="text-amber-500 font-bold">⚠️</span>
        <span>${c}</span>
      </li>
    `).join('');
  }

  // Populate manual tuning dropdowns
  populateTuningDropdowns(samudrika);
}

function setMetricBar(idPrefix, value) {
  const textEl = document.getElementById(`${idPrefix}Text`);
  const barEl = document.getElementById(`${idPrefix}Bar`);
  if (textEl) textEl.textContent = `${toBnDigits(value)}%`;
  if (barEl) barEl.style.width = `${value}%`;
}

function populateTuningDropdowns(samudrika) {
  const shapeSelect = document.getElementById('tuneFaceShape');
  const eyeSelect = document.getElementById('tuneEyeAura');

  if (shapeSelect && shapeSelect.children.length === 0) {
    shapeSelect.innerHTML = SAMUDRIKA_FEATURES.faceShapes.map(f => `
      <option value="${f.id}" ${f.id === samudrika.faceShape.id ? 'selected' : ''}>${f.nameBn}</option>
    `).join('');
  }

  if (eyeSelect && eyeSelect.children.length === 0) {
    eyeSelect.innerHTML = SAMUDRIKA_FEATURES.eyeAuras.map(e => `
      <option value="${e.id}" ${e.id === samudrika.eyeAura.id ? 'selected' : ''}>${e.nameBn}</option>
    `).join('');
  }
}

function handleManualTuning() {
  if (!currentModalUserData) return;
  const shapeVal = document.getElementById('tuneFaceShape')?.value;
  const eyeVal = document.getElementById('tuneEyeAura')?.value;

  const shapeObj = SAMUDRIKA_FEATURES.faceShapes.find(s => s.id === shapeVal) || SAMUDRIKA_FEATURES.faceShapes[0];
  const eyeObj = SAMUDRIKA_FEATURES.eyeAuras.find(e => e.id === eyeVal) || SAMUDRIKA_FEATURES.eyeAuras[0];

  const profile = calculateArchetypeProfile(currentModalUserData, {
    brightness: 140,
    warmth: shapeVal === 'square' || shapeVal === 'oblong' ? 1.3 : 0.9,
    symmetry: 92
  });

  profile.samudrika.faceShape = shapeObj;
  profile.samudrika.eyeAura = eyeObj;
  currentArchetypeProfile = profile;

  renderArchetypeContent(profile, currentModalUserData, currentAvatar);
}

function handleCopyArchetypePersona() {
  if (!currentArchetypeProfile || !currentModalUserData) return;
  const { primaryArchetype, secondaryArchetype, metrics } = currentArchetypeProfile;
  const name = currentModalUserData.name || 'ইউজার';

  const text = `👑 রয়্যাল অ্যাস্ট্রো-মরফোলজি ও আর্কিটাইপ কার্ড 👑\n` +
    `👤 নাম: ${name}\n` +
    `✨ প্রধান আর্কিটাইপ: ${primaryArchetype.icon} ${primaryArchetype.nameBn}\n` +
    `🔮 অরা বর্ণচ্ছটা: ${primaryArchetype.auraColor}\n` +
    `📜 মহাজাগতিক পরিচয়: ${primaryArchetype.tagline}\n` +
    `📊 মেধার মাত্রা:\n` +
    ` • নেতৃত্ব ও তেজ: ${toBnDigits(metrics.leadership)}%\n` +
    ` • সৃজনশীলতা ও শিল্পবোধ: ${toBnDigits(metrics.creativity)}%\n` +
    ` • আধ্যাত্মিক অন্তর্দৃষ্টি: ${toBnDigits(metrics.spirituality)}%\n` +
    ` • বাচনভঙ্গি ও চার্ম: ${toBnDigits(metrics.magnetism)}%\n` +
    ` • ইচ্ছাশক্তি ও স্থায়িত্ব: ${toBnDigits(metrics.willpower)}%\n` +
    ` • দূরদর্শিতা ও প্রজ্ঞা: ${toBnDigits(metrics.wisdom)}%\n\n` +
    `🌐 লাইফ-টাইমলাইন ও হিস্টোরিক্যাল এজ অ্যানালাইজার`;

  navigator.clipboard.writeText(text)
    .then(() => alert('রয়্যাল আর্কিটাইপ কার্ড সফলভাবে কপি করা হয়েছে!'))
    .catch(() => alert('কপি করতে ব্যর্থ হয়েছে।'));
}
