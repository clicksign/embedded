import Clicksign from './embedded'

describe('Clicksign', () => {
  const url = "https://example.com";

  // beforeEach(() => {
  //   let window = Object.create({})
  //   global.window = Object.create(window);
  //
  //   Object.defineProperty(window,  "location", {
  //     value: {
  //       href: url,
  //       protocol: 'https',
  //       host: 'example.com'
  //     },
  //     writable: true
  //   });
  //
  //   Object.defineProperty(window, "parent", {
  //     value: {
  //       document: null,
  //     },
  //     configurable: true,
  //   })
  //
  //   jest.restoreAllMocks()
  //   jest.spyOn(window, 'parent', 'get').mockReturnValue(Object.create(window));
  //   jest.spyOn(window.parent, 'document', 'get').mockReturnValue(Object.create(window.document));
  //   jest.spyOn(window.parent.document, 'body', 'get').mockReturnValue(document.createElement('body'));
  //   jest.stubGlobal('frameElement', document.createElement('iframe'));
  // });
  //
  // afterEach(() => {
  //   delete global.window;
  // });

  it('should initialize properly', () => {
    let key = 'foobar123'
    let instance = new Clicksign(key)

    expect(instance.key).toBe(key);
    expect(instance.origin).toBe(url)
    expect(instance.endpoint).toBe('https://app.clicksign.com')
    expect(instance.source).toBe(`https://app.clicksign.com/sign/${key}?embedded=true&origin=${url}`)
  })
})
