/**
 * Centralized State & Storage Manager
 */

const STORAGE_KEY = 'lifeTimeline_userProfile';

let state = {
  profile: null,
  birthDate: null,
  liveTickerInterval: null
};

export function saveProfile(data) {
  state.profile = data;
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
    return state.profile;
  } catch (err) {
    console.error('Failed to parse saved profile:', err);
    return null;
  }
}

export function clearProfile() {
  state.profile = null;
  state.birthDate = null;
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

export function setLiveTicker(intervalId) {
  if (state.liveTickerInterval) {
    clearInterval(state.liveTickerInterval);
  }
  state.liveTickerInterval = intervalId;
}
