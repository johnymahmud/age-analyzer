/**
 * Historical View Component
 * Renders famous personalities born on the same date and historical events of the era
 */
import { FAMOUS_PERSONALITIES } from '../data/personalities.js';
import { HISTORICAL_EVENTS, YEAR_ERA_EVENTS } from '../data/events.js';
import { toBnDigits } from '../calculator.js';

export function renderHistoricalInsights(month, day, year) {
  renderPersonalities(month, day);
  renderEvents(month, day, year);
}

function renderPersonalities(month, day) {
  const pGrid = document.getElementById('famousPersonalitiesGrid');
  if (!pGrid) return;

  pGrid.innerHTML = '';

  // 1. Exact match on same month and day
  let matched = FAMOUS_PERSONALITIES.filter(p => p.month === month && p.day === day);

  // 2. If fewer than 3, grab closest in same month or overall
  if (matched.length < 3) {
    let sameMonth = FAMOUS_PERSONALITIES.filter(p => p.month === month && p.day !== day);
    sameMonth.sort((a, b) => Math.abs(a.day - day) - Math.abs(b.day - day));
    matched = [...matched, ...sameMonth, ...FAMOUS_PERSONALITIES].slice(0, 3);
  }

  matched.forEach(p => {
    const isExact = (p.month === month && p.day === day);
    const card = document.createElement('div');
    card.className = "bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 flex items-start space-x-3.5 shadow-sm dark:shadow-none print-card";
    
    card.innerHTML = `
      <img src="${p.avatar}" alt="${p.name}" class="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm" loading="lazy">
      <div class="space-y-1 flex-1 min-w-0">
        <div class="flex items-center justify-between gap-1">
          <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">${p.name}</h4>
          <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 whitespace-nowrap">${toBnDigits(p.year)} খ্রি.</span>
        </div>
        <p class="text-xs text-indigo-600 dark:text-indigo-400 font-medium">${p.title}</p>
        <p class="text-[12px] text-slate-600 dark:text-slate-400 leading-snug line-clamp-2">${p.bio}</p>
        ${isExact ? '<span class="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">🎯 একই দিনে জন্ম</span>' : ''}
      </div>
    `;
    pGrid.appendChild(card);
  });
}

function renderEvents(month, day, year) {
  const evCont = document.getElementById('historicalEventsContainer');
  if (!evCont) return;

  const dayEvent = HISTORICAL_EVENTS.find(e => e.month === month && e.day === day) || HISTORICAL_EVENTS[0];
  const eraEvent = YEAR_ERA_EVENTS.find(e => year >= e.min && year <= e.max) || YEAR_ERA_EVENTS[YEAR_ERA_EVENTS.length - 1];

  evCont.innerHTML = `
    <div class="bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-none print-card">
      <div class="flex items-center space-x-2 mb-2">
        <span class="w-2 h-2 rounded-full bg-purple-500"></span>
        <span class="text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">📅 ক্যালেন্ডার মেলবন্ধন</span>
      </div>
      <h4 class="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">${dayEvent.title} (${toBnDigits(dayEvent.year)} খ্রি.)</h4>
      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${dayEvent.summary}</p>
    </div>

    <div class="bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-none print-card">
      <div class="flex items-center space-x-2 mb-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span class="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">🌍 জন্মকালের বিশ্ব পটভূমি (${toBnDigits(year)} খ্রি.)</span>
      </div>
      <h4 class="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">${eraEvent.title}</h4>
      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${eraEvent.summary}</p>
    </div>
  `;
}
