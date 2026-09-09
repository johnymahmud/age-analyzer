/**
 * Age, Time, Birthday & Astrology Calculation Engine
 */
import { ZODIAC_DATA, BLOOD_GROUP_SYNERGY, DAY_RULERS, ELEMENT_HEALTH_GUIDE } from './data/zodiac.js';

/**
 * Calculate exact age broken down by years, months, days, plus overall totals.
 */
export function calculateExactAge(birthDate, targetDate = new Date()) {
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    // Get last day of previous month
    const prevMonthLastDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = Math.max(0, targetDate.getTime() - birthDate.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalSeconds,
    totalMinutes,
    totalHours,
    totalDays,
    totalWeeks
  };
}

/**
 * Calculate countdown and details for next birthday
 */
export function calculateNextBirthday(birthDate) {
  const now = new Date();
  let nextBday = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate(),
    birthDate.getHours(),
    birthDate.getMinutes()
  );

  if (nextBday.getTime() <= now.getTime()) {
    nextBday = new Date(
      now.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate(),
      birthDate.getHours(),
      birthDate.getMinutes()
    );
  }

  const diffMs = Math.max(0, nextBday.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);

  return {
    nextDate: nextBday,
    days: Math.floor(totalSeconds / (3600 * 24)),
    hours: Math.floor((totalSeconds % (3600 * 24)) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    nextAge: nextBday.getFullYear() - birthDate.getFullYear()
  };
}

/**
 * Get Zodiac sign given month (1-12) and day (1-31)
 */
export function getZodiac(month, day) {
  for (const z of ZODIAC_DATA) {
    const [startMonth, startDay] = z.start;
    const [endMonth, endDay] = z.end;

    // Crosses year boundary (Capricorn: Dec 22 - Jan 19)
    if (startMonth > endMonth) {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return z;
      }
    } else {
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (month > startMonth && month < endMonth)
      ) {
        return z;
      }
    }
  }
  return ZODIAC_DATA[0];
}

/**
 * Get Zodiac sign by ID (e.g. 'aries', 'taurus')
 */
export function getZodiacById(id) {
  return ZODIAC_DATA.find(z => z.id === id) || ZODIAC_DATA[0];
}

/**
 * Get Decanate (দ্রেক্বাণ - ১০ ডিগ্রি সাব-ডিভিশন)
 */
export function getDecan(zodiac, month, day) {
  if (!zodiac || !zodiac.decans || zodiac.decans.length === 0) return null;
  const startMonth = zodiac.start[0];
  const startDay = zodiac.start[1];

  let startDate = new Date(2024, startMonth - 1, startDay);
  let targetDate = new Date(2024, month - 1, day);
  if (targetDate < startDate && startMonth === 12) {
    targetDate = new Date(2025, month - 1, day);
  }

  const diffDays = Math.floor((targetDate - startDate) / (1000 * 60 * 60 * 24));
  if (diffDays < 10) {
    return zodiac.decans[0];
  } else if (diffDays < 20) {
    return zodiac.decans[1];
  } else {
    return zodiac.decans[2] || zodiac.decans[1];
  }
}

/**
 * Calculate dynamic Foreign Travel & Relocation Index (%)
 */
export function calculateTravelIndex(zodiac, decan, birthYear) {
  let score = zodiac.travelAstrology ? zodiac.travelAstrology.baseScore : 75;
  if (decan) {
    if (decan.decanNumber === 2) score += 3;
    if (decan.decanNumber === 3) score += 5;
  }
  if (birthYear) {
    const yearMod = (birthYear % 7) - 3;
    score += yearMod;
  }
  score = Math.min(99, Math.max(55, score));
  return score;
}

/**
 * Get Birth Day of Week Planetary Ruler (জন্মবারের মহাজাগতিক শাসক গ্রহ)
 */
export function getBirthDayRuler(birthDate) {
  if (!birthDate) return DAY_RULERS[0];
  const dayIdx = birthDate.getDay();
  return DAY_RULERS[dayIdx] || DAY_RULERS[0];
}

/**
 * Interactive Partner Compatibility Matrix Calculator
 */
