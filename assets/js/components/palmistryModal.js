/**
 * AI Palmistry & Chiromancy Interactive Modal Component
 * Complete Self-Contained Modal with AR Hand Alignment Camera, Dual-Hand Workflow, and Multi-Tab Report
 */
import { analyzePalmImage } from './palmistryEngine.js';
import { evaluateDualHandMatrix } from '../data/palmistry.js';
import { getLanguage, formatDigits } from '../i18n.js';

let activeStream = null;
let currentMode = 'single'; // 'single' | 'dual'
let currentHandStep = 'right'; // 'right' | 'left'
let singleAnalysisData = null;
let dualAnalysisData = { left: null, right: null, matrix: null };

export function openPalmistryModal() {
  const container = document.getElementById('modal-container');
  if (!container) return;

  const lang = getLanguage();
  const isBn = lang === 'bn';

  container.innerHTML = `
    <div id="palmModalBackdrop" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div class="relative w-full max-w-4xl bg-slate-900/95 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        <!-- Modal Top Bar -->
        <div class="px-6 py-4 border-b border-amber-500/20 flex items-center justify-between bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900">
          <div class="flex items-center gap-3">
            <span class="text-2xl p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30">✋</span>
            <div>
              <h3 class="text-lg sm:text-xl font-black text-amber-300 font-mono tracking-wide">
                ${isBn ? 'AI হস্তরেখা ও সামুদ্রিক বিচার' : 'AI Palmistry & Chiromancy'}
              </h3>
              <p class="text-xs text-slate-400">
                ${isBn ? 'হাতের রেখা, গ্রহ পর্বত ও কার্মিক সম্ভাবনা বিশ্লেষণ' : 'Palmar Creases, Mounts & Karmic Matrix'}
              </p>
            </div>
          </div>
          <button id="closePalmModalBtn" class="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Modal Dynamic Body Content -->
        <div id="palmModalBody" class="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          <!-- Render Initial Setup Screen -->
        </div>

      </div>
    </div>
  `;

  document.getElementById('closePalmModalBtn')?.addEventListener('click', closePalmistryModal);
  renderModeSelectionScreen();
}

export function closePalmistryModal() {
  if (activeStream) {
    activeStream.getTracks().forEach(track => track.stop());
    activeStream = null;
  }
  const container = document.getElementById('modal-container');
  if (container) container.innerHTML = '';
}

/**
 * Screen 1: Mode Selection (Single Hand vs Dual-Hand)
 */
