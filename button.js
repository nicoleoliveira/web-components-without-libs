// https://colorbox.io/

const stylePath = './button.css'

class Button extends HTMLElement {

  click;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });

    this.click = document.createEvent('Event');
    this.click.initEvent('clickButton', true, true);
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get type() {
    return this.getAttribute('type') || 'default';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get disabled() {
    return this.getAttribute('disabled') ? 'disabled' : '';
  }

  set disabled(value) {
    this.setAttribute('disabled', value);
  }

  static get observedAttributes() {
    return ['type', 'label', 'disabled'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    this.render();
    this.addEventListener('click', () => !this.disabled && this.dispatchEvent(this.click));
  }
  
  render() {
    this.shadow.innerHTML = `
            <link rel="stylesheet" href="${stylePath}"/>
            <button
                class="${this.type} ${this.disabled}">
                ${this.label}
            </button>
        `;
  }

}

customElements.define('wcp-button', Button);