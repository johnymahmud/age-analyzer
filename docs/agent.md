# 🤖 AI Agent & Developer Guide (Rules of Engagement)

এই নির্দেশিকাটি যেকোনো নতুন AI এজেন্ট অথবা নতুন ডেভেলপারের জন্য প্রযোজ্য। যেকোনো নতুন ফিচার, বাগফিক্স বা UI পরিবর্তনের কাজ শুরু করার পূর্বে এই নির্দেশিকা অবশ্যই পাঠ করতে হবে।

---

## 🛑 গোল্ডেন রুলস (The Golden Rules)

### ১. কোড রি-রাইট না করার নীতি (Do NOT Rewrite Working Code)
- পূর্বে তৈরি করা এবং কার্যকর মডিউলগুলোকে সম্পূর্ণ মুছে আবার নতুন করে লিখবেন না।
- পরিবর্তনের প্রয়োজন হলে নির্দিষ্ট ফাংশন বা স্টাইলে ইনক্রিমেন্টাল (ছোট ছোট লক্ষ্যভিত্তিক) এডিট করুন।

### ২. ডুপ্লিকেট ফিচার/ডেটা তৈরি নিষিদ্ধ (Zero Redundancy)
- নতুন কোনো ঐতিহাসিক ব্যক্তিত্ব, ইভেন্ট, রাশিচক্র, আর্কিটাইপ বা পামিস্ট্রি তথ্য যোগ করার আগে `assets/js/data/` ফোল্ডারের ফাইলগুলো পর্যবেক্ষণ করুন।
- একাধিক ফাইল বা একাধিক জায়গায় একই ক্যালকুলেশন লজিক ডুপ্লিকেট করবেন না; সর্বদা `calculator.js`, `morphologyEngine.js` বা `palmistryEngine.js` থেকে ফাংশন ইমপোর্ট করুন।

### ৩. কোনো বিল্ড স্টেপ বা প্যাকেজ ডিপেনডেনসি চাপিয়ে দেওয়া যাবে না
- প্রজেক্টটি ব্রাউজার-নেটিভ **Vanilla JavaScript (ES Modules)** এ চলে।
- ব্যবহারকারীর স্পষ্ট অনুরোধ ব্যতীত কোনো Webpack, Vite, Babel বা npm বিল্ড স্ক্রিপ্ট বাধ্যতামূলক করবেন না, কারণ এটি সরাসরি GitHub Pages-এ স্ট্যাটিকালি হোস্ট করা হয়।

### ৪. ডিপ মেমোরি ও স্টেট ক্লিনজিং নিয়ম (In-Memory State Purge Rule)
- কোনো মডিউলে যদি মডিউল-লেভেল ক্লোজার ভ্যারিয়েবল (`let currentAvatar`, `let stagedScanImage`, ইত্যাদি) থাকে, তবে অবশ্যই একটি ডেডিকেটেড এক্সপোর্টেড রিসেট ফাংশন (যেমন: `resetArchetypeModalState()`, `resetPalmistryModalState()`, `resetAvatarUpload()`) থাকতে হবে যা রিসেট বাটনের সাথে সংযুক্ত থাকবে।

---

## 🔒 ক্রুশিয়াল ইনভ্যারিয়েন্টস (Immutable Invariants)

### ক. অপরিবর্তনীয় HTML DOM IDs
নিচের DOM আইডিগুলো জাভাস্ক্রিপ্ট কন্ট্রোলার ও কম্পোনেন্ট দ্বারা নিয়ন্ত্রিত হয়। **এগুলো কখনো নাম পরিবর্তন বা মুছে ফেলা যাবে না**:

