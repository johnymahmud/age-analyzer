/**
 * Astro-Morphology & Royal Archetype Modal Controller
 * হাই-টেক বায়োমেট্রিক গ্রিড অ্যানিমেশন ও আর্কিটাইপ ইন্টারঅ্যাকশন
 */
import { analyzeImageAura, calculateArchetypeProfile } from './morphologyEngine.js';
import { SAMUDRIKA_FEATURES } from '../data/archetypes.js';
import { toBnDigits } from '../calculator.js';

let currentArchetypeProfile = null;
let currentModalUserData = null;
let currentAvatar = null;

export function initArchetypeModal() {
  const modal = document.getElementById('archetypeModal');
  const closeBtn = document.getElementById('closeArchetypeModalBtn');
  const footerCloseBtn = document.getElementById('closeArchetypeModalFooterBtn');
  const backdrop = document.getElementById('archetypeModalBackdrop');
  const copyBtn = document.getElementById('copyArchetypeCardBtn');
  const tuneFaceShape = document.getElementById('tuneFaceShape');
  const tuneEyeAura = document.getElementById('tuneEyeAura');

  if (closeBtn) closeBtn.addEventListener('click', closeArchetypeModal);
  if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeArchetypeModal);
  if (backdrop) backdrop.addEventListener('click', closeArchetypeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeArchetypeModal();
    }
  });

  if (copyBtn) copyBtn.addEventListener('click', handleCopyArchetypePersona);

  if (tuneFaceShape) {
    tuneFaceShape.addEventListener('change', handleManualTuning);
  }
  if (tuneEyeAura) {
    tuneEyeAura.addEventListener('change', handleManualTuning);
  }
}

export function openArchetypeModal(userData, avatarBase64) {
  const modal = document.getElementById('archetypeModal');
  if (!modal || !userData) return;

  currentModalUserData = userData;
  currentAvatar = avatarBase64;

  // Reveal Modal
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');

  // Trigger Biometric Scan Animation
  const scannerLaser = document.getElementById('archetypeScannerLaser');
  const scannerGrid = document.getElementById('archetypeScannerGrid');
  const scanStatus = document.getElementById('archetypeScanStatus');

  if (scannerLaser) scannerLaser.classList.remove('hidden');
  if (scannerGrid) scannerGrid.classList.remove('hidden');
  if (scanStatus) scanStatus.textContent = "মহাজাগতিক ফেসিয়াল স্ক্যানিং চলছে...";

  // Analyze image on canvas
  analyzeImageAura(avatarBase64, (visualFeatures) => {
    setTimeout(() => {
      if (scannerLaser) scannerLaser.classList.add('hidden');
      if (scanStatus) scanStatus.textContent = "স্ক্যানিং সম্পন্ন ✓ মহাজাগতিক রূপরেখা প্রস্তুত";
      
      const profile = calculateArchetypeProfile(userData, visualFeatures);
      currentArchetypeProfile = profile;
      renderArchetypeContent(profile, userData, avatarBase64);
    }, 800);
  });
}

export function closeArchetypeModal() {
  const modal = document.getElementById('archetypeModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
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

  // Populate manual tuning dropdowns if not already
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
