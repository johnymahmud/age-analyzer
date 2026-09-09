/**
 * Birthday Countdown & Zodiac Details Component
 */
import { calculateNextBirthday, getZodiac, toBnDigits } from '../calculator.js';

const BENGALI_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

export function updateBirthdayCountdown(birthDate) {
  if (!birthDate) return null;

  const bday = calculateNextBirthday(birthDate);

  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMinutes = document.getElementById('cdMinutes');
  const cdSeconds = document.getElementById('cdSeconds');
  const nextBdayDate = document.getElementById('nextBirthdayDate');
  const nextAgeLabel = document.getElementById('nextAgeLabel');

  if (cdDays) cdDays.textContent = toBnDigits(bday.days);
  if (cdHours) cdHours.textContent = toBnDigits(bday.hours.toString().padStart(2, '0'));
  if (cdMinutes) cdMinutes.textContent = toBnDigits(bday.minutes.toString().padStart(2, '0'));
  if (cdSeconds) cdSeconds.textContent = toBnDigits(bday.seconds.toString().padStart(2, '0'));

  if (nextBdayDate) {
    const d = bday.nextDate;
    nextBdayDate.textContent = `${toBnDigits(d.getDate())} ${BENGALI_MONTHS[d.getMonth()]} ${toBnDigits(d.getFullYear())}`;
  }

  if (nextAgeLabel) {
    nextAgeLabel.textContent = `${toBnDigits(bday.nextAge)} বছর`;
  }

  return bday;
}

export function renderZodiacCard(month, day) {
  const z = getZodiac(month, day);

  const zSymbol = document.getElementById('zodiacSymbol');
  const zName = document.getElementById('zodiacNameBn');
  const zElement = document.getElementById('zodiacElement');
  const zTraits = document.getElementById('zodiacTraits');
  const zDateSpan = document.getElementById('zodiacDateSpan');

  if (zSymbol) zSymbol.textContent = z.sign;
  if (zName) zName.textContent = z.nameBn;
  if (zElement) zElement.textContent = `উপাদান: ${z.element} | শাসক গ্রহ: ${z.planet}`;
  if (zTraits) zTraits.textContent = z.traits;
  if (zDateSpan) {
    zDateSpan.textContent = `তারিখ সীমা: ${toBnDigits(z.start[1])} ${BENGALI_MONTHS[z.start[0] - 1]} - ${toBnDigits(z.end[1])} ${BENGALI_MONTHS[z.end[0] - 1]}`;
  }
}
