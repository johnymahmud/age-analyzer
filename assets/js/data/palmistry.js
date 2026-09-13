/**
 * Palmistry & Chiromancy Knowledge Graph
 * Based on Classical Samudrika Shastra, Cheiro's Chirology & Modern Hand Dermatoglyphics
 */

export const ELEMENTAL_HANDS = {
  fire: {
    id: "fire",
    name_bn: "অগ্নি হস্ত (Fire Hand)",
    name_en: "Fire Hand (Passionate & Visionary)",
    symbol: "🔥",
    color: "from-amber-500/20 via-rose-500/20 to-orange-500/10",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-500",
    characteristics_bn: "দীর্ঘ তালু এবং অপেক্ষাকৃত ছোট আঙুল। প্রবল জীবনীশক্তি, উদ্যম ও নেতৃত্বদানের ক্ষমতা নির্দেশ করে।",
    characteristics_en: "Long palm with comparatively shorter fingers. Signifies immense vitality, charisma, and dynamic leadership.",
    temperament_bn: "সাহসী, উদ্যমী, সহজাত নেতা, রোমাঞ্চপ্রিয় এবং দ্রুত সিদ্ধান্ত গ্রহণকারী।",
    temperament_en: "Bold, adventurous, charismatic leader, and instinctive decision maker.",
    career_bn: "উদ্যোক্তা, সামরিক বা পুলিশ কর্মকর্তা, পরিচালক, রাজনীতিক, উদ্ভাবক।",
    career_en: "Entrepreneur, Military/Executive Leader, Director, Politician, Innovator."
  },
  earth: {
    id: "earth",
    name_bn: "পৃথিবী হস্ত (Earth Hand)",
    name_en: "Earth Hand (Practical & Grounded)",
    symbol: "🌍",
    color: "from-emerald-500/20 via-teal-500/20 to-slate-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-500",
    characteristics_bn: "বর্গাকার তালু এবং ছোট বলিষ্ঠ আঙুল। বাস্তববাদী দৃষ্টিভঙ্গি, স্থায়িত্ব এবং বিশ্বস্ততার প্রতীক।",
    characteristics_en: "Square palm with sturdy, short fingers. Symbol of practicality, stability, and grounded wisdom.",
    temperament_bn: "ধৈর্যশীল, বাস্তববাদী, নির্ভরযোগ্য, প্রকৃতির সান্নিধ্যপ্রিয় এবং কঠোর পরিশ্রমী।",
    temperament_en: "Patient, pragmatic, dependable, lover of nature, and deeply grounded.",
    career_bn: "প্রকৌশলী, স্থপতি, কৃষিবিদ, আর্থিক ব্যবস্থাপক, কারিগর।",
    career_en: "Engineer, Architect, Agronomist, Financial Asset Manager, Master Craftsman."
  },
  air: {
    id: "air",
    name_bn: "বায়ু হস্ত (Air Hand)",
    name_en: "Air Hand (Intellectual & Communicative)",
    symbol: "🌪️",
    color: "from-sky-500/20 via-indigo-500/20 to-cyan-500/10",
    borderColor: "border-sky-500/30",
    textColor: "text-sky-500",
    characteristics_bn: "বর্গাকার তালু এবং দীর্ঘ সুগঠিত আঙুল। তীক্ষ্ণ বুদ্ধিমত্তা, যোগাযোগ দক্ষতা ও গভীর বিশ্লেষণী মন নির্দেশ করে।",
    characteristics_en: "Square palm with long, elegant fingers. Indicates sharp intellect, analytical depth, and great eloquence.",
    temperament_bn: "চিন্তাশীল, যুক্তিপ্রবণ, চমৎকার বক্তা, জ্ঞানপিপাসু এবং সামাজিক।",
    temperament_en: "Philosophical, articulate speaker, inquisitive, intellectual, and communicative.",
    career_bn: "লেখক, গবেষক, শিক্ষাবিদ, সাংবাদিক, সফ্টওয়্যার স্থপতি, আইনজীবী।",
    career_en: "Author, Scientist/Researcher, Journalist, Software Architect, Jurist."
  },
  water: {
    id: "water",
    name_bn: "জল হস্ত (Water Hand)",
    name_en: "Water Hand (Intuitive & Empathetic)",
    symbol: "🌊",
    color: "from-blue-500/20 via-purple-500/20 to-indigo-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    characteristics_bn: "দীর্ঘায়িত ডিম্বাকৃতি তালু এবং লম্বা নমনীয় আঙুল। সূক্ষ্ম নান্দনিক অনুভূতি, অন্তর্দৃষ্টি ও আধ্যাত্মিকতার নির্দেশক।",
    characteristics_en: "Long oval palm with long, flexible fingers. Symbolizes high intuition, artistic aesthetic, and psychic depth.",
    temperament_bn: "সংবেদনশীল, আধ্যাত্মিক, সৃজনশীল, প্রবল অন্তর্দৃষ্টিসম্পন্ন ও সহানুভূতিশীল।",
    temperament_en: "Deeply empathetic, spiritual, artistic, intuitive visionary, and emotionally rich.",
    career_bn: "শিল্পী, সুরকার, মনোবিদ, চিকিৎসক, আধ্যাত্মিক পরামর্শক, কবি।",
    career_en: "Artist, Composer, Psychologist, Healer/Physician, Spiritual Mentor, Poet."
  }
};

