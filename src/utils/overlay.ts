export function createOverlay(onSelect: (selector: string) => void) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.zIndex = '2147483647';
  overlay.style.cursor = 'crosshair';
  overlay.style.background = 'rgba(0,0,0,0.1)';

  function mouseOver(e: MouseEvent) {
    const target = e.target as HTMLElement;
    target.style.outline = '2px solid red';
  }

  function mouseOut(e: MouseEvent) {
    const target = e.target as HTMLElement;
    target.style.outline = '';
  }

  function click(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const path = e.composedPath()[0] as HTMLElement;
    const selector = getSelector(path);
    cleanup();
    onSelect(selector);
  }

  function cleanup() {
    document.removeEventListener('mouseover', mouseOver, true);
    document.removeEventListener('mouseout', mouseOut, true);
    document.removeEventListener('click', click, true);
    overlay.remove();
  }

  function getSelector(el: HTMLElement): string {
    if (el.id) return `#${el.id}`;
    const classes = el.className
      .toString()
      .split(/\s+/)
      .filter(Boolean)
      .map(c => `.${c}`)
      .join('');
    return el.tagName.toLowerCase() + classes;
  }

  document.body.appendChild(overlay);
  document.addEventListener('mouseover', mouseOver, true);
  document.addEventListener('mouseout', mouseOut, true);
  document.addEventListener('click', click, true);
}
