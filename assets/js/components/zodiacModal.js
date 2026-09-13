import { 
  getDecan, 
  calculateTravelIndex, 
  getBirthDayRuler, 
  calculateSignCompatibility, 
  getBioAstroHealth, 
  getGoldenHours, 
  getZodiacById, 
  toBnDigits 
} from '../calculator.js';
import { ZODIAC_DATA } from '../data/zodiac.js';
import { mountModal, closeModal } from './modalManager.js';

const BENGALI_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

const RELATIONSHIP_LABELS = {
  single: "💎 সিঙ্গেল (Single)",
  relationship: "❤️ প্রেম / সম্পর্কে আছেন (In a Relationship)",
  married: "💍 বিবাহিত (Married)",
  living_together: "🤝 লিভিং টুগেদার (Living Together)",
  divorced: "🕊️ বিচ্ছেদপ্রাপ্ত (Divorced)",
  widowed: "🥀 সঙ্গীহারা (Widowed)"
};

let currentModalZodiac = null;
let currentModalUserData = null;
let currentActiveTab = 'personality';

function getZodiacModalTemplate() {
  return `
  <div id="zodiacModal" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 hidden">
    <div id="zodiacModalBackdrop" class="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"></div>
    <div class="relative w-full max-w-6xl h-[92vh] max-h-[850px] min-h-[520px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div id="modalZodiacSymbol"
            class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl text-cyan-600 dark:text-cyan-300 shadow-inner">
            ♈
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <h2 id="modalZodiacName" class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">মেষ (Aries)</h2>
              <div id="modalUserRelBadge"></div>
            </div>
            <p id="modalZodiacMeta" class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">উপাদান: অগ্নি | শাসক গ্রহ: মঙ্গল</p>
          </div>
        </div>

        <button type="button" id="closeZodiacModalBtn"
          class="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-lg font-bold transition-all shadow-sm cursor-pointer"
          title="বন্ধ করুন (Esc)">
          ✕
        </button>
      </div>

      <!-- Main Layout Body: Left Sidebar Tabs + Right Content Panel -->
      <div class="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        <!-- Tab Navigation Sidebar (Vertical on Desktop, Horizontal Scroll on Mobile) -->
        <aside class="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-3 sm:p-4 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto no-scrollbar">
          <div class="hidden lg:block pb-2 mb-1 border-b border-slate-200/80 dark:border-slate-800/80">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3">রাশিচক্র সূচিপত্র</span>
          </div>
          <button type="button" class="zodiac-tab-btn" data-tab="personality">
            <span class="text-base shrink-0">🌟</span>
            <span class="truncate">ব্যক্তিত্ব ও স্বভাব</span>
          </button>
          <button type="button" class="zodiac-tab-btn" data-tab="planets">
            <span class="text-base shrink-0">🪐</span>
            <span class="truncate">গ্রহ ও দ্রেক্বাণ</span>
          </button>
          <button type="button" class="zodiac-tab-btn" data-tab="travel">
            <span class="text-base shrink-0">✈️</span>
            <span class="truncate">বিদেশ ভ্রমণ ভাগ্য</span>
          </button>
          <button type="button" class="zodiac-tab-btn" data-tab="relationship">
            <span class="text-base shrink-0">❤️</span>
            <span class="truncate">প্রেম ও পার্টনার ম্যাচিং</span>
          </button>
          <button type="button" class="zodiac-tab-btn" data-tab="health">
            <span class="text-base shrink-0">🩸</span>
            <span class="truncate">বায়ো-অ্যাস্ট্রো ও স্বাস্থ্য</span>
          </button>
          <button type="button" class="zodiac-tab-btn" data-tab="weekly">
            <span class="text-base shrink-0">📅</span>
            <span class="truncate">সাপ্তাহিক পূর্বাভাস</span>
          </button>
          <button type="button" class="zodiac-tab-btn" data-tab="lucky">
            <span class="text-base shrink-0">🔮</span>
            <span class="truncate">শুভ বিষয় ও রত্ন</span>
          </button>
        </aside>

        <!-- Modal Body (Scrollable Tab Contents) -->
        <main class="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 min-h-0 bg-white dark:bg-slate-900">
          <!-- Tab 1: Personality & Traits -->
          <div id="zodiacTab_personality" class="zodiac-tab-panel space-y-5">
          <div class="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-900 dark:text-cyan-200">
            <span class="text-xs font-bold uppercase tracking-wider block mb-1">মূল চালিকাশক্তি ও স্বভাব</span>
            <p id="modalTraitNature" class="text-sm font-medium leading-relaxed"></p>
          </div>

          <div class="bg-slate-50 dark:bg-slate-950/50 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <span>🧬 মনস্তাত্ত্বিক রূপরেখা ও বৈশিষ্ট্য</span>
            </h4>
            <p id="modalTraitPersonality" class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"></p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <span>💎 শক্তি ও ইতিবাচক দিক (পজিটিভিটি)</span>
              </h4>
              <ul id="modalStrengthsList" class="space-y-2"></ul>
            </div>

            <div class="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
              <h4 class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️ দুর্বলতা ও সতর্কতার দিক (নেগেটিভিটি)</span>
              </h4>
              <ul id="modalWeaknessesList" class="space-y-2"></ul>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-300 block mb-2">💡 যা করবেন (করণীয়)</span>
              <ul id="modalDosList" class="space-y-1.5"></ul>
            </div>
            <div class="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-300 block mb-2">🚫 যা এড়িয়ে চলবেন (বর্জনীয়)</span>
              <ul id="modalDontsList" class="space-y-1.5"></ul>
            </div>
          </div>
        </div>

        <!-- Tab 2: Planetary Alignment & Decanates -->
        <div id="zodiacTab_planets" class="zodiac-tab-panel space-y-5 hidden">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/30 via-slate-900/50 to-purple-900/30 border border-indigo-500/30 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                🪐 আপনার দ্রেক্বাণ (Decanate Sub-Ruler)
              </span>
              <span id="modalDecanRange" class="text-xs text-slate-400 font-semibold"></span>
            </div>
            <h3 id="modalDecanTitle" class="text-lg font-bold text-slate-100"></h3>
            <p id="modalDecanSubPlanet" class="text-xs text-indigo-300 font-mono font-medium"></p>
            <p id="modalDecanTraits" class="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800"></p>
          </div>

          <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">☀️ জন্মবারের মহাজাগতিক সংযোগ (Cosmic Day Ruler)</span>
              <span id="modalDayRulerPlanet" class="text-xs font-bold text-amber-700 dark:text-amber-300 font-mono"></span>
            </div>
            <h4 id="modalDayRulerTitle" class="text-sm font-bold text-slate-800 dark:text-slate-200"></h4>
            <p id="modalDayRulerTraits" class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"></p>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <p class="leading-relaxed">
              <strong class="text-slate-800 dark:text-slate-200">দ্রেক্বাণ (Decanate) বিজ্ঞান:</strong> প্রতিটি রাশি ৩০ দিনব্যাপী বিস্তৃত এবং প্রতি ১০ দিন অন্তর একটি নির্দিষ্ট উপ-গ্রহের (Sub-ruler) প্রভাব থাকে। এ কারণেই একই রাশির জাতক হওয়া সত্ত্বেও জন্মতারিখের পার্থক্যের কারণে তাদের স্বভাব ও ভাগ্যে পরিবর্তন ঘটে।
            </p>
          </div>

          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">এই রাশির ৩টি দ্রেক্বাণ উপ-বিভাগ:</h4>
            <div id="modalAllDecansList" class="space-y-2"></div>
          </div>
        </div>

        <!-- Tab 3: Foreign Travel & Relocation -->
        <div id="zodiacTab_travel" class="zodiac-tab-panel space-y-5 hidden">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-cyan-900/30 via-slate-900/50 to-blue-900/30 border border-cyan-500/30 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">অভিবাসন ও বিদেশ গমন যোগ</span>
                <h3 class="text-lg font-bold text-slate-100">বিদেশ ভ্রমণ ও উচ্চশিক্ষা সম্ভাবনা সূচক</h3>
              </div>
              <div id="modalTravelScoreText" class="text-3xl font-extrabold text-cyan-400 font-mono">০%</div>
            </div>

            <div class="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div id="modalTravelScoreBar" class="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-1000" style="width: 0%"></div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">ভ্রমণের প্রকৃতি ও সাফল্য ক্ষেত্র</span>
              <p id="modalTravelType" class="text-sm font-bold text-slate-800 dark:text-slate-200"></p>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">অনুকূল দিক ও অঞ্চল</span>
              <p id="modalTravelDirections" class="text-sm font-bold text-slate-800 dark:text-slate-200"></p>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-950 dark:text-indigo-200 text-xs sm:text-sm leading-relaxed">
            <span class="font-bold block mb-1">✈️ জ্যোতিষশাস্ত্রীয় ভ্রমণ বিশ্লেষণ:</span>
            <p id="modalTravelInsight"></p>
          </div>
        </div>

        <!-- Tab 4: Relationship & Partner Matcher -->
        <div id="zodiacTab_relationship" class="zodiac-tab-panel space-y-5 hidden">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-rose-900/30 via-slate-900/50 to-purple-900/30 border border-rose-500/30 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-rose-400">প্রেম ও সম্পর্ক নির্দেশনা</span>
              <span id="modalRelStatusBadge" class="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30"></span>
            </div>
            <p id="modalRelAdviceText" class="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800"></p>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>💞 লাইভ পার্টনার ম্যাচিং সিমুলেটর</span>
                </h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">যেকোনো একটি রাশি নির্বাচন করে তাৎক্ষণিক সামঞ্জস্য ও বোঝাপড়ার স্কোর দেখুন</p>
              </div>

              <div class="min-w-[180px]">
                <select id="partnerSignSelect"
                  class="w-full bg-white dark:bg-slate-900 border border-indigo-500/40 rounded-xl px-3.5 py-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
                </select>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 space-y-3">
              <div class="flex items-center justify-between">
                <span id="partnerScoreLabel" class="text-xs font-bold text-indigo-600 dark:text-indigo-400"></span>
                <span id="partnerScoreText" class="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">০%</span>
              </div>
              <div class="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div id="partnerScoreBar" class="h-full rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 transition-all duration-700" style="width: 0%"></div>
              </div>

              <div class="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div class="p-2 rounded-lg bg-slate-100 dark:bg-slate-950">
                  <span class="text-[10px] text-slate-500 block">রোমান্স ও টান</span>
                  <span id="partnerRomanceScore" class="font-bold text-rose-500 font-mono">০%</span>
                </div>
                <div class="p-2 rounded-lg bg-slate-100 dark:bg-slate-950">
                  <span class="text-[10px] text-slate-500 block">যোগাযোগ</span>
                  <span id="partnerCommScore" class="font-bold text-cyan-500 font-mono">০%</span>
                </div>
                <div class="p-2 rounded-lg bg-slate-100 dark:bg-slate-950">
                  <span class="text-[10px] text-slate-500 block">দীর্ঘমেয়াদী স্থায়িত্ব</span>
                  <span id="partnerStabScore" class="font-bold text-emerald-500 font-mono">০%</span>
                </div>
              </div>

              <p id="partnerInsightText" class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1"></p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">❤️ সহজাত সেরা মেলবন্ধন (Best Match)</span>
              <p id="modalBestMatch" class="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200"></p>
            </div>
            <div class="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <span class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">⚡ সতর্ক থাকার রাশি (Challenging)</span>
              <p id="modalChallengingMatch" class="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200"></p>
            </div>
          </div>
        </div>

        <!-- Tab 5: Bio-Astro Health & Nutrition -->
        <div id="zodiacTab_health" class="zodiac-tab-panel space-y-5 hidden">
          <div id="bioAstroHealthContent"></div>
        </div>

        <!-- Tab 6: Weekly Prediction & Golden Hours -->
        <div id="zodiacTab_weekly" class="zodiac-tab-panel space-y-5 hidden">
          <div class="flex items-center justify-between p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs">
            <span class="font-bold text-cyan-700 dark:text-cyan-300">📅 বর্তমান ক্যালেন্ডার সপ্তাহিক পূর্বাভাস</span>
            <span id="modalWeeklyDateRange" class="font-semibold text-slate-600 dark:text-slate-400 font-mono"></span>
          </div>

          <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span class="font-bold text-amber-800 dark:text-amber-300">☀️ আজকের শুভ কর্মঘণ্টা (Power Window):</span>
            <span id="modalGoldenHoursText" class="font-mono font-bold text-amber-900 dark:text-amber-200"></span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <span>💼</span>
                <h4 class="text-xs font-bold uppercase tracking-wider">কর্ম ও ক্যারিয়ার</h4>
              </div>
              <p id="modalWeeklyCareer" class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"></p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <span>💰</span>
                <h4 class="text-xs font-bold uppercase tracking-wider">আর্থিক ভাগ্য</h4>
              </div>
              <p id="modalWeeklyFinance" class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"></p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div class="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <span>🌿</span>
                <h4 class="text-xs font-bold uppercase tracking-wider">স্বাস্থ্য ও প্রশান্তি</h4>
              </div>
              <p id="modalWeeklyWellness" class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"></p>
            </div>
          </div>
        </div>

        <!-- Tab 7: Lucky Elements -->
        <div id="zodiacTab_lucky" class="zodiac-tab-panel space-y-5 hidden">
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-center">
              <span class="text-2xl block mb-1">🔢</span>
              <span class="text-[11px] text-slate-500 dark:text-slate-400 block">শুভ সংখ্যা</span>
              <p id="modalLuckyNumbers" class="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono mt-1"></p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-center">
              <span class="text-2xl block mb-1">🎨</span>
              <span class="text-[11px] text-slate-500 dark:text-slate-400 block">শুভ রং</span>
              <p id="modalLuckyColors" class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1"></p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-center">
              <span class="text-2xl block mb-1">💎</span>
              <span class="text-[11px] text-slate-500 dark:text-slate-400 block">উপযুক্ত রত্নপাথর</span>
              <p id="modalLuckyGemstone" class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1"></p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-center">
              <span class="text-2xl block mb-1">🗓️</span>
              <span class="text-[11px] text-slate-500 dark:text-slate-400 block">শুভ বার</span>
              <p id="modalLuckyDay" class="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1"></p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-center">
              <span class="text-2xl block mb-1">🪙</span>
              <span class="text-[11px] text-slate-500 dark:text-slate-400 block">শুভ ধাতু</span>
              <p id="modalLuckyMetal" class="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1"></p>
            </div>
          </div>
        </div>
        </main>
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div class="flex items-center space-x-2">
          <span class="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          <span>উন্নত জ্যোতির্বৈজ্ঞানিক ও রাশিফল ইঞ্জিন</span>
        </div>

        <button type="button" id="closeZodiacModalFooterBtn"
          class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-all cursor-pointer">
          বন্ধ করুন
        </button>
      </div>
    </div>
  </div>
  `;
}