export const MAJOR_LINES = [
  {
    id: "heart",
    name_bn: "হৃদয় রেখা (Heart Line)",
    name_en: "Heart Line (Emotional Core & Relationships)",
    icon: "❤️",
    color: "#f43f5e",
    strokeClass: "stroke-rose-500",
    bgClass: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    description_bn: "তালুর ঊর্ধ্বাংশের প্রধান রেখা। এটি আবেগ, প্রেমময়তা, সহানুভূতি এবং কার্ডিওভাসকুলার স্বাস্থ্যের দ্যোতক।",
    description_en: "The uppermost horizontal crease. Governs emotional vitality, capacity for unconditional love, and relational empathy.",
    archetypes: [
      {
        type: "long_curved_jupiter",
        label_bn: "বৃহস্পতির পর্বতে উত্তরণ (Royal Idealist)",
        label_en: "Ascends to Mount of Jupiter (Royal Idealist)",
        reading_bn: "সম্পর্কে গভীর বিশ্বস্ততা, উচ্চ আদর্শ এবং নিখাদ ভালোবাসার প্রকাশ। আপনি সম্পর্কের ক্ষেত্রে উদার ও মর্যাদাবান।",
        reading_en: "Signifies noble loyalty, high relationship ideals, and generous, dignified love."
      },
      {
        type: "straight_saturn",
        label_bn: "শনির পর্বতে সমাপ্তি (Pragmatic & Realistic)",
        label_en: "Terminates under Mount of Saturn (Pragmatic & Realistic)",
        reading_bn: "আবেগকে যুক্তির সাথে নিয়ন্ত্রণ করার ক্ষমতা। আপনি বাস্তববাদী এবং সম্পর্কের ক্ষেত্রে দায়িত্বশীল।",
        reading_en: "Exceptional emotional discipline, realism, and strong sense of responsibility in affection."
      },
      {
        type: "forked_trident",
        label_bn: "ত্রিশূল বা শাখা রেখা (Trishula of Compassion)",
        label_en: "Forked Trishula at End (Blessing of Balance)",
        reading_bn: "আবেগ ও বুদ্ধির চমৎকার ভারসাম্য। আপনি যেকোনো সম্পর্কের জটিলতা দূর করতে দক্ষ।",
        reading_en: "Auspicious fork indicating perfect harmony between passion, intellect, and worldly wisdom."
      }
    ]
  },
  {
    id: "head",
    name_bn: "মস্তিষ্ক রেখা (Head Line)",
    name_en: "Head Line (Intellect & Wisdom)",
    icon: "🧠",
    color: "#3b82f6",
    strokeClass: "stroke-blue-500",
    bgClass: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    description_bn: "হাতের মাঝখানের রেখা। এটি মানসিক একাগ্রতা, যৌক্তিক বিশ্লেষণ, মেধা ও দূরদর্শিতার নির্দেশক।",
    description_en: "The central transversal crease. Reflects intellectual faculty, cognitive clarity, problem-solving, and focus.",
    archetypes: [
      {
        type: "deep_straight",
        label_bn: "সোজা ও গভীর রেখা (Strategic Rationalist)",
        label_en: "Deep & Straight across (Strategic Rationalist)",
        reading_bn: "অত্যন্ত বাস্তবমুখী চিন্তা ও প্রখর যৌক্তিক ক্ষমতা। বৈজ্ঞানিক ও কৌশলগত বিশ্লেষণে আপনি অপ্রতিদ্বন্দ্বী।",
        reading_en: "Laser-sharp analytical focus, practical pragmatism, and unflinching strategic clarity."
      },
      {
        type: "gentle_slope_moon",
        label_bn: "চন্দ্র পর্বতের দিকে ঢালু (Creative Visionary)",
        label_en: "Gently slopes toward Mount of Moon (Creative Visionary)",
        reading_bn: "অনন্য সৃজনশীলতা, কল্পনাপ্রবণতা ও দূরদর্শী আইডিয়া তৈরির অসাধারণ ক্ষমতা।",
        reading_en: "Exceptional imagination, creative artistry, psychological intuition, and out-of-the-box thinking."
      },
      {
        type: "writers_fork",
        label_bn: "লেখকের দ্বিমুখী শাখা (Writer's / Orator's Fork)",
        label_en: "Writer's Fork at Termination (Dual Genius)",
        reading_bn: "একই সাথে গভীর সৃজনশীলতা এবং বাস্তবমুখী বুদ্ধিমত্তার অনন্য মেলবন্ধন। বহুমুখী প্রতিভার লক্ষণ।",
        reading_en: "Rare gift bridging profound creative intuition with sharp commercial or practical execution."
      }
    ]
  },
  {
    id: "life",
    name_bn: "জীবন রেখা (Life Line)",
    name_en: "Life Line (Vitality & Resilience)",
    icon: "🌿",
    color: "#10b981",
    strokeClass: "stroke-emerald-500",
    bgClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    description_bn: "বুড়ো আঙুলের চারপাশ ঘিরে থাকা বৃত্তচাপ। এটি জীবনীশক্তি, রোগ প্রতিরোধ ক্ষমতা ও জীবনের অভিযোজন নির্দেশ করে।",
    description_en: "Encircles the base of the thumb. Governs vital energy, physical stamina, life zest, and overall resilience.",
    archetypes: [
      {
        type: "wide_deep_arc",
        label_bn: "প্রশস্ত ও গভীর বৃত্তচাপ (Robust Vitality)",
        label_en: "Wide & Deep Full Arc (Robust Vitality)",
        reading_bn: "অপ্রতিরোধ্য শারীরিক ও মানসিক জীবনীশক্তি। জীবনে যেকোনো প্রতিকূল পরিস্থিতি কাটিয়ে ওঠার প্রবল ক্ষমতা।",
        reading_en: "Abundant vitality, robust immunity, energetic zest, and magnetic physical constitution."
      },
      {
        type: "graceful_clear",
        label_bn: "সুস্পষ্ট ও নির্ঝঞ্ঝাট রেখা (Harmonious Balance)",
        label_en: "Graceful & Unbroken (Harmonious Balance)",
        reading_bn: "একটি সুশৃঙ্খল, মানসিক প্রশান্তিময় এবং ভারসাম্যপূর্ণ জীবনযাপনের লক্ষণ।",
        reading_en: "Smooth, balanced life trajectory with steady health and calm inner endurance."
      }
    ]
  },
  {
    id: "fate",
    name_bn: "ভাগ্য রেখা (Fate / Saturn Line)",
    name_en: "Fate Line (Destiny & Career Track)",
    icon: "👑",
    color: "#f59e0b",
    strokeClass: "stroke-amber-500",
    bgClass: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    description_bn: "কবজি বা তালুর নিচ থেকে শনির পর্বতের দিকে ওঠা উলম্ব রেখা। ক্যারিয়ারের অগ্রগতি ও সাফল্যের নির্দেশক।",
    description_en: "Vertical crease ascending toward Saturn mount. Reflects career autonomy, self-directed purpose, and milestones.",
    archetypes: [
      {
        type: "from_wrist_unbroken",
        label_bn: "মণিবন্ধ থেকে উত্থিত স্পষ্ট রেখা (Self-Determined Master)",
        label_en: "Ascending from Wrist (Self-Determined Master)",
        reading_bn: "অল্প বয়স থেকেই নিজের লক্ষ্য সম্পর্কে স্পষ্ট ধারণা। কঠোর পরিশ্রমের মাধ্যমে নিজস্ব সাম্রাজ্য গড়ে তোলার নির্দেশক।",
        reading_en: "Strong destiny anchor from youth, self-made professional mastery, and resolute purpose."
      },
      {
        type: "from_moon_mount",
        label_bn: "চন্দ্র পর্বত থেকে উত্থিত (Public Acclaim & Support)",
        label_en: "Originating from Mount of Moon (Public Acclaim)",
        reading_bn: "জনপ্রিয়তা, সাধারণ মানুষের ভালোবাসা ও বাইরের সাহায্য সহযোগিতার মাধ্যমে ভাগ্যোন্নয়ন।",
        reading_en: "Success through public admiration, social charm, artistic charisma, and collaborative alliances."
      }
    ]
  },
  {
    id: "sun",
    name_bn: "রবি রেখা (Sun / Apollo Line)",
    name_en: "Sun Line (Fame & Radiance)",
    icon: "☀️",
    color: "#eab308",
    strokeClass: "stroke-yellow-500",
    bgClass: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    description_bn: "অনামিকার নিচে রবি পর্বতে ওঠার রেখা। এটি খ্যাতি, শিল্পনৈপুণ্য, সামাজিক স্বীকৃতি এবং আর্থিক সমৃদ্ধির দ্যোতক।",
    description_en: "Ascends toward the ring finger base. Bestows public distinction, aesthetic brilliance, and prosperity.",
    archetypes: [
      {
        type: "brilliant_sun",
        label_bn: "দীপ্তিময় রবি রেখা (Radiant Distinction)",
        label_en: "Prominent Sun Ray (Radiant Distinction)",
        reading_bn: "কর্মক্ষেত্রে বিশেষ সম্মান, মেধা ও কাজের সামাজিক স্বীকৃতি। মানুষের হৃদয়ে স্থায়ী ছাপ রাখার প্রতিভা।",
        reading_en: "Mark of high social repute, magnetic charisma, creative success, and distinguished prestige."
      }
    ]
  }
];

