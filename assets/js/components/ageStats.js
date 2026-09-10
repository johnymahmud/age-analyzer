/**
 * Age Statistics Component
 * Live counters for exact elapsed time, astronomical distance & human biological metrics
 */
import { calculateExactAge } from '../calculator.js';
import { getLanguage, formatDigits, formatNumberWithCommas } from '../i18n.js';

export function updateAgeStats(birthDate) {
  if (!birthDate) return;

  const lang = getLanguage();
  const stats = calculateExactAge(birthDate);

  // Big 3 Counters
  const elYears = document.getElementById('statYears');
  const elMonths = document.getElementById('statMonths');
  const elDays = document.getElementById('statDays');

  if (elYears) elYears.textContent = formatDigits(stats.years);
  if (elMonths) elMonths.textContent = formatDigits(stats.months);
  if (elDays) elDays.textContent = formatDigits(stats.days);

  // Micro time blocks
  const elWeeks = document.getElementById('statTotalWeeks');
  const elTotalDays = document.getElementById('statTotalDays');
  const elHours = document.getElementById('statTotalHours');
  const elMinutes = document.getElementById('statTotalMinutes');
  const elSeconds = document.getElementById('statTotalSeconds');
  const elHeartbeats = document.getElementById('statHeartbeats');

  if (elWeeks) elWeeks.textContent = formatNumberWithCommas(stats.totalWeeks);
  if (elTotalDays) elTotalDays.textContent = formatNumberWithCommas(stats.totalDays);
  if (elHours) elHours.textContent = formatNumberWithCommas(stats.totalHours);
  if (elMinutes) elMinutes.textContent = formatNumberWithCommas(stats.totalMinutes);
  if (elSeconds) elSeconds.textContent = formatNumberWithCommas(stats.totalSeconds);

  // Approximate Heartbeats (~75 bpm -> 108,000 per day)
  if (elHeartbeats) {
    const estBeats = Math.floor(stats.totalDays * 108000);
    if (estBeats > 1000000000) {
      const bnUnit = 'বিলিয়ন+';
      const enUnit = 'Billion+';
      const numStr = (estBeats / 1000000000).toFixed(2);
      elHeartbeats.textContent = `${formatDigits(numStr)} ${lang === 'bn' ? bnUnit : enUnit}`;
    } else {
      elHeartbeats.textContent = formatNumberWithCommas(estBeats);
    }
  }

  // Cosmic / Biological Metrics
  const elDistance = document.getElementById('statDistanceTraveled');
  const elBreaths = document.getElementById('statBreaths');
  const elBlinks = document.getElementById('statBlinks');
  const elSleep = document.getElementById('statSleepYears');

  if (elDistance) {
    // Earth travels ~940 million km per year around the Sun
    const km = Math.floor(stats.totalDays * (940000000 / 365.25));
    const numStr = (km / 1000000).toFixed(1);
    elDistance.textContent = `${formatDigits(numStr)} ${lang === 'bn' ? 'M কি.মি.' : 'M km'}`;
  }

  if (elBreaths) {
    // ~16 breaths per minute = 23,040 breaths per day
    const breaths = Math.floor(stats.totalDays * 23040);
    if (breaths > 1000000) {
      const numStr = (breaths / 1000000).toFixed(2);
      elBreaths.textContent = `${formatDigits(numStr)} ${lang === 'bn' ? 'মিলিয়ন' : 'Million'}`;
    } else {
      elBreaths.textContent = formatNumberWithCommas(breaths);
    }
  }

  if (elBlinks) {
    // ~20 blinks per minute = 28,800 blinks per day
    const blinks = Math.floor(stats.totalDays * 28800);
    if (blinks > 1000000) {
      const numStr = (blinks / 1000000).toFixed(2);
      elBlinks.textContent = `${formatDigits(numStr)} ${lang === 'bn' ? 'মিলিয়ন' : 'Million'}`;
    } else {
      elBlinks.textContent = formatNumberWithCommas(blinks);
    }
  }

  if (elSleep) {
    // ~8 hours per day = 1/3 of life spent sleeping
    const sleepYrs = (stats.years / 3).toFixed(1);
    elSleep.textContent = `${formatDigits(sleepYrs)} ${lang === 'bn' ? 'বছর' : 'Years'}`;
  }
}
