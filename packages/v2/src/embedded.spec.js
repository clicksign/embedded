import Clicksign from './embedded';

const containerElementId = 'widget';
const signatureKey = 'foobar123';
const originUrl = `${window.location.protocol}://${window.location.host}`;
const applicationUrl = 'https://app.clicksign.com';
const signatureUrl = `${applicationUrl}/notarial/widget/signatures/${signatureKey}/redirect?embedded=true&origin=${originUrl}`;

function createContainer() {
  const element = document.createElement('div');
  element.setAttribute('id', containerElementId);
  document.body.appendChild(element);
}

describe('Clicksign Embedded', () => {
  const instance = new Clicksign(signatureKey);

  beforeEach(() => {
    jest.restoreAllMocks();

    createContainer();

    instance.mount(containerElementId);
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should initialize properly', () => {
    expect(instance.key).toBe(signatureKey);
    expect(instance.origin).toBe(originUrl);
    expect(instance.endpoint).toBe(applicationUrl);
    expect(instance.source).toBe(signatureUrl);
  });

  it('should mount widget on the specified element', () => {
    const iframeElement = document.getElementById(containerElementId).children[0];

    expect(iframeElement.tagName).toBe('IFRAME');
    expect(iframeElement).toHaveProperty('src', signatureUrl);
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

  describe('Emitting events', () => {
    const eventMock = jest.fn();
    const events = ['loaded', 'resized', 'signed'];

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
