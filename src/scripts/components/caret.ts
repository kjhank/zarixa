export class CaretComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14.828" height="8.414" viewBox="0 0 14.828 8.414">
    <path id="ico_arrow" d="M6,0,0,6l6,6" transform="translate(1.414 7.414) rotate(-90)" fill="none" stroke="#f26611" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </svg>
  `;
  }
}
