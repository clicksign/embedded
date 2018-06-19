Clicksign = function(key) {
  var iframe, target,
      endpoint = 'https://app.clicksign.com',
      src = endpoint + '/sign?key=' + key,
      listen = {};

  var mount = function (id) {
    target = document.getElementById(id);

    iframe = document.createElement('iframe');
    iframe.setAttribute('src', src);

    window.addEventListener('message', trigger);

    return target.appendChild(iframe);
  };

  var on = function (ev, fn) {
    if (!listen[ev]) { listen[ev] = []; }
    return listen[ev].push(fn);
  };

  var trigger = function (ev, data) {
    (listen[ev] || []).forEach(function(fn) { fn(data); });
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
    mount: mount,
    unmount: unmount,
    on: on,
    trigger: trigger
  };
};