export const PLANETARY_MOUNTS = [
  {
    id: "jupiter",
    name_bn: "বৃহস্পতির পর্বত (Mount of Jupiter)",
    name_en: "Mount of Jupiter (Leadership & Honor)",
    symbol: "♃",
    position_bn: "তর্জনীর গোড়ায় অবস্থিত",
    position_en: "Base of Index Finger",
    meaning_bn: "নেতৃত্ব, আত্মমর্যাদা, জ্ঞান, উচ্চাকাঙ্ক্ষা ও আধ্যাত্মিক গাম্ভীর্য।",
    meaning_en: "Ambition, leadership sovereignty, ethical honor, and nobility."
  },
  {
    id: "saturn",
    name_bn: "শনির পর্বত (Mount of Saturn)",
    name_en: "Mount of Saturn (Wisdom & Discipline)",
    symbol: "♄",
    position_bn: "মধ্যমার গোড়ায় অবস্থিত",
    position_en: "Base of Middle Finger",
    meaning_bn: "ধৈর্য, গবেষণা, দূরদর্শিতা, রহস্যবিদ্যা ও গভীর কর্তব্যবোধ।",
    meaning_en: "Discipline, deep introspection, philosophy, and perseverance."
  },
  {
    id: "sun_mount",
    name_bn: "রবির পর্বত (Mount of Sun / Apollo)",
    name_en: "Mount of Sun / Apollo (Charisma & Fame)",
    symbol: "☉",
    position_bn: "অনামিকার গোড়ায় অবস্থিত",
    position_en: "Base of Ring Finger",
    meaning_bn: "সৃজনশীলতা, খ্যাতি, সৌন্দর্যবোধ ও আত্মবিশ্বাসের জ্যোতি।",
    meaning_en: "Aesthetic brilliance, artistic renown, optimism, and luminous magnetism."
  },
  {
    id: "mercury",
    name_bn: "বুধের পর্বত (Mount of Mercury)",
    name_en: "Mount of Mercury (Commerce & Eloquence)",
    symbol: "☿",
    position_bn: "কনিষ্ঠার গোড়ায় অবস্থিত",
    position_en: "Base of Little Finger",
    meaning_bn: "ব্যবসা-বাণিজ্য, যোগাযোগ দক্ষতা, বাগ্মীতা ও বৈজ্ঞানিক মেধা।",
    meaning_en: "Commercial acumen, linguistic eloquence, rapid wit, and scientific intellect."
  },
  {
    id: "venus",
    name_bn: "শুক্রের পর্বত (Mount of Venus)",
    name_en: "Mount of Venus (Love & Vitality)",
    symbol: "♀",
    position_bn: "বৃদ্ধাঙ্গুলির গোড়ায় অবস্থিত",
    position_en: "Base of Thumb",
    meaning_bn: "ভালোবাসা, আকর্ষণ, নান্দনিক রুচিবোধ, সুস্বাস্থ্য ও প্রাণপ্রাচুর্য।",
    meaning_en: "Sensory vitality, unconditional warmth, romance, and artistic flair."
  },
  {
    id: "moon",
    name_bn: "চন্দ্রের পর্বত (Mount of Moon)",
    name_en: "Mount of Moon (Intuition & Imagination)",
    symbol: "☽",
    position_bn: "তালুর নিচের বিপরীত প্রান্তে অবস্থিত",
    position_en: "Lower Percussion of Palm",
    meaning_bn: "অন্তর্দৃষ্টি, কল্পনাপ্রবণতা, আধ্যাত্মিক অনুভূতি ও ভ্রমণযোগ।",
    meaning_en: "Psychic sensitivity, creative subconscious, imagination, and world travel."
  }
];

