/**
 * Royal Archetype & Samudrika Shastra Modal Component
 * Stage 3: Biometric Canvas Scanner, Laser HUD Animation & VIP 2-Column Split Hero Showcase
 */
import { analyzeImageAura, calculateArchetypeProfile } from './morphologyEngine.js';
import { SAMUDRIKA_FEATURES } from '../data/archetypes.js';
import { toBnDigits, calculateNextBirthday } from '../calculator.js';
import { setUnlockLevel, getState, saveProfile } from '../state.js';
import { renderCompletionMeter } from './completionMeter.js';
import { renderBioCard } from './bioCard.js';
import { getLanguage, t, formatDigits } from '../i18n.js';
import { mountModal, closeModal } from './modalManager.js';

let currentArchetypeProfile = null;
let currentModalUserData = null;
let currentAvatar = null;
let stagedScanImage = null;

// Royal Archetype VIP Theme Presets
const ARCHETYPE_THEMES = {
  sovereign: {
    frameClass: 'vip-frame-sovereign',
    bgGradient: 'from-amber-950/50 via-slate-950 to-stone-950',
    cornerClass: 'border-amber-400',
    gemstone: 'চুনি (Ruby) ও খাঁটি স্বর্ণ',
    element: 'অগ্নি ও পৃথিবী (Fire & Earth)',
    colorTheme: 'রাজকীয় স্বর্ণালী ও রুবি'
  },
  commander: {
    frameClass: 'vip-frame-commander',
    bgGradient: 'from-rose-950/50 via-slate-950 to-stone-950',
    cornerClass: 'border-rose-400',
    gemstone: 'রক্তপ্রবাল (Coral) ও রক্তমণি',
    element: 'অগ্নি ও বায়ু (Fire & Air)',
    colorTheme: 'ক্রিমসন রেড ও আয়রন ব্ল্যাক'
  },
  mystic: {
    frameClass: 'vip-frame-mystic',
    bgGradient: 'from-purple-950/50 via-slate-950 to-slate-950',
    cornerClass: 'border-purple-400',
    gemstone: 'অ্যামেথিস্ট ও নীলকান্তমণি (Sapphire)',
    element: 'জল ও মহাজাগতিক ইথার (Water & Ether)',
    colorTheme: 'কসমিক ভায়োলেট ও ডিপ ইন্ডিগো'
  },
  creator: {
    frameClass: 'vip-frame-creator',
    bgGradient: 'from-pink-950/50 via-slate-950 to-purple-950',
    cornerClass: 'border-pink-400',
    gemstone: 'হীরা (Diamond) ও রোজ কোয়ার্টজ',
    element: 'জল ও পৃথিবী (Water & Earth)',
    colorTheme: 'রোজ গোল্ড ও অরোরা পিংক'
  },
  charismatic: {
    frameClass: 'vip-frame-charismatic',
    bgGradient: 'from-cyan-950/50 via-slate-950 to-blue-950',
    cornerClass: 'border-cyan-400',
    gemstone: 'পোখরাজ (Topaz) ও অ্যাকোয়ামেরিন',
    element: 'অগ্নি ও বায়ু (Fire & Air)',
    colorTheme: 'ইলেকট্রিক সায়ান ও স্টার সিলভার'
  },
  strategist: {
    frameClass: 'vip-frame-strategist',
    bgGradient: 'from-emerald-950/50 via-slate-950 to-teal-950',
    cornerClass: 'border-emerald-400',
    gemstone: 'পান্না (Emerald) ও নিয়ন জেড (Jade)',
    element: 'বায়ু ও পৃথিবী (Air & Earth)',
    colorTheme: 'পান্না সবুজ ও সাইবার টিল'
  },
  guardian: {
    frameClass: 'vip-frame-guardian',
    bgGradient: 'from-teal-950/50 via-slate-950 to-slate-900',
    cornerClass: 'border-teal-400',
    gemstone: 'চন্দ্রকান্ত মণি (Moonstone) ও মুক্তা',
    element: 'জল ও পৃথিবী (Water & Earth)',
    colorTheme: 'প্রশান্ত ফিরোজা ও রূপালী শুভ্র'
  }
};

