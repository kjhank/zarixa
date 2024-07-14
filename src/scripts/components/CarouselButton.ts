export class CarouselButton extends HTMLElement {
  carousel: HTMLElement | null = null;

  items: NodeListOf<Element> | undefined;

  connectedCallback() {
    this.role = 'button';
    this.tabIndex = 0;
    this.render();
    this.carousel = this.closest('.carousel');
    this.items = this.carousel?.querySelectorAll('.item');
    this.addEventListener('click', this.handleClick);
  }

  handleClick() {
    if (!this.items) return;

    const currentActive = Array.from(this.items).find((item) => item.hasAttribute('data-active'));

    if (!currentActive) return;

    const isFirst = currentActive === [...this.items].at(0);
    const isLast = currentActive === [...this.items].at(-1);

    if (this.direction === 'previous' && isFirst) return;
    if (this.direction === 'next' && isLast) return;

    const nextActive = currentActive.nextElementSibling;
    const previousActive = currentActive.previousElementSibling;

    currentActive?.setAttribute('data-inactive', '');

    this.items.forEach((item) => item.removeAttribute('data-active'));
    this.items.forEach((item) => item.setAttribute('data-inactive', ''));

    if (this.direction === 'previous') {
      // if (isFirst) return;
      previousActive?.setAttribute('data-active', '');
      previousActive?.removeAttribute('data-inactive');
    } else {
      nextActive?.setAttribute('data-active', '');
      nextActive?.removeAttribute('data-inactive');
    }
  }

  get direction() {
    return this.getAttribute('direction') ?? 'previous';
  }

  render() {
    this.innerHTML = `<long-arrow data-direction="${this.direction}"></long-arrow>
    <span class="visually-hidden">${this.direction === 'previous' ? 'Poprzedni widok' : 'Następny widok'}</span>
    `;
  }
}
