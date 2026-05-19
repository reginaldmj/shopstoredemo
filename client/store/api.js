import { API } from './constants.js';
import { state, clearAuthSession } from './state.js';

export async function requestJSON(url, options) {
  const headers = {
    ...(options?.headers || {})
  };

  if (state.authToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${state.authToken}`;
  }

  const res = await fetch(url, {
    ...(options || {}),
    headers
  });

  let data = null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await res.json();
  }

  if (!res.ok) {
    const message = data?.message || `HTTP ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  return data;
}

export async function loadCurrentUser() {
  if (!state.authToken) return null;
  const data = await requestJSON(`${API}/auth/me`);
  state.currentUser = data?.user || null;
  return state.currentUser;
}

export async function loadProfile() {
  if (!state.authToken) return null;
  const data = await requestJSON(`${API}/profile`);
  state.profile = data?.profile || null;
  return state.profile;
}

export async function refreshAuthState() {
  if (!state.authToken) return;
  try {
    await loadCurrentUser();
    await loadProfile();
  } catch {
    clearAuthSession();
    throw new Error('Failed to refresh auth state');
  }
}
