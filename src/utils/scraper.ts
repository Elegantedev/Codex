import { Review, ScrapeResult } from '../types';
import Papa from 'papaparse';

function parseTimestamp(raw: string): string {
  const date = new Date(raw);
  return isNaN(date.getTime()) ? '' : date.toISOString();
}

export async function scrapeReviews(sel: Record<string, string>, delay: number): Promise<ScrapeResult> {
  const reviews: Review[] = [];
  const seen = new Set<string>();

  const reviewSelector = sel.reviewSelector;
  const nextSelector = sel.nextSelector;

  while (true) {
    document.querySelectorAll(reviewSelector).forEach(el => {
      const username = (el.querySelector('[data-user]') as HTMLElement)?.textContent?.trim() || '';
      const timestampRaw = (el.querySelector('time') as HTMLElement)?.textContent?.trim() || '';
      const title = (el.querySelector('h3') as HTMLElement)?.textContent?.trim() || undefined;
      const body = (el.querySelector('p') as HTMLElement)?.textContent?.trim() || '';
      const ratingAttr = (el.querySelector('[data-rating]') as HTMLElement)?.getAttribute('data-rating');
      const rating = ratingAttr ? parseInt(ratingAttr, 10) : 0;
      const product = document.title;
      const url = location.href;
      const key = `${username}|${timestampRaw}|${body}`;
      if (!seen.has(key)) {
        reviews.push({
          username,
          timestampRaw,
          timestamp: parseTimestamp(timestampRaw),
          title,
          body,
          rating,
          product,
          url
        });
        seen.add(key);
      }
    });

    const next = document.querySelector(nextSelector) as HTMLElement | null;
    if (!next || next.getAttribute('disabled') !== null) break;

    next.click();
    const changed = await waitForChange(delay);
    if (!changed) break;
  }

  return { reviews };
}

async function waitForChange(delay: number): Promise<boolean> {
  await new Promise(res => setTimeout(res, delay));
  return new Promise(resolve => {
    const observer = new MutationObserver((mutations, obs) => {
      if (mutations.length) {
        obs.disconnect();
        resolve(true);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      resolve(false);
    }, 5000);
  });
}

export function toCSV(reviews: Review[]): string {
  return Papa.unparse(reviews);
}
