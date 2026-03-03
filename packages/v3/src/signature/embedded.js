import BaseEmbed from '../core/base-embed';

export default class Clicksign extends BaseEmbed {
  get params() {
    return `?embedded=true&origin=${this.origin}`;
  }

  get path() {
    return `/notarial/widget/signatures/${this.key}/redirect`;
  }
}
