import { useEffect, useState } from 'react';
import { getAllowedDomains, addDomain } from '../utils/storage';

export default function Options() {
  const [domains, setDomains] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getAllowedDomains().then(setDomains);
  }, []);

  const add = () => {
    if (!input) return;
    addDomain(input).then(() => {
      setDomains([...domains, input]);
      setInput('');
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-2">Allowed Domains</h1>
      <ul className="mb-2 list-disc pl-4">
        {domains.map(d => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      <input className="border px-1 mr-2" value={input} onChange={e => setInput(e.target.value)} />
      <button className="btn" onClick={add}>Add</button>
    </div>
  );
}
