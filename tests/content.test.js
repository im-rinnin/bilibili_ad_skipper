// Basic test for content.js
jest.mock('@google/genai', () => ({ GoogleGenAI: jest.fn() }));

// Mock chrome API
global.chrome = {
  storage: {
    sync: {
      get: jest.fn((keys, callback) => callback({ debugEnabled: true, skipEnabled: true, geminiApiKey: 'test' }))
    }
  }
};

describe('Bilibili Ad Skipper Content Script', () => {
  test('should load without errors', async () => {
    // Mock console.log to avoid output during tests
    const originalLog = console.log;
    console.log = jest.fn();

    // Import the content script (this will execute it)
    require('../content.js');

    // Wait a bit for async init
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check that console.log was called with the expected message
    expect(console.log).toHaveBeenCalledWith('[ad_skip] Bilibili Ad Skipper loaded');

    // Restore original console.log
    console.log = originalLog;
  });
});