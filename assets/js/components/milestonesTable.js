/**
 * Milestone Benchmark Table Component
 * Compares user's current age with accomplishments of famous thinkers and historical figures
 */
import { MILESTONE_BENCHMARKS } from '../data/milestones.js';
import { toBnDigits } from '../calculator.js';

export function renderBenchmarkTable(userAgeYears, filterNearOnly = false) {
  const tbody = document.getElementById('benchmarkTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  let list = [...MILESTONE_BENCHMARKS];
  if (filterNearOnly) {
    list = list.filter(m => Math.abs(m.age - userAgeYears) <= 7);
  }

  list.forEach(item => {
    const isPast = userAgeYears >= item.age;
    const isCurrentAge = userAgeYears === item.age;

    const tr = document.createElement('tr');
    tr.className = isCurrentAge
      ? "bg-indigo-50/80 dark:bg-indigo-950/50 border-l-4 border-indigo-500 font-medium"
      : "hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors";

    tr.innerHTML = `
      <td class="py-3.5 px-4 font-mono font-bold ${isCurrentAge ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}">
        ${toBnDigits(item.age)} বছর
      </td>
      <td class="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
        ${item.name}
        ${isCurrentAge ? '<span class="ml-1.5 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">আপনার বয়স!</span>' : ''}
      </td>
      <td class="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400">
        <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-medium">${item.field}</span>
      </td>
      <td class="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
        ${item.achievement}
      </td>
      <td class="py-3.5 px-4 text-right">
        <span class="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full ${
          isPast
            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
        }">
          ${isPast ? '✓ অর্জিত বয়স' : '⏳ আসন্ন মাইলফলক'}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
