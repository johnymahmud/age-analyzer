/**
 * Age, Time, Birthday & Astrology Calculation Engine
 */
import { ZODIAC_DATA } from './data/zodiac.js';

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
 * Bengali Number Formatter
 */
const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export function toBnDigits(num) {
  if (num === null || num === undefined) return '';
  return num.toString().replace(/\d/g, (d) => BN_DIGITS[parseInt(d, 10)]);
}
