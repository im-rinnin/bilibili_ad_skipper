// Basic test for content.js
describe('Bilibili Ad Skipper Content Script', () => {
  test('should load without errors', () => {
    // Mock console.log to avoid output during tests
    const originalLog = console.log;
    console.log = jest.fn();

    // Import the content script (this will execute it)
    require('../content.js');

    // Check that console.log was called with the expected message
    expect(console.log).toHaveBeenCalledWith('Bilibili Ad Skipper loaded');

    // Restore original console.log
    console.log = originalLog;
  });
});