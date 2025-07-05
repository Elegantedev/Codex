chrome.runtime.onInstalled.addListener(() => {
  console.log('Review Scraper installed');
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Placeholder for background tasks
});