function getArchetypeModalTemplate() {
  const lang = getLanguage();
  return `
  <div id="archetypeModal" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 hidden">
    <div id="archetypeModalBackdrop" class="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"></div>
    <div class="relative w-full max-w-6xl h-[92vh] max-h-[860px] min-h-[550px] bg-white dark:bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
      
      <!-- ==========================================
           VIEW 1: BIOMETRIC SCANNER & UPLOAD INTAKE
           ========================================== -->
      <div id="archetypeScannerIntakeView" class="flex-1 flex flex-col overflow-y-auto">
        <!-- Scanner Header -->
        <div class="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-amber-950/50 to-slate-900 text-white flex items-center justify-between">
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

            <!-- Scanning Laser Line & Grid Overlay -->
            <div id="scannerActiveLaserLayer" class="absolute inset-0 pointer-events-none hidden z-20">
              <div class="scanner-grid-anim absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              <div class="scanner-laser-line absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b]"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-36 h-36 rounded-full border border-amber-400/40 aura-ring-pulse flex items-center justify-center">
                  <div class="w-24 h-24 rounded-full border border-dashed border-amber-400/60 animate-spin"></div>
                </div>
              </div>
            </div>

            <!-- Uploaded Image Preview -->
            <img id="scannerImagePreview" src="" alt="Scan Target" class="w-full h-full object-cover rounded-2xl hidden z-10 shadow-lg">

            <!-- Default Idle Placeholder -->
            <div id="scannerIdlePlaceholder" class="text-center space-y-3 p-4 z-10 group-hover:scale-105 transition-transform">
              <div class="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl mx-auto text-amber-400 shadow-lg">
                📸
              </div>
              <div class="space-y-1">
                <p class="text-sm font-bold text-slate-100">
                  ${lang === 'bn' ? 'আপনার ছবি ড্র্যাগ করুন বা ক্লিক করে আপলোড করুন' : 'Drag & Drop or Click to Upload Photo'}
                </p>
                <p class="text-xs text-amber-300/80">
                  ${lang === 'bn' ? 'সরাসরি ফেসিয়াল অরা ও সামুদ্রিক লক্ষণ স্ক্যান হবে' : 'Offscreen AI canvas pixel analysis & Samudrika mapping'}
                </p>
              </div>
              <span class="inline-block text-[11px] font-semibold text-slate-400 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700">
                JPG, PNG, WebP
              </span>
            </div>

            <input type="file" id="scannerPhotoFileInput" accept="image/png, image/jpeg, image/webp" class="hidden">
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
           VIEW 2: FULL REVEALED 2-COLUMN VIP HERO SHOWCASE
           ========================================== -->
      <div id="archetypeDashboardView" class="flex-1 flex flex-col overflow-hidden hidden">
        <!-- Top Compact Navigation Header -->
        <div class="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white flex items-center justify-between">
          <div class="flex items-center space-x-2.5">
            <span class="text-xl">👑</span>
            <span class="text-sm font-extrabold tracking-wide text-amber-300 uppercase">
              ${lang === 'bn' ? 'রয়্যাল আর্কিটাইপ ও সামুদ্রিক ব্লুপ্রিন্ট' : 'Royal Archetype & Samudrika Blueprint'}
            </span>
          </div>

          <button type="button" id="closeArchetypeDashboardBtn"
            class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-base font-bold transition-all shadow-sm cursor-pointer"
            title="বন্ধ করুন (Esc)">
            ✕
          </button>
        </div>

        <!-- 2-Column Split Body Layout -->
        <div class="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          
          <!-- LEFT HERO PANEL (VIP Persona Showcase, 40% Width) -->
          <aside id="archetypeHeroPanel"
            class="w-full lg:w-[380px] xl:w-[420px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-gradient-to-b from-amber-950/40 via-slate-950 to-stone-950 p-5 sm:p-6 flex flex-col items-center justify-between overflow-y-auto no-scrollbar space-y-5 transition-colors duration-500">
            
            <div class="w-full flex flex-col items-center text-center space-y-4">
              
              <!-- Large VIP 3:4 Portrait Photo Frame with Royal Hologram Aura -->
              <div id="archetypeDashboardAvatarBox"
                class="hero-photo-glow relative w-full max-w-[260px] sm:max-w-[300px] aspect-[3/4] max-h-[360px] sm:max-h-[380px] rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-slate-900 flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-[1.01] vip-photo-shimmer"
                title="নতুন ছবি দিয়ে পুনরায় স্ক্যান করতে ক্লিক করুন 📸">
                
                <!-- Dynamic Corner HUD Brackets -->
                <div class="archetype-corner absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400 pointer-events-none z-20"></div>
                <div class="archetype-corner absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400 pointer-events-none z-20"></div>
                <div class="archetype-corner absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400 pointer-events-none z-20"></div>
                <div class="archetype-corner absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400 pointer-events-none z-20"></div>

                <!-- Verified Hologram Stamp Badge -->
                <div class="absolute top-3.5 left-3.5 bg-slate-950/85 border border-amber-400/60 text-amber-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-lg z-20 flex items-center gap-1 backdrop-blur-md">
                  <span>👑 ROYAL VIP PERSONA</span>
                </div>

                <!-- User Photo -->
                <img id="archetypeAvatarPreview" src="" alt="Avatar" class="w-full h-full object-cover z-10 hidden">
                <div id="archetypeAvatarFallback" class="text-7xl flex items-center justify-center text-amber-400 z-10">👑</div>

                <!-- Hover Rescan Overlay -->
                <div class="absolute inset-0 bg-slate-950/85 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-bold transition-opacity z-30 space-y-1.5 backdrop-blur-xs">
                  <span class="text-3xl">📸</span>
                  <span>নতুন ছবি দিন (Rescan)</span>
                </div>
              </div>

              <!-- Primary Title & Cosmic Identity -->
              <div class="space-y-1.5 w-full">
                <div class="flex items-center justify-center gap-2">
                  <span id="archetypePrimaryIcon" class="text-2xl sm:text-3xl">👑</span>
                  <h2 id="archetypePrimaryTitle" class="text-lg sm:text-xl font-black text-amber-300 tracking-tight">
                    রাজকীয় অধিপতি
                  </h2>
                </div>
                <p id="archetypeTagline" class="text-xs text-amber-200/90 font-medium leading-relaxed px-2">
                  জন্মগত শাসক, মহিমান্বিত ব্যক্তিত্ব ও অটল প্রতিষ্ঠাতা
                </p>
                <div class="pt-1 flex flex-wrap items-center justify-center gap-1.5">
                  <span id="archetypeAuraBadge" class="text-[11px] px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    অরা: <span id="archetypeAuraColorText">স্বর্ণালী-পীতাভ</span>
                  </span>
                </div>
              </div>

              <!-- Power Elements & Auspicious Gemstone Bar -->
              <div class="w-full p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-xs space-y-1.5 backdrop-blur-sm">
                <div class="flex items-center justify-between text-slate-300">
                  <span class="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <span>💎</span> <span>শুভ রত্ন:</span>
                  </span>
                  <span id="archetypeGemText" class="font-bold text-amber-300 text-right truncate">চুনি ও খাঁটি স্বর্ণ</span>
                </div>
                <div class="flex items-center justify-between text-slate-300 border-t border-slate-800/80 pt-1.5">
                  <span class="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <span>⚡</span> <span>শক্তি উপাদান:</span>
                  </span>
                  <span id="archetypeElementText" class="font-bold text-emerald-300 text-right truncate">অগ্নি ও পৃথিবী</span>
                </div>
              </div>

              <!-- Mini Biometric Summary Cards -->
              <div class="grid grid-cols-2 gap-2 w-full text-left text-xs">
                <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span class="text-[10px] text-slate-400 block font-semibold">মুখের গঠন:</span>
                  <span id="samudrikaHeroShape" class="text-slate-100 font-bold truncate block">বর্গাকার</span>
                </div>
                <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span class="text-[10px] text-slate-400 block font-semibold">দৃষ্টি ও অরা:</span>
                  <span id="samudrikaHeroEye" class="text-slate-100 font-bold truncate block">তীক্ষ্ণ ও প্রখর</span>
                </div>
              </div>
            </div>

            <!-- Left Panel CTA Buttons -->
            <div class="w-full space-y-2.5 pt-2">
              <button type="button" id="copyArchetypeCardBtn"
                class="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span>👑</span>
                <span>রয়্যাল আর্কিটাইপ কার্ড কপি</span>
              </button>

              <button type="button" id="rescanPhotoBtn"
                class="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span>🔄</span>
                <span>অন্য ছবি দিয়ে পুনরায় স্ক্যান</span>
              </button>
            </div>

          </aside>

          <!-- RIGHT METRICS & INTELLIGENCE DASHBOARD (Scrollable Panel, 60% Width) -->
          <main class="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 min-h-0 bg-white dark:bg-slate-900">
            
            <!-- Top Philosophical Quote & Secondary Impact -->
            <div class="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-slate-900/40 border border-amber-500/30 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span id="archetypeSecondaryBadge" class="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/30">
                  সহকারী প্রভাব
                </span>
                <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  মহাজাগতিক সংযোগ ব্লুপ্রিন্ট
                </span>
              </div>
              <p id="archetypeQuoteText" class="text-sm sm:text-base italic text-slate-700 dark:text-slate-200 font-serif leading-relaxed border-l-4 border-amber-500 pl-4 py-1">
                "যাঁরা আদেশ দেন না, বরং উপস্থিতি দিয়েই বিশ্বকে রূপান্তর করেন।"
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div class="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span class="text-slate-500 dark:text-slate-400 font-semibold block mb-1">স্বভাব ও উপাদানগত প্রকৃতি:</span>
                  <span id="archetypeNatureText" class="text-slate-800 dark:text-slate-200 font-bold">দৃঢ় ও সার্বভৌম</span>
                </div>
                <div class="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span class="text-slate-500 dark:text-slate-400 font-semibold block mb-1">আধিপত্য ও প্রভাব ক্ষেত্র:</span>
                  <span id="archetypeDomainsText" class="text-slate-800 dark:text-slate-200 font-bold">শাসন, সাম্রাজ্য নির্মাণ ও নেতৃত্ব</span>
                </div>
              </div>
            </div>

            <!-- 6 Core Dimension Bars Grid -->
            <div class="space-y-3">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span>📊</span>
                <span>মহাজাগতিক মেধা ও চারিত্রিক মাত্রা (৬টি ডাইমেনশন)</span>
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Leadership -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div class="flex justify-between items-center text-xs font-semibold">
                    <span class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span>👑</span> নেতৃত্ব ও তেজ
                    </span>
                    <span id="metricLeadershipVal" class="font-mono font-bold text-amber-500">৯০%</span>
                  </div>
                  <div class="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div id="metricLeadershipBar" class="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-700" style="width: 90%"></div>
                  </div>
                </div>

                <!-- Creativity -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div class="flex justify-between items-center text-xs font-semibold">
                    <span class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span>🎨</span> সৃজনশীলতা ও শিল্পবোধ
                    </span>
                    <span id="metricCreativityVal" class="font-mono font-bold text-pink-500">৭৫%</span>
                  </div>
                  <div class="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div id="metricCreativityBar" class="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-700" style="width: 75%"></div>
                  </div>
                </div>

                <!-- Spirituality -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div class="flex justify-between items-center text-xs font-semibold">
                    <span class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span>🔮</span> আধ্যাত্মিক অন্তর্দৃষ্টি
                    </span>
                    <span id="metricSpiritualityVal" class="font-mono font-bold text-indigo-500">৮৫%</span>
                  </div>
                  <div class="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div id="metricSpiritualityBar" class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 transition-all duration-700" style="width: 85%"></div>
                  </div>
                </div>

                <!-- Magnetism / Speech -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div class="flex justify-between items-center text-xs font-semibold">
                    <span class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span>🎙️</span> বাচনভঙ্গি ও আকর্ষণ
                    </span>
                    <span id="metricMagnetismVal" class="font-mono font-bold text-cyan-500">৮০%</span>
                  </div>
                  <div class="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div id="metricMagnetismBar" class="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-700" style="width: 80%"></div>
                  </div>
                </div>

                <!-- Willpower -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div class="flex justify-between items-center text-xs font-semibold">
                    <span class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span>⚔️</span> ইচ্ছাশক্তি ও মানসিক দৃঢ়তা
                    </span>
                    <span id="metricWillpowerVal" class="font-mono font-bold text-orange-500">৯৫%</span>
                  </div>
                  <div class="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div id="metricWillpowerBar" class="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-400 transition-all duration-700" style="width: 95%"></div>
                  </div>
                </div>

                <!-- Wisdom -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div class="flex justify-between items-center text-xs font-semibold">
                    <span class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span>🦉</span> দূরদর্শিতা ও প্রজ্ঞা
                    </span>
                    <span id="metricWisdomVal" class="font-mono font-bold text-emerald-500">৯০%</span>
                  </div>
                  <div class="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div id="metricWisdomBar" class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-700" style="width: 90%"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Samudrika Shastra Facial Signatures -->
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span>👁️</span>
                <span>সামুদ্রিক লক্ষণ বিচার (Facial Morpho-Signatures)</span>
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span class="text-slate-500 dark:text-slate-400 font-bold block">মুখের গঠন (Face Shape):</span>
                  <p id="samudrikaFaceShapeText" class="text-slate-900 dark:text-slate-100 font-semibold leading-relaxed">
                    বর্গাকার (Square) — নেতৃত্ব, প্রশাসনিক দৃঢ়তা ও বাস্তববাদী লক্ষ্য।
                  </p>
                </div>

                <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span class="text-slate-500 dark:text-slate-400 font-bold block">দৃষ্টি ও চোখের অরা (Eyes):</span>
                  <p id="samudrikaEyeAuraText" class="text-slate-900 dark:text-slate-100 font-semibold leading-relaxed">
                    তীক্ষ্ণ ও প্রখর দৃষ্টি — অন্যকে প্রভাবিত করার ও দূরদর্শী দৃষ্টিভঙ্গির লক্ষণ।
                  </p>
                </div>

                <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span class="text-slate-500 dark:text-slate-400 font-bold block">কপাল ও প্রজ্ঞা প্যালেস:</span>
                  <p id="samudrikaForeheadText" class="text-slate-900 dark:text-slate-100 font-semibold leading-relaxed">
                    প্রশস্ত ও রাজকীয় কপাল — উচ্চাকাঙ্ক্ষা, সামাজিক প্রতিষ্ঠা ও প্রজ্ঞার উজ্জ্বল ধারা।
                  </p>
                </div>
              </div>
            </div>

            <!-- Strengths, Challenges & Ideal Domains -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Strengths -->
              <div class="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <h4 class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>💎</span> রাজকীয় শক্তি ও দক্ষতা
                </h4>
                <ul id="archetypeStrengthsList" class="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>যেকোনো সংকটে শান্ত ও সুদৃঢ় সিদ্ধান্ত গ্রহণের অসাধারণ ক্ষমতা।</li>
                  <li>মানুষকে একত্রিত করে বড় লক্ষ্য অর্জনের নেতৃত্ব দক্ষতা।</li>
                  <li>দীর্ঘস্থায়ী প্রভাব ও ইতিহাস সৃষ্টিকারী দূরদর্শিতা।</li>
                </ul>
              </div>

              <!-- Challenges / Shadow Traits -->
              <div class="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                <h4 class="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚠️</span> সচেতনতা ও ভারসাম্য রক্ষার দিক
                </h4>
                <ul id="archetypeChallengesList" class="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>অতিরিক্ত দায়িত্ব নিজের কাঁধে তুলে নিয়ে মানসিক চাপ বৃদ্ধি।</li>
                  <li>অন্যের ধীরগতি বা শিথিলতায় সহজে অধৈর্য হয়ে পড়া।</li>
                  <li>সমালোচনার প্রতি সংবেদনশীলতা কাটিয়ে খোলামনের চর্চা জরুরি।</li>
                </ul>
              </div>
            </div>

            <!-- Ideal Careers / Life Domain -->
            <div class="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-700 dark:text-slate-300">
              <strong class="text-indigo-600 dark:text-indigo-400 block mb-1">🏛️ সেরা কর্মক্ষেত্র ও সামাজিক ভূমিকা:</strong>
              <span id="archetypeCareerAdvice">
                রাষ্ট্রপরিচালনা, সিইও/উদ্যোক্তা, নীতিনির্ধারণ, সামরিক ও মহাকাশ প্রযুক্তি, বিচার বিভাগ ও আন্তর্জাতিক নেতৃত্ব।
              </span>
            </div>

          </main>
        </div>

        <!-- Dashboard Footer -->
        <div class="p-3.5 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
          <div class="flex items-center space-x-2">
            <span class="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>১০০% ক্লায়েন্ট-সাইড অফস্ক্রিন ক্যানভাস ও সামুদ্রিক শাস্ত্রীয় অ্যালগরিদম</span>
          </div>

          <button type="button" id="closeArchetypeModalFooterBtn"
            class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-all cursor-pointer">
            বন্ধ করুন
          </button>
        </div>
      </div>

    </div>
  </div>
  `;
}

