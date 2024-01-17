export default class Clicksign {
  #endPoint = 'https://app.clicksign.com'
  #allowed = 'camera;geolocation;fullscreen;gyroscope;accelerometer;magnetometer'
  #defaultStyles = 'width: 100%; height: 100%;'

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

    return this.target.appendChild(this.iframe);
  }

  on(event, fn) {
    if(!this.listen[event]) { this.listen[event] = [] };

    return this.listen[event].push(fn);
  }

  get source() {
    return `${this.endpoint}${this.path}${this.params}`;
  }

  get params() {
    return `?embedded=true&origin=${this.origin}`;
  }

  get path() {
    return `/notarial/compat/request/${this.key}`;
  }

  get endpoint() {
    return this.#endPoint;
  }
}
