export class Render {
  readonly element: HTMLElement;

  constructor(
    parentNode: HTMLElement | null,
    tag: keyof HTMLElementTagNameMap = 'div',
    classes: string[] = [],
    content?: string,
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classes);
    if (content) {
      this.element.innerText = content;
    }
    if (parentNode) {
      parentNode.appendChild(this.element);
    }
  }
}
