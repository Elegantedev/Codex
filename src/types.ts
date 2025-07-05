export interface SelectorMessage {
  type: 'pick';
  key: 'reviewSelector' | 'nextSelector';
}

export interface ScrapeMessage {
  type: 'scrape';
  delay: number;
}

export interface Review {
  username: string;
  timestampRaw: string;
  timestamp: string;
  title?: string;
  body: string;
  rating: number;
  product: string;
  url: string;
}

export interface ScrapeResult {
  reviews: Review[];
}
