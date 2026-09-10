/**
 * Bio Card Component
 * Renders user avatar, name, birthdate, gender badge, region, relationship pill, blood group pill, and quick summary pills
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
  const editBtnSpan = document.querySelector('#editAstroDetailsBtn span[data-i18n="editProfileBtn"]');

  if (nameEl) nameEl.textContent = userDisplayName;
  if (dateTagEl) dateTagEl.textContent = formattedDate;
  if (dayOfWeekTextEl) dayOfWeekTextEl.textContent = `${dict.bornOnDay}: ${dayOfWeekName}`;
  
  if (editBtnSpan) {
    editBtnSpan.textContent = data.name 
      ? (lang === 'bn' ? 'তথ্য পরিবর্তন ✏️' : 'Edit Info ✏️') 
      : (lang === 'bn' ? 'নাম ও তথ্য যোগ করুন ✏️' : 'Add Info & Name ✏️');
  }

  // Gender Badge styling
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
  else regionName = lang === 'bn' ? 'আন্তর্জাতিক 🌐' : 'Global 🌐';

  const timeInfo = data.time && data.time !== '00:00' 
    ? (lang === 'bn' ? ` • সময়: ${data.time}` : ` • Time: ${data.time}`) 
    : '';

  if (metaEl) {
    metaEl.textContent = `${regionName} • ${formattedDate} (${dayOfWeekName})${timeInfo}`;
  }

  // Zodiac Pill
  const z = getZodiac(data.month, data.day);
  if (zodiacPill) {
    const isUnlocked = data.unlockLevel >= 70;
    if (isUnlocked) {
      const zTitle = lang === 'bn' ? `${z.nameBn} ${z.sign}` : `${z.name} ${z.sign}`;
      const moreText = lang === 'bn' ? 'বিস্তারিত ↗' : 'Details ↗';
      zodiacPill.innerHTML = `✨ ${zTitle} <span class="text-[10px] text-cyan-500 font-bold underline ml-1">${moreText}</span>`;
    } else {
      const lockText = lang === 'bn' ? '🔒 রাশিচক্র আনলক করুন' : '🔒 Unlock Zodiac';
      zodiacPill.innerHTML = `<span class="text-amber-500 font-semibold">${lockText}</span>`;
    }
    zodiacPill.classList.add('cursor-pointer', 'hover:bg-cyan-500/20', 'transition-all');
  }

  // Next Birthday Pill
  if (nextBdayPill) {
    nextBdayPill.textContent = lang === 'bn' 
      ? `পরবর্তী জন্মদিন: আর ${formatDigits(nextBdayDays)} দিন বাকি` 
      : `Next Birthday: In ${nextBdayDays} Days`;
  }

  // Relationship Pill
  if (relationshipPill) {
    if (data.relationship && RELATIONSHIP_LABELS_SHORT[data.relationship]) {
      relationshipPill.textContent = RELATIONSHIP_LABELS_SHORT[data.relationship][lang] || RELATIONSHIP_LABELS_SHORT[data.relationship].bn;
      relationshipPill.classList.remove('hidden');
    } else {
      relationshipPill.classList.add('hidden');
    }
  }

  // Blood Group Pill
  if (bloodGroupPill) {
    if (data.bloodGroup && data.bloodGroup !== 'unknown') {
      bloodGroupPill.textContent = `🩸 ${data.bloodGroup}`;
      bloodGroupPill.classList.remove('hidden');
    } else {
      bloodGroupPill.classList.add('hidden');
    }
  }
}
