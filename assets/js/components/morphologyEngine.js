/**
 * Astro-Morphology & Facial Aura Computational Engine
 * ক্লায়েন্ট-সাইড ইমেজ ক্যানভাস ও জ্যোতির্বৈজ্ঞানিক আর্কিটাইপ গণক
 */
import { ARCHETYPES_DATA, SAMUDRIKA_FEATURES } from '../data/archetypes.js';
import { getBirthDayRuler, getDecan, toBnDigits } from '../calculator.js';

/**
 * Analyze an Avatar Image on an offscreen HTML5 Canvas
 */
export function analyzeImageAura(imageSrc, callback) {
  if (!imageSrc) {
    if (callback) callback({ hasImage: false, brightness: 128, warmth: 0.5, symmetry: 85 });
    return;
  }

  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const sampleSize = 64;
      canvas.width = sampleSize;
      canvas.height = sampleSize;

      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize).data;

      let totalR = 0, totalG = 0, totalB = 0, totalLuma = 0;
      const count = imgData.length / 4;

      for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        totalR += r;
        totalG += g;
        totalB += b;
        totalLuma += 0.299 * r + 0.587 * g + 0.114 * b;
      }

      const avgR = totalR / count;
      const avgG = totalG / count;
      const avgB = totalB / count;
      const avgLuma = totalLuma / count;
      const warmth = (avgR + avgG) / (2 * (avgB + 1));

      if (callback) {
        callback({
          hasImage: true,
          brightness: Math.round(avgLuma),
          warmth: Math.min(1.5, Math.max(0.5, warmth)),
          symmetry: Math.round(88 + (avgLuma % 10))
        });
      }
    } catch (e) {
      if (callback) callback({ hasImage: true, brightness: 135, warmth: 1.0, symmetry: 90 });
    }
  };

  img.onerror = () => {
    if (callback) callback({ hasImage: false, brightness: 128, warmth: 0.5, symmetry: 85 });
  };

  img.src = imageSrc;
}

/**
 * Calculate Complete Archetype and Facial Morphology Profile
 */
export function calculateArchetypeProfile(userData, visualFeatures = {}) {
  const { zodiac, month, day, year, relationship, bloodGroup, birthDate } = userData;
  const decan = getDecan(zodiac, month, day);
  const dayRuler = getBirthDayRuler(birthDate || new Date(year, month - 1, day));

  // Base Scores for 6 Dimensions (0 - 100)
  let creativity = 70;
  let leadership = 70;
  let spirituality = 70;
  let magnetism = 70;
  let willpower = 70;
  let wisdom = 70;

  // 1. Influence of Zodiac Sign & Element
  const elem = zodiac.element || "";
  if (elem.includes("আগুন")) {
    leadership += 18;
    willpower += 16;
    magnetism += 14;
  } else if (elem.includes("পানি")) {
    spirituality += 20;
    creativity += 18;
    magnetism += 10;
  } else if (elem.includes("বায়ু")) {
    magnetism += 18;
    wisdom += 16;
    creativity += 14;
  } else if (elem.includes("মাটি")) {
    willpower += 20;
    wisdom += 18;
    leadership += 12;
  }

  // 2. Specific Sign Boosts
  if (zodiac.id === 'leo' || zodiac.id === 'aries') leadership += 8;
  if (zodiac.id === 'pisces' || zodiac.id === 'cancer') spirituality += 8;
  if (zodiac.id === 'taurus' || zodiac.id === 'libra') creativity += 8;
  if (zodiac.id === 'gemini' || zodiac.id === 'sagittarius') magnetism += 8;
  if (zodiac.id === 'scorpio' || zodiac.id === 'capricorn') willpower += 8;
  if (zodiac.id === 'virgo' || zodiac.id === 'aquarius') wisdom += 8;

  // 3. Day Ruler Influence
  if (dayRuler.dayIndex === 0) leadership += 6; // Sunday - Sun
  if (dayRuler.dayIndex === 1) spirituality += 6; // Monday - Moon
  if (dayRuler.dayIndex === 2) willpower += 6; // Tuesday - Mars
  if (dayRuler.dayIndex === 3) wisdom += 6; // Wednesday - Mercury
  if (dayRuler.dayIndex === 4) wisdom += 6; // Thursday - Jupiter
  if (dayRuler.dayIndex === 5) creativity += 6; // Friday - Venus
  if (dayRuler.dayIndex === 6) willpower += 6; // Saturday - Saturn

  // 4. Blood Group Synergy
  if (bloodGroup === 'O+' || bloodGroup === 'O-') {
    leadership += 5;
    willpower += 5;
  } else if (bloodGroup === 'A+' || bloodGroup === 'A-') {
    wisdom += 6;
    creativity += 4;
  } else if (bloodGroup === 'B+' || bloodGroup === 'B-') {
    creativity += 6;
    magnetism += 5;
  } else if (bloodGroup === 'AB+' || bloodGroup === 'AB-') {
    spirituality += 7;
    wisdom += 5;
  }

  // 5. Visual Features Tuning (if photo analyzed or manually tuned)
  if (visualFeatures.warmth && visualFeatures.warmth > 1.1) {
    magnetism += 4;
    leadership += 3;
  }
  if (visualFeatures.brightness && visualFeatures.brightness > 140) {
    magnetism += 4;
    creativity += 3;
  }

  // Normalization (Cap between 65 and 98)
  creativity = Math.min(98, Math.max(65, creativity));
  leadership = Math.min(98, Math.max(65, leadership));
  spirituality = Math.min(98, Math.max(65, spirituality));
  magnetism = Math.min(98, Math.max(65, magnetism));
  willpower = Math.min(98, Math.max(65, willpower));
  wisdom = Math.min(98, Math.max(65, wisdom));

  // Determine Primary Archetype based on highest score & astrological synergy
  const scoreMap = [
    { id: "sovereign", score: leadership * 1.05 + wisdom * 0.5 },
    { id: "commander", score: willpower * 1.05 + leadership * 0.5 },
    { id: "mystic", score: spirituality * 1.05 + wisdom * 0.5 },
    { id: "creator", score: creativity * 1.05 + magnetism * 0.5 },
    { id: "charismatic", score: magnetism * 1.05 + leadership * 0.5 },
    { id: "strategist", score: wisdom * 1.05 + willpower * 0.5 },
    { id: "guardian", score: (spirituality + willpower + leadership) / 3 }
  ];

  scoreMap.sort((a, b) => b.score - a.score);
  const primaryKey = scoreMap[0].id;
  const secondaryKey = scoreMap[1].id;

  const primaryArchetype = ARCHETYPES_DATA[primaryKey] || ARCHETYPES_DATA.sovereign;
  const secondaryArchetype = ARCHETYPES_DATA[secondaryKey] || ARCHETYPES_DATA.charismatic;

  // Samudrika Shastra Signatures
  const faceShape = SAMUDRIKA_FEATURES.faceShapes[(day + month) % SAMUDRIKA_FEATURES.faceShapes.length];
  const eyeAura = SAMUDRIKA_FEATURES.eyeAuras[(day * 3) % SAMUDRIKA_FEATURES.eyeAuras.length];
  const foreheadAura = SAMUDRIKA_FEATURES.foreheadAuras[(month * 2) % SAMUDRIKA_FEATURES.foreheadAuras.length];

  return {
    primaryArchetype,
    secondaryArchetype,
    metrics: {
      creativity,
      leadership,
      spirituality,
      magnetism,
      willpower,
      wisdom
    },
    samudrika: {
      faceShape,
      eyeAura,
      foreheadAura
    },
    dayRuler,
    decan,
    visualFeatures
  };
}
