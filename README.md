```javascript
widget = new Clicksign('d973213c-6411-11e8-8df5-7cd1c3e91b23');

widget.on('auth', ev => { console.log(ev); })
widget.on('signed', ev => { console.log(ev); })
widget.on('change', ev => { console.log(ev); })

widget.mount();
```

```javascript
widget.destroy();
```
