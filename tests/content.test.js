// Basic test for content.js
jest.mock('@google/genai', () => ({ GoogleGenAI: jest.fn() }));

describe('Bilibili Ad Skipper Content Script', () => {
  test('should load without errors', () => {
    // Mock console.log to avoid output during tests
    const originalLog = console.log;
    console.log = jest.fn();

    // Import the content script (this will execute it)
    require('../content.js');

    // Check that console.log was called with the expected message
    expect(console.log).toHaveBeenCalledWith('[ad_skip] hello_im_ad_skipper');

    // Restore original console.log
    console.log = originalLog;
  });
});