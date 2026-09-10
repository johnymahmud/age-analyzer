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
