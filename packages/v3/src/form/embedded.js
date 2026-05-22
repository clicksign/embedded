import BaseEmbed from '../core/base-embed';

export default class Form extends BaseEmbed {
  get params() {
    return `?embedded=true&origin=${this.origin}`;
  }

  get path() {
    return `/app/click_form/${this.key}`;
  }
}
