/**
 * Centralized Localization Dictionary (i18n)
 * Supported: 'bn' (Bengali) & 'en' (English)
 */

export const LOCALES = {
  bn: {
    // Header & Meta
    appTitle: "লাইফ-টাইমলাইন",
    appVersionBadge: "v3.2 Pro",
    themeToggleTitle: "থিম পরিবর্তন করুন (Light / Dark)",
    langToggleTitle: "Switch to English",
    langName: "English",
    langShort: "EN",
    resetBtn: "রিসেট",
    resetConfirm: "সংরক্ষিত সব তথ্য ও ছবি মুছে ফেলতে চান?",
    resetSuccess: "সব লোকাল ডেটা রিসেট করা হয়েছে।",

    // Hero Section
    engineBadge: "সম্পূর্ণ ব্রাউজার-বেসড অ্যানালিটিক্স ও হিস্ট্রি ইঞ্জিন",
    mainHeading: "লাইফ-টাইমলাইন ও হিস্টোরিক্যাল এজ অ্যানালাইজার",
    mainSubheading: "আপনার বয়সকে শুধু সংখ্যায় নয়, আবিষ্কার করুন পৃথিবীর ইতিহাস ও যুগান্তকারী মাইলফলকের মেলবন্ধনে।",

    // Stage 1: Form
    avatarUpload: "ছবি আপলোড",
    privacyNote: "আপনার ছবি ও তথ্য সম্পূর্ণ সুরক্ষায় শুধুমাত্র আপনার ব্রাউজারের লোকাল স্টোরেজে থাকবে।",
    formTitle: "আপনার জন্মতারিখ প্রদান করুন",
    formSubtitle: "মুহূর্তের মধ্যে বয়স, পরবর্তী জন্মদিন ও মহাজাগতিক পরিভ্রমণ আবিষ্কার করুন",
    dayLabel: "দিন (Day)",
    dayPlaceholder: "দিন নির্বাচন করুন",
    monthLabel: "মাস (Month)",
    monthPlaceholder: "মাস নির্বাচন করুন",
    yearLabel: "বছর (Year)",
    yearPlaceholder: "যেমন: 1988",
    calculateBtn: "লাইফ টাইমলাইন বিশ্লেষণ করুন",
    validationError: "অনুগ্রহ করে দিন, মাস ও বছর সঠিকভাবে নির্বাচন করুন।",

    // Months
    months: [
      "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
      "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
    ],

    // Days of Week
    daysOfWeek: ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"],
    bornOnDay: "জন্মবার",

    // Completion Meter (Gamification)
    meterTitle: "কসমিক লাইফ ব্লুপ্রিন্ট অগ্রগতি",
    meterStage1: "প্রাথমিক পর্যায়: বয়স ও সময় ম্যাট্রিক্স উন্মোচিত (৩৫%)",
    meterStage2: "জ্যোতির্বৈজ্ঞানিক পর্যায়: কোষ্ঠী ও সাপ্তাহিক পূর্বাভাস সক্রিয় (৭০%)",
    meterStage3: "সর্বোচ্চ পর্যায়: ১০০% পূর্ণাঙ্গ রয়্যাল আর্কিটাইপ আনলকড 👑",
    unlockZodiacPrompt: "রাশিচক্র আনলক করে ৭০% অগ্রগতিতে পৌঁছান 🔓",
    unlockArchetypePrompt: "ফেসিয়াল অরা স্ক্যান করে ১০০% পূর্ণাঙ্গ করুন 📸",

    // Action Bar
    liveUpdateActive: "লাইভ আপডেট সক্রিয়",
    copySummaryBtn: "Copy Summary",
    downloadPdfBtn: "Download PDF Report",
    socialStoryBtn: "📲 স্টোরি কার্ড (Story)",
    summaryCopied: "সারাংশ ক্লিপবোর্ডে কপি করা হয়েছে!",
    summaryCopyFailed: "কপি করতে ব্যর্থ হয়েছে।",

    // Bio Card
    profileDefaultName: "লাইফ-টাইমলাইন ট্রাভেলার",
    profileTitle: "ব্যক্তিগত প্রোফাইল",
    guestBadge: "সৌর পরিক্রমা",
    editProfileBtn: "তথ্য পরিবর্তন ✏️",

    // Age Stats Section
    ageSectionTitle: "১. নিখুঁত বয়স ও অতিবাহিত সময়",
    yearsLabel: "বছর (Years)",
    yearsSub: "পূর্ণ সৌর পরিক্রমা",
    monthsLabel: "মাস (Months)",
    monthsSub: "অতিরিক্ত মাস",
    daysLabel: "দিন (Days)",
    daysSub: "অতিরিক্ত দিন",
    totalWeeks: "মোট সপ্তাহ",
    totalDays: "মোট দিন",
    elapsedHours: "অতিবাহিত ঘণ্টা",
    totalMinutes: "মোট মিনিট",
    liveSeconds: "লাইভ সেকেন্ড ⏱️",
    heartbeats: "আনুমানিক হৃদস্পন্দন ❤️",
    minuteBreaths: "আনুমানিক নিঃশ্বাস:",

    // Next Birthday Countdown
    birthdayCardTitle: "🎂 পরবর্তী জন্মদিন কাউন্টডাউন",
    birthdayRemainingText: "পরবর্তী জন্মদিন উদযাপন করার জন্য সময় বাকি আছে:",
    cdDays: "দিন",
    cdHours: "ঘণ্টা",
    cdMinutes: "মিনিট",
    cdSeconds: "সেকেন্ড",
    nextAgeText: "পরবর্তী জন্মদিনে বয়স হবে:",

    // Locked / Interactive Hook Cards
    zodiacCardHeader: "✨ রাশিচক্র ও গ্রহচর",
    zodiacTeaserBadge: "সাপ্তাহিক পূর্বাভাস ও দ্রেক্বাণ",
    zodiacLockedNotice: "আপনার লগ্ন, দ্রেক্বাণ ও সাপ্তাহিক ভবিষ্যৎবাণী প্রস্তুত। আনলক করতে ক্লিক করুন।",
    openZodiacBtn: "রাশিফল উন্মোচন 🔓",
    zodiacUnlockedBadge: "৭টি গভীর ইনসাইট রেডি ✓",

    archetypeCardHeader: "👑 ফেসিয়াল অরা ও আর্কিটাইপ",
    archetypeTeaserBadge: "AI ফেসিয়াল স্ক্যানার",
    archetypeTitle: "সামুদ্রিক লক্ষণ ও আর্কিটাইপ",
    archetypeSub: "৭টি রাজকীয় ও মহাজাগতিক রূপরেখা",
    archetypeDesc: "চেহারার গড়ন, চোখ ও অভিব্যক্তি বিশ্লেষণ করে আপনি অধিপতি, সেনাপতি নাকি দ্রষ্টা তা উন্মোচন করুন।",
    openArchetypeBtn: "আর্কিটাইপ স্ক্যানার 📸",

    // Historical Insights
    historicalSectionTitle: "২. ঐতিহাসিক মেলবন্ধন (Historical Insights)",
    historicalSectionSub: "আপনার জন্মদিনের তারিখে বিশ্ব ইতিহাসের বিশিষ্ট ব্যক্তিত্ব ও যুগান্তকারী ঘটনা",
    famousPeopleTitle: "🌟 আপনার জন্মদিনে জন্ম নেওয়া বিখ্যাত ব্যক্তিত্ব",
    eventsTitle: "📜 উল্লেখযোগ্য ঐতিহাসিক ঘটনা ও আবিষ্কার",

    // Milestones Table
    milestonesTitle: "৩. \"আপনার বয়সে তাঁরা যা করেছিলেন\" (Milestone Benchmark)",
    milestonesSub: "আপনার বর্তমান বয়সের সাথে মনীষীদের অর্জনের তুলনামূলক পর্যবেক্ষণ",
    filterAll: "সব দেখুন",
    filterNear: "আপনার বয়সের কাছাকাছি",
    thAge: "বয়স (Age)",
    thPerson: "মনীষী / ব্যক্তিত্ব",
    thField: "ক্ষেত্র",
    thAchievement: "ঐতিহাসিক কীর্তি ও যুগান্তকারী অর্জন",
    thStatus: "স্ট্যাটাস",

    // Cosmic Stats
    cosmicTitle: "🚀 ২. মহাজাগতিক ও বায়োলজিক্যাল পরিসংখ্যান",
    cosmicDist: "মহাকাশে ভ্রমণ",
    cosmicDistUnit: "কিলোমিটার (আনুমানিক)",
    cosmicBlinks: "চোখের পলক",
    cosmicBreaths: "মোট গৃহীত আনুমানিক নিঃশ্বাস",
    cosmicBreathsUnit: "বার (প্রতি মিনিটে গড়ে ১৬টি)",
    cosmicSleep: "ঘুমের সময়কাল",
    cosmicSleepUnit: "বছর (দৈনিক গড়ে ৮ ঘণ্টা হিসাব)",

    // Stage 2: Astrological Input Modal
    astroModalTitle: "🔮 জ্যোতির্বৈজ্ঞানিক ও কোষ্ঠী তথ্য ফর্ম",
    astroModalSubtitle: "সঠিক লগ্ন, সাব-প্ল্যানেট ও সাপ্তাহিক ভবিষ্যৎবাণীর জন্য আপনার তথ্যগুলো প্রয়োজন।",
    userNameLabel: "আপনার পুরো নাম (Name)",
    userNamePlaceholder: "যেমন: মোঃ শাহ মাহমুদ",
    userGenderLabel: "লিঙ্গ (Gender / Sex)",
    genderMale: "👨 পুরুষ (Male)",
    genderFemale: "👩 মহিলা (Female)",
    genderOther: "✨ অন্যান্য (Other)",
    birthTimeLabel: "জন্ম সময় (যদি জানা থাকে - ঐচ্ছিক)",
    countryLabel: "দেশ / অঞ্চল (Region)",
    relLabel: "সম্পর্কের অবস্থা (Status)",
    relSingle: "💎 সিঙ্গেল (Single)",
    relRelationship: "❤️ সম্পর্কে আছেন (In a Relationship)",
    relMarried: "💍 বিবাহিত (Married)",
    relLiving: "🤝 লিভিং টুগেদার (Living Together)",
    relDivorced: "🕊️ বিচ্ছেদপ্রাপ্ত (Divorced)",
    relWidowed: "🥀 সঙ্গীহারা (Widowed)",
    bloodGroupLabel: "রক্তের গ্রুপ (Bio-Astro Health)",
    bloodUnknown: "জানি না / উল্লেখ নেই (ঐচ্ছিক)",
    unlockSubmitBtn: "✨ সম্পূর্ণ রাশিফল ও কোষ্ঠী উন্মোচন করুন",
    modalCancelBtn: "বাতিল করুন",

    // Completion Meter
    meterTitle: "প্রোফাইল কমপ্লিশন ও ইনসাইট ট্র্যাকার",
    meterStage1: "প্রাথমিক বয়স ও টাইমলাইন সক্রিয় (৩৫%)। গভীর রাশিফল ও আর্কিটাইপ আনলক করতে নিচের কার্ডে ক্লিক করুন।",
    meterStage2: "রাশিচক্র ও কোষ্ঠী ডেটা সম্পূর্ণ (৭০%)। ১০০% প্রোফাইল সম্পন্ন করতে ফেসিয়াল আর্কিটাইপ স্ক্যান করুন।",
    meterStage3: "অভিনন্দন! আপনার সম্পূর্ণ ১০০% পার্সোনালাইজড লাইফ ড্যাশবোর্ড আনলক হয়েছে।",

    // 4 Interactive Discovery Hook Cards
    discoverySectionTitle: "🌟 ইন্টারেক্টিভ এক্সপ্লোরেশন ও লাইফ ড্যাশবোর্ড",
    discoverySectionSub: "আপনার জন্মদিন ও বয়সের ভিত্তিতে গভীরতর অন্তর্দৃষ্টি, কোষ্ঠী ও গোপনীয় রূপরেখা উন্মোচন করুন",
    hookHistoricalCardTitle: "ঐতিহাসিক মেলবন্ধন ও আবিষ্কার",
    hookHistoricalCardBadge: "ইতিহাস ও আবিষ্কার",
    hookHistoricalCardDesc: "আপনার জন্মদিনের তারিখে বিশ্ব ইতিহাসে ঘটে যাওয়া যুগান্তকারী আবিষ্কার ও বিশিষ্ট ব্যক্তিত্বদের তালিকা।",
    hookHistoricalBtn: "মেলবন্ধন ও ঘটনাবলী দেখুন ↗",
    hookMilestonesCardTitle: "আপনার বয়সে মনীষীদের কীর্তি",
    hookMilestonesCardBadge: "মাইলফলক তুলনা",
    hookMilestonesCardDesc: "আপনার বর্তমান বয়সে রবীন্দ্রনাথ, আইনস্টাইন বা স্টিভ জবস কী অনন্য মাইলফলক অর্জন করেছিলেন? তুলনামূলক পর্যবেক্ষণ।",
    hookMilestonesBtn: "মনীষীদের অর্জন এক্সপ্লোর করুন ↗",
    hookZodiacCardTitle: "রাশিচক্র ও জ্যোতির্বিজ্ঞান",
    hookZodiacCardBadgeLocked: "🔒 আনলক প্রয়োজন (৭০%)",
    hookZodiacCardBadgeUnlocked: "✓ সম্পূর্ণ সক্রিয়",
    hookZodiacCardDesc: "সঠিক লগ্ন, শাসক গ্রহ, ৩টি দ্রেক্বাণ ও সাপ্তাহিক ভবিষ্যৎবাণী জানতে অ্যাস্ট্রো কোঅর্ডিনেটস আনলক করুন।",
    hookZodiacBtnLocked: "রাশিচক্র আনলক করুন 🔓",
    hookZodiacBtnUnlocked: "রাশিফল ড্যাশবোর্ড ↗",
    hookArchetypeCardTitle: "সামুদ্রিক লক্ষণ ও আর্কিটাইপ",
    hookArchetypeCardBadgeLocked: "🔒 স্ক্যান প্রয়োজন (১০০%)",
    hookArchetypeCardBadgeUnlocked: "✓ আর্কিটাইপ স্ক্যানড",
    hookArchetypeCardDesc: "প্রাচীন সমুদ্রশাস্ত্র ও বায়োমেট্রিক ফেস অনুপাত স্ক্যান করে জানুন আপনি অধিপতি, সেনাপতি নাকি সাধক দ্রষ্টা।",
    hookArchetypeBtn: "আর্কিটাইপ স্ক্যান করুন 📷",

    // Social Story Card
    storyCardTitle: "সোশ্যাল স্টোরি কার্ড প্রস্তুত!",
    storyCardSubtitle: "Instagram, WhatsApp ও Facebook Story-তে শেয়ার করার জন্য সেরা সাইজ",
    downloadImageBtn: "📥 ইমেজ ডাউনলোড করুন",
    closeBtn: "বন্ধ করুন",

    // Zodiac Card Footer & Countries & Legal
    zodiacCardFooterTrait: "বৈশিষ্ট্য: নেতৃত্ব, উদ্যম ও দৃঢ়তা",
    zodiacCardFooterSystem: "পাশ্চাত্য জ্যোতিষবিজ্ঞান",
    countryBD: "🇧🇩 বাংলাদেশ (Bangladesh)",
    countryIN: "🇮🇳 ভারত (India)",
    countryGlobal: "🌐 বৈশ্বিক (Global / Others)",
    footerCopyright: "© লাইফ-টাইমলাইন ও হিস্টোরিক্যাল এজ অ্যানালাইজার | ডেটা ব্রাউজারের লোকাল স্টোরেজে সম্পূর্ণ সুরক্ষিত ও গোপনীয়",
    privacyPolicyLink: "প্রাইভেসি পলিসি",
    termsLink: "ব্যবহারের শর্তাবলী",
    adPolicyLink: "বিজ্ঞাপন নীতিমালা"
  },

  en: {
    // Header & Meta
    appTitle: "Life Timeline",
    appVersionBadge: "v3.2 Pro",
    themeToggleTitle: "Toggle Theme (Light / Dark)",
    langToggleTitle: "বাংলায় পরিবর্তন করুন",
    langName: "বাংলা",
    langShort: "BN",
    resetBtn: "Reset",
    resetConfirm: "Do you want to clear all saved profile data and photo?",
    resetSuccess: "All local data has been reset.",

    // Hero Section
    engineBadge: "100% Client-Side Analytics & History Engine",
    mainHeading: "Life Timeline & Historical Age Analyzer",
    mainSubheading: "Discover your age not just in numbers, but through the tapestry of human history and cosmic milestones.",

    // Stage 1: Form
    avatarUpload: "Upload Photo",
    privacyNote: "Your photo and data remain 100% private in your browser's local storage.",
    formTitle: "Enter Your Date of Birth",
    formSubtitle: "Instant age, next birthday countdown and cosmic orbital journey in seconds",
    dayLabel: "Day",
    dayPlaceholder: "Select Day",
    monthLabel: "Month",
    monthPlaceholder: "Select Month",
    yearLabel: "Year",
    yearPlaceholder: "e.g., 1988",
    calculateBtn: "Analyze Life Timeline",
    validationError: "Please select day, month and year accurately.",

    // Months
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],

    // Days of Week
    daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    bornOnDay: "Day of Birth",

    // Completion Meter (Gamification)
    meterTitle: "Cosmic Life Blueprint Progress",
    meterStage1: "Initial Phase: Age & Chrono Matrix Decoded (35%)",
    meterStage2: "Astrological Phase: Horoscope & Weekly Forecast Active (70%)",
    meterStage3: "Master Phase: 100% Royal Archetype Blueprint Unlocked 👑",
    unlockZodiacPrompt: "Unlock Zodiac & reach 70% blueprint progress 🔓",
    unlockArchetypePrompt: "Scan facial aura to complete 100% master blueprint 📸",

    // Action Bar
    liveUpdateActive: "Live Updates Active",
    copySummaryBtn: "Copy Summary",
    downloadPdfBtn: "Download PDF Report",
    socialStoryBtn: "📲 Story Card",
    summaryCopied: "Summary copied to clipboard!",
    summaryCopyFailed: "Failed to copy summary.",

    // Bio Card
    profileDefaultName: "Life Timeline Explorer",
    profileTitle: "Personal Profile",
    guestBadge: "Solar Journey",
    editProfileBtn: "Edit Info ✏️",

    // Age Stats Section
    ageSectionTitle: "1. Exact Age & Elapsed Milestones",
    yearsLabel: "Years",
    yearsSub: "Completed solar orbits",
    monthsLabel: "Months",
    monthsSub: "Additional months",
    daysLabel: "Days",
    daysSub: "Additional days",
    totalWeeks: "Total Weeks",
    totalDays: "Total Days",
    elapsedHours: "Elapsed Hours",
    totalMinutes: "Total Minutes",
    liveSeconds: "Live Seconds ⏱️",
    heartbeats: "Estimated Heartbeats ❤️",
    minuteBreaths: "Estimated Breaths:",

    // Next Birthday Countdown
    birthdayCardTitle: "🎂 Next Birthday Countdown",
    birthdayRemainingText: "Time remaining until your next birthday celebration:",
    cdDays: "Days",
    cdHours: "Hours",
    cdMinutes: "Minutes",
    cdSeconds: "Seconds",
    nextAgeText: "Age on next birthday will be:",

    // Locked / Interactive Hook Cards
    zodiacCardHeader: "✨ Zodiac & Planetary Orbit",
    zodiacTeaserBadge: "Weekly Forecast & Decanate",
    zodiacLockedNotice: "Your Ascendant, Decanate and weekly planetary forecast are ready. Tap to unlock.",
    openZodiacBtn: "Unlock Horoscope 🔓",
    zodiacUnlockedBadge: "7 Deep Insights Ready ✓",

    archetypeCardHeader: "👑 Facial Aura & Archetype",
    archetypeTeaserBadge: "AI Facial Scanner",
    archetypeTitle: "Samudrika & Royal Archetype",
    archetypeSub: "7 Cosmic Archetypes & 6 Radar Dimensions",
    archetypeDesc: "Discover if you are born to be a Sovereign, Commander, or Mystic Seer through facial geometry.",
    openArchetypeBtn: "Scan Archetype 📸",

    // Historical Insights
    historicalSectionTitle: "2. Historical Insights & Connections",
    historicalSectionSub: "Famous figures and historic world events sharing your birth date",
    famousPeopleTitle: "🌟 Famous Personalities Born on Your Day",
    eventsTitle: "📜 Notable Historical Events & Discoveries",

    // Milestones Table
    milestonesTitle: "3. \"What They Did at Your Age\" (Milestone Benchmark)",
    milestonesSub: "Compare historical luminaries' greatest achievements at your exact age",
    filterAll: "View All",
    filterNear: "Near Your Age",
    thAge: "Age",
    thPerson: "Historical Luminary",
    thField: "Field",
    thAchievement: "Historic Achievement & Breakthrough",
    thStatus: "Status",

    // Cosmic Stats
    cosmicTitle: "🚀 2. Cosmic & Biological Statistics",
    cosmicDist: "Traveled in Space",
    cosmicDistUnit: "Kilometers (Estimated)",
    cosmicBlinks: "Eye Blinks",
    cosmicBreaths: "Estimated total breaths taken",
    cosmicBreathsUnit: "Times (~16 breaths / min)",
    cosmicSleep: "Time in Sleep",
    cosmicSleepUnit: "Years (Based on 8h/day)",

    // Stage 2: Astrological Input Modal
    astroModalTitle: "🔮 Astrological & Horoscope Coordinates",
    astroModalSubtitle: "Provide details to calculate exact rising sign, decanate, and weekly forecast.",
    userNameLabel: "Your Full Name",
    userNamePlaceholder: "e.g. Shah Mahmud",
    userGenderLabel: "Gender / Sex",
    genderMale: "👨 Male",
    genderFemale: "👩 Female",
    genderOther: "✨ Other / Non-Binary",
    birthTimeLabel: "Birth Time (Optional - for accurate rising sign)",
    countryLabel: "Country / Region",
    relLabel: "Relationship Status",
    relSingle: "💎 Single",
    relRelationship: "❤️ In a Relationship",
    relMarried: "💍 Married",
    relLiving: "🤝 Living Together",
    relDivorced: "🕊️ Divorced",
    relWidowed: "🥀 Widowed",
    bloodGroupLabel: "Blood Group (Bio-Astro Metabolism)",
    bloodUnknown: "Unknown / Prefer not to say",
    unlockSubmitBtn: "✨ Unlock Full Astrological Blueprint",
    modalCancelBtn: "Cancel",

    // Completion Meter
    meterTitle: "Profile Completion & Insight Tracker",
    meterStage1: "Core age & timeline unlocked (35%). Click discovery cards below to unlock deep astrology and royal archetype.",
    meterStage2: "Astrology coordinates unlocked (70%). Scan facial archetype to reach 100% completion.",
    meterStage3: "Congratulations! Your full 100% personalized life dashboard is unlocked.",

    // 4 Interactive Discovery Hook Cards
    discoverySectionTitle: "🌟 Interactive Exploration & Life Dashboard",
    discoverySectionSub: "Unlock deeper insights, astrological traits, and archetypes based on your date of birth",
    hookHistoricalCardTitle: "Historical Connections & Discoveries",
    hookHistoricalCardBadge: "History & Inventions",
    hookHistoricalCardDesc: "Landmark discoveries, era breakthroughs, and famous personalities born on your date.",
    hookHistoricalBtn: "View Historical Insights ↗",
    hookMilestonesCardTitle: "What Legends Did At Your Age",
    hookMilestonesCardBadge: "Milestone Benchmark",
    hookMilestonesCardDesc: "Compare your current age accomplishments against history's greatest minds and trailblazers.",
    hookMilestonesBtn: "Explore Benchmark ↗",
    hookZodiacCardTitle: "Zodiac & Astrological Insights",
    hookZodiacCardBadgeLocked: "🔒 Unlock Required (70%)",
    hookZodiacCardBadgeUnlocked: "✓ Fully Unlocked",
    hookZodiacCardDesc: "Unlock your precise ascendant, ruling planet, 3 decanates, and weekly predictive horoscopes.",
    hookZodiacBtnLocked: "Unlock Horoscope 🔓",
    hookZodiacBtnUnlocked: "Horoscope Dashboard ↗",
    hookArchetypeCardTitle: "Samudrik Archetype & Facial Aura",
    hookArchetypeCardBadgeLocked: "🔒 Scan Required (100%)",
    hookArchetypeCardBadgeUnlocked: "✓ Archetype Scanned",
    hookArchetypeCardDesc: "Ancient Samudrik Shastra meets modern facial ratios: discover if you are a Sovereign, Sage, or General.",
    hookArchetypeBtn: "Scan Archetype 📷",

    // Social Story Card
    storyCardTitle: "Social Story Card Ready!",
    storyCardSubtitle: "Perfect 9:16 aspect ratio for Instagram, WhatsApp & Facebook Stories",
    downloadImageBtn: "📥 Download Image",
    closeBtn: "Close",

    // Zodiac Card Footer & Countries & Legal
    zodiacCardFooterTrait: "Traits: Leadership, vitality & fortitude",
    zodiacCardFooterSystem: "Western Astrology",
    countryBD: "🇧🇩 Bangladesh",
    countryIN: "🇮🇳 India",
    countryGlobal: "🌐 Global / Others",
    footerCopyright: "© Life Timeline & Historical Age Analyzer | 100% private in browser local storage",
    privacyPolicyLink: "Privacy Policy",
    termsLink: "Terms of Use",
    adPolicyLink: "Advertising Policy"
  }
};