function renderModeSelectionScreen() {
  const body = document.getElementById('palmModalBody');
  if (!body) return;

  const isBn = getLanguage() === 'bn';

  body.innerHTML = `
    <div class="max-w-xl mx-auto text-center space-y-6 py-4">
      <div class="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-4xl shadow-inner animate-bounce">
        🔮
      </div>
      
      <div>
        <h4 class="text-xl sm:text-2xl font-black text-slate-100 mb-2">
          ${isBn ? 'হস্তরেখা স্ক্যান পদ্ধতি নির্বাচন করুন' : 'Select Your Palm Scan Method'}
        </h4>
        <p class="text-xs sm:text-sm text-slate-400">
          ${isBn 
            ? 'শাস্ত্র অনুযায়ী উভয় হাতের তুলনামূলক বিচার সবচেয়ে গভীর ও নির্ভুল ফলাফল প্রদান করে।' 
            : 'According to scientific chirology, dual-hand comparison unlocks the most accurate karmic insights.'}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        <!-- Quick Single Hand Scan -->
        <div id="selectSingleHandMode" class="cursor-pointer p-5 rounded-3xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 shadow-lg group">
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">⚡</span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ${isBn ? 'দ্রুত স্ক্যান' : 'Quick Scan'}
            </span>
          </div>
          <h5 class="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
            ${isBn ? '১টি প্রধান হাত (Working Hand)' : '1 Dominant Hand'}
          </h5>
          <p class="text-xs text-slate-400 mt-1">
            ${isBn ? 'যে হাত দিয়ে মূলত কাজ করেন তার রেখা ও পর্বত বিশ্লেষণ।' : 'Instant analysis of current karma & active life trajectory.'}
          </p>
        </div>

        <!-- Master Dual-Hand Comparison -->
        <div id="selectDualHandMode" class="cursor-pointer p-5 rounded-3xl bg-gradient-to-br from-amber-950/30 to-slate-800/60 hover:from-amber-950/50 hover:to-slate-800 border border-amber-500/40 hover:border-amber-400 transition-all duration-300 shadow-xl group relative overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl"></div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">⚖️</span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ${isBn ? 'প্রস্তাবিত ★' : 'Recommended ★'}
            </span>
          </div>
          <h5 class="text-base font-bold text-amber-200 group-hover:text-amber-300 transition-colors">
            ${isBn ? 'মাস্টার ডুয়াল স্ক্যান (উভয় হাত)' : 'Master Dual-Hand Scan'}
          </h5>
          <p class="text-xs text-slate-300 mt-1">
            ${isBn ? 'বাম হাত (জন্মগত সম্ভাবনা) বনাম ডান হাত (অর্জিত ভাগ্য) তুলনা।' : 'Left hand (Potential) vs Right hand (Actualized Destiny).'}
          </p>
        </div>
      </div>

      <!-- Preferred Hand Selector for Single mode -->
      <div class="pt-2 border-t border-slate-800 flex items-center justify-center gap-4 text-xs text-slate-400">
        <span>${isBn ? 'আপনার প্রধান হাত:' : 'Your dominant hand:'}</span>
        <label class="inline-flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="dominantHandRadio" value="right" checked class="text-amber-500 focus:ring-amber-500 bg-slate-800 border-slate-700">
          <span class="text-slate-200 font-semibold">${isBn ? 'ডান হাত' : 'Right Hand'}</span>
        </label>
        <label class="inline-flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="dominantHandRadio" value="left" class="text-amber-500 focus:ring-amber-500 bg-slate-800 border-slate-700">
          <span class="text-slate-200 font-semibold">${isBn ? 'বাম হাত' : 'Left Hand'}</span>
        </label>
      </div>
    </div>
  `;

  document.getElementById('selectSingleHandMode')?.addEventListener('click', () => {
    currentMode = 'single';
    const checked = document.querySelector('input[name="dominantHandRadio"]:checked');
    currentHandStep = checked ? checked.value : 'right';
    renderCaptureScreen();
  });

  document.getElementById('selectDualHandMode')?.addEventListener('click', () => {
    currentMode = 'dual';
    currentHandStep = 'right'; // First capture right, then left
    dualAnalysisData = { left: null, right: null, matrix: null };
    renderCaptureScreen();
  });
}

/**
 * Screen 2: Camera Capture with AR Hand Silhouette Overlay & Upload Options
 */
