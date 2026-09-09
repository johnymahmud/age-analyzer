/**
 * Advanced Zodiac Modal & Astrological Intelligence Component
 */
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

export function initZodiacModal() {
  const modal = document.getElementById('zodiacModal');
  const closeBtn = document.getElementById('closeZodiacModalBtn');
  const footerCloseBtn = document.getElementById('closeZodiacModalFooterBtn');
  const backdrop = document.getElementById('zodiacModalBackdrop');
  const partnerSelect = document.getElementById('partnerSignSelect');
  const copyAstroBtn = document.getElementById('copyAstroPersonaBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeZodiacModal);
  }

  if (footerCloseBtn) {
    footerCloseBtn.addEventListener('click', closeZodiacModal);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeZodiacModal);
  }

  // Keyboard Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeZodiacModal();
    }
  });

  // Tab buttons
  const tabButtons = document.querySelectorAll('.zodiac-tab-btn');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchZodiacTab(targetTab);
    });
  });

  // Partner sign selector change
  if (partnerSelect) {
    partnerSelect.addEventListener('change', () => {
      if (currentModalZodiac) {
        updatePartnerCompatibility(currentModalZodiac, partnerSelect.value);
      }
    });
  }

  // Copy Astro Persona
  if (copyAstroBtn) {
    copyAstroBtn.addEventListener('click', handleCopyAstroPersona);
  }
}

export function openZodiacModal(zodiac, month, day, year, relationshipStatus, gender, name, bloodGroup, birthDate) {
  const modal = document.getElementById('zodiacModal');
  if (!modal || !zodiac) return;

  currentModalZodiac = zodiac;
  currentModalUserData = { zodiac, month, day, year, relationshipStatus, gender, name, bloodGroup, birthDate };

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
  const modal = document.getElementById('zodiacModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

export function switchZodiacTab(tabName) {
  currentActiveTab = tabName;

  const tabButtons = document.querySelectorAll('.zodiac-tab-btn');
  tabButtons.forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabName;
    if (isTarget) {
      btn.className = 'zodiac-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-md transition-all flex items-center gap-2 whitespace-nowrap';
    } else {
      btn.className = 'zodiac-tab-btn px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2 whitespace-nowrap';
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
