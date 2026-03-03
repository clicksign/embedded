export default class BaseEmbed {
  #allowed = 'camera;geolocation;fullscreen;gyroscope;accelerometer;magnetometer';

  #defaultStyles = 'width: 100%; height: 100%;';

  constructor(key) {
    this.key = key;
    this.listen = {};
    this.endpoint = 'https://app.clicksign.com';
    this.origin = `${window.location.protocol}://${window.location.host}`;
    this.target = null;
    this.iframe = null;
    this.boundEventHandler = (event) => this.eventHandler(event);
  }

  eventsFor(event) {
    const eventName = event.name || event.data?.name || event.data || event;
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

    window.addEventListener('message', this.boundEventHandler);

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

      window.removeEventListener('message', this.boundEventHandler);
    }

    return true;
  }

  get source() {
    return `${this.endpoint}${this.path}${this.params}`;
  }
}
