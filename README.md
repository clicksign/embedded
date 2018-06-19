# Clicksign Browser Embedded

Para criar o componente de assinatura:

```javascript
widget = new Clicksign('d973213c-6411-11e8-8df5-7cd1c3e91b23');

widget.on('auth', ev => { console.log(ev); })
widget.on('signed', ev => { console.log(ev); })
widget.on('change', ev => { console.log(ev); })
widget.on('destroy', ev => { console.log(ev); })

widget.mount('container-id');
```

Para desmontar o `iframe` da DOM:

```javascript
widget.unmount();
```
