import { useEffect, useState } from 'react';
import { Review } from '../types';

export default function Popup() {
  const [allowed, setAllowed] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [delay, setDelay] = useState(500);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      const hostname = new URL(tab.url || '').hostname;
      chrome.storage.local.get('domains').then(res => {
        const domains: string[] = res.domains || [];
        setAllowed(domains.includes(hostname));
      });
    });
  }, []);

  const pick = (key: 'reviewSelector' | 'nextSelector') => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id!, { type: 'pick', key }, sel => {
        console.log('Picked', sel);
      });
    });
  };

  const start = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id!, { type: 'scrape', delay }, (res: any) => {
        setReviews(res.reviews.slice(0, 10));
        const blob = new Blob([JSON.stringify(res.reviews, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({ url, filename: `reviews-${new Date().toISOString()}.json` });
      });
    });
  };

  if (!allowed) {
    return <p className="p-2 text-sm">This domain is not allowed.</p>;
  }

  return (
    <div className="p-2 w-80">
      <h1 className="text-lg font-bold mb-2">Review Scraper</h1>
      <button className="btn" onClick={() => pick('reviewSelector')}>Pick Review Card</button>
      <button className="btn" onClick={() => pick('nextSelector')}>Pick Next Control</button>
      <div className="my-2">
        <label className="mr-2">Delay(ms)</label>
        <input type="number" value={delay} onChange={e => setDelay(parseInt(e.target.value, 10))} className="border px-1" />
      </div>
      <button className="btn" onClick={start}>Start Scrape</button>
      {reviews.length > 0 && (
        <table className="mt-2 text-xs w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Time</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r, i) => (
              <tr key={i}>
                <td>{r.username}</td>
                <td>{r.timestamp}</td>
                <td>{r.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
