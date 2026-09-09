/**
 * Bio Card Component
 * Renders user avatar, name, birthdate, gender badge, region, relationship pill, blood group pill, and quick summary pills
 */
import { getZodiac } from '../calculator.js';

const BENGALI_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

const RELATIONSHIP_LABELS_SHORT = {
  single: "💎 সিঙ্গেল",
  relationship: "❤️ সম্পর্কে আছেন",
  married: "💍 বিবাহিত",
  living_together: "🤝 লিভিং টুগেদার",
  divorced: "🕊️ বিচ্ছেদপ্রাপ্ত",
  widowed: "🥀 সঙ্গীহারা"
};

const BENGALI_DAYS = [
  "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"
];

export function renderBioCard(data, nextBdayDays) {
  const userDisplayName = data.name || "অজ্ঞাত পরিব্রাজক";
  const formattedDate = `${data.day} ${BENGALI_MONTHS[data.month - 1]} ${data.year}`;

  // Calculate Day of Week
  const birthDateObj = new Date(data.year, data.month - 1, data.day);
  const dayOfWeekIndex = birthDateObj.getDay();
  const dayOfWeekBn = BENGALI_DAYS[dayOfWeekIndex] || "অজ্ঞাত বার";

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
  if (dayOfWeekTextEl) dayOfWeekTextEl.textContent = `জন্মবার: ${dayOfWeekBn}`;

  // Gender Badge styling
  if (genderBadge) {
    if (data.gender === 'female') {
      genderBadge.textContent = '👩 মহিলা';
      genderBadge.className = 'absolute -bottom-2 -right-2 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-md bg-rose-600 text-white border border-white dark:border-slate-900';
    } else if (data.gender === 'other') {
      genderBadge.textContent = '✨ অন্যান্য';
      genderBadge.className = 'absolute -bottom-2 -right-2 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-md bg-purple-600 text-white border border-white dark:border-slate-900';
    } else {
      genderBadge.textContent = '👨 পুরুষ';
      genderBadge.className = 'absolute -bottom-2 -right-2 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-md bg-indigo-600 text-white border border-white dark:border-slate-900';
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
      avatarFallback.textContent = data.gender === 'female' ? '👩' : (data.gender === 'other' ? '✨' : '👨');
    }
  }

  // Region & Meta
  const regionName = data.country === 'BD' ? 'বাংলাদেশ 🇧🇩' : (data.country === 'IN' ? 'ভারত 🇮🇳' : 'আন্তর্জাতিক 🌐');
  const timeInfo = data.time ? ` • সময়: ${data.time}` : '';
  if (metaEl) {
    metaEl.textContent = `${regionName} • জন্ম: ${formattedDate} (${dayOfWeekBn})${timeInfo}`;
  }

  // Zodiac Pill (Interactive link)
  const z = getZodiac(data.month, data.day);
  if (zodiacPill) {
    zodiacPill.innerHTML = `✨ রাশি: ${z.nameBn} ${z.sign} <span class="text-[10px] text-cyan-500 font-bold underline ml-1">বিস্তারিত ↗</span>`;
    zodiacPill.classList.add('cursor-pointer', 'hover:bg-cyan-500/20', 'transition-all');
  }

  // Next Birthday Pill
  if (nextBdayPill) {
    nextBdayPill.textContent = `পরবর্তী জন্মদিন: আর ${nextBdayDays} দিন বাকি`;
  }

  // Relationship Pill
  if (relationshipPill) {
    const relKey = data.relationship || 'single';
    relationshipPill.textContent = RELATIONSHIP_LABELS_SHORT[relKey] || RELATIONSHIP_LABELS_SHORT.single;
    relationshipPill.classList.remove('hidden');
  }

  // Blood Group Pill
  if (bloodGroupPill) {
    if (data.bloodGroup && data.bloodGroup !== 'unknown' && data.bloodGroup !== '') {
      bloodGroupPill.textContent = `🩸 ${data.bloodGroup}`;
      bloodGroupPill.classList.remove('hidden');
    } else {
      bloodGroupPill.classList.add('hidden');
    }
  }
}
