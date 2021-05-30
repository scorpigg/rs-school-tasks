export function showModal(element: HTMLElement): void {
  const overlay: HTMLElement | null = document.querySelector('.overlay');
  element.classList.remove('hidden');
  overlay?.classList.remove('hidden');
}

export function hideModal(element: HTMLElement): void {
  const overlay: HTMLElement | null = document.querySelector('.overlay');
  element.classList.add('hidden');
  overlay?.classList.add('hidden');
}

export function changeDisplay(showElClass: string, hideElClass: string): void {
  const showEl = document.querySelector(showElClass);
  const hideEl = document.querySelector(hideElClass);
  showEl?.classList.remove('hidden');
  hideEl?.classList.add('hidden');
}
