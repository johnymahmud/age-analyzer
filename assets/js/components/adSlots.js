/**
 * Multi-Platform Ad Slot Controller (Google AdSense, Media.net, Adsterra, etc.)
 * Provides zero-CLS reservation, policy-compliant labels and network agnostic wrappers.
 */

export function initAdSlots() {
  const adContainers = document.querySelectorAll('.ad-container');

  adContainers.forEach(container => {
    const slotType = container.getAttribute('data-ad-slot') || 'responsive';
    const isCustomAdPresent = container.querySelector('ins.adsbygoogle, iframe, [id^="media_net"], [class*="adsterra"]');

    // If no real ad network script has rendered yet, ensure a clean placeholder exists
    if (!isCustomAdPresent && !container.querySelector('.ad-placeholder')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'ad-placeholder';
      placeholder.innerHTML = `
        <div class="ad-placeholder-inner">
          <span class="ad-badge">বিজ্ঞাপন / SPONSORED</span>
          <span class="ad-slot-hint">${getSlotLabel(slotType)}</span>
        </div>
      `;
      container.appendChild(placeholder);
    }
  });
}

function getSlotLabel(type) {
  switch (type) {
    case 'header':
      return 'শীর্ষ ব্যানার স্লট (Header Leaderboard 728x90 / Responsive)';
    case 'in-content':
      return 'কন্টেন্ট ব্যানার স্লট (In-Content Banner 300x250 / 728x90)';
    case 'bottom':
      return 'ফুটার ব্যানার স্লট (Bottom Display Banner 728x90 / Responsive)';
    default:
      return 'অ্যাডভার্টাইজমেন্ট স্লট (Responsive Ad Unit)';
  }
}