export const SPECIAL_AUSPICIOUS_SIGNS = [
  {
    id: "trident",
    name_bn: "ত্রিশূল চিহ্ন (Trident of Shiva)",
    name_en: "Trishula / Trident of Sovereign Will",
    symbol: "🔱",
    meaning_bn: "অসাধারণ সৌভাগ্য, ত্রিভুবনজয়ী সাফল্য এবং যে কোনো ক্ষেত্রে শীর্ষ অবস্থানে পৌঁছানোর রাজযোগ।",
    meaning_en: "Supreme emblem of sovereign success, threefold blessing in career, honor, and wealth."
  },
  {
    id: "star",
    name_bn: "নক্ষত্র বা তারা চিহ্ন (Star of Illumination)",
    name_en: "Auspicious Star (Sudden Breakthrough)",
    symbol: "⭐",
    meaning_bn: "হঠাৎ অপ্রত্যাশিত খ্যাতি, ভাগ্য পরিবর্তন এবং জীবনে বিশেষ যুগান্তকারী অর্জন।",
    meaning_en: "Signifies unexpected illumination, quantum leap in recognition, and destiny breakthrough."
  },
  {
    id: "fish",
    name_bn: "মৎস্য চিহ্ন (Matsya Symbol of Wealth)",
    name_en: "Fish Sign (Spiritual & Material Abundance)",
    symbol: "🐟",
    meaning_bn: "প্রাচীন ভারতীয় সামুদ্রিক শাস্ত্রে পরম সৌভাগ্যের প্রতীক। দীর্ঘস্থায়ী খ্যাতি ও বিত্তের দ্যোতক।",
    meaning_en: "Classical Vedic sign of permanent wealth, high spiritual merit, and enduring honor."
  },
  {
    id: "temple",
    name_bn: "মন্দির বা ধ্বজা চিহ্ন (Temple / Flag of Victory)",
    name_en: "Temple / Flag of Triumph",
    symbol: "🚩",
    meaning_bn: "ধর্মীয় বা আধ্যাত্মিক মর্যাদা, আদর্শবাদী চরিত্র এবং সমাজসেবায় বিজয় ও খ্যাতি।",
    meaning_en: "Denotes victorious legacy, high ethical standards, and social philanthropy."
  }
];

/**
 * Calculates a complete comparative dual-hand matrix
 * Compares Left Hand (Inborn Potential) vs Right Hand (Actualized Reality)
 */
export function evaluateDualHandMatrix(leftHandData, rightHandData) {
  const potentialScore = leftHandData?.overallScore || 84;
  const actualizedScore = rightHandData?.overallScore || 91;
  const evolutionDelta = actualizedScore - potentialScore;

  let verdict_bn = "";
  let verdict_en = "";

  if (evolutionDelta >= 0) {
    verdict_bn = `আপনি আপনার জন্মগত সম্ভাবনার চেয়েও +${evolutionDelta}% বেশি কর্মক্ষমতা ও সাফল্য বাস্তবে রূপদান করেছেন। এটি একজন প্রবল ইচ্ছাশক্তি সম্পন্ন 'Self-Made Achiever' এর লক্ষণ!`;
    verdict_en = `You have exceeded your inborn baseline by +${evolutionDelta}%. This marks you as a self-determined, resilient 'Self-Made Master of Destiny'.`;
  } else {
    verdict_bn = `আপনার মধ্যে আরও অপ্রকাশিত জন্মগত প্রতিভা রয়েছে, যা সঠিক পরিকল্পনা ও আত্মবিশ্বাস দিয়ে আপনি যে কোনো মুহূর্তে উন্মোচন করতে পারেন।`;
    verdict_en = `You possess vast untapped latent potential waiting to be fully actualized through strategic focus.`;
  }

  return {
    potentialScore,
    actualizedScore,
    evolutionDelta,
    verdict_bn,
    verdict_en,
    radarMetrics: [
      { subject_bn: "ইচ্ছা ও নেতৃত্ব", subject_en: "Leadership", potential: 82, actual: 92 },
      { subject_bn: "মেধা ও কৌশল", subject_en: "Intellect", potential: 88, actual: 95 },
      { subject_bn: "সহানুভূতি ও সম্পর্ক", subject_en: "Empathy", potential: 78, actual: 86 },
      { subject_bn: "প্রাণশক্তি ও স্ট্যামিনা", subject_en: "Vitality", potential: 85, actual: 89 },
      { subject_bn: "ভাগ্যোন্নয়ন ট্র‍্যাক", subject_en: "Fortune Track", potential: 80, actual: 94 }
    ]
  };
}

