import type { SelectorMessage, ScrapeMessage } from './types';
import { createOverlay } from './utils/overlay';
import { scrapeReviews } from './utils/scraper';

const selectors: Record<string, string> = {};

chrome.runtime.onMessage.addListener((msg: SelectorMessage | ScrapeMessage, sender, sendResponse) => {
  if (msg.type === 'pick') {
    createOverlay(selector => {
      selectors[msg.key] = selector;
      chrome.storage.local.set({ [msg.key]: selector });
      sendResponse(selector);
    });
    return true;
  }
  if (msg.type === 'scrape') {
    scrapeReviews(selectors, msg.delay).then(result => {
      sendResponse(result);
    });
    return true;
  }
});

chrome.storage.local.get(['reviewSelector', 'nextSelector']).then(res => {
  if (res.reviewSelector) selectors.reviewSelector = res.reviewSelector;
  if (res.nextSelector) selectors.nextSelector = res.nextSelector;
});
