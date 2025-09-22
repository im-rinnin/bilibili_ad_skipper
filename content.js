/* global chrome */
// Content script for Bilibili Ad Skipper
let adSegments = [];
let debugEnabled = false;

// Create and display hello world popup in top right corner
function showHelloWorldPopup() {
  const popup = document.createElement('div');
  popup.textContent = 'hello world';
  popup.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    z-index: 10000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(popup);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  }, 3000);
}

// Main initialization
async function init() {
  debugEnabled = await getDebug();
  log('Bilibili Ad Skipper loaded');
  showHelloWorldPopup();

  const bvid = extractBvid();
  if (bvid) {
    log('Detected video page, bvid: ' + bvid);
    const metadata = await fetchVideoMetadata(bvid);
    if (metadata) {
      log('Fetched metadata: ' + JSON.stringify(metadata));
      const subtitles = await fetchPlayerInfo(metadata.aid, metadata.cid);
      if (subtitles.length > 0) {
        log('Available subtitles: ' + JSON.stringify(subtitles));
        // Fetch the first subtitle (assuming Chinese AI subtitle)
        const subtitleUrl = subtitles[0].subtitle_url;
        log('Fetching subtitle from URL: ' + subtitleUrl);
        const subtitleData = await fetchSubtitles(subtitleUrl);
        const parsedSubtitles = parseSubtitles(subtitleData);
        log('Parsed subtitle data (first 5 entries): ' + JSON.stringify(parsedSubtitles.slice(0, 5)));
        await analyzeSubtitles(parsedSubtitles);

        // Set up ad skipping if enabled
        const skipEnabled = await getSkipEnabled();
        if (skipEnabled) {
          const video = document.querySelector('video');
          if (video) {
            video.addEventListener('timeupdate', () => {
              const currentTime = video.currentTime;
              for (const ad of adSegments) {
                if (currentTime >= ad.startTime && currentTime < ad.endTime) {
                  log('Skipping ad from ' + ad.startTime + ' to ' + ad.endTime);
                  video.currentTime = ad.endTime;
                  break;
                }
              }
            });
          }
        }
      } else {
        console.log('No subtitles available for this video. Check player API response for details.');
      }
    }
  }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Extract bvid from Bilibili video URL
function extractBvid() {
  const url = window.location.href;
  const match = url.match(/\/video\/(BV[a-zA-Z0-9]+)\//);
  return match ? match[1] : null;
}

// Fetch video metadata to get aid and cid
async function fetchVideoMetadata(bvid) {
  const url = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.code === 0) {
      return { aid: data.data.aid, cid: data.data.cid };
    } else {
      console.error('Failed to fetch video metadata:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return null;
  }
}

// Fetch player info to get subtitle metadata
async function fetchPlayerInfo(aid, cid) {
  const url = `https://api.bilibili.com/x/player/wbi/v2?aid=${aid}&cid=${cid}`;
  try {
    const response = await fetch(url, { credentials: 'include' });
    const data = await response.json();
    log('Player API response: ' + JSON.stringify(data));
    if (data.code === 0) {
      log('Subtitle data: ' + JSON.stringify(data.data.subtitle));
      return data.data.subtitle.subtitles || [];
    } else {
      console.error('Failed to fetch player info:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching player info:', error);
    return [];
  }
}

// Fetch and parse subtitle JSON
async function fetchSubtitles(subtitleUrl) {
  const fullUrl = subtitleUrl.startsWith('//') ? 'https:' + subtitleUrl : subtitleUrl;
  try {
    const response = await fetch(fullUrl);
    const data = await response.json();
    return data.body || [];
  } catch (error) {
    console.error('Error fetching subtitles:', error);
    return [];
  }
}

// Parse subtitle data to extract content and start time
function parseSubtitles(subtitleData) {
  return subtitleData.map(entry => ({
    content: entry.content,
    startTime: entry.from
  }));
}

// Analyze subtitles for ad detection using Gemini
async function analyzeSubtitles(subtitles) {
  const apiKey = await getApiKey();
  if (!apiKey) {
    console.error('API key not found. Please set it in extension settings.');
    return;
  }

  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey });
  const subtitleText = subtitles.map(s => `${s.startTime}: ${s.content}`).join('\n');
  log('Full subtitles: ' + JSON.stringify(subtitles));
  const prompt = `Analyze these video subtitles for advertisement segments. Look for content that promotes products, services, or brands; repetitive phrases; calls to action like 'buy now' or 'subscribe'; or non-story elements. Return a JSON array of objects, each with 'startTime' (number) and 'endTime' (number) for detected ad segments. If no ads, return []. Be precise and avoid false positives.\n\nSubtitles:\n${subtitleText}`;
  log('Gemini request prompt: ' + prompt);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    log('Gemini response: ' + response.text);
    const jsonString = response.text.replace(/```json\n?/, '').replace(/\n?```$/, '');
    const result = JSON.parse(jsonString);
    adSegments = result;
    result.forEach(segment => log(`Detected ad segment: start=${segment.startTime}, end=${segment.endTime}`));
  } catch (error) {
    console.error('Error analyzing subtitles:', error);
  }
}

// Get API key from Chrome storage
async function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['geminiApiKey'], (result) => {
      resolve(result.geminiApiKey);
    });
  });
}

// Get debug enabled from Chrome storage
async function getDebug() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['debugEnabled'], (result) => {
      resolve(result.debugEnabled || false);
    });
  });
}

// Get skip enabled from Chrome storage
async function getSkipEnabled() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['skipEnabled'], (result) => {
      resolve(result.skipEnabled !== false); // default true
    });
  });
}

// Debug log function
function log(message) {
  if (debugEnabled) {
    console.log('[ad_skip] ' + message);
  }
}