/**
 * Classical Age Epochs on the Life & Fate Lines
 */
export const LIFE_TIMELINE_PHASES = [
  {
    minAge: 0,
    maxAge: 20,
    phase_bn: "ভিত্তি গঠন ও প্রারম্ভিক বিকাশ (Foundation & Discovery)",
    phase_en: "Foundation & Discovery Epoch",
    energy_bn: "শৈশব ও প্রারম্ভিক মেধা বিকাশ। জীবনের মূল চালিকাশক্তি ও আগ্রহের ক্ষেত্র গঠনের সময়।",
    energy_en: "Formation of intellectual baseline, character building, and core values."
  },
  {
    minAge: 21,
    maxAge: 35,
    phase_bn: "কর্মোন্মেষ ও আত্মপ্রতিষ্ঠার জয়যাত্রা (Launch & Ambition)",
    phase_en: "Ambition & Career Ascendance",
    energy_bn: "কেরিয়ার গঠন, জীবনের বড় সিদ্ধান্ত এবং নিজের স্বকীয়তা প্রমাণ করার সুবর্ণ সময়কাল।",
    energy_en: "Defining life milestones, career momentum, identity anchoring, and key partnerships."
  },
  {
    minAge: 36,
    maxAge: 50,
    phase_bn: "সর্বোচ্চ কর্তৃত্ব, সমৃদ্ধি ও নেতৃত্ব (Peak Mastery & Leadership)",
    phase_en: "Peak Sovereign Mastery",
    energy_bn: "অভিজ্ঞতার পূর্ণ রূপান্তর, পেশাগত কর্তৃত্ব অর্জন, সামাজিক প্রভাব ও সুদৃঢ় আর্থিক ভিত্তি গড়ার সময়।",
    energy_en: "Peak executive leadership, material stability, high societal authority, and creative mastery."
  },
  {
    minAge: 51,
    maxAge: 100,
    phase_bn: "দূরদর্শী প্রজ্ঞা ও স্থায়ী কীর্তি (Legacy & Spiritual Wisdom)",
    phase_en: "Legacy & Transcendence",
    energy_bn: "পরবর্তী প্রজন্মের জন্য স্থায়ী অনুপ্রেরণা, প্রজ্ঞা বিতরণ ও আত্মিক প্রশান্তিময় অর্জনের যুগ।",
    energy_en: "Distilling life wisdom, enduring legacy, spiritual tranquility, and mentorship."
  }
];

export function getLifeTimelineMilestone(age = 30) {
  const currentAge = Math.max(1, Math.min(100, Math.floor(age)));
  const phase = LIFE_TIMELINE_PHASES.find(p => currentAge >= p.minAge && currentAge <= p.maxAge) || LIFE_TIMELINE_PHASES[1];
  
  // Normalized position along the Life Line arc (0.0 to 1.0)
  const normalizedProgress = Math.min(0.95, Math.max(0.08, currentAge / 75));

  return {
    currentAge,
    phase,
    normalizedProgress,
    milestone_bn: `বয়স ${currentAge} বছর: আপনি বর্তমানে আপনার জীবনরেখার '${phase.phase_bn}' পর্বে অবস্থান করছেন।`,
    milestone_en: `Age ${currentAge}: You are currently navigating the '${phase.phase_en}' on your Life Line.`
  };
}

/**
 * 2D:4D Digit Ratio (Index vs Ring Finger Evolutionary Biomarker)
 */
