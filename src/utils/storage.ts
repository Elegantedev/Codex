export async function getAllowedDomains(): Promise<string[]> {
  const { domains } = await chrome.storage.local.get('domains');
  return domains || [];
}

export async function addDomain(domain: string) {
  const domains = await getAllowedDomains();
  if (!domains.includes(domain)) {
    domains.push(domain);
    await chrome.storage.local.set({ domains });
  }
}
