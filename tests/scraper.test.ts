import { toCSV } from '../src/utils/scraper';

describe('toCSV', () => {
  it('creates csv', () => {
    const csv = toCSV([{ username: 'a', timestampRaw: '', timestamp: '', body: 'b', rating: 5, product: 'p', url: 'u' }]);
    expect(csv).toContain('username');
    expect(csv).toContain('a');
  });
});
