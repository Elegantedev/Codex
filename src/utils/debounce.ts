export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timer: number | undefined;
  return function(this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn.apply(this, args), delay);
  } as T;
}