export function calculateSignCompatibility(zodiac1, zodiac2) {
  if (!zodiac1 || !zodiac2) return { score: 75, label: "সাধারণ সামঞ্জস্য", romance: 75, comm: 70, stability: 75, insight: "উভয়ের মধ্যে পারস্পরিক শ্রদ্ধাবোধ প্রয়োজন।" };

  const elem1 = zodiac1.element;
  const elem2 = zodiac2.element;

  let baseScore = 70;
  let romance = 70;
  let comm = 70;
  let stability = 70;
  let label = "ভালো মেলবন্ধন";
  let insight = "পারস্পরিক সমঝোতা ও খোলামেলা আলোচনায় সম্পর্ক দৃঢ় হবে।";

  if (zodiac1.id === zodiac2.id) {
    baseScore = 88;
    romance = 85;
    comm = 90;
    stability = 88;
    label = "একই রাশির গভীর বোঝাপড়া";
    insight = "উভয়ের স্বভাব ও লক্ষ্য একইরকম হওয়ায় বোঝাপড়া চমৎকার থাকবে; তবে জেদ পরিহার করা উচিত।";
  } else if (elem1 === elem2) {
    baseScore = 93;
    romance = 92;
    comm = 94;
    stability = 92;
    label = "অসাধারণ প্রাকৃতিক মিল (Same Element)";
    insight = "একই উপাদানের রাশি হওয়ায় চিন্তাভাবনা, আবেগ ও জীবনধারায় স্বতঃস্ফূর্ত ছন্দ তৈরি হবে।";
  } else if (
    (elem1.includes('আগুন') && elem2.includes('বায়ু')) ||
    (elem1.includes('বায়ু') && elem2.includes('আগুন')) ||
    (elem1.includes('মাটি') && elem2.includes('পানি')) ||
    (elem1.includes('পানি') && elem2.includes('মাটি'))
  ) {
    baseScore = 90;
    romance = 94;
    comm = 88;
    stability = 90;
    label = "পরিপূরক ও আকর্ষণীয় মেলবন্ধন (Complementary)";
    insight = "একটি উপাদান অপরটিকে পুষ্টি ও উদ্দীপনা জোগায়; প্রেম ও যৌথ সমৃদ্ধির জন্য অত্যন্ত শুভ জুটি।";
  } else {
    baseScore = 74;
    romance = 75;
    comm = 72;
    stability = 76;
    label = "বৈচিত্র্যময় ও শিক্ষণীয় মেলবন্ধন";
    insight = "দৃষ্টিভঙ্গির ভিন্নতা থাকবে, তবে শ্রদ্ধাবোধ ও ভালোবাসার মাধ্যমে অনন্য ভারসাম্য আনা সম্ভব।";
  }

  return {
    score: baseScore,
    romance,
    comm,
    stability,
    label,
    insight
  };
}

/**
 * Get Bio-Astro Health & Nutrition Guidance
 */
export function getBioAstroHealth(zodiac, bloodGroup) {
  const elemGuide = ELEMENT_HEALTH_GUIDE[zodiac.element] || ELEMENT_HEALTH_GUIDE["মাটি (Earth)"];
  
  if (!bloodGroup || bloodGroup === 'unknown' || bloodGroup === '') {
    return {
      hasBloodGroup: false,
      elemGuide,
      bloodSynergy: null
    };
  }

  // Extract base blood type (A, B, O, AB)
  const baseType = bloodGroup.replace(/[^ABO]/gi, '').toUpperCase() || 'O';
  const bloodSynergy = BLOOD_GROUP_SYNERGY[baseType] || BLOOD_GROUP_SYNERGY["O"];

  return {
    hasBloodGroup: true,
    bloodGroupKey: bloodGroup,
    elemGuide,
    bloodSynergy
  };
}

/**
 * Calculate Daily Planetary Golden Power Hours (শুভ কর্মঘণ্টা)
 */
export function getGoldenHours() {
  return {
    morningWindow: "সকাল ০৯:৩০ - ১১:১৫",
    eveningWindow: "সন্ধ্যা ০৫:৪৫ - ০৭:৩০",
    focus: "গুরুত্বপূর্ণ সিদ্ধান্ত, নতুন প্রজেক্ট সূচনা ও আলোচনা"
  };
}

/**
 * Bengali Number Formatter
 */
const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export function toBnDigits(num) {
  if (num === null || num === undefined) return '';
  return num.toString().replace(/\d/g, (d) => BN_DIGITS[parseInt(d, 10)]);
}