function renderCaptureScreen() {
  const body = document.getElementById('palmModalBody');
  if (!body) return;

  const isBn = getLanguage() === 'bn';
  const handLabel = currentHandStep === 'right' 
    ? (isBn ? 'ডান হাত (Right Hand)' : 'Right Hand')
    : (isBn ? 'বাম হাত (Left Hand)' : 'Left Hand');

  body.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-4">
      
      <!-- Step Indicator -->
      <div class="flex items-center justify-between bg-slate-800/60 border border-slate-700 px-4 py-2 rounded-2xl text-xs">
        <span class="font-bold text-amber-400 flex items-center gap-1.5">
          <span>🖐️</span> ${handLabel} ${isBn ? 'স্ক্যান করুন' : 'Scan'}
        </span>
        <span class="text-slate-400">
          ${currentMode === 'dual' ? (currentHandStep === 'right' ? (isBn ? 'ধাপ ১/২' : 'Step 1/2') : (isBn ? 'ধাপ ২/২' : 'Step 2/2')) : (isBn ? 'কুইক মোড' : 'Quick Mode')}
        </span>
      </div>

      <!-- AR Camera Viewfinder Container -->
      <div class="relative w-full aspect-[4/5] sm:aspect-[4/4] max-h-[380px] bg-slate-950 rounded-3xl overflow-hidden border-2 border-amber-500/30 flex items-center justify-center shadow-2xl group">
        <video id="palmCameraFeed" autoplay playsinline class="w-full h-full object-cover"></video>
        <canvas id="palmCaptureCanvas" class="hidden"></canvas>

        <!-- Golden AR Hand Alignment Silhouette Overlay -->
        <div class="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
          <svg viewBox="0 0 200 240" class="w-full h-full max-h-[280px] stroke-amber-400/60 fill-amber-500/5 stroke-2 stroke-dasharray-4 animate-pulse">
            <!-- Palm and Fingers Contour Silhouette Guide -->
            <path d="M 65 220 C 50 180, 45 150, 42 120 C 40 100, 45 80, 50 60 C 53 45, 60 45, 63 60 C 65 80, 68 95, 70 60 C 72 40, 80 40, 83 60 C 85 80, 88 95, 90 55 C 92 35, 100 35, 103 55 C 105 80, 108 100, 110 70 C 112 55, 120 55, 122 75 C 125 105, 130 130, 138 150 C 148 170, 155 180, 145 200 C 135 220, 90 225, 65 220 Z" />
          </svg>
          <div class="absolute bottom-4 text-center bg-slate-950/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 text-[11px] text-amber-200">
            ${isBn ? 'আউটলাইনের মধ্যে হাতটি সমানভাবে রাখুন' : 'Align your palm inside the silhouette guide'}
          </div>
        </div>

        <!-- Camera Status / Fallback Notice -->
        <div id="cameraStatusOverlay" class="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-6 text-center space-y-3">
          <span class="text-4xl animate-spin text-amber-400">⏳</span>
          <p class="text-xs text-slate-300">
            ${isBn ? 'ক্যামেরা চালু হচ্ছে... অনুগ্রহ করে পারমিশন এলাউ করুন।' : 'Initializing camera... Please allow camera access.'}
          </p>
        </div>
      </div>

      <!-- Camera Action Buttons -->
      <div class="flex items-center justify-center gap-3 pt-1">
        <button id="capturePalmBtn" class="flex-1 max-w-xs py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
          <span>📸</span> ${isBn ? 'হাতের ছবি স্ক্যান করুন' : 'Capture & Scan Palm'}
        </button>

        <label class="cursor-pointer py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-500/40 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-md">
          <span>📁</span> ${isBn ? 'আপলোড' : 'Upload'}
          <input type="file" id="palmFileInput" accept="image/*" class="hidden">
        </label>
      </div>

      <!-- Sample Demo Palm Button -->
      <div class="text-center pt-2">
        <button id="loadSamplePalmBtn" class="text-xs text-amber-400/80 hover:text-amber-300 underline font-mono">
          ${isBn ? '✨ স্যাম্পল হাতের ছবি দিয়ে ট্রাই করুন' : '✨ Try with a sample realistic palm image'}
        </button>
      </div>

    </div>
  `;

  startCameraStream();

  document.getElementById('capturePalmBtn')?.addEventListener('click', captureFromCamera);
  document.getElementById('palmFileInput')?.addEventListener('change', handleFileUpload);
  document.getElementById('loadSamplePalmBtn')?.addEventListener('click', loadSamplePalm);
}

/**
 * Starts device camera stream with environment fallback
 */
async function startCameraStream() {
  const video = document.getElementById('palmCameraFeed');
  const overlay = document.getElementById('cameraStatusOverlay');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    activeStream = stream;
    if (video) {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        if (overlay) overlay.style.display = 'none';
      };
    }
  } catch (err) {
    console.warn("Camera stream unavailable, switching to file upload mode:", err);
    if (overlay) {
      overlay.innerHTML = `
        <span class="text-3xl text-amber-400">📁</span>
        <p class="text-xs text-slate-300">
          ${getLanguage() === 'bn' ? 'ক্যামেরা পাওয়া যায়নি। অনুগ্রহ করে ফাইল আপলোড বা স্যাম্পল ব্যবহার করুন।' : 'Camera access unavailable. Please use file upload or demo sample.'}
        </p>
      `;
    }
  }
}

/**
 * Capture frame from active video feed
 */
function captureFromCamera() {
  const video = document.getElementById('palmCameraFeed');
  const canvas = document.getElementById('palmCaptureCanvas');
  if (!video || !canvas) return;

  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  processPalmImage(canvas.toDataURL('image/jpeg', 0.85));
}

/**
 * Handle direct file upload
 */
function handleFileUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    processPalmImage(event.target.result);
  };
  reader.readAsDataURL(file);
}

/**
 * Generate a high quality realistic demo palm canvas
 */
function loadSamplePalm() {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  // Realistic skin tone gradient background
  const grad = ctx.createRadialGradient(300, 450, 50, 300, 400, 350);
  grad.addColorStop(0, '#f8d2b2');
  grad.addColorStop(0.5, '#eec09c');
  grad.addColorStop(1, '#c99672');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 800);

  // Palm creases aesthetic texture
  ctx.fillStyle = 'rgba(180, 110, 80, 0.15)';
  ctx.beginPath();
  ctx.arc(300, 450, 220, 0, Math.PI * 2);
  ctx.fill();

  processPalmImage(canvas.toDataURL('image/jpeg', 0.9));
}

/**
 * Screen 3: Futuristic Laser Scan Animation & Processing Pipeline
 */
async function processPalmImage(imageDataUrl) {
  if (activeStream) {
    activeStream.getTracks().forEach(track => track.stop());
    activeStream = null;
  }

  const body = document.getElementById('palmModalBody');
  if (!body) return;

  const isBn = getLanguage() === 'bn';

  body.innerHTML = `
    <div class="max-w-md mx-auto text-center space-y-6 py-8">
      <div class="relative w-48 h-64 mx-auto rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl shadow-amber-500/20">
        <img src="${imageDataUrl}" class="w-full h-full object-cover">
        
        <!-- Sweeping Golden Laser Beam -->
        <div class="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_15px_#f59e0b] animate-laserSweep"></div>
      </div>

      <div class="space-y-2">
        <h4 class="text-lg font-bold text-amber-300 font-mono tracking-wide">
          ${isBn ? 'হাতের রেখা ও পর্বত স্ক্যান হচ্ছে...' : 'Scanning Palm Creases & Mounts...'}
        </h4>
        <p id="scanStatusTicker" class="text-xs text-slate-400 font-mono animate-pulse">
          ${isBn ? '১/৪ বায়োমেট্রিক ক্রিজ রিকগনিশন...' : '1/4 Biometric Crease Recognition...'}
        </p>
      </div>

      <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
        <div id="scanProgressBar" class="bg-gradient-to-r from-amber-500 to-emerald-400 h-full w-1/4 transition-all duration-500"></div>
      </div>
    </div>
  `;

  // Dynamic status ticks
  const ticker = document.getElementById('scanStatusTicker');
  const bar = document.getElementById('scanProgressBar');

  setTimeout(() => {
    if (ticker) ticker.textContent = isBn ? '২/৪ প্রধান ৪টি রেখার দৈর্ঘ্য ও ঢাল নির্ণয়...' : '2/4 Tracing Major Creases & Curvature...';
    if (bar) bar.style.width = '50%';
  }, 700);

  setTimeout(() => {
    if (ticker) ticker.textContent = isBn ? '৩/৪ গ্রহ পর্বত ও শুভ রাজযোগ চিহ্নিতকরণ...' : '3/4 Evaluating Planetary Mounts & Auspicious Signs...';
    if (bar) bar.style.width = '80%';
  }, 1400);

  const result = await analyzePalmImage(imageDataUrl, currentHandStep);

  setTimeout(() => {
    if (bar) bar.style.width = '100%';

    if (currentMode === 'single') {
      singleAnalysisData = result;
      renderReportDashboard();
    } else {
      if (currentHandStep === 'right') {
        dualAnalysisData.right = result;
        // Prompt for left hand capture
        currentHandStep = 'left';
        renderCaptureScreen();
      } else {
        dualAnalysisData.left = result;
        dualAnalysisData.matrix = evaluateDualHandMatrix(dualAnalysisData.left, dualAnalysisData.right);
        renderReportDashboard();
      }
    }
  }, 2000);
}

/**
 * Screen 4: Multi-Tab Interactive Palmistry Results Report
 */
function renderReportDashboard() {
  const body = document.getElementById('palmModalBody');
  if (!body) return;

  const isBn = getLanguage() === 'bn';
  const isDual = currentMode === 'dual';
  const data = isDual ? dualAnalysisData.right : singleAnalysisData;
  const elemental = data.elementalHand;

  body.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Overview Banner -->
      <div class="bg-gradient-to-br ${elemental.color} ${elemental.borderColor} border rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="text-4xl p-3.5 rounded-2xl bg-slate-950/40 border border-amber-500/30 shadow-inner">
            ${elemental.symbol}
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ${isBn ? 'হস্ত আর্কিটাইপ' : 'Palm Archetype'}
            </span>
            <h4 class="text-xl sm:text-2xl font-black text-slate-100 mt-1">
              ${isBn ? elemental.name_bn : elemental.name_en}
            </h4>
            <p class="text-xs text-slate-300 mt-0.5">
              ${isBn ? elemental.characteristics_bn : elemental.characteristics_en}
            </p>
          </div>
        </div>

        <div class="text-right sm:border-l sm:border-slate-700/50 sm:pl-6 shrink-0">
          <span class="text-[11px] text-slate-400 block">${isBn ? 'সামুদ্রিক স্কোর' : 'Samudrika Vitality'}</span>
          <span class="text-3xl font-black font-mono text-amber-400">${formatDigits(data.overallScore)}%</span>
        </div>
      </div>

      <!-- Tab Navigation Buttons -->
      <div class="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar text-xs font-semibold">
        <button id="tabBtnTracer" class="palm-tab-btn active px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5 shrink-0">
          <span>🌟</span> ${isBn ? 'AR রেখা ট্রেসার' : 'AR Line Tracer'}
        </button>
        <button id="tabBtnLines" class="palm-tab-btn px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all flex items-center gap-1.5 shrink-0">
          <span>📜</span> ${isBn ? 'প্রধান রেখাসমূহ' : 'Major Lines'}
        </button>
        <button id="tabBtnMounts" class="palm-tab-btn px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all flex items-center gap-1.5 shrink-0">
          <span>🪐</span> ${isBn ? 'গ্রহ পর্বত ও শুভ চিহ্ন' : 'Mounts & Signs'}
        </button>
        ${isDual ? `
        <button id="tabBtnDual" class="palm-tab-btn px-4 py-2 rounded-xl text-emerald-400 hover:bg-emerald-950/40 border border-emerald-500/30 transition-all flex items-center gap-1.5 shrink-0">
          <span>⚖️</span> ${isBn ? 'ডুয়াল কার্মিক ম্যাট্রিক্স' : 'Dual Karmic Matrix'}
        </button>
        ` : ''}
      </div>

      <!-- Tab Content Area -->
      <div id="palmTabContent">
        <!-- Render Tab 1 by default -->
      </div>

      <!-- Action Footer -->
      <div class="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <button id="reScanPalmBtn" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all">
          🔄 ${isBn ? 'পুনরায় স্ক্যান' : 'Scan Again'}
        </button>

        <button id="exportPalmCardBtn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg flex items-center gap-1.5">
          <span>📲</span> ${isBn ? 'হস্তরেখা পাসপোর্ট ডাউনলোড' : 'Download Palm Passport'}
        </button>
      </div>

    </div>
  `;

  // Attach tab triggers
  document.getElementById('tabBtnTracer')?.addEventListener('click', () => switchTab('tracer'));
  document.getElementById('tabBtnLines')?.addEventListener('click', () => switchTab('lines'));
  document.getElementById('tabBtnMounts')?.addEventListener('click', () => switchTab('mounts'));
  if (isDual) {
    document.getElementById('tabBtnDual')?.addEventListener('click', () => switchTab('dual'));
  }

  document.getElementById('reScanPalmBtn')?.addEventListener('click', renderModeSelectionScreen);
  document.getElementById('exportPalmCardBtn')?.addEventListener('click', () => exportPalmistryCard(data));

  renderTabTracer(data);
}

