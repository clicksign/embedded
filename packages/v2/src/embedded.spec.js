import Clicksign from './embedded';

const containerElementId = 'widget';
const signatureKey = 'foobar123';
const originUrl = 'https://example.com';
const applicationUrl = 'https://app.clicksign.com';
const signatureUrl = `${applicationUrl}/notarial/compat/request/${signatureKey}?embedded=true&origin=${originUrl}`;

function createContainer() {
  const element = document.createElement('div');
  element.setAttribute('id', containerElementId);
  document.body.appendChild(element);
}

function initInstance() {
  return new Clicksign(signatureKey);
};

Object.defineProperty(window,  "location", {
  value: {
    href: originUrl,
    protocol: 'https',
    host: 'example.com'
  },
  writable: true
});

describe('Clicksign', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    createContainer();
  });

  it('should initialize properly', () => {
    const instance = initInstance();

    expect(instance.key).toBe(signatureKey);
    expect(instance.origin).toBe(originUrl);
    expect(instance.endpoint).toBe(applicationUrl);
    expect(instance.source).toBe(signatureUrl);
  });

  it('should mount widget on specified element', () => {
    const instance = initInstance();
    instance.mount(containerElementId);

    const iframeElement = document.getElementById(containerElementId).children[0];

    expect(iframeElement.tagName).toBe('IFRAME');
    expect(iframeElement).toHaveProperty('src', signatureUrl);
  });

  it.skip('should emit loaded event', () => {
    const instance = initInstance();
    instance.mount(containerElementId);

    const eventMock = jest.fn();
    instance.on('loaded', eventMock);

    expect(eventMock).toHaveBeenCalled();
  });
})
