import AuthSession from './embedded';

const containerElementId = 'clicksign-embedded-verify';
const sessionKey = 'foobar123';
const endpoint = 'https://example.com';
const originUrl = `${window.location.protocol}://${window.location.host}`;

function getSourceUrl(locale = '') {
  const prefix = `${endpoint}/verify`;
  const verifyPath = locale ? `${prefix}/${locale}` : prefix;

  return `${verifyPath}/sessions/${sessionKey}?origin=${originUrl}`;
}

function createContainerElement() {
  const element = document.createElement('div');

  element.setAttribute('id', containerElementId);
  document.body.appendChild(element);
}

describe('AuthSession', () => {
  const instance = new AuthSession(sessionKey);

  beforeEach(() => {
    createContainerElement();

    instance.endpoint = endpoint;
    instance.origin = originUrl;
    instance.listen = {};
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should initialize properly', () => {
    expect(instance.key).toBe(sessionKey);
    expect(instance.origin).toBe(originUrl);
    expect(instance.endpoint).toBe(endpoint);
    expect(instance.locale).toBe('');
    expect(instance.source).toBe(getSourceUrl());
  });

  describe('Start', () => {
    it('should throw when target container does not exist', () => {
      expect(() => instance.start('unknown-container')).toThrow();

      instance.iframe = null;
      instance.target = null;
    });

    it('should mount widget on the specified element', () => {
      instance.start(containerElementId);

      const iframeElement = document.getElementById(containerElementId).children[0];

      expect(iframeElement).toBe(instance.iframe);
      expect(iframeElement.tagName).toBe('IFRAME');
      expect(iframeElement).toHaveProperty('src', getSourceUrl());
    });

    it('should set allow iframe attribute with required allowed permissions', () => {
      instance.start(containerElementId);

      const iframeElement = document.getElementById(containerElementId).children[0];

      expect(iframeElement.getAttribute('allow')).toBe('camera;geolocation;fullscreen;gyroscope;accelerometer;magnetometer');
    });

    it('should set style iframe attribute with width and height 100%', () => {
      instance.start(containerElementId);

      const iframeElement = document.getElementById(containerElementId).children[0];

      expect(iframeElement.getAttribute('style')).toBe('width: 100%; height: 100%;');
    });
  });

  describe('Locale', () => {
    const availableLocales = ['pt-BR', 'en-US', 'es-MX'];

    it('should initialize locale as empty string by default', () => {
      expect(instance.locale).toBe('');
    });

    it('should mount widget without locale in the source URL', () => {
      instance.start(containerElementId);

      const iframeElement = document.getElementById(containerElementId).children[0];

      expect(iframeElement).toHaveProperty('src', getSourceUrl());
    });

    it.each(availableLocales)('should render "%s" in iframe src attribute when locale is set', (locale) => {
      instance.locale = locale;
      instance.start(containerElementId);

      const iframeElement = document.getElementById(containerElementId).children[0];

      expect(iframeElement).toHaveProperty('src', getSourceUrl(locale));
    });
  });

  describe('Events', () => {
    const eventMock = vi.fn();
    const events = ['loaded', 'completed', 'error'];

    it.each(events)('should register event "%s" listening successfully', (event) => {
      instance.on(event, eventMock);

      expect(instance.listen).toHaveProperty(event);
    });

    it.each(events)('should emit "%s" event with payload', (eventName) => {
      const payload = { name: eventName, metadata: 'sample' };

      instance.on(eventName, eventMock);
      instance.eventHandler({ data: payload });

      expect(eventMock).toHaveBeenCalledWith(payload);
    });

    it('should return registration index from on()', () => {
      const callbackA = vi.fn();
      const callbackB = vi.fn();

      expect(instance.on('loaded', callbackA)).toBe(1);
      expect(instance.on('loaded', callbackB)).toBe(2);
    });

    it('should call all listeners for same event', () => {
      const callbackA = vi.fn();
      const callbackB = vi.fn();
      const payload = { name: 'loaded', metadata: 'sample' };

      instance.on('loaded', callbackA);
      instance.on('loaded', callbackB);
      instance.eventHandler({ data: payload });

      expect(callbackA).toHaveBeenCalledWith(payload);
      expect(callbackB).toHaveBeenCalledWith(payload);
    });

    it('should resolve event name from event.name', () => {
      const callback = vi.fn();
      const payload = { metadata: 'sample' };

      instance.on('completed', callback);
      instance.eventHandler({ name: 'completed', data: payload });

      expect(callback).toHaveBeenCalledWith(payload);
    });

    it('should resolve event name from event.data string', () => {
      const callback = vi.fn();

      instance.on('error', callback);
      instance.eventHandler({ data: 'error' });

      expect(callback).toHaveBeenCalledWith('error');
    });

    it('should resolve event name from plain string event', () => {
      const callback = vi.fn();

      instance.on('loaded', callback);
      instance.eventHandler('loaded');

      expect(callback).toHaveBeenCalledWith(undefined);
    });

    it('should not fail when emitting an unregistered event', () => {
      expect(() => instance.eventHandler({ data: { name: 'unknown' } })).not.toThrow();
    });
  });

  describe('Unmount', () => {
    it('should return true when unmount is called without iframe', () => {
      expect(instance.unmount()).toBe(true);
    });

    it('should unmount widget on the specified element', () => {
      instance.start(containerElementId);

      const containerElement = document.getElementById(containerElementId);

      expect(containerElement.children.length).toEqual(1);
      expect(instance.iframe).not.toBeNull();
      expect(instance.target).not.toBeNull();

      instance.unmount();

      expect(containerElement.children.length).toEqual(0);
      expect(instance.iframe).toBeNull();
      expect(instance.target).toBeNull();
    });
  });
});