| DOM ID | ফাইল রেফারেন্স | বিবরণ |
| :--- | :--- | :--- |
| `lifeTimelineForm` | `app.js` | মূল ইনপুট ফর্ম |
| `dobDay`, `dobMonth`, `dobYear` | `app.js` | জন্মতারিখ ইনপুটসমূহ |
| `userCountry`, `userName`, `userGender`, `userRelationship`, `userBloodGroup`, `birthTime` | `app.js` | ব্যবহারকারীর প্রোফাইল ও বায়ো ইনপুটসমূহ |
| `resultsContainer` | `app.js` | পুরো ফলাফল সেকশনের প্যারেন্ট কন্টেইনার |
| `avatarUploadContainer`, `avatarInput`, `avatarImage`, `removeAvatarBtn` | `upload.js` | অ্যাভাটার আপলোড ও প্রিভিউ উইজেট |
| `resultUserName`, `activeBirthDayOfWeekTag`, `activeBirthDateTag`, `resultUserMeta`, `resultGenderBadge` | `bioCard.js` | ইউজারের বায়ো কার্ড এলিমেন্টস ও জন্মবার ব্যাজ |
| `resultAvatarImg`, `resultAvatarFallback` | `bioCard.js` | বায়ো কার্ডের প্রোফাইল ছবি ও ইমোজি |
| `resultZodiacPill`, `resultNextBdayPill`, `resultRelationshipPill`, `resultBloodGroupPill` | `bioCard.js` | বায়ো কার্ডের ইন্টারেক্টিভ কুইক পিলস |
| `statYears`, `statMonths`, `statDays` | `ageStats.js` | মূল ৩টি বড় কাউন্টার (বছর, মাস, দিন) |
| `statTotalWeeks`, `statTotalDays`, `statTotalHours`, `statTotalMinutes`, `statTotalSeconds` | `ageStats.js` | মাইক্রো টাইম ব্লকস |
| `statHeartbeats`, `statDistanceTraveled`, `statBreaths`, `statSleepYears`, `statBlinks` | `ageStats.js` | বায়োলজিক্যাল ও মহাজাগতিক পরিমাপ |
| `cdDays`, `cdHours`, `cdMinutes`, `cdSeconds`, `nextBirthdayDate`, `nextAgeLabel` | `countdown.js` | পরবর্তী জন্মদিনের কাউন্টডাউন টাইমার |
| `zodiacCardInteractive`, `openZodiacDetailBtn`, `zodiacSymbol`, `zodiacNameBn` | `app.js`, `countdown.js` | ইন্টারঅ্যাক্টিভ রাশিচক্র কার্ড |
| `zodiacModal`, `closeZodiacModalBtn`, `closeZodiacModalFooterBtn`, `zodiacModalBackdrop` | `zodiacModal.js` | অ্যাডভান্সড রাশিফল ও গ্রহচর মডাল |
| `archetypeCardInteractive`, `openArchetypeModalBtn` | `app.js` | ইন্টারঅ্যাক্টিভ রয়্যাল আর্কিটাইপ কার্ড |
| `archetypeModal`, `closeArchetypeModalBtn`, `closeArchetypeModalFooterBtn`, `archetypeModalBackdrop` | `archetypeModal.js` | রয়্যাল আর্কিটাইপ ও ফেসিয়াল স্ক্যানার মডাল |
| `cardHookPalmistry`, `hookPalmistryBtn` | `app.js`, `index.html` | পামিস্ট্রি ড্যাশবোর্ড হুক বাটন ও কার্ড |
| `palmistryModal`, `modal-container`, `palmModalBody`, `closePalmModalBtn` | `palmistryModal.js` | ৫-ট্যাব পামিস্ট্রি ড্যাশবোর্ড মডাল ও কন্টেইনার |
| `palmTabTracer`, `palmTabLines`, `palmTabMounts`, `palmTabDual`, `palmTabSynergy` | `palmistryModal.js` | পামিস্ট্রি ড্যাশবোর্ডের ৫টি ট্যাব বাটন |
| `palmDownloadPassportBtn`, `palmRetakeBtn` | `palmistryModal.js` | পামিস্ট্রি পাসপোর্ট ডাউনলোড ও রিস্টার্ট বাটন |
| `benchmarkTableBody`, `filterAllMilestones`, `filterNearMilestones` | `milestonesTable.js` | মাইলস্টোন টেবিল ও ফিল্টারসমূহ |
| `resetStorageBtn`, `downloadPdfBtn`, `copySummaryBtn`, `openSocialStoryBtn` | `app.js` | মূল অ্যাকশন বাটনসমূহ |
| `toast`, `toastMessage` | `app.js` | নোটিফিকেশন টোস্ট বার |
| `ad-header-slot`, `ad-incontent-slot`, `ad-bottom-slot` | `adSlots.js` | অ্যাড কন্টেইনার আইডি |

---

### খ. অপরিবর্তনীয় ফাংশন সিগনেচার ও রিটার্ন টাইপ
নিম্নলিখিত কোর ফাংশনগুলোর ইনপুট ও আউটপুট স্ট্রাকচার বজায় রাখতে হবে:
1. `calculateExactAge(birthDate, targetDate = new Date())` ➔ অবশ্যই `{ years, months, days, totalSeconds, totalMinutes, totalHours, totalDays, totalWeeks }` রিটার্ন করবে।
2. `getZodiac(month, day)` ➔ অবশ্যই `{ nameBn, sign, element, planet, traits, nature, start, end, ... }` রিটার্ন করবে।
3. `getDecan(zodiac, month, day)` ➔ অবশ্যই `{ decanNumber, title, subPlanet, traits, rangeText }` রিটার্ন করবে।
4. `calculateTravelIndex(zodiac, decan, birthYear)` ➔ অবশ্যই `{ travelScore, travelLevel, travelBadge, favorableContinents, travelAspects }` রিটার্ন করবে।
5. `getBirthDayRuler(birthDate)` ➔ অবশ্যই `{ dayBn, planetBn, title, traits, favorableActivities }` রিটার্ন করবে।
6. `getBioAstroHealth(zodiac, bloodGroup)` ➔ বায়ো-অ্যাস্ট্রো খাদ্যতালিকা ও অঙ্গ সুরক্ষার অবজেক্ট প্রদান করবে।
7. `calculateArchetypeProfile(userData, visualFeatures)` ➔ অবশ্যই `{ primaryArchetype, secondaryArchetype, metrics, samudrika }` রিটার্ন করবে।
8. `analyzePalmImage(imageSource, handType, currentAge, userData)` ➔ হস্ত উপাদান, রেখা বিশ্লেষণ, পর্বত, শুভ লক্ষণ, ২D:৪D ডিজিট রেশিও এবং কসমিক সিনার্জি অবজেক্ট রিটার্ন করবে।
9. `getLifeTimelineMilestone(age)` ➔ বর্তমান বয়সের ফেজ, থিম ও যুগান্তকারী মাইলস্টোন অবজেক্ট রিটার্ন করবে।
10. `evaluateDigitRatio(indexLen, ringLen)` ➔ ২D:৪D রেশিও, ক্যাটাগরি, হরমোনাল মার্কার ও বৈশিষ্ট্য রিটার্ন করবে।
11. `evaluateAstroPalmSynergy(userData, palmData)` ➔ রাশিচক্র, ব্লাড গ্রুপ ও রিলেশনশিপ স্ট্যাটাসের সাথে হাতের সিনার্জি অবজেক্ট রিটার্ন করবে।
12. `toBnDigits(number)` ➔ সংখ্যাকে ইংরেজি থেকে বাংলা অঙ্কে রূপান্তর করে স্ট্রিং প্রদান করবে।

---

## 🌿 গিট ওয়ার্কফ্লো ও ব্রাঞ্চিং পলিসি (Git Guidelines)
1. **`main` ব্রাঞ্চ হলো প্রোডাকশন:** `main` ব্রাঞ্চে কোনো কমিট পুশ করলে তা সরাসরি GitHub Pages এ লাইভ হয়ে যায়।
2. **নতুন ফিচার ডেভেলপমেন্ট:**
   - নতুন কোনো বড় ফিচার বা এক্সপেরিমেন্টাল কাজের জন্য সবসময় নতুন ব্রাঞ্চ তৈরি করুন:
     ```bash
     git checkout -b feature/palmistry-engine
     ```
   - লোকালহোস্টে পরীক্ষা করার পর টেস্ট পাস হলে এবং ব্যবহারকারীর স্পষ্ট অনুমোদন পেলে তা `main` ব্রাঞ্চে মার্জ ও পুশ করুন:
     ```bash
     git checkout main
     git merge feature/palmistry-engine
     git push origin main
     ```
3. **কমিট মেসেজ স্ট্যান্ডার্ড:** পরিস্কার ও অর্থপূর্ণ মেসেজ দিন (যেমন: `feat(palmistry): implement Astro-Palmar Cosmic Fusion engine`).