function initZodiacModalListeners(modalEl) {
  const closeBtn = modalEl.querySelector('#closeZodiacModalBtn');
  const footerCloseBtn = modalEl.querySelector('#closeZodiacModalFooterBtn');
  const backdrop = modalEl.querySelector('#zodiacModalBackdrop');
  const partnerSelect = modalEl.querySelector('#partnerSignSelect');

  if (closeBtn) closeBtn.addEventListener('click', closeZodiacModal);
  if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeZodiacModal);
  if (backdrop) backdrop.addEventListener('click', closeZodiacModal);

  const tabButtons = modalEl.querySelectorAll('.zodiac-tab-btn');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchZodiacTab(targetTab);
    });
  });

  if (partnerSelect) {
    partnerSelect.addEventListener('change', () => {
      if (currentModalZodiac) {
        updatePartnerCompatibility(currentModalZodiac, partnerSelect.value);
      }
    });
  }
}

export function initZodiacModal() {
  // Legacy support
}

export function openZodiacModal(zodiac, month, day, year, relationshipStatus, gender, name, bloodGroup, birthDate) {
  if (!zodiac) return;

  currentModalZodiac = zodiac;
  currentModalUserData = { zodiac, month, day, year, relationshipStatus, gender, name, bloodGroup, birthDate };

  const modal = mountModal('zodiacModal', getZodiacModalTemplate(), (modalEl) => {
    initZodiacModalListeners(modalEl);
  });
  if (!modal || !zodiac) return;

  const decan = getDecan(zodiac, month, day);
  const travelScore = calculateTravelIndex(zodiac, decan, year);
  const dayRuler = getBirthDayRuler(birthDate || new Date(year, month - 1, day));
  const bioHealth = getBioAstroHealth(zodiac, bloodGroup);
  const goldenHours = getGoldenHours();

  const relStatusKey = relationshipStatus || 'single';
  const relStatusLabel = RELATIONSHIP_LABELS[relStatusKey] || RELATIONSHIP_LABELS.single;
  const bloodBadgeText = bloodGroup && bloodGroup !== 'unknown' ? ` • 🩸 ব্লাড: ${bloodGroup}` : '';

  // 1. Header Information
  const mSymbol = document.getElementById('modalZodiacSymbol');
  const mName = document.getElementById('modalZodiacName');
  const mMeta = document.getElementById('modalZodiacMeta');
  const mUserBadge = document.getElementById('modalUserRelBadge');

  if (mSymbol) mSymbol.textContent = zodiac.sign;
  if (mName) mName.textContent = zodiac.nameBn;
  if (mMeta) {
    mMeta.textContent = `উপাদান: ${zodiac.element} | মূল শাসক গ্রহ: ${zodiac.planet} | জন্মবারের গ্রহ: ${dayRuler.planetBn}`;
  }
  if (mUserBadge) {
    mUserBadge.innerHTML = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">👤 ${name || 'ইউজার'} • ${relStatusLabel}${bloodBadgeText}</span>`;
  }

  // 2. Tab: Personality & Core Nature
  const pNature = document.getElementById('modalTraitNature');
  const pDesc = document.getElementById('modalTraitPersonality');
  const pStrengths = document.getElementById('modalStrengthsList');
  const pWeaknesses = document.getElementById('modalWeaknessesList');
  const pDos = document.getElementById('modalDosList');
  const pDonts = document.getElementById('modalDontsList');

  if (pNature) pNature.textContent = zodiac.nature || zodiac.traits;
  if (pDesc) pDesc.textContent = zodiac.personality || zodiac.traits;

  if (pStrengths && zodiac.strengths) {
    pStrengths.innerHTML = zodiac.strengths.map(s => `
      <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <span class="text-emerald-500 dark:text-emerald-400 font-bold mt-0.5">✦</span>
        <span>${s}</span>
      </li>
    `).join('');
  }

  if (pWeaknesses && zodiac.weaknesses) {
    pWeaknesses.innerHTML = zodiac.weaknesses.map(w => `
      <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <span class="text-rose-500 dark:text-rose-400 font-bold mt-0.5">❖</span>
        <span>${w}</span>
      </li>
    `).join('');
  }

  if (pDos && zodiac.dosAndDonts) {
    pDos.innerHTML = zodiac.dosAndDonts.dos.map(d => `
      <li class="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300">
        <span class="font-bold">✓</span>
        <span>${d}</span>
      </li>
    `).join('');
  }

  if (pDonts && zodiac.dosAndDonts) {
    pDonts.innerHTML = zodiac.dosAndDonts.donts.map(d => `
      <li class="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300">
        <span class="font-bold">✕</span>
        <span>${d}</span>
      </li>
    `).join('');
  }

  // 3. Tab: Planetary Alignment & Decans + Day Ruler
  const dTitle = document.getElementById('modalDecanTitle');
  const dRange = document.getElementById('modalDecanRange');
  const dSubPlanet = document.getElementById('modalDecanSubPlanet');
  const dTraits = document.getElementById('modalDecanTraits');
  const dAllList = document.getElementById('modalAllDecansList');
  const dDayRulerTitle = document.getElementById('modalDayRulerTitle');
  const dDayRulerPlanet = document.getElementById('modalDayRulerPlanet');
  const dDayRulerTraits = document.getElementById('modalDayRulerTraits');

  if (decan) {
    if (dTitle) dTitle.textContent = `${toBnDigits(decan.decanNumber)}ম দ্রেক্বাণ (Decan ${decan.decanNumber}): ${decan.title}`;
    if (dRange) dRange.textContent = `তারিখ পরিসীমা: ${decan.dateRangeBn}`;
    if (dSubPlanet) dSubPlanet.textContent = `সহকারী উপ-গ্রহ (Sub-Ruler): ${decan.subPlanet}`;
    if (dTraits) dTraits.textContent = decan.traits;
  }

  if (dDayRulerTitle) dDayRulerTitle.textContent = `${dayRuler.dayBn} — ${dayRuler.title}`;
  if (dDayRulerPlanet) dDayRulerPlanet.textContent = `জন্মবারের মহাজাগতিক শাসক: ${dayRuler.planetBn}`;
  if (dDayRulerTraits) dDayRulerTraits.textContent = dayRuler.traits;

  if (dAllList && zodiac.decans) {
    dAllList.innerHTML = zodiac.decans.map(dec => {
      const isCurrent = decan && dec.decanNumber === decan.decanNumber;
      return `
        <div class="p-3.5 rounded-2xl border ${isCurrent ? 'bg-indigo-500/10 border-indigo-500/40 ring-1 ring-indigo-500/30' : 'bg-slate-100/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'}">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}">
              ${toBnDigits(dec.decanNumber)}ম ভাগ (${dec.dateRangeBn}) ${isCurrent ? '✨ আপনার ভাগ' : ''}
            </span>
            <span class="text-[11px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-medium">${dec.subPlanet}</span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400">${dec.title} — ${dec.traits}</p>
        </div>
      `;
    }).join('');
  }

  // 4. Tab: Foreign Travel & Relocation Index
  const tScoreBar = document.getElementById('modalTravelScoreBar');
  const tScoreText = document.getElementById('modalTravelScoreText');
  const tType = document.getElementById('modalTravelType');
  const tDir = document.getElementById('modalTravelDirections');
  const tInsight = document.getElementById('modalTravelInsight');

  if (tScoreBar) tScoreBar.style.width = `${travelScore}%`;
  if (tScoreText) tScoreText.textContent = `${toBnDigits(travelScore)}%`;

  if (zodiac.travelAstrology) {
    if (tType) tType.textContent = zodiac.travelAstrology.travelType;
    if (tDir) tDir.textContent = zodiac.travelAstrology.favorableDirections;
    if (tInsight) tInsight.textContent = zodiac.travelAstrology.insight;
  }

  // 5. Tab: Relationship & Interactive Partner Matcher
  const rStatusBadge = document.getElementById('modalRelStatusBadge');
  const rAdvice = document.getElementById('modalRelAdviceText');
  const rBestMatch = document.getElementById('modalBestMatch');
  const rChallengingMatch = document.getElementById('modalChallengingMatch');
  const partnerSelect = document.getElementById('partnerSignSelect');

  if (rStatusBadge) rStatusBadge.textContent = relStatusLabel;
  if (rAdvice && zodiac.relationshipGuides) {
    rAdvice.textContent = zodiac.relationshipGuides[relStatusKey] || zodiac.relationshipGuides.single;
  }
  if (rBestMatch && zodiac.compatibility) {
    rBestMatch.textContent = zodiac.compatibility.best;
  }
  if (rChallengingMatch && zodiac.compatibility) {
    rChallengingMatch.textContent = zodiac.compatibility.challenging;
  }

  // Populate Partner Matcher Dropdown
  if (partnerSelect) {
    partnerSelect.innerHTML = ZODIAC_DATA.map(z => `
      <option value="${z.id}" ${z.id === zodiac.id ? 'selected' : ''}>${z.sign} ${z.nameBn}</option>
    `).join('');
    updatePartnerCompatibility(zodiac, partnerSelect.value);
  }

  // 6. Tab: Bio-Astro Health, Nutrition & Metabolism
  renderBioAstroHealthTab(bioHealth, zodiac);

  // 7. Tab: Weekly Forecast & Golden Hours
  const wDateRange = document.getElementById('modalWeeklyDateRange');
  const wCareer = document.getElementById('modalWeeklyCareer');
  const wFinance = document.getElementById('modalWeeklyFinance');
  const wWellness = document.getElementById('modalWeeklyWellness');
  const wGoldenHours = document.getElementById('modalGoldenHoursText');

  const now = new Date();
  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  if (wDateRange) {
    wDateRange.textContent = `সপ্তাহ: ${toBnDigits(monday.getDate())} ${BENGALI_MONTHS[monday.getMonth()]} - ${toBnDigits(sunday.getDate())} ${BENGALI_MONTHS[sunday.getMonth()]}, ${toBnDigits(sunday.getFullYear())}`;
  }

  if (zodiac.weeklyThemes) {
    if (wCareer) wCareer.textContent = zodiac.weeklyThemes.career;
    if (wFinance) wFinance.textContent = zodiac.weeklyThemes.finance;
    if (wWellness) wWellness.textContent = zodiac.weeklyThemes.wellness;
  }

  if (wGoldenHours) {
    wGoldenHours.textContent = `সকাল: ${goldenHours.morningWindow} • সন্ধ্যা: ${goldenHours.eveningWindow}`;
  }

  // 8. Tab: Lucky Elements
  const lNum = document.getElementById('modalLuckyNumbers');
  const lColor = document.getElementById('modalLuckyColors');
  const lGem = document.getElementById('modalLuckyGemstone');
  const lDay = document.getElementById('modalLuckyDay');
  const lMetal = document.getElementById('modalLuckyMetal');

  if (zodiac.lucky) {
    if (lNum) lNum.textContent = toBnDigits(zodiac.lucky.numbers);
    if (lColor) lColor.textContent = zodiac.lucky.colors;
    if (lGem) lGem.textContent = zodiac.lucky.gemstone;
    if (lDay) lDay.textContent = zodiac.lucky.day;
    if (lMetal) lMetal.textContent = zodiac.lucky.metal;
  }

  // Reset to first tab
  switchZodiacTab('personality');

  // Reveal Modal
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function updatePartnerCompatibility(userZodiac, targetSignId) {
  const targetZodiac = getZodiacById(targetSignId);
  const comp = calculateSignCompatibility(userZodiac, targetZodiac);

  const scoreText = document.getElementById('partnerScoreText');
  const scoreBar = document.getElementById('partnerScoreBar');
  const scoreLabel = document.getElementById('partnerScoreLabel');
  const romanceScore = document.getElementById('partnerRomanceScore');
  const commScore = document.getElementById('partnerCommScore');
  const stabScore = document.getElementById('partnerStabScore');
  const insightText = document.getElementById('partnerInsightText');

  if (scoreText) scoreText.textContent = `${toBnDigits(comp.score)}%`;
  if (scoreBar) scoreBar.style.width = `${comp.score}%`;
  if (scoreLabel) scoreLabel.textContent = comp.label;
  if (romanceScore) romanceScore.textContent = `${toBnDigits(comp.romance)}%`;
  if (commScore) commScore.textContent = `${toBnDigits(comp.comm)}%`;
  if (stabScore) stabScore.textContent = `${toBnDigits(comp.stability)}%`;
  if (insightText) insightText.textContent = comp.insight;
}

function renderBioAstroHealthTab(bioHealth, zodiac) {
  const container = document.getElementById('bioAstroHealthContent');
  if (!container) return;

  if (bioHealth.hasBloodGroup && bioHealth.bloodSynergy) {
    const syn = bioHealth.bloodSynergy;
    container.innerHTML = `
      <div class="space-y-5">
        <!-- Blood Group Badge Card -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 via-slate-900/50 to-indigo-900/30 border border-purple-500/30">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              🩸 রক্তের গ্রুপ: ${bioHealth.bloodGroupKey} • ${syn.groupName}
            </span>
            <span class="text-xs text-slate-400 font-medium">রাশি ও রক্তরস মেটাবলিক সমন্বয়</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${syn.nature}</p>
        </div>

        <!-- Nutrition Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <span>🥗 সেরা পুষ্টি ও ডায়েট সুপারিশ</span>
            </h4>
            <ul class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              ${syn.bestNutrition.map(n => `<li class="flex items-start gap-2"><span class="text-emerald-500 font-bold">✓</span><span>${n}</span></li>`).join('')}
            </ul>
          </div>

          <div class="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <span>🚫 পরিহার্য বা কম খাওয়ার খাবার</span>
            </h4>
            <ul class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              ${syn.avoidNutrition.map(n => `<li class="flex items-start gap-2"><span class="text-rose-500 font-bold">✕</span><span>${n}</span></li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Stress Recovery -->
        <div class="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
          <span class="font-bold block mb-1">🧘 স্ট্রেস ও ক্লান্তি দূরীকরণের সেরা উপায়:</span>
          <p>${syn.stressRecovery}</p>
        </div>

        <!-- Elemental Note -->
        <div class="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <strong>উপাদানিক স্বভাব (${zodiac.element}):</strong> ${bioHealth.elemGuide.nature} • নজর দিন: ${bioHealth.elemGuide.focus}
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="space-y-5">
        <!-- Callout to add blood group -->
        <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <span class="text-2xl">🩸</span>
          <div>
            <strong class="block mb-0.5">ব্লাড গ্রুপ অপশন ফাঁকা রাখা হয়েছে</strong>
            <p class="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              আপনি ইনপুট ফর্মে রক্তের গ্রুপ সিলেক্ট করলে এখানে আপনার রক্তের ধরন অনুযায়ী সুনির্দিষ্ট কেতসুয়েকি-গাতা ডায়েট ও মেটাবলিজম গাইড আনলক হবে।
            </p>
          </div>
        </div>

        <!-- Elemental Ayurvedic Health Blueprint -->
        <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
            🌿 রাশির উপাদান ভিত্তিক স্বাস্থ্য ও জীবনধারা (${zodiac.element})
          </span>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">${bioHealth.elemGuide.nature}</p>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-100 dark:bg-slate-900/70 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            ${bioHealth.elemGuide.advice}
          </p>
          <div class="text-xs text-slate-500 dark:text-slate-400">
            <strong>বিশেষ নজর রাখার অঙ্গ:</strong> ${bioHealth.elemGuide.focus}
          </div>
        </div>
      </div>
    `;
  }
}

function handleCopyAstroPersona() {
  if (!currentModalUserData || !currentModalZodiac) return;
  const { name, zodiac, month, day, year, relationshipStatus, bloodGroup } = currentModalUserData;
  const decan = getDecan(zodiac, month, day);
  const relLabel = RELATIONSHIP_LABELS[relationshipStatus || 'single'];
  const bloodText = bloodGroup && bloodGroup !== 'unknown' ? `\n🩸 রক্তের গ্রুপ: ${bloodGroup}` : '';

  const summary = `✨ অ্যাস্ট্রোলজিক্যাল পার্সোনা কার্ড ✨\n` +
    `👤 নাম: ${name || 'ইউজার'} (${relLabel})${bloodText}\n` +
    `♈ রাশিচক্র: ${zodiac.nameBn} (${zodiac.sign})\n` +
    `🪐 মূল শাসক গ্রহ: ${zodiac.planet} | উপ-গ্রহ: ${decan?.subPlanet || zodiac.planet}\n` +
    `🌟 স্বভাব: ${zodiac.nature}\n` +
    `🔮 শুভ বিষয়: সংখ্যা ${toBnDigits(zodiac.lucky.numbers)}, রং: ${zodiac.lucky.colors}, রত্ন: ${zodiac.lucky.gemstone}\n` +
    `❤️ সামঞ্জস্যপূর্ণ রাশি: ${zodiac.compatibility.best}\n\n` +
    `🌐 লাইফ-টাইমলাইন ও হিস্টোরিক্যাল এজ অ্যানালাইজার`;

  navigator.clipboard.writeText(summary)
    .then(() => alert('সম্পূর্ণ অ্যাস্ট্রো প্রোফাইল ক্লিপবোর্ডে কপি করা হয়েছে!'))
    .catch(() => alert('কপি করতে ব্যর্থ হয়েছে।'));
}

export function closeZodiacModal() {
  closeModal('zodiacModal');
}

export function switchZodiacTab(tabName) {
  currentActiveTab = tabName;

  const tabButtons = document.querySelectorAll('.zodiac-tab-btn');
  tabButtons.forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabName;
    if (isTarget) {
      btn.className = 'zodiac-tab-btn w-auto lg:w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-indigo-600 text-white shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2.5 whitespace-nowrap lg:whitespace-normal text-left';
    } else {
      btn.className = 'zodiac-tab-btn w-auto lg:w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-100/90 dark:bg-slate-900/70 lg:bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all flex items-center gap-2.5 whitespace-nowrap lg:whitespace-normal text-left border border-slate-200/60 dark:border-slate-800/60 lg:border-transparent';
    }
  });

  const tabPanels = document.querySelectorAll('.zodiac-tab-panel');
  tabPanels.forEach(panel => {
    if (panel.id === `zodiacTab_${tabName}`) {
      panel.classList.remove('hidden');
      panel.classList.add('block');
    } else {
      panel.classList.add('hidden');
      panel.classList.remove('block');
    }
  });
}
