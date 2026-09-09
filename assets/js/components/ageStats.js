/**
 * Age Statistics Component
 * Live counters for exact elapsed time, astronomical distance & human biological metrics
 */
import { calculateExactAge, toBnDigits } from '../calculator.js';

export function updateAgeStats(birthDate) {
  if (!birthDate) return;

  const stats = calculateExactAge(birthDate);

  // Big 3 Counters
  const elYears = document.getElementById('statYears');
  const elMonths = document.getElementById('statMonths');
  const elDays = document.getElementById('statDays');

  if (elYears) elYears.textContent = toBnDigits(stats.years);
  if (elMonths) elMonths.textContent = toBnDigits(stats.months);
  if (elDays) elDays.textContent = toBnDigits(stats.days);

  // Micro time blocks
  const elWeeks = document.getElementById('statTotalWeeks');
  const elTotalDays = document.getElementById('statTotalDays');
  const elHours = document.getElementById('statTotalHours');
  const elMinutes = document.getElementById('statTotalMinutes');
  const elSeconds = document.getElementById('statTotalSeconds');
  const elHeartbeats = document.getElementById('statHeartbeats');

  if (elWeeks) elWeeks.textContent = toBnDigits(stats.totalWeeks.toLocaleString('en-US'));
  if (elTotalDays) elTotalDays.textContent = toBnDigits(stats.totalDays.toLocaleString('en-US'));
  if (elHours) elHours.textContent = toBnDigits(stats.totalHours.toLocaleString('en-US'));
  if (elMinutes) elMinutes.textContent = toBnDigits(stats.totalMinutes.toLocaleString('en-US'));
  if (elSeconds) elSeconds.textContent = toBnDigits(stats.totalSeconds.toLocaleString('en-US'));

  // Approximate Heartbeats (~75 bpm -> 108,000 per day)
  if (elHeartbeats) {
    const estBeats = Math.floor(stats.totalDays * 108000);
    if (estBeats > 1000000000) {
      elHeartbeats.textContent = `${toBnDigits((estBeats / 1000000000).toFixed(2))} বিলিয়ন+`;
    } else {
      elHeartbeats.textContent = toBnDigits(estBeats.toLocaleString('en-US'));
    }
  }

  // Cosmic / Biological Metrics
  const elDistance = document.getElementById('statDistanceTraveled');
  const elBreaths = document.getElementById('statBreaths');
  const elSleep = document.getElementById('statSleepYears');

  if (elDistance) {
    // Earth travels ~940 million km per year around the Sun
    const km = Math.floor(stats.totalDays * (940000000 / 365.25));
    elDistance.textContent = `${toBnDigits((km / 1000000).toFixed(1))}M কি.মি.`;
  }

  if (elBreaths) {
    // ~16 breaths per minute = 23,040 breaths per day
    const breaths = Math.floor(stats.totalDays * 23040);
    if (breaths > 1000000) {
      elBreaths.textContent = `${toBnDigits((breaths / 1000000).toFixed(2))} মিলিয়ন`;
    } else {
      elBreaths.textContent = toBnDigits(breaths.toLocaleString('en-US'));
    }
  }

  if (elSleep) {
    // ~8 hours per day = 1/3 of life spent sleeping
    elSleep.textContent = `${toBnDigits((stats.years / 3).toFixed(1))} বছর`;
  }
}
