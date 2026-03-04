import BaseEmbed from '../core/base-embed';

export default class Verify extends BaseEmbed {
  constructor(key, options = {}) {
    super(key);
    this.locale = options.locale || '';
    this.custom = options.custom || null;
  }

  start(id) {
    return this.mount(id);
  }

  isLocalhost() {
    return this.endpoint.includes('localhost');
  }

  get data() {
    if (!this.custom) return '';

    return Verify.base64EncodeUrl(JSON.stringify({ custom: this.custom }));
  }

  static base64EncodeUrl(value) {
    let base64;

    if (typeof btoa === 'function') base64 = btoa(value);
    else if (typeof Buffer !== 'undefined') base64 = Buffer.from(value, 'utf-8').toString('base64');
    else throw new Error('No base64 encoder available');

    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  get params() {
    const query = new URLSearchParams({ origin: this.origin });

    if (this.data) query.set('data', this.data);

    const queryToString = query.toString();

    return queryToString ? `?${queryToString}` : '';
  }

  get path() {
    const basePath = this.isLocalhost() ? '' : '/app/verify';
    if (this.locale) return `${basePath}/${this.locale}/transactions/${this.key}`;

    return `${basePath}/transactions/${this.key}`;
  }
}
