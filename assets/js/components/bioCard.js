/**
 * Bio Card Component
 * Renders user avatar, name, birthdate, day of week, next birthday, and unlocked deep traits
 */
import { getZodiac } from '../calculator.js';
import { getLanguage, t, formatDigits } from '../i18n.js';
import { LOCALES } from '../data/locales.js';

const RELATIONSHIP_LABELS_SHORT = {
  single: { bn: "💎 সিঙ্গেল", en: "💎 Single" },
  relationship: { bn: "❤️ সম্পর্কে আছেন", en: "❤️ In a Relationship" },
  married: { bn: "💍 বিবাহিত", en: "💍 Married" },
  living_together: { bn: "🤝 লিভিং টুগেদার", en: "🤝 Living Together" },
  divorced: { bn: "🕊️ বিচ্ছেদপ্রাপ্ত", en: "🕊️ Divorced" },
  widowed: { bn: "🥀 সঙ্গীহারা", en: "🥀 Widowed" }
};

export function renderBioCard(data, nextBdayDays) {
  const lang = getLanguage();
  const dict = LOCALES[lang] || LOCALES.bn;

  const userDisplayName = data.name ? data.name : (lang === 'bn' ? 'আপনার বয়স প্রোফাইল' : 'Your Age Profile');
  const monthName = dict.months[data.month - 1] || '';
  const formattedDate = `${formatDigits(data.day)} ${monthName} ${formatDigits(data.year)}`;

  // Calculate Day of Week
  const birthDateObj = new Date(data.year, data.month - 1, data.day);
  const dayOfWeekIndex = birthDateObj.getDay();
  const dayOfWeekName = dict.daysOfWeek[dayOfWeekIndex] || '';

  // DOM Elements
  const nameEl = document.getElementById('resultUserName');
  const dateTagEl = document.getElementById('activeBirthDateTag');
  const dayOfWeekTextEl = document.getElementById('activeBirthDayOfWeekText');
  const metaEl = document.getElementById('resultUserMeta');
  const genderBadge = document.getElementById('resultGenderBadge');
  const avatarImg = document.getElementById('resultAvatarImg');
  const avatarFallback = document.getElementById('resultAvatarFallback');
  const zodiacPill = document.getElementById('resultZodiacPill');
  const nextBdayPill = document.getElementById('resultNextBdayPill');
  const relationshipPill = document.getElementById('resultRelationshipPill');
  const bloodGroupPill = document.getElementById('resultBloodGroupPill');

  if (nameEl) nameEl.textContent = userDisplayName;
  if (dateTagEl) dateTagEl.textContent = formattedDate;
  if (dayOfWeekTextEl) dayOfWeekTextEl.textContent = `${dict.bornOnDay}: ${dayOfWeekName}`;

  // Gender Badge styling (Only show when explicitly set)
  if (genderBadge) {
    if (data.name && data.gender === 'female') {
      genderBadge.textContent = lang === 'bn' ? '👩 মহিলা' : '👩 Female';
      genderBadge.className = 'absolute -bottom-2 -right-2 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-md bg-rose-600 text-white border border-white dark:border-slate-900';
      genderBadge.classList.remove('hidden');
    } else if (data.name && data.gender === 'other') {
      genderBadge.textContent = lang === 'bn' ? '✨ অন্যান্য' : '✨ Other';
      genderBadge.className = 'absolute -bottom-2 -right-2 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-md bg-purple-600 text-white border border-white dark:border-slate-900';
      genderBadge.classList.remove('hidden');
    } else if (data.name && data.gender === 'male') {
      genderBadge.textContent = lang === 'bn' ? '👨 পুরুষ' : '👨 Male';
      genderBadge.className = 'absolute -bottom-2 -right-2 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-md bg-indigo-600 text-white border border-white dark:border-slate-900';
      genderBadge.classList.remove('hidden');
    } else {
      genderBadge.classList.add('hidden');
    }
  }

  // Avatar Image or Fallback Emoji
  if (data.avatar) {
    if (avatarImg) {
      avatarImg.src = data.avatar;
      avatarImg.classList.remove('hidden');
    }
    if (avatarFallback) avatarFallback.classList.add('hidden');
  } else {
    if (avatarImg) avatarImg.classList.add('hidden');
    if (avatarFallback) {
      avatarFallback.classList.remove('hidden');
      avatarFallback.textContent = data.name ? (data.gender === 'female' ? '👩' : (data.gender === 'other' ? '✨' : '👨')) : '👤';
    }
  }

  // Region & Meta
  let regionName = '';
  if (data.country === 'BD') regionName = lang === 'bn' ? 'বাংলাদেশ 🇧🇩' : 'Bangladesh 🇧🇩';
  else if (data.country === 'IN') regionName = lang === 'bn' ? 'ভারত 🇮🇳' : 'India 🇮🇳';
  else if (data.country === 'GLOBAL') regionName = lang === 'bn' ? 'আন্তর্জাতিক 🌐' : 'Global 🌐';
  else regionName = '';

  const regionPrefix = regionName ? `${regionName} • ` : '';
  const timeInfo = data.time && data.time !== '00:00' 
    ? (lang === 'bn' ? ` • সময়: ${data.time}` : ` • Time: ${data.time}`) 
    : '';

  if (metaEl) {
    metaEl.textContent = `${regionPrefix}${formattedDate} (${dayOfWeekName})${timeInfo}`;
  }

  // Next Birthday Pill
  if (nextBdayPill) {
    nextBdayPill.textContent = lang === 'bn' 
      ? `পরবর্তী জন্মদিন: আর ${formatDigits(nextBdayDays)} দিন বাকি` 
      : `Next Birthday: In ${nextBdayDays} Days`;
  }

  // Zodiac Pill (Only show when Unlocked >= 70%)
  const z = getZodiac(data.month, data.day);
  if (zodiacPill) {
    const isUnlocked = data.unlockLevel >= 70;
    if (isUnlocked) {
      const zTitle = lang === 'bn' ? `${z.nameBn} ${z.sign}` : `${z.name} ${z.sign}`;
      const moreText = lang === 'bn' ? 'বিস্তারিত ↗' : 'Details ↗';
      zodiacPill.innerHTML = `✨ ${zTitle} <span class="text-[10px] text-cyan-500 font-bold underline ml-1">${moreText}</span>`;
      zodiacPill.classList.remove('hidden');
    } else {
      zodiacPill.classList.add('hidden');
    }
  }

  // Relationship Pill (Only show if explicitly provided in stage 2)
  if (relationshipPill) {
    if (data.name && data.relationship && RELATIONSHIP_LABELS_SHORT[data.relationship]) {
      relationshipPill.textContent = RELATIONSHIP_LABELS_SHORT[data.relationship][lang] || RELATIONSHIP_LABELS_SHORT[data.relationship].bn;
      relationshipPill.classList.remove('hidden');
    } else {
      relationshipPill.classList.add('hidden');
    }
  }

  // Blood Group Pill (Only show if explicitly provided)
  if (bloodGroupPill) {
    if (data.bloodGroup && data.bloodGroup !== 'unknown') {
      bloodGroupPill.textContent = `🩸 ${data.bloodGroup}`;
      bloodGroupPill.classList.remove('hidden');
    } else {
      bloodGroupPill.classList.add('hidden');
    }
  }
}
