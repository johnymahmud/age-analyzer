/**
 * Completion Meter Component (Zeigarnik Effect Gamification)
 * Tracks user progress: 35% (Age) -> 70% (Zodiac) -> 100% (Archetype)
 */
import { t, formatDigits } from '../i18n.js';

export function renderCompletionMeter(level = 35) {
  const container = document.getElementById('completionMeterContainer');
  if (!container) return;

  const bar = document.getElementById('completionMeterBar');
  const percentText = document.getElementById('completionMeterPercent');
  const statusMsg = document.getElementById('completionMeterStatusMsg');
  const badgeZodiac = document.getElementById('badgeMeterZodiac');
  const badgeArchetype = document.getElementById('badgeMeterArchetype');

  let pct = 35;
  let statusTextKey = 'meterStage1';
  let barGradient = 'from-indigo-500 via-purple-500 to-cyan-400';

  if (level >= 100) {
    pct = 100;
    statusTextKey = 'meterStage3';
    barGradient = 'from-amber-500 via-purple-500 to-emerald-400';
  } else if (level >= 70) {
    pct = 70;
    statusTextKey = 'meterStage2';
    barGradient = 'from-indigo-500 via-cyan-400 to-emerald-400';
  }

  if (bar) {
    bar.style.width = `${pct}%`;
    bar.className = `h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-1000 shadow-md`;
  }

  if (percentText) {
    percentText.textContent = `${formatDigits(pct)}%`;
  }

  if (statusMsg) {
    statusMsg.textContent = t(statusTextKey);
  }

  // Update Mini Badges
  if (badgeZodiac) {
    if (level >= 70) {
      badgeZodiac.className = 'inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30';
      badgeZodiac.innerHTML = '<span>✨ রাশিচক্র আনলকড ✓</span>';
    } else {
      badgeZodiac.className = 'inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-cyan-500/50';
      badgeZodiac.innerHTML = '<span>🔒 রাশিচক্র (৭০%)</span>';
    }
  }

  if (badgeArchetype) {
    if (level >= 100) {
      badgeArchetype.className = 'inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30';
      badgeArchetype.innerHTML = '<span>👑 আর্কিটাইপ আনলকড ✓</span>';
    } else {
      badgeArchetype.className = 'inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-amber-500/50';
      badgeArchetype.innerHTML = '<span>🔒 আর্কিটাইপ (১০০%)</span>';
    }
  }
}
