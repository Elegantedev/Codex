# Review Scraper Chrome Extension

This extension lets you collect product reviews from e-commerce sites you own or have permission to scrape. It uses Manifest V3, TypeScript and React.

## Folder Structure

- `manifest.json` – Chrome extension manifest
- `src/` – TypeScript source files
  - `contentScript.ts` – selector picking and scraping logic
  - `serviceWorker.ts` – background worker
  - `popup/` – React popup UI
  - `options/` – domain management page
  - `utils/` – helper modules
- `tests/` – Jest unit tests

## Build & Load

1. Install dependencies (requires Node 18+):
   ```bash
   npm install
   ```
2. Run the build:
   ```bash
   npm run build
   ```
3. Open Chrome and navigate to `chrome://extensions`.
4. Enable **Developer mode** and choose **Load unpacked**.
5. Select the `dist` folder created by the build.

## Usage

1. Visit a permitted domain and open the extension popup.
2. Add the domain if not already allowed.
3. Click **Pick Review Card** then select a review element on the page.
4. Click **Pick Next Control** and select the next-page button.
5. Set the delay if needed and press **Start Scrape**.
6. The first 10 results appear in the popup and the full dataset downloads as JSON.
