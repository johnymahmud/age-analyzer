/**
 * Centralized State & Storage Manager
 */

const STORAGE_KEY = 'lifeTimeline_userProfile';

let state = {
  profile: null,
  birthDate: null,
  unlockLevel: 35,
  liveTickerInterval: null
};

export function saveProfile(data) {
  state.profile = data;
  if (data.unlockLevel) {
    state.unlockLevel = data.unlockLevel;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('LocalStorage quota warning:', err);
  }
}

export function loadSavedProfile() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    state.profile = JSON.parse(raw);
    if (state.profile.unlockLevel) {
      state.unlockLevel = state.profile.unlockLevel;
    }
    return state.profile;
  } catch (err) {
    console.error('Failed to parse saved profile:', err);
    return null;
  }
}

export function clearProfile() {
  state.profile = null;
  state.birthDate = null;
  state.unlockLevel = 35;
  if (state.liveTickerInterval) {
    clearInterval(state.liveTickerInterval);
    state.liveTickerInterval = null;
  }
  localStorage.removeItem(STORAGE_KEY);
}

export function getState() {
  return state;
}

export function setBirthDate(dateObj) {
  state.birthDate = dateObj;
}

export function setUnlockLevel(level) {
  state.unlockLevel = level;
  if (state.profile) {
    state.profile.unlockLevel = level;
    saveProfile(state.profile);
  }
}

export function getUnlockLevel() {
  return state.unlockLevel || 35;
}

export function setLiveTicker(intervalId) {
  if (state.liveTickerInterval) {
    clearInterval(state.liveTickerInterval);
  }
  state.liveTickerInterval = intervalId;
}
