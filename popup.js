/* global chrome */
// Popup script for API key management
document.getElementById('save').addEventListener('click', () => {
  const key = document.getElementById('apiKey').value;
  chrome.storage.sync.set({ geminiApiKey: key }, () => {
    document.getElementById('status').textContent = 'API key saved!';
    setTimeout(() => {
      document.getElementById('status').textContent = '';
    }, 3000);
  });
});

// Load current key on popup open
chrome.storage.sync.get(['geminiApiKey'], (result) => {
  if (result.geminiApiKey) {
    document.getElementById('apiKey').value = result.geminiApiKey;
  }
});