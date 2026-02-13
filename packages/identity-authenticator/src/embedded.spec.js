import AuthSession from './embedded';

const containerElementId = 'widget';
const sessionKey = 'foobar123';
const originUrl = `${window.location.protocol}://${window.location.host}`;
const endpoint = 'https://app-workspaces-1.clicksign.dev/identity_authenticator';
const sourceUrl = `${endpoint}/sessions/${sessionKey}?origin=${originUrl}`;

function createContainer() {
  const element = document.createElement('div');
  element.setAttribute('id', containerElementId);
  document.body.appendChild(element);
}

describe('AuthSession', () => {
  const instance = new AuthSession(sessionKey);

  beforeEach(() => {
    jest.restoreAllMocks();

    createContainer();

    instance.start(containerElementId);
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should initialize properly', () => {
    expect(instance.key).toBe(sessionKey);
    expect(instance.origin).toBe(originUrl);
    expect(instance.endpoint).toBe(endpoint);
    expect(instance.locale).toBe('');
    expect(instance.source).toBe(sourceUrl);
  });

  it('should mount widget on the specified element', () => {
    const iframeElement = document.getElementById(containerElementId).children[0];

    expect(iframeElement.tagName).toBe('IFRAME');
    expect(iframeElement).toHaveProperty('src', sourceUrl);
  });

  it('should unmount widget on the specified element', () => {
    const containerElement = document.getElementById(containerElementId);

    expect(containerElement.children.length).toEqual(1);
    expect(instance.iframe).not.toBeNull();
    expect(instance.target).not.toBeNull();

    instance.unmount();

    expect(containerElement.children.length).toEqual(0);
    expect(instance.iframe).toBeNull();
    expect(instance.target).toBeNull();
  });

  describe('localePath', () => {
    afterEach(() => {
      instance.locale = '';
    });

    it('should return empty string when locale is not set', () => {
      expect(instance.localePath).toBe('');
    });

    it('should return empty string when locale is an empty string', () => {
      instance.locale = '';

      expect(instance.localePath).toBe('');
    });

    it.each(['pt-BR', 'en-US', 'es-MX'])(
      'should return locale path for locale=%s',
      (locale) => {
        instance.locale = locale;

        expect(instance.localePath).toBe(`/${locale}`);
      },
    );
  });

  describe('Emitting events', () => {
    const eventMock = jest.fn();
    const events = ['loaded', 'completed', 'error'];

    it.each(events)('should register event eventName=%s listening successfully', (eventName) => {
      instance.on(eventName, eventMock);

      expect(instance.listen).toHaveProperty(eventName);
    });

    it.each(events)('should emit eventName=%s event', (eventName) => {
      instance.eventHandler(eventName);

      expect(eventMock).toHaveBeenCalled();
    });
  });
});
