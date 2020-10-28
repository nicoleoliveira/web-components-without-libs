const style = `
  button {
    border-radius: 3px;
    border-radius: 3px;
    display: inline-block;
    height: 44px;
    padding: 0 16px;
    cursor: pointer;

    font-family: Roboto, Arial;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;

    transition: all 0.1s ease;
  }

  .primary {
    border: 1px solid #8241a4;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.15);
    background-color: #ffd464;
    border: 1px solid #ffd464;
    color: #1d2426;
  }

  .default {
    border: solid 2px #8241a4;
    background-color: white;
    color: #8241a4;
  }

  .secondary {
    background-color: #8241a4;
    color: white;
    border: solid 4px #8241a4;
  }

  button:focus {
    outline: none;
    box-shadow: 0 0 0 5px rgba(130,65,164, 0.75);
  }

  button.primary:hover {
    background-color: #efc65c;
    border-color: #efc65c;
  }

  button.default:hover {
    color: #381b47;
    border-color: #381b47;
  }

  button.secondary:hover {
    background-color: #381b47;
    border-color: #381b47;
  }

  button.disabled {
    cursor: not-allowed;
  }

  button.primary.disabled {
    background-color: #b6bdbf;
    border: 1px solid  #b6bdbf;
  }

  button.default.disabled {
    border: solid 2px #4a5c60;
    color: #4a5c60;
  }

  button.secondary.disabled {
    background-color: #6e7c7f;
    border-color: #6e7c7f;
  }
`;

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
            <style>${style}</style>
            <button
                class="${this.type} ${this.disabled}">
                ${this.label}
            </button>
        `;
  }

}

customElements.define('wcp-button', Button);