function switchTab(tabId) {
  document.querySelectorAll('.palm-tab-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-amber-500/20', 'text-amber-300', 'border', 'border-amber-500/30');
    btn.classList.add('text-slate-400');
  });

  const isDual = currentMode === 'dual';
  const data = isDual ? dualAnalysisData.right : singleAnalysisData;

  if (tabId === 'tracer') {
    document.getElementById('tabBtnTracer')?.classList.add('active', 'bg-amber-500/20', 'text-amber-300', 'border', 'border-amber-500/30');
    renderTabTracer(data);
  } else if (tabId === 'lines') {
    document.getElementById('tabBtnLines')?.classList.add('active', 'bg-amber-500/20', 'text-amber-300', 'border', 'border-amber-500/30');
    renderTabLines(data);
  } else if (tabId === 'mounts') {
    document.getElementById('tabBtnMounts')?.classList.add('active', 'bg-amber-500/20', 'text-amber-300', 'border', 'border-amber-500/30');
    renderTabMounts(data);
  } else if (tabId === 'dual' && isDual) {
    document.getElementById('tabBtnDual')?.classList.add('active', 'bg-emerald-500/20', 'text-emerald-300', 'border', 'border-emerald-500/30');
    renderTabDualMatrix(dualAnalysisData);
  }
}

