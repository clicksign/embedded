import BaseEmbed from '../core/base-embed';

export default class Form extends BaseEmbed {
  constructor(key, options = {}) {
    super(key);
    this.hide_logo = options.hide_logo || false;
  }

  get params() {
    const query = new URLSearchParams({
      origin: this.origin,
      embedded: 'true',
    });

    if (this.hide_logo) query.set('hide_logo', this.hide_logo);

    const queryToString = query.toString();

    return queryToString ? `?${queryToString}` : '';
  }

  get path() {
    return `/app/click_form/${this.key}`;
  }
}
