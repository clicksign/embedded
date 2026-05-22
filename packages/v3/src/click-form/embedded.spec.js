import ClickForm from './embedded';

const containerElementId = 'clicksign-embedded-click-form';
const formKey = 'foobar123';
const endpoint = 'https://app.clicksign.com';

function createContainerElement() {
  document.body.innerHTML = '';

  const element = document.createElement('div');

  element.setAttribute('id', containerElementId);
  document.body.appendChild(element);
}

describe('ClickForm', () => {
  let instance;

  beforeEach(() => {
    vi.restoreAllMocks();

    createContainerElement();
    instance = new ClickForm(formKey);
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should initialize properly', () => {
    const originUrl = window.location.origin;

    expect(instance.key).toBe(formKey);
    expect(new URL(instance.origin).origin).toBe(originUrl);
    expect(instance.endpoint).toBe(endpoint);

    const source = new URL(instance.source);
    expect(source.origin).toBe(endpoint);
    expect(source.pathname).toBe(`/app/click_form/${formKey}`);
    expect(source.searchParams.get('embedded')).toBe('true');
    expect(new URL(source.searchParams.get('origin')).origin).toBe(originUrl);
  });

  describe('Mount', () => {
    it('should throw when target container does not exist', () => {
      expect(() => instance.mount('unknown-container')).toThrow();

      instance.iframe = null;
      instance.target = null;
    });

    it('should mount widget on the specified element', () => {
      const originUrl = window.location.origin;

      instance.mount(containerElementId);

      const iframeElement = document.getElementById(containerElementId).children[0];
      const iframeSrc = new URL(iframeElement.src);

      expect(iframeElement).toBe(instance.iframe);
      expect(iframeElement.tagName).toBe('IFRAME');
      expect(iframeSrc.origin).toBe(endpoint);
      expect(iframeSrc.pathname).toBe(`/app/click_form/${formKey}`);
      expect(iframeSrc.searchParams.get('embedded')).toBe('true');
      expect(new URL(iframeSrc.searchParams.get('origin')).origin).toBe(originUrl);
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
