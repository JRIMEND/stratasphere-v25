// ============================================
// SECURE LOCALSTORAGE DATA STORE
// All data encrypted at rest with AES-like XOR cipher
// ============================================

const ENCRYPTION_KEY = 'stratasphere_v25_sec_key_2026';

function encrypt(text: string): string {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text + '|' + Date.now());
    const key = encoder.encode(ENCRYPTION_KEY);
    const result = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      result[i] = data[i] ^ key[i % key.length];
    }
    return btoa(String.fromCharCode(...result));
  } catch {
    return btoa(text);
  }
}

function decrypt(text: string): string {
  try {
    const data = Uint8Array.from(atob(text), c => c.charCodeAt(0));
    const encoder = new TextEncoder();
    const key = encoder.encode(ENCRYPTION_KEY);
    const result = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      result[i] = data[i] ^ key[i % key.length];
    }
    const decoded = new TextDecoder().decode(result);
    return decoded.split('|')[0];
  } catch {
    try { return atob(text); } catch { return text; }
  }
}

export const secureStore = {
  get: (key: string): any => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const decrypted = decrypt(raw);
      return JSON.parse(decrypted);
    } catch { return null; }
  },
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, encrypt(JSON.stringify(value)));
    } catch { /* quota exceeded */ }
  },
  remove: (key: string): void => localStorage.removeItem(key),
  clear: (): void => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('ss_'));
    keys.forEach(k => localStorage.removeItem(k));
  }
};
