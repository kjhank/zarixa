export class PopoutPlayer extends HTMLElement {
  src?: string;

  name?: string | null;

  player: HTMLAudioElement;

  closeButton: HTMLButtonElement;

  constructor(src?: string, name?: string | null) {
    super();

    this.src = src ?? this.getAttribute('src') ?? '';
    this.name = name ?? this.getAttribute('name') ?? '';

    this.player = document.createElement('audio');
    this.player.src = this.src;
    this.player.controls = true;

    this.closeButton = document.createElement('button');
    this.closeButton.dataset.interaction = 'close';
    this.closeButton.type = 'button';
    this.closeButton.innerHTML = '<menu-lines></menu-lines>';
    this.closeButton.classList.add('close-button');

    this.addEventListener('click', this);
  }

  handleEvent(event: MouseEvent) {
    if (event.target === this.closeButton
      || (event.target instanceof Node && this.closeButton.contains(event.target))) {
      this.destroy();
    }
  }

  connectedCallback() {
    this.render();
  }

  destroy() {
    this.remove();
  }

  play() {
    if (this.player) this.player.play();
  }

  render() {
    this.innerHTML = `
    <product-logo></product-logo>
    <p class="name">${this.name}</p>
`;

    this.querySelector('.name')?.before(this.player);
    this.appendChild(this.closeButton);
  }
}