export function evaluateDigitRatio(indexLen, ringLen) {
  const ratio = Number((indexLen / Math.max(1, ringLen)).toFixed(2));
  
  if (ratio < 0.98) {
    // Ring finger significantly longer (Low 2D:4D)
    return {
      ratio,
      type_bn: "উদ্যোক্তা ও নির্ভীক দূরদর্শী (Strategic Risk-Taker)",
      type_en: "High Spatial & Strategic Drive",
      desc_bn: "আপনার অনামিকা তর্জনীর চেয়ে দীর্ঘ। আধুনিক বায়োমেট্রিক্স অনুযায়ী এটি প্রবল সাহস, প্রতিযোগিতামূলক মনোভাব ও দ্রুত সিদ্ধান্ত গ্রহণের ক্ষমতার নির্দেশক।",
      desc_en: "Longer ring finger correlates with high spatial endurance, decisive risk tolerance, and natural entrepreneurial drive."
    };
  } else if (ratio > 1.02) {
    // Index finger longer (High 2D:4D)
    return {
      ratio,
      type_bn: "কূটনৈতিক ও বাগ্মী ব্যক্তিত্ব (Diplomatic Communicator)",
      type_en: "High Verbal & Relational Acumen",
      desc_bn: "আপনার তর্জনী অনামিকার চেয়ে দীর্ঘ। এটি চমৎকার যোগাযোগ দক্ষতা, কূটনৈতিক প্রজ্ঞা এবং সহানুভূতিশীল সামাজিক নেতৃত্বের প্রতীক।",
      desc_en: "Prominent index finger reflects exceptional linguistic eloquence, social emotional intelligence, and diplomatic leadership."
    };
  } else {
    // Balanced ratio
    return {
      ratio,
      type_bn: "ভারসাম্যপূর্ণ কৌশলবিদ (Harmonious Balancer)",
      type_en: "Harmonious Strategic Balance",
      desc_bn: "আপনার তর্জনী ও অনামিকা প্রায় সমান দীর্ঘ। এটি আবেগ ও যুক্তির নিখুঁত ভারসাম্য এবং বহুমুখী অভিযোজন ক্ষমতার লক্ষণ।",
      desc_en: "Near-equal digit ratio indicates balanced cognitive adaptability, steady temperament, and multi-disciplinary talent."
    };
  }
}

/**
 * Astro-Palmistry & Chiromancy Cosmic Synthesis Knowledge Graph
 * Bridges Astrological Zodiac Signs, Blood Groups & Relationship Matrices with Hand Creases
 */
export const ZODIAC_TO_MOUNT = {
  aries: { mountId: 'mars', ruler_bn: 'মঙ্গল (Mars)', ruler_en: 'Mars', mountName_bn: 'মঙ্গল পর্বত', mountName_en: 'Mount of Mars', sign_bn: 'মেষ (Aries)' },
  taurus: { mountId: 'venus', ruler_bn: 'শুক্র (Venus)', ruler_en: 'Venus', mountName_bn: 'শুক্র পর্বত', mountName_en: 'Mount of Venus', sign_bn: 'বৃষ (Taurus)' },
  gemini: { mountId: 'mercury', ruler_bn: 'বুধ (Mercury)', ruler_en: 'Mercury', mountName_bn: 'বুধ পর্বত', mountName_en: 'Mount of Mercury', sign_bn: 'মিথুন (Gemini)' },
  cancer: { mountId: 'moon', ruler_bn: 'চন্দ্র (Moon)', ruler_en: 'Moon', mountName_bn: 'চন্দ্র পর্বত', mountName_en: 'Mount of Moon', sign_bn: 'কর্কট (Cancer)' },
  leo: { mountId: 'sun_mount', ruler_bn: 'সূর্য (Sun)', ruler_en: 'Sun', mountName_bn: 'রবি পর্বত', mountName_en: 'Mount of Sun', sign_bn: 'সিংহ (Leo)' },
  virgo: { mountId: 'mercury', ruler_bn: 'বুধ (Mercury)', ruler_en: 'Mercury', mountName_bn: 'বুধ পর্বত', mountName_en: 'Mount of Mercury', sign_bn: 'কন্যা (Virgo)' },
  libra: { mountId: 'venus', ruler_bn: 'শুক্র (Venus)', ruler_en: 'Venus', mountName_bn: 'শুক্র পর্বত', mountName_en: 'Mount of Venus', sign_bn: 'তুলা (Libra)' },
  scorpio: { mountId: 'mars', ruler_bn: 'মঙ্গল (Mars)', ruler_en: 'Mars', mountName_bn: 'মঙ্গল পর্বত', mountName_en: 'Mount of Mars', sign_bn: 'বৃশ্চিক (Scorpio)' },
  sagittarius: { mountId: 'jupiter', ruler_bn: 'বৃহস্পতি (Jupiter)', ruler_en: 'Jupiter', mountName_bn: 'বৃহস্পতি পর্বত', mountName_en: 'Mount of Jupiter', sign_bn: 'ধনু (Sagittarius)' },
  capricorn: { mountId: 'saturn', ruler_bn: 'শনি (Saturn)', ruler_en: 'Saturn', mountName_bn: 'শনি পর্বত', mountName_en: 'Mount of Saturn', sign_bn: 'মকর (Capricorn)' },
  aquarius: { mountId: 'saturn', ruler_bn: 'শনি (Saturn)', ruler_en: 'Saturn', mountName_bn: 'শনি পর্বত', mountName_en: 'Mount of Saturn', sign_bn: 'কুম্ভ (Aquarius)' },
  pisces: { mountId: 'jupiter', ruler_bn: 'বৃহস্পতি (Jupiter)', ruler_en: 'Jupiter', mountName_bn: 'বৃহস্পতি পর্বত', mountName_en: 'Mount of Jupiter', sign_bn: 'মীন (Pisces)' }
};

