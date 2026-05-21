import ClickForm from './embedded';

const containerElementId = 'clicksign-embedded-click-form';
const formKey = 'foobar123';
const endpoint = 'https://app.clicksign.com';
const originUrl = `${window.location.protocol}://${window.location.host}`;
const sourceUrl = `${endpoint}/app/click-form/forms/${formKey}?embedded=true&origin=${originUrl}`;

function createContainerElement() {
  const element = document.createElement('div');

  element.setAttribute('id', containerElementId);
  document.body.appendChild(element);
}

describe('ClickForm', () => {
  const instance = new ClickForm(formKey);

  beforeEach(() => {
    vi.restoreAllMocks();

    createContainerElement();
    instance.unmount();
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should initialize properly', () => {
    expect(instance.key).toBe(formKey);
    expect(instance.origin).toBe(originUrl);
    expect(instance.endpoint).toBe(endpoint);
    expect(instance.source).toBe(sourceUrl);
  });

  describe('Mount', () => {
    it('should throw when target container does not exist', () => {
      expect(() => instance.mount('unknown-container')).toThrow();

      instance.iframe = null;
      instance.target = null;
    });

    it('should mount widget on the specified element', () => {
      instance.mount(containerElementId);

      const iframeElement = document.getElementById(containerElementId).children[0];

      expect(iframeElement).toBe(instance.iframe);
      expect(iframeElement.tagName).toBe('IFRAME');
      expect(iframeElement).toHaveProperty('src', sourceUrl);
    });
  });

  describe('Events', () => {
    const events = ['loaded', 'submitted', 'completed', 'error'];

    it.each(events)('should register event "%s" listening successfully', (event) => {
      const eventMock = vi.fn();
      instance.on(event, eventMock);

      expect(instance.listen).toHaveProperty(event);
    });

    it.each(events)('should emit "%s" event with payload', (eventName) => {
      const eventMock = vi.fn();
      const payload = { name: eventName, metadata: 'sample' };

      instance.on(eventName, eventMock);
      instance.eventHandler({ data: payload });

      expect(eventMock).toHaveBeenCalledWith(payload);
    });
  });

  describe('Unmount', () => {
    it('should unmount widget on the specified element', () => {
      instance.mount(containerElementId);

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