function setMetricBar(idPrefix, value) {
  const bar = document.getElementById(`${idPrefix}Bar`);
  const val = document.getElementById(`${idPrefix}Val`);
  if (bar) bar.style.width = `${value}%`;
  if (val) val.textContent = `${toBnDigits(value)}%`;
}

export function openArchetypeModal(userData, avatarBase64) {
  if (!userData) return;

  const appState = getState();
  currentModalUserData = userData;
  currentAvatar = avatarBase64 || userData.avatar || (appState.profile && appState.profile.avatar) || '';
  stagedScanImage = currentAvatar;

  mountModal('archetypeModal', getArchetypeModalTemplate(), (modalEl) => {
    initArchetypeModalListeners(modalEl);

    const unlockLevel = getState().unlockLevel || 35;
    // If user is already level 100, go straight to hero dashboard; otherwise show scanner intake
    if (unlockLevel >= 100) {
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
    renderArchetypeContent(profile, currentModalUserData, currentAvatar, modalEl);
  });
}

function initArchetypeModalListeners(modalEl) {
  const closeIntakeBtn = modalEl.querySelector('#closeScannerIntakeBtn');
  const closeDashboardBtn = modalEl.querySelector('#closeArchetypeDashboardBtn');
  const footerCloseBtn = modalEl.querySelector('#closeArchetypeModalFooterBtn');
  const backdrop = modalEl.querySelector('#archetypeModalBackdrop');
  const copyBtn = modalEl.querySelector('#copyArchetypeCardBtn');
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
    if (!file || !file.type.startsWith('image/')) {
      alert(getLanguage() === 'bn' ? 'অনুগ্রহ করে শুধুমাত্র ছবির ফাইল (JPG, PNG, WebP) নির্বাচন করুন।' : 'Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        // Canvas compression to max 400x400 to guarantee crisp visuals under 40KB
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.88);

        stagedScanImage = compressedBase64;
        if (preview) {
          preview.src = compressedBase64;
          preview.classList.remove('hidden');
        }
        if (placeholder) placeholder.classList.add('hidden');
      };
      img.src = ev.target.result;
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

    // Update avatar on user bio card via renderBioCard
    if (currentState.birthDate) {
      const bday = calculateNextBirthday(currentState.birthDate);
      renderBioCard(currentState.profile, formatDigits(bday.days));
    }
  }

  // Also directly update avatar image on bio card DOM
  const bioAvatarImg = document.getElementById('resultAvatarImg');
  const bioAvatarFallback = document.getElementById('resultAvatarFallback');
  if (bioAvatarImg && bioAvatarFallback) {
    if (currentAvatar) {
      bioAvatarImg.src = currentAvatar;
      bioAvatarImg.classList.remove('hidden');
      bioAvatarFallback.classList.add('hidden');
    } else {
      bioAvatarImg.classList.add('hidden');
      bioAvatarFallback.classList.remove('hidden');
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

function renderArchetypeContent(profile, userData, avatarBase64, modalEl) {
  const { primaryArchetype, secondaryArchetype, metrics, samudrika } = profile;
  const theme = ARCHETYPE_THEMES[primaryArchetype.id] || ARCHETYPE_THEMES.sovereign;

  // 1. Dynamic VIP Theme & Hero Background
  const heroPanel = (modalEl ? modalEl.querySelector('#archetypeHeroPanel') : null) || document.getElementById('archetypeHeroPanel');
  const avatarBox = (modalEl ? modalEl.querySelector('#archetypeDashboardAvatarBox') : null) || document.getElementById('archetypeDashboardAvatarBox');

  if (heroPanel) {
    // Reset background gradients and apply luxury jewel-tone gradient
    heroPanel.className = `w-full lg:w-[380px] xl:w-[420px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-gradient-to-b ${theme.bgGradient} p-5 sm:p-6 flex flex-col items-center justify-between overflow-y-auto no-scrollbar space-y-5 transition-colors duration-500`;
  }

  if (avatarBox) {
    // Remove previous VIP frame classes and apply current archetype frame
    avatarBox.classList.remove(
      'vip-frame-sovereign', 'vip-frame-commander', 'vip-frame-mystic',
      'vip-frame-creator', 'vip-frame-charismatic', 'vip-frame-strategist', 'vip-frame-guardian'
    );
    avatarBox.classList.add(theme.frameClass);

    // Update corner HUD brackets color
    const corners = avatarBox.querySelectorAll('.archetype-corner');
    corners.forEach(c => {
      c.className = `archetype-corner absolute ${c.classList.contains('top-3') ? 'top-3' : 'bottom-3'} ${c.classList.contains('left-3') ? 'left-3' : 'right-3'} w-5 h-5 ${c.classList.contains('border-t-2') ? 'border-t-2' : 'border-b-2'} ${c.classList.contains('border-l-2') ? 'border-l-2' : 'border-r-2'} ${theme.cornerClass} pointer-events-none z-20`;
    });
  }

  // 2. Avatar View inside the Left Hero Showcase
  const avatarImg = (modalEl ? modalEl.querySelector('#archetypeAvatarPreview') : null) || document.getElementById('archetypeAvatarPreview');
  const avatarFallback = (modalEl ? modalEl.querySelector('#archetypeAvatarFallback') : null) || document.getElementById('archetypeAvatarFallback');
  
  if (avatarImg && avatarFallback) {
    if (avatarBase64) {
      avatarImg.src = avatarBase64;
      avatarImg.classList.remove('hidden');
      avatarFallback.classList.add('hidden');
    } else {
      avatarImg.classList.add('hidden');
      avatarFallback.classList.remove('hidden');
      avatarFallback.textContent = primaryArchetype.icon || '👑';
    }
  }

  // 3. Left Hero Panel Information
  const titleEl = document.getElementById('archetypePrimaryTitle');
  const iconEl = document.getElementById('archetypePrimaryIcon');
  const taglineEl = document.getElementById('archetypeTagline');
  const auraText = document.getElementById('archetypeAuraColorText');
  const heroShape = document.getElementById('samudrikaHeroShape');
  const heroEye = document.getElementById('samudrikaHeroEye');
  const gemText = document.getElementById('archetypeGemText');
  const elementText = document.getElementById('archetypeElementText');

  if (titleEl) titleEl.textContent = primaryArchetype.nameBn;
  if (iconEl) iconEl.textContent = primaryArchetype.icon;
  if (taglineEl) taglineEl.textContent = primaryArchetype.tagline;
  if (auraText) auraText.textContent = primaryArchetype.auraColor;
  if (heroShape) heroShape.textContent = samudrika.faceShape.nameBn;
  if (heroEye) heroEye.textContent = samudrika.eyeAura.nameBn;
  if (gemText) gemText.textContent = theme.gemstone;
  if (elementText) elementText.textContent = theme.element;

  // 4. Right Panel Header and Quotes
  const secondaryEl = document.getElementById('archetypeSecondaryBadge');
  const quoteEl = document.getElementById('archetypeQuoteText');
  const natureEl = document.getElementById('archetypeNatureText');
  const domainsEl = document.getElementById('archetypeDomainsText');

  if (secondaryEl) {
    secondaryEl.textContent = `সহকারী প্রভাব: ${secondaryArchetype.icon} ${secondaryArchetype.nameBn}`;
  }
  if (quoteEl) quoteEl.textContent = primaryArchetype.quote;
  if (natureEl) natureEl.textContent = primaryArchetype.nature;
  if (domainsEl) domainsEl.textContent = primaryArchetype.domains;

  // 5. 6 Metric Dimension Bars
  setMetricBar('metricCreativity', metrics.creativity);
  setMetricBar('metricLeadership', metrics.leadership);
  setMetricBar('metricSpirituality', metrics.spirituality);
  setMetricBar('metricMagnetism', metrics.magnetism);
  setMetricBar('metricWillpower', metrics.willpower);
  setMetricBar('metricWisdom', metrics.wisdom);

  // 6. Samudrika Shastra Facial Features
  const fShape = document.getElementById('samudrikaFaceShapeText');
  const fEye = document.getElementById('samudrikaEyeAuraText');
  const fForehead = document.getElementById('samudrikaForeheadText');

  if (fShape) fShape.textContent = `${samudrika.faceShape.nameBn} — ${samudrika.faceShape.traitBn}`;
  if (fEye) fEye.textContent = `${samudrika.eyeAura.nameBn} — ${samudrika.eyeAura.traitBn}`;
  if (fForehead) fForehead.textContent = `${samudrika.foreheadAura.nameBn} — ${samudrika.foreheadAura.traitBn}`;

  // 7. Strengths, Challenges & Careers
  const sList = document.getElementById('archetypeStrengthsList');
  const cList = document.getElementById('archetypeChallengesList');
  const careerAdv = document.getElementById('archetypeCareerAdvice');

  if (sList) {
    sList.innerHTML = primaryArchetype.strengths.map(s => `<li>${s}</li>`).join('');
  }
  if (cList) {
    cList.innerHTML = primaryArchetype.shadowTraits.map(c => `<li>${c}</li>`).join('');
  }
  if (careerAdv) {
    careerAdv.textContent = `${primaryArchetype.careers.join(', ')} এবং অন্যান্য কৌশলগত ক্ষেত্র।`;
  }
}

function handleCopyArchetypePersona() {
  if (!currentArchetypeProfile || !currentModalUserData) return;
  const { primaryArchetype, metrics } = currentArchetypeProfile;
  const theme = ARCHETYPE_THEMES[primaryArchetype.id] || ARCHETYPE_THEMES.sovereign;
  const name = currentModalUserData.name || 'ইউজার';

  const text = `👑 রয়্যাল অ্যাস্ট্রো-মরফোলজি ও আর্কিটাইপ ভিআইপি কার্ড 👑\n` +
    `👤 নাম: ${name}\n` +
    `✨ প্রধান আর্কিটাইপ: ${primaryArchetype.icon} ${primaryArchetype.nameBn}\n` +
    `🔮 অরা বর্ণচ্ছটা: ${primaryArchetype.auraColor}\n` +
    `💎 শুভ রত্ন: ${theme.gemstone}\n` +
    `⚡ শক্তি উপাদান: ${theme.element}\n` +
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
    .then(() => {
      if (typeof window.showToast === 'function') {
        window.showToast('👑 রয়্যাল আর্কিটাইপ কার্ড সফলভাবে কপি হয়েছে!');
      } else {
        alert('রয়্যাল আর্কিটাইপ কার্ড সফলভাবে কপি করা হয়েছে!');
      }
    })
    .catch(() => alert('কপি করতে ব্যর্থ হয়েছে।'));
}
