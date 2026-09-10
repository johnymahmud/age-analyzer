/**
 * Social Story Card Generator (9:16 Ratio for Instagram, WhatsApp & Facebook Stories)
 * 100% Client-side HTML5 Canvas rendering
 */
import { getState } from '../state.js';
import { calculateExactAge, calculateNextBirthday, getZodiac, getDecan } from '../calculator.js';
import { getLanguage, t, formatDigits } from '../i18n.js';

import { mountModal, closeModal } from './modalManager.js';

function getTemplate() {
  return `
  <div id="socialStoryModal" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 hidden">
    <div id="socialStoryModalBackdrop" class="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"></div>
    <div class="relative w-full max-w-lg max-h-[92vh] bg-white dark:bg-slate-900 border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
      <!-- Modal Header -->
      <div class="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex items-center justify-between">
        <div>
          <h3 data-i18n="storyCardTitle" class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            ${t('storyCardTitle') || 'সোশ্যাল স্টোরি কার্ড প্রস্তুত!'}
          </h3>
          <p data-i18n="storyCardSubtitle" class="text-xs text-slate-500 dark:text-slate-400">
            ${t('storyCardSubtitle') || 'Instagram, WhatsApp ও Facebook Story-তে শেয়ার করার জন্য সেরা সাইজ'}
          </p>
        </div>
        <button type="button" id="closeStoryModalBtn"
          class="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-sm font-bold transition-all shadow-sm cursor-pointer"
          title="বন্ধ করুন (Esc)">
          ✕
        </button>
      </div>

      <!-- Preview Image Container -->
      <div class="flex-1 overflow-y-auto p-4 flex items-center justify-center bg-slate-950/40">
        <div id="storyCardLoading" class="py-16 text-center space-y-3">
          <div class="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="text-xs text-slate-400">${getLanguage() === 'bn' ? 'স্টোরি কার্ড রেন্ডার হচ্ছে...' : 'Rendering Story Card...'}</p>
        </div>
        <img id="storyCardPreviewImg" src="" alt="Story Card Preview"
          class="max-h-[60vh] rounded-2xl shadow-2xl border border-slate-700 hidden">
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50 flex items-center justify-between gap-3">
        <button type="button" id="closeStoryFooterBtn" data-i18n="closeBtn"
          class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer">
          ${t('closeBtn') || 'বন্ধ করুন'}
        </button>
        <button type="button" id="downloadStoryImageBtn"
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-pink-600/30 transition-all flex items-center gap-1.5 cursor-pointer">
          <span data-i18n="downloadImageBtn">${t('downloadImageBtn') || '📥 ইমেজ ডাউনলোড করুন'}</span>
        </button>
      </div>
    </div>
  </div>
  `;
}

export function initSocialStoryModal() {
  // Legacy support
}

export function openSocialStoryModal() {
  const currentState = getState();
  if (!currentState.birthDate || !currentState.profile) {
    alert(t('validationError') || 'দয়া করে প্রথমে জন্মতারিখ দিন।');
    return;
  }

  mountModal('socialStoryModal', getTemplate(), (modalEl) => {
    const closeBtn = modalEl.querySelector('#closeStoryModalBtn');
    const footerCloseBtn = modalEl.querySelector('#closeStoryFooterBtn');
    const backdrop = modalEl.querySelector('#socialStoryModalBackdrop');
    const downloadBtn = modalEl.querySelector('#downloadStoryImageBtn');

    if (closeBtn) closeBtn.addEventListener('click', closeStoryModal);
    if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeStoryModal);
    if (backdrop) backdrop.addEventListener('click', closeStoryModal);

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const previewImg = modalEl.querySelector('#storyCardPreviewImg');
        if (!previewImg || !previewImg.src) return;

        const link = document.createElement('a');
        link.download = `life-timeline-story-${Date.now()}.png`;
        link.href = previewImg.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  });

  const previewImg = document.getElementById('storyCardPreviewImg');
  const loadingIndicator = document.getElementById('storyCardLoading');

  if (loadingIndicator) loadingIndicator.classList.remove('hidden');
  if (previewImg) previewImg.classList.add('hidden');

  // Render Story Card on Canvas
  generateStoryCanvas(currentState, (dataUrl) => {
    if (previewImg) {
      previewImg.src = dataUrl;
      previewImg.classList.remove('hidden');
    }
    if (loadingIndicator) loadingIndicator.classList.add('hidden');
  });
}

