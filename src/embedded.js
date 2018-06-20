Clicksign = function(key) {
  var iframe, target,
      endpoint = 'https://app.clicksign.com',
      origin = window.location.protocol + '//' + window.location.host,
      listen = {};

  var mount = function (id) {
    path = '/sign/' + key;
    params = '?embedded=true&origin=' + this.origin;

    src = this.endpoint + path + params;
    target = document.getElementById(id);

    iframe = document.createElement('iframe');
    iframe.setAttribute('src', src);
    iframe.setAttribute('style', 'width: 100%; height: 100%;');

    window.addEventListener('message', handle);

    return target.appendChild(iframe);
  };

  var on = function (ev, fn) {
    if (!listen[ev]) { listen[ev] = []; }
    return listen[ev].push(fn);
  };

  var trigger = function (ev) {
    (listen[ev] || []).forEach(function(fn) { fn(); });
  };

  var handle = function (ev) {
    trigger(ev.data);
  };

  var unmount = function () {
    if (iframe) {
      target.removeChild(iframe);

      target = null;
      iframe = null;

      window.removeEventListener('message', trigger);
    }

    return true;
  };

  return {
    endpoint: endpoint,
    origin: origin,
    mount: mount,
    unmount: unmount,
    on: on,
    trigger: trigger
  };
};
