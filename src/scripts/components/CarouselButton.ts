export class CarouselButton extends HTMLElement {
  carousel: HTMLElement | null = null;

  connectedCallback() {
    this.role = 'button';
    this.tabIndex = 0;
    this.render();
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
