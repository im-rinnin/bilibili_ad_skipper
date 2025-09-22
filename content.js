// Content script for Bilibili Ad Skipper
console.log('Bilibili Ad Skipper loaded');

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
  showHelloWorldPopup();

  const bvid = extractBvid();
  if (bvid) {
    console.log('Detected video page, bvid:', bvid);
    const metadata = await fetchVideoMetadata(bvid);
    if (metadata) {
      console.log('Fetched metadata:', metadata);
      const subtitles = await fetchPlayerInfo(metadata.aid, metadata.cid);
      if (subtitles.length > 0) {
        console.log('Available subtitles:', subtitles);
        // Fetch the first subtitle (assuming Chinese AI subtitle)
        const subtitleUrl = subtitles[0].subtitle_url;
        console.log('Fetching subtitle from URL:', subtitleUrl);
        const subtitleData = await fetchSubtitles(subtitleUrl);
        console.log('Fetched subtitle data (first 5 entries):', subtitleData.slice(0, 5));
        // TODO: Analyze subtitle data for ad detection
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
    const response = await fetch(url);
    const data = await response.json();
    console.log('Player API response:', data);
    if (data.code === 0) {
      console.log('Subtitle data:', data.data.subtitle);
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

// TODO: Implement subtitle fetching, AI analysis, and ad skipping logic