# 🤖 AI Agent & Developer Guide (Rules of Engagement)

এই নির্দেশিকাটি যেকোনো নতুন AI এজেন্ট অথবা নতুন ডেভেলপারের জন্য প্রযোজ্য। যেকোনো নতুন ফিচার, বাগফিক্স বা UI পরিবর্তনের কাজ শুরু করার পূর্বে এই নির্দেশিকা অবশ্যই পাঠ করতে হবে।

---

## 🛑 গোল্ডেন রুলস (The Golden Rules)

### ১. কোড রি-রাইট না করার নীতি (Do NOT Rewrite Working Code)
- পূর্বে তৈরি করা এবং কার্যকর মডিউলগুলোকে সম্পূর্ণ মুছে আবার নতুন করে লিখবেন না।
- পরিবর্তনের প্রয়োজন হলে নির্দিষ্ট ফাংশন বা স্টাইলে ইনক্রিমেন্টাল (ছোট ছোট লক্ষ্যভিত্তিক) এডিট করুন।

### ২. ডুপ্লিকেট ফিচার/ডেটা তৈরি নিষিদ্ধ (Zero Redundancy)
- নতুন কোনো ঐতিহাসিক ব্যক্তিত্ব, ইভেন্ট বা রাশিচক্রের তথ্য যোগ করার আগে `assets/js/data/` ফোল্ডারের ফাইলগুলো পর্যবেক্ষণ করুন।
- একাধিক ফাইল বা একাধিক জায়গায় একই ক্যালকুলেশন লজিক ডুপ্লিকেট করবেন না; সর্বদা `calculator.js` থেকে ফাংশন ইমপোর্ট করুন।

### ৩. কোনো বিল্ড স্টেপ বা প্যাকেজ ডিপেনডেনসি চাপিয়ে দেওয়া যাবে না
- প্রজেক্টটি ব্রাউজার-নেটিভ **Vanilla JavaScript (ES Modules)** এ চলে।
- ব্যবহারকারীর স্পষ্ট অনুরোধ ব্যতীত কোনো Webpack, Vite, Babel বা npm বিল্ড স্ক্রিপ্ট বাধ্যতামূলক করবেন না, কারণ এটি সরাসরি GitHub Pages-এ স্ট্যাটিকালি হোস্ট করা হয়।

---

## 🔒 ক্রুশিয়াল ইনভ্যারিয়েন্টস (Immutable Invariants)

### ক. অপরিবর্তনীয় HTML DOM IDs
নিচের DOM আইডিগুলো জাভাস্ক্রিপ্ট কন্ট্রোলার ও কম্পোনেন্ট দ্বারা নিয়ন্ত্রিত হয়। **এগুলো কখনো নাম পরিবর্তন বা মুছে ফেলা যাবে না**:

| DOM ID | ফাইল রেফারেন্স | বিবরণ |
| :--- | :--- | :--- |
| `lifeTimelineForm` | `app.js` | মূল ইনপুট ফর্ম |
| `dobDay`, `dobMonth`, `dobYear` | `app.js` | জন্মতারিখ ইনপুটসমূহ |
| `userCountry`, `userName`, `userGender`, `birthTime` | `app.js` | ব্যবহারকারীর প্রোফাইল ইনপুটসমূহ |
| `resultsContainer` | `app.js` | পুরো ফলাফল সেকশনের প্যারেন্ট কন্টেইনার |
| `avatarUploadContainer`, `avatarInput`, `avatarImage`, `removeAvatarBtn` | `upload.js` | অ্যাভাটার আপলোড ও প্রিভিউ উইজেট |
| `resultUserName`, `activeBirthDateTag`, `resultUserMeta`, `resultGenderBadge` | `bioCard.js` | ইউজারের বায়ো কার্ড এলিমেন্টস |
| `resultAvatarImg`, `resultAvatarFallback` | `bioCard.js` | বায়ো কার্ডের প্রোফাইল ছবি ও ইমোজি |
| `statYears`, `statMonths`, `statDays` | `ageStats.js` | মূল ৩টি বড় কাউন্টার (বছর, মাস, দিন) |
| `statTotalWeeks`, `statTotalDays`, `statTotalHours`, `statTotalMinutes`, `statTotalSeconds` | `ageStats.js` | মাইক্রো টাইম ব্লকস |
| `statHeartbeats`, `statDistanceTraveled`, `statBreaths`, `statSleepYears` | `ageStats.js` | বায়োলজিক্যাল ও মহাজাগতিক পরিমাপ |
| `cdDays`, `cdHours`, `cdMinutes`, `cdSeconds`, `nextBirthdayDate`, `nextAgeLabel` | `countdown.js` | পরবর্তী জন্মদিনের কাউন্টডাউন টাইমার |
| `zodiacSymbol`, `zodiacNameBn`, `zodiacElement`, `zodiacTraits`, `zodiacDateSpan` | `countdown.js` | রাশিচক্র কার্ড |
| `famousPersonalitiesGrid` | `historicalView.js` | সমসাময়িক মনীষী গ্রিড |
| `historicalEventsContainer` | `historicalView.js` | ঐতিহাসিক ঘটনা ও বিশ্ব পটভূমি |
| `benchmarkTableBody` | `milestonesTable.js` | মাইলস্টোন টেবিল বডি |
| `filterAllMilestones`, `filterNearMilestones` | `milestonesTable.js` | মাইলস্টোন ফিল্টার বাটন |
| `resetStorageBtn`, `downloadPdfBtn`, `copySummaryBtn` | `app.js` | অ্যাকশন বাটনসমূহ |
| `toast`, `toastMessage` | `app.js` | নোটিফিকেশন টোস্ট বার |
| `ad-header-slot`, `ad-incontent-slot`, `ad-bottom-slot` | `adSlots.js` | অ্যাড কন্টেইনার আইডি |

---

### খ. অপরিবর্তনীয় ফাংশন সিগনেচার ও রিটার্ন টাইপ
নিম্নলিখিত কোর ফাংশনগুলোর ইনপুট ও আউটপুট স্ট্রাকচার বজায় রাখতে হবে:
1. `calculateExactAge(birthDate, targetDate = new Date())` ➔ অবশ্যই `{ years, months, days, totalSeconds, totalMinutes, totalHours, totalDays, totalWeeks }` রিটার্ন করবে।
2. `calculateNextBirthday(birthDate)` ➔ অবশ্যই `{ nextDate, days, hours, minutes, seconds, nextAge }` রিটার্ন করবে।
3. `getZodiac(month, day)` ➔ অবশ্যই `{ nameBn, sign, element, planet, traits, start, end }` অবজেক্ট রিটার্ন করবে।
4. `toBnDigits(number)` ➔ সংখ্যাকে ইংরেজি থেকে বাংলা অঙ্কে রূপান্তর করে স্ট্রিং প্রদান করবে।

---

## 🌿 গিট ওয়ার্কফ্লো ও ব্রাঞ্চিং পলিসি (Git Guidelines)
1. **`main` ব্রাঞ্চ হলো প্রোডাকশন:** `main` ব্রাঞ্চে কোনো কমিট পুশ করলে তা সরাসরি GitHub Pages এ লাইভ হয়ে যায়।
2. **নতুন ফিচার ডেভেলপমেন্ট:**
   - নতুন কোনো বড় ফিচার বা এক্সপেরিমেন্টাল কাজের জন্য সবসময় নতুন ব্রাঞ্চ তৈরি করুন:
     ```bash
     git checkout -b feature/notable-feature-name
     ```
   - লোকালহোস্টে পরীক্ষা করার পর টেস্ট পাস হলে তা `main` ব্রাঞ্চে মার্জ করুন:
     ```bash
     git checkout main
     git merge feature/notable-feature-name
     git push origin main
     ```
3. **কমিট মেসেজ স্ট্যান্ডার্ড:** পরিস্কার ও অর্থপূর্ণ মেসেজ দিন (যেমন: `feat: add sound effect on calculation`, `fix: correct leap year edge case`).

---

## 🎨 UI/UX নীতি ও স্টাইলিং নির্দেশিকা
- **Tailwind কালার প্যালেট:**
  - ব্যাকগ্রাউন্ড: `slate-50` (লাইট মোড) / `slate-950` (ডার্ক মোড)।
  - অ্যাকসেন্ট কালার: `indigo-600` ও `purple-600` এর গ্রেডিয়েন্ট।
  - হাইলাইট ও সাফল্য: `emerald-500`।
  - সতর্কবার্তা ও অ্যাকশন: `rose-500` / `amber-500`।
- **প্রিন্ট ফরম্যাটিং:** নতুন কোনো সেকশন যোগ করার সময় যদি সেটি প্রিন্টে বাদ দিতে হয়, তবে `no-print` ক্লাস যোগ করুন। কার্ড হিসেবে প্রিন্ট করতে হলে `print-card` ক্লাস ব্যবহার করুন।
- **রেসপনসিভ ডিজাইন:** মোবাইল-ফার্স্ট পদ্ধতি অনুসরণ করুন। ছোট স্ক্রিন (`sm`), ট্যাবলেট (`md`), এবং ডেস্কটপ (`lg`, `xl`) সব ডিভাইসেই লেআউট প্যাডিং ও গ্রিড ঠিক রাখতে হবে।

---

## 🚀 নতুন সেশনের অনবোর্ডিং চেকলিস্ট (Agent Onboarding)
যেকোনো নতুন সেশনে কাজ শুরুর পূর্বে এজেন্টকে নিচের ধাপগুলো অনুসরণ করতে হবে:
1. [ ] `docs/blueprint.md` এবং `docs/current_state.md` ফাইলগুলো পড়ে প্রজেক্টের সামগ্রিক অবস্থা জানা।
2. [ ] `git status` দিয়ে কোনো আনকমিটেড ফাইল আছে কি না চেক করা।
3. [ ] লোকাল সার্ভার সচল আছে কি না (`http://localhost:3000`) যাচাই করা।
4. [ ] কাজ শেষে `docs/current_state.md` এবং `docs/projectlog.md` আপডেট করা।
