# Clicksign Browser Embedded

## Como utilizar

Para criar o componente de assinatura:

```javascript
widget = new Clicksign('d973213c-6411-11e8-8df5-7cd1c3e91b23');

widget.on('loaded', ev => { console.log(ev); })
widget.on('signed', ev => { console.log(ev); })

widget.mount('container-id');
```

Para desmontar o `iframe` da DOM:

```javascript
widget.unmount();
```

## Como contribuir

Os testes estão escritos utilizando Jasmine Browser e estão automatizados pelo
Gulp.  Basta instalar as dependências com `npm install` e `gulp` para testar e
`gulp build` para compilar.

## Suporte

Em caso de dúvidas ou problemas, envie um e-mail para ajuda@clicksign.com.