/**
 * Tab 1: AR Line Tracer
 */
function renderTabTracer(data) {
  const container = document.getElementById('palmTabContent');
  if (!container) return;

  const isBn = getLanguage() === 'bn';

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div class="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-slate-950 max-h-[380px] flex items-center justify-center">
        <img src="${data.tracedImageUrl}" class="w-full h-full object-cover">
        <div class="absolute bottom-3 inset-x-3 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-2xl border border-amber-500/30 flex items-center justify-between text-[11px]">
          <span class="text-amber-300 font-semibold">✨ ${isBn ? 'লেজার ট্রেস ভিউ' : 'Laser Traced AR View'}</span>
          <span class="text-slate-400 font-mono">${isBn ? (data.isRight ? 'ডান হাত' : 'বাম হাত') : (data.isRight ? 'Right Hand' : 'Left Hand')}</span>
        </div>
      </div>

      <div class="space-y-3">
        <h5 class="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">
          ${isBn ? 'রেখা কালার কোডিং গাইড' : 'Line Color Code Guide'}
        </h5>
        
        ${data.lineReadings.map(line => `
          <div class="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between hover:border-slate-600 transition-colors">
            <div class="flex items-center gap-2.5">
              <span class="w-3 h-3 rounded-full" style="background-color: ${line.color}; box-shadow: 0 0 8px ${line.color};"></span>
              <span class="text-xs font-bold text-slate-200">${isBn ? line.name_bn : line.name_en}</span>
            </div>
            <span class="text-xs font-mono font-bold text-amber-300">${formatDigits(line.clarityScore)}% ${isBn ? 'স্পষ্টতা' : 'Clarity'}</span>
          </div>
        `).join('')}

        <!-- Special Auspicious Sign Badge -->
        <div class="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 flex items-center gap-3">
          <span class="text-2xl">${data.specialSign.symbol}</span>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">${isBn ? 'চিহ্নিত রাজযোগ চিহ্ন' : 'Detected Auspicious Sign'}</span>
            <span class="text-xs font-bold text-slate-100">${isBn ? data.specialSign.name_bn : data.specialSign.name_en}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Tab 2: Major Lines Detailed Analysis
 */
function renderTabLines(data) {
  const container = document.getElementById('palmTabContent');
  if (!container) return;

  const isBn = getLanguage() === 'bn';

  container.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${data.lineReadings.map(line => `
        <div class="p-5 rounded-3xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/30 transition-all flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${line.bgClass}">
                <span>${line.icon}</span> ${isBn ? line.name_bn : line.name_en}
              </span>
              <span class="text-xs font-mono text-slate-400">${formatDigits(line.clarityScore)}%</span>
            </div>
            <h5 class="text-sm font-bold text-slate-100 mt-2 mb-1">
              ${isBn ? line.label_bn : line.label_en}
            </h5>
            <p class="text-xs text-slate-300 leading-relaxed">
              ${isBn ? line.reading_bn : line.reading_en}
            </p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Tab 3: Planetary Mounts & Special Auspicious Signs
 */
function renderTabMounts(data) {
  const container = document.getElementById('palmTabContent');
  if (!container) return;

  const isBn = getLanguage() === 'bn';

  container.innerHTML = `
    <div class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${data.mountProminences.map(mount => `
          <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-bold text-amber-300 flex items-center gap-1">
                  <span>${mount.symbol}</span> ${isBn ? mount.name_bn : mount.name_en}
                </span>
                <span class="text-xs font-mono font-bold text-slate-200">${formatDigits(mount.score)}%</span>
              </div>
              <span class="text-[10px] text-slate-400 block mb-2">${isBn ? mount.position_bn : mount.position_en}</span>
              <p class="text-[11px] text-slate-300">
                ${isBn ? mount.meaning_bn : mount.meaning_en}
              </p>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-emerald-400">
              <span>✓ ${isBn ? mount.status_bn : mount.status_en}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Special Auspicious Sign Callout -->
      <div class="p-5 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border border-amber-500/30 flex items-start gap-4">
        <span class="text-4xl p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 shrink-0">
          ${data.specialSign.symbol}
        </span>
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
            ${isBn ? 'বিশেষ সামুদ্রিক শুভ চিহ্ন' : 'Special Auspicious Mark'}
          </span>
          <h5 class="text-base font-bold text-slate-100 mb-1">
            ${isBn ? data.specialSign.name_bn : data.specialSign.name_en}
          </h5>
          <p class="text-xs text-slate-300 leading-relaxed">
            ${isBn ? data.specialSign.meaning_bn : data.specialSign.meaning_en}
          </p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Tab 4: Dual Hand Karmic Comparison Matrix
 */
function renderTabDualMatrix(dualData) {
  const container = document.getElementById('palmTabContent');
  if (!container || !dualData.matrix) return;

  const isBn = getLanguage() === 'bn';
  const m = dualData.matrix;

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Verdict Card -->
      <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-xl flex items-start gap-4">
        <span class="text-4xl p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shrink-0">⚖️</span>
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            ${isBn ? 'কার্মিক বিবর্তন বিশ্লেষণ (Potential vs Reality)' : 'Karmic Evolution Verdict'}
          </span>
          <p class="text-sm font-bold text-slate-100 leading-relaxed">
            ${isBn ? m.verdict_bn : m.verdict_en}
          </p>
        </div>
      </div>

      <!-- Comparative Bar Radar -->
      <div class="space-y-3">
        <h5 class="text-xs font-bold text-slate-300 uppercase tracking-wider">
          ${isBn ? '৫টি মূল মাত্রায় দুই হাতের তুলনা' : '5-Dimension Dual Hand Comparison'}
        </h5>

        ${m.radarMetrics.map(metric => `
          <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="text-slate-200">${isBn ? metric.subject_bn : metric.subject_en}</span>
              <span class="text-emerald-400 font-mono">+${formatDigits(metric.actual - metric.potential)}% ${isBn ? 'উন্নয়ন' : 'Growth'}</span>
            </div>

            <!-- Double Bar (Left Potential vs Right Actual) -->
            <div class="space-y-1 text-[10px] text-slate-400">
              <div class="flex items-center gap-2">
                <span class="w-24 shrink-0">${isBn ? 'বাম (সম্ভাবনা):' : 'Left (Inborn):'}</span>
                <div class="flex-1 bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div class="bg-indigo-500 h-full rounded-full" style="width: ${metric.potential}%;"></div>
                </div>
                <span class="w-8 text-right font-mono">${formatDigits(metric.potential)}%</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-24 shrink-0 text-amber-300 font-semibold">${isBn ? 'ডান (বাস্তব রূপ):' : 'Right (Actual):'}</span>
                <div class="flex-1 bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div class="bg-amber-400 h-full rounded-full" style="width: ${metric.actual}%;"></div>
                </div>
                <span class="w-8 text-right font-mono text-amber-300 font-bold">${formatDigits(metric.actual)}%</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

/**
 * Export high-res palmistry certificate passport
 */
function exportPalmistryCard(data) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 1080, 1350);
  bg.addColorStop(0, '#090d16');
  bg.addColorStop(0.5, '#111827');
  bg.addColorStop(1, '#05070a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1080, 1350);

  // Border frame
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 6;
  ctx.strokeRect(30, 30, 1020, 1290);

  // Header
  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AI PALMISTRY PASSPORT', 540, 120);

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText(`${data.elementalHand.name_en}`, 540, 180);

  // Score
  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 50px monospace';
  ctx.fillText(`Vitality Score: ${data.overallScore}%`, 540, 260);

  // Lines
  let y = 360;
  data.lineReadings.forEach(line => {
    ctx.fillStyle = line.color;
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`${line.name_en}: ${line.clarityScore}% Clarity`, 540, y);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px sans-serif';
    ctx.fillText(line.label_en, 540, y + 36);
    y += 90;
  });

  // Footer branding
  ctx.fillStyle = '#64748b';
  ctx.font = '20px monospace';
  ctx.fillText('Generated by Life-Timeline AI Palmistry Engine', 540, 1260);

  const link = document.createElement('a');
  link.download = `Palmistry-Passport-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