export function closeStoryModal() {
  closeModal('socialStoryModal');
}

function generateStoryCanvas(state, callback) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1080;
  canvas.height = 1920;

  const { birthDate, profile } = state;
  const lang = getLanguage();
  const age = calculateExactAge(birthDate);
  const nextBday = calculateNextBirthday(birthDate);
  const zodiac = getZodiac(profile.month, profile.day);
  const decan = getDecan(zodiac, profile.month, profile.day);

  const daysOfWeekBn = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const daysOfWeekEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = lang === 'bn' ? daysOfWeekBn[birthDate.getDay()] : daysOfWeekEn[birthDate.getDay()];

  // Background - Deep Cosmic Luxury Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
  bgGrad.addColorStop(0, '#030712');
  bgGrad.addColorStop(0.35, '#0f172a');
  bgGrad.addColorStop(0.7, '#1e1b4b');
  bgGrad.addColorStop(1, '#030712');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // Decorative Ambient Nebulas
  drawNebula(ctx, 200, 300, 350, 'rgba(99, 102, 241, 0.25)');
  drawNebula(ctx, 880, 800, 400, 'rgba(236, 72, 153, 0.2)');
  drawNebula(ctx, 300, 1500, 450, 'rgba(16, 185, 129, 0.2)');
  drawNebula(ctx, 850, 1700, 350, 'rgba(245, 158, 11, 0.2)');

  // Outer Golden Luxury Border
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1000, 1840);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(55, 55, 970, 1810);

  // Corner Ornaments
  drawCornerAccents(ctx, 40, 40, 1000, 1840);

  // App Brand Header
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '600 28px "Outfit", sans-serif';
  ctx.fillText('LIFE TIMELINE & HISTORICAL ANALYZER', 540, 120);

  // User Profile Name
  const userName = profile.name || (lang === 'bn' ? 'কসমিক ট্রাভেলার' : 'Cosmic Explorer');
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 64px "Hind Siliguri", "Outfit", sans-serif';
  ctx.fillText(userName, 540, 260);

  // Birth Date & Day Badge
  const bdateStr = lang === 'bn' 
    ? `জন্ম: ${formatDigits(profile.day)}/${formatDigits(profile.month)}/${formatDigits(profile.year)} (${dayName})`
    : `Born: ${profile.day}/${profile.month}/${profile.year} (${dayName})`;
  
  ctx.fillStyle = '#38bdf8';
  ctx.font = '600 32px "Hind Siliguri", "Outfit", sans-serif';
  ctx.fillText(bdateStr, 540, 320);

  // Central Card: Exact Age Highlight Box
  drawRoundedRect(ctx, 100, 380, 880, 380, 40, 'rgba(255, 255, 255, 0.05)', 'rgba(99, 102, 241, 0.4)');

  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 26px "Hind Siliguri", "Outfit", sans-serif';
  ctx.fillText(lang === 'bn' ? 'বর্তমান নিখুঁত বয়স' : 'EXACT CURRENT AGE', 540, 440);

  // Big 3 Stats: Years, Months, Days
  const yLabel = lang === 'bn' ? 'বছর' : 'Years';
  const mLabel = lang === 'bn' ? 'মাস' : 'Months';
  const dLabel = lang === 'bn' ? 'দিন' : 'Days';

  drawAgeStatColumn(ctx, 240, 540, formatDigits(age.years), yLabel, '#f8fafc');
  drawAgeStatColumn(ctx, 540, 540, formatDigits(age.months), mLabel, '#38bdf8');
  drawAgeStatColumn(ctx, 840, 540, formatDigits(age.days), dLabel, '#34d399');

  // Elapsed Sub-stats (Days & Hours)
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '500 28px "Hind Siliguri", "Outfit", sans-serif';
  const daysText = lang === 'bn' 
    ? `মোট অতিবাহিত: ${formatDigits(age.totalDays.toLocaleString('en-US'))} দিন (${formatDigits(age.totalHours.toLocaleString('en-US'))} ঘণ্টা)`
    : `Total Elapsed: ${age.totalDays.toLocaleString('en-US')} Days (${age.totalHours.toLocaleString('en-US')} Hours)`;
  ctx.fillText(daysText, 540, 700);

  // Zodiac Box
  drawRoundedRect(ctx, 100, 800, 880, 340, 40, 'rgba(255, 255, 255, 0.04)', 'rgba(6, 182, 212, 0.35)');

  ctx.font = '72px sans-serif';
  ctx.fillText(zodiac.sign, 220, 930);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#22d3ee';
  ctx.font = '800 48px "Hind Siliguri", "Outfit", sans-serif';
  const zName = lang === 'bn' ? `${zodiac.nameBn} (${zodiac.name})` : `${zodiac.name} (${zodiac.sign})`;
  ctx.fillText(zName, 320, 890);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 28px "Hind Siliguri", "Outfit", sans-serif';
  const zMeta = lang === 'bn' 
    ? `উপাদান: ${zodiac.element} | শাসক গ্রহ: ${zodiac.planet}`
    : `Element: ${zodiac.element} | Ruling Planet: ${zodiac.planet}`;
  ctx.fillText(zMeta, 320, 940);

  ctx.fillStyle = '#f59e0b';
  ctx.font = '600 26px "Hind Siliguri", "Outfit", sans-serif';
  const decanText = lang === 'bn'
    ? `${formatDigits(decan?.decanNumber || 1)}ম দ্রেক্বাণ (উপ-গ্রহ: ${decan?.subPlanet || zodiac.planet})`
    : `Decanate: ${decan?.decanNumber || 1} (Sub-planet: ${decan?.subPlanet || zodiac.planet})`;
  ctx.fillText(decanText, 320, 990);

  // Royal Archetype or Cosmic Milestone Box
  ctx.textAlign = 'center';
  drawRoundedRect(ctx, 100, 1180, 880, 340, 40, 'rgba(255, 255, 255, 0.04)', 'rgba(245, 158, 11, 0.35)');

  ctx.fillStyle = '#fbbf24';
  ctx.font = '800 38px "Hind Siliguri", "Outfit", sans-serif';
  ctx.fillText(lang === 'bn' ? '👑 মহাজাগতিক রূপরেখা ও আর্কিটাইপ' : '👑 COSMIC ARCHETYPE & SIGNATURE', 540, 1260);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 44px "Hind Siliguri", "Outfit", sans-serif';
  ctx.fillText(lang === 'bn' ? 'রাজকীয় অধিপতি (The Sovereign)' : 'The Sovereign (Leader & Visionary)', 540, 1340);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '500 26px "Hind Siliguri", "Outfit", sans-serif';
  const archSub = lang === 'bn'
    ? 'জন্মগত শাসক, নেতৃত্ব তেজ ও অটল আত্মবিশ্বাসের প্রতীক'
    : 'Innate Leadership, Golden Aura & Sovereign Charisma';
  ctx.fillText(archSub, 540, 1400);

  // Next Birthday Banner
  drawRoundedRect(ctx, 100, 1560, 880, 160, 30, 'rgba(245, 158, 11, 0.1)', 'rgba(245, 158, 11, 0.4)');
  ctx.fillStyle = '#f59e0b';
  ctx.font = '700 36px "Hind Siliguri", "Outfit", sans-serif';
  const bdayBanner = lang === 'bn'
    ? `🎂 পরবর্তী জন্মদিন আর ${formatDigits(nextBday.days)} দিন পর (হবে ${formatDigits(nextBday.nextAge)} বছর)`
    : `🎂 Next Birthday in ${nextBday.days} Days (Turning ${nextBday.nextAge})`;
  ctx.fillText(bdayBanner, 540, 1655);

  // Footer Watermark
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '500 26px "Outfit", sans-serif';
  ctx.fillText('✨ Discover Your Cosmic Timeline at Life-Timeline Pro', 540, 1780);

  callback(canvas.toDataURL('image/png'));
}

function drawNebula(ctx, x, y, radius, color) {
  const radGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
  radGrad.addColorStop(0, color);
  radGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = radGrad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawRoundedRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawAgeStatColumn(ctx, x, y, num, label, numColor) {
  ctx.fillStyle = numColor;
  ctx.font = '800 90px "Outfit", sans-serif';
  ctx.fillText(num, x, y);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 28px "Hind Siliguri", "Outfit", sans-serif';
  ctx.fillText(label, x, y + 60);
}

function drawCornerAccents(ctx, x, y, w, h) {
  const len = 30;
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;

  // Top Left
  ctx.beginPath();
  ctx.moveTo(x, y + len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.stroke();

  // Top Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + len);
  ctx.stroke();

  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(x, y + h - len);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + len, y + h);
  ctx.stroke();

  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - len);
  ctx.stroke();
}
