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

// Show popup when page loads
showHelloWorldPopup();

// TODO: Implement subtitle fetching, AI analysis, and ad skipping logic