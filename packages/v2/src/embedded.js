export default class Clicksign {
  #allowed = 'camera;geolocation;fullscreen;gyroscope;accelerometer;magnetometer';

  #defaultStyles = 'width: 100%; height: 100%;';

  constructor(key) {
    this.key = key;
    this.origin = `${window.location.protocol}://${window.location.host}`;
    this.listen = {};
    this.endpoint = 'https://app.clicksign.com';
  }

  eventsFor(event) {
    const eventName = event.name || event;
    return this.listen[eventName] || [];
  }

  eventHandler(event) {
    this.eventsFor(event).forEach((fn) => fn(event.data));
  }

  mount(id) {
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

  get params() {
    return `?embedded=true&origin=${this.origin}`;
  }

  get path() {
    return `/notarial/compat/requests/${this.key}`;
  }
}
