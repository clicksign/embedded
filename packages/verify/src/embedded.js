export default class AuthSession {
  #allowed = 'camera;geolocation;fullscreen;gyroscope;accelerometer;magnetometer';

  #defaultStyles = 'width: 100%; height: 100%;';

  constructor(key) {
    this.key = key;
    this.listen = {};
    this.locale = '';
    this.brand = null;
    this.endpoint = 'https://app.clicksign.com';
    this.origin = `${window.location.protocol}://${window.location.host}`;
  }

  eventsFor(event) {
    const eventName = event.name || event.data?.name || event.data || event;
    return this.listen[eventName] || [];
  }

  eventHandler(event) {
    this.eventsFor(event).forEach((fn) => fn(event.data));
  }

  start(id) {
    this.target = document.getElementById(id);

    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('src', this.source);
    this.iframe.setAttribute('style', this.#defaultStyles);
    this.iframe.setAttribute('allow', this.#allowed);

    window.addEventListener('message', (event) => this.eventHandler(event));

    return this.target.appendChild(this.iframe);
  }

  on(event, fn) {
    if (!this.listen[event]) { this.listen[event] = []; }

    return this.listen[event].push(fn);
  }

  unmount() {
    if (this.iframe) {
      this.target.removeChild(this.iframe);

      this.target = null;
      this.iframe = null;

      window.removeEventListener('message', this.eventHandler);
    }

    return true;
  }

  get source() {
    return `${this.endpoint}${this.path}${this.params}`;
  }

  // TODO: Definir nome do método combinando com o nome do query param (linha 81)
  get data() {
    if (!this.brand) return '';

    return AuthSession.base64EncodeUrl(JSON.stringify({ brand: this.brand }));
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

    // TODO: Definir nome do query param. Ex.: settings, payload, data, etc.
    if (this.data) query.set('data', this.data);

    const queryToString = query.toString();

    return queryToString ? `?${queryToString}` : '';
  }

  get path() {
    if (this.locale) return `/verify/${this.locale}/sessions/${this.key}`;

    return `/verify/sessions/${this.key}`;
  }
}