export const BLOOD_GROUP_PALM_GUIDE = {
  'O+': {
    dosha_bn: 'পিত্ত ধাতু (Pitta / Vital Fire)',
    dosha_en: 'Pitta (Vital Metabolic Fire)',
    creaseImpact_bn: 'প্রবল রক্তসঞ্চালন ও গভীর জীবনরেখা (Life Line) গঠন করে। সহজাত রোগপ্রতিরোধ ও নেতৃত্বের উদ্দীপনা বৃদ্ধি করে।',
    creaseImpact_en: 'Enhances Life Line vitality and Mars mount resilience. Indicates high physical stamina and decisive action.'
  },
  'O-': {
    dosha_bn: 'বিশুদ্ধ পিত্ত-বায়ু (Universal Catalyst)',
    dosha_en: 'Pitta-Vata (Universal Catalyst)',
    creaseImpact_bn: 'উচ্চ সংবেদনশীলতা ও দ্রুত সিদ্ধান্ত নেওয়ার ক্ষমতা। করতলের মধ্যভাগে সতেজ এনার্জি ফ্লো প্রদান করে।',
    creaseImpact_en: 'High psychic sensitivity, rapid reflex arc, and dynamic primal focus across the palm.'
  },
  'A+': {
    dosha_bn: 'বায়ু ধাতু (Vata / Analytical Intellect)',
    dosha_en: 'Vata (Analytical Intellect)',
    creaseImpact_bn: 'মস্তক রেখার (Head Line) বিশ্লেষণ ক্ষমতা ও সূক্ষ্ম পর্যবেক্ষণকে বহুগুণে তীক্ষ্ণ করে।',
    creaseImpact_en: 'Sharpens Head Line analytical depth, structural discipline, and meticulous attention to detail.'
  },
  'A-': {
    dosha_bn: 'বায়ু-কফ (Perfectionist Visionary)',
    dosha_en: 'Vata-Kapha (Perfectionist Visionary)',
    creaseImpact_bn: 'গভীর চিন্তাশক্তি ও শিল্পরুচি। বুধ পর্বত ও মস্তক রেখায় বিশেষ বুদ্ধিবৃত্তিক দীপ্তি সৃষ্টি করে।',
    creaseImpact_en: 'Refines Mercury mount and intellect creases, reflecting artistic perfectionism and strategic vision.'
  },
  'B+': {
    dosha_bn: 'কফ-পিত্ত (Dynamic Maverick)',
    dosha_en: 'Kapha-Pitta (Dynamic Maverick)',
    creaseImpact_bn: 'বহুমুখী অভিযোজন ক্ষমতা ও ভাগ্যরেখার (Fate Line) গতিশীলতা বৃদ্ধি করে। বাধা অতিক্রমের সহজাত ক্ষমতা।',
    creaseImpact_en: 'Bolsters Fate Line momentum and Jupiter Mount sovereignty, fostering great entrepreneurial resilience.'
  },
  'B-': {
    dosha_bn: 'বায়ু-পিত্ত (Unconventional Innovator)',
    dosha_en: 'Vata-Pitta (Unconventional Innovator)',
    creaseImpact_bn: 'স্বাধীনচেতা মনোভাব ও ব্যতিক্রমী উদ্ভাবনী মেধা। রবি রেখা ও বৃহস্পতি পর্বতে বিশেষ প্রভাব রাখে।',
    creaseImpact_en: 'Independent drive and creative nonconformity, activating the Sun Line and higher palm mounts.'
  },
  'AB+': {
    dosha_bn: 'ত্রিদোষ সমন্বয় (Harmonious Synthesizer)',
    dosha_en: 'Tri-Dosha Harmonious Synthesizer',
    creaseImpact_bn: 'হৃদয়রেখা (Heart Line) ও চন্দ্র পর্বতের সমন্বয়ে গভীর মানসিক অন্তর্দৃষ্টি ও সহানুভূতি প্রদান করে।',
    creaseImpact_en: 'Harmonizes Heart Line and Moon Mount, granting empathetic wisdom and multi-layered charisma.'
  },
  'AB-': {
    dosha_bn: 'আধ্যাত্মিক অন্তর্দৃষ্টি (Mystic Intuitive)',
    dosha_en: 'Mystic Intuitive Synthesizer',
    creaseImpact_bn: 'বিরল মনন ও সূক্ষ্ম অনুভূতির প্রতীক। চন্দ্র পর্বত ও অতীন্দ্রিয় অনুভূতির রেখাকে সক্রিয় করে।',
    creaseImpact_en: 'Rare spiritual sensitivity, activating intuitive palm creases and deep psychic perception.'
  }
};

