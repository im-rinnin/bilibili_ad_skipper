/* global chrome */
// Popup script for API key management
document.getElementById('save').addEventListener('click', () => {
  const key = document.getElementById('apiKey').value;
  const debug = document.getElementById('debug').checked;
  const skip = document.getElementById('skipEnabled').checked;
  chrome.storage.sync.set({ geminiApiKey: key, debugEnabled: debug, skipEnabled: skip }, () => {
    document.getElementById('status').textContent = 'Settings saved!';
    setTimeout(() => {
      document.getElementById('status').textContent = '';
    }, 3000);
  });
});

// Load current settings on popup open
chrome.storage.sync.get(['geminiApiKey', 'debugEnabled', 'skipEnabled'], (result) => {
  if (result.geminiApiKey) {
    document.getElementById('apiKey').value = result.geminiApiKey;
  }
  if (result.debugEnabled) {
    document.getElementById('debug').checked = true;
  }
  if (result.skipEnabled !== undefined) {
    document.getElementById('skipEnabled').checked = result.skipEnabled;
  } else {
    document.getElementById('skipEnabled').checked = true; // default true
  }
});