export default class Clicksign {
  #url = 'https://app.clicksign.com';

  #allowed = 'camera;geolocation;fullscreen;gyroscope;accelerometer;magnetometer';

  #defaultStyles = 'width: 100%; height: 100%;';

  constructor(key) {
    this.key = key;
    this.origin = `${window.location.protocol}://${window.location.host}`;
    this.listen = {};
  }

  mount(id) {
    this.target = document.getElementById(id);

    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('src', this.source);
    this.iframe.setAttribute('style', this.#defaultStyles);
    this.iframe.setAttribute('allow', this.#allowed);

    window.addEventListener('message', this.#eventHandler);

    return this.target.appendChild(this.iframe);
  }

  on(event, fn) {
    if (!this.listen[event]) { this.listen[event] = []; }

    return this.listen[event].push(fn);
  }

  trigger(event) {
    this.#eventsFor(event).forEach((fn) => {
      fn(event.data);
    });
  }

  unmount() {
    if (this.iframe) {
      this.target.removeChild(this.iframe);

      this.target = null;
      this.iframe = null;

      window.removeEventListener('message', this.#eventHandler);
    }

    return true;
  }

  get url() {
    return this.#url;
  }

  get source() {
    return `${this.#url}${this.path}${this.params}`;
  }

  get params() {
    return `?embedded=true&origin=${this.origin}`;
  }

  get path() {
    return `/notarial/compat/request/${this.key}`;
  }

  #eventHandler(event) {
    this.trigger(event);
  }

  #eventsFor(event) {
    const eventName = event.name || event;
    return this.listen[eventName] || [];
  }
}