export const RELATIONSHIP_PALM_GUIDE = {
  single: {
    status_bn: 'অবিবাহিত ও আত্ম-উন্নয়নশীল (Single & Sovereign)',
    status_en: 'Single & Self-Sovereign',
    resonance_bn: 'হৃদয়রেখা বর্তমানে আত্মমর্যাদা ও ব্যক্তিগত ক্যারিয়ার বিকাশে সর্বাধিক শক্তি ব্যয় করছে। প্রেমযোগ অত্যন্ত পবিত্র ও আদর্শমুখী।',
    resonance_en: 'Heart Line energy is focused on self-actualization, career anchoring, and high relationship standards.'
  },
  in_relation: {
    status_bn: 'প্রেমময় সম্পর্কে আবদ্ধ (In a Romantic Union)',
    status_en: 'In a Romantic Partnership',
    resonance_bn: 'হৃদয়রেখা এবং শুক্র পর্বতের মধ্যে চমৎকার আবেগীয় অনুরণন চলছে। পারস্পরিক বিশ্বস্ততা সম্পর্ককে দীর্ঘস্থায়ী রূপ দেবে।',
    resonance_en: 'Vibrant resonance between Heart Line and Mount of Venus, fostering emotional depth and mutual devotion.'
  },
  married: {
    status_bn: 'দাম্পত্য বন্ধনে স্থিতিশীল (Married / Harmonious Matrimony)',
    status_en: 'Married & Harmonious Union',
    resonance_bn: 'বুধ পর্বতের বিবাহ রেখা ও শুক্র পর্বতের বলশালিত্ব দাম্পত্য সুখ, যৌথ সমৃদ্ধি এবং পারিবারিক স্থায়িত্ব নির্দেশ করছে।',
    resonance_en: 'Union lines on Mercury and Venus Mount indicate domestic stability, shared prosperity, and enduring bond.'
  },
  complicated: {
    status_bn: 'জটিল রূপান্তর পর্ব (Complex Transformation)',
    status_en: 'Complex Relationship Shift',
    resonance_bn: 'হৃদয়রেখার আবেগীয় ওঠানামা আত্মসংযম ও ধৈর্য দাবি করছে। সম্পর্কের ক্ষেত্রে খোলামেলা আলোচনা শুভফল আনবে।',
    resonance_en: 'Emotional cross-currents on Heart Line urge clarity, patience, and transparent communication.'
  },
  divorced: {
    status_bn: 'আত্ম-পুনর্জন্ম ও নবজাগরণ (Self-Rebirth & New Dawn)',
    status_en: 'Rebirth & New Horizons',
    resonance_bn: 'বিগত অভিজ্ঞতা আপনার হৃদয়রেখাকে আরও পরিপক্ব করেছে। চন্দ্র পর্বত ও রবি রেখা নতুন আত্মবিশ্বাস নির্দেশ করছে।',
    resonance_en: 'Matured Heart Line reflects profound emotional resilience and an auspicious cycle for fresh beginnings.'
  },
  widowed: {
    status_bn: 'চিরন্তন প্রজ্ঞা ও আত্মিক প্রশান্তি (Eternal Love & Serenity)',
    status_en: 'Eternal Affection & Serenity',
    resonance_bn: 'হৃদয়রেখায় অটুট ভালোবাসার ছাপ এবং আত্মিক প্রশান্তির গভীর শক্তি বিরাজমান।',
    resonance_en: 'Sublime Heart Line resonance of enduring spiritual love, grace, and inner strength.'
  }
};

/**
 * Evaluates the full Astro-Palmar Cosmic Fusion Matrix
 * Cross-analyzes Zodiac Sign, Blood Group, Relationship, and Hand Creases
 */
export function evaluateAstroPalmSynergy(userData = {}, palmData = {}) {
  const zodiacId = userData.zodiac?.id || (typeof userData.zodiac === 'string' ? userData.zodiac.toLowerCase() : 'aries');
  const zodiacConfig = ZODIAC_TO_MOUNT[zodiacId] || ZODIAC_TO_MOUNT.aries;

  // Find ruling mount prominence score
  const mounts = palmData.mountProminences || [];
  const rulingMount = mounts.find(m => m.id === zodiacConfig.mountId) || mounts[0] || { score: 88, status_bn: 'সুগঠিত' };
  
  const mountScore = rulingMount.score || 88;
  const mountStatus = mountScore >= 90 
    ? { bn: "মহাজাগতিক রাজযোগ সমুন্নত", en: "Sovereign Cosmic Alignment" }
    : { bn: "উচ্চ প্রভাবশালী ও শুভদায়ী", en: "Highly Auspicious Resonance" };

  // Blood group synergy
  const bgKey = userData.bloodGroup || 'O+';
  const bloodSynergy = BLOOD_GROUP_PALM_GUIDE[bgKey] || BLOOD_GROUP_PALM_GUIDE['O+'];

  // Relationship synergy
  const relKey = userData.relationship || 'single';
  const relSynergy = RELATIONSHIP_PALM_GUIDE[relKey] || RELATIONSHIP_PALM_GUIDE.single;

  // Cosmic Synergy Composite Score
  const baseOverall = palmData.overallScore || 85;
  const cosmicSynergyScore = Math.min(99, Math.max(84, Math.round(mountScore * 0.45 + baseOverall * 0.45 + 8)));

  const isUnlocked = Boolean(userData.bloodGroup || userData.relationship || userData.gender);

  return {
    isUnlocked,
    cosmicSynergyScore,
    zodiacConfig,
    rulingMount,
    mountScore,
    mountStatus,
    bloodGroup: bgKey,
    bloodSynergy,
    relationship: relKey,
    relSynergy,
    cosmicVerdict_bn: `আপনার ${zodiacConfig.sign_bn} রাশির অধিপতি '${zodiacConfig.ruler_bn}' গ্রহের সংশ্লিষ্ট '${zodiacConfig.mountName_bn}' আপনার করতলে ${mountScore}% শক্তিশালী। এর সাথে রক্তের '${bloodSynergy.dosha_bn}' ধাতু মিশ্রিত হয়ে আপনার জীবনীশক্তি ও ভাগ্যরেখাকে অনন্য স্থায়িত্ব প্রদান করছে।`,
    cosmicVerdict_en: `Your ${zodiacConfig.sign_bn} ruler '${zodiacConfig.ruler_en}' reflects ${mountScore}% prominence on your '${zodiacConfig.mountName_en}'. Synergized with your '${bloodSynergy.dosha_en}' vitality, this amplifies your active life trajectory.`,
    remedy_bn: `শুভ রত্ন ও কার্মিক পরামর্শ: ${zodiacConfig.ruler_bn} গ্রহের শক্তি আরও শানিত করতে আত্মবিশ্বাসের সাথে লক্ষ্য স্থির রাখুন এবং নিয়মিত সূর্যালোক ও প্রকৃতির সান্নিধ্য গ্রহণ করুন।`,
    remedy_en: `Karmic Alignment Remedy: To further elevate your ${zodiacConfig.ruler_en} power, maintain purposeful mental focus and immerse in nature daily.`
  };
}

