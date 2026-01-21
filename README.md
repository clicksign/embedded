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

### Identity Authenticator

Para criar o componente de autenticação de identidade:

```javascript
session = new AuthSession('d973213c-6411-11e8-8df5-7cd1c3e91b23');

session.on('loaded', ev => { console.log(ev); })
session.on('success', ev => { console.log(ev); })
session.on('error', ev => { console.log(ev); })

session.start('container-id');
```

#### Exemplo de Resultado do Evento de Sucesso

```javascript
// Estrutura do payload do evento de sucesso:
{
  created_at: string,       // ISO 8601 date string
  evidences: [
    { url: string }         // S3 presigned URL
  ],
  finished_at: string,      // ISO 8601 date string
  id: string,               // UUID
  result: {
    is_valid: boolean
  },
  status: 'CREATED' | 'PROCESSED' | 'FAILED',
  updated_at: string        // ISO 8601 date string
}

// Exemplo:
{
  created_at: '2026-01-21T14:30:00.000Z',
  evidences: [
    { url: 'https://s3.amazonaws.com/bucket/evidence.jpg?presigned=token' }
  ],
  finished_at: '2026-01-21T14:31:00.000Z',
  id: 'd973213c-6411-11e8-8df5-7cd1c3e91b23',
  result: {
    is_valid: true
  },
  status: 'PROCESSED',
  updated_at: '2026-01-21T14:31:00.000Z'
}
```

#### Exemplo de Resultado do Evento de Erro

```javascript
// Estrutura do payload do evento de erro:
{
  code: 'LivenessFailed' | 'CameraPermissionDenied' | 'LivenessError',
  details: {
    message: string
  }
}

// Exemplo:
{
  code: 'CameraPermissionDenied',
  details: {
    message: 'Usuário negou acesso à câmera'
  }
}
```

Para desmontar o `iframe` da DOM:

```javascript
session.unmount();
```

## Como contribuir

Os testes estão escritos utilizando Jasmine Browser e estão automatizados pelo
Gulp.  Basta instalar as dependências com `npm install` e `gulp` para testar e
`gulp build` para compilar.

## Suporte

Em caso de dúvidas ou problemas, envie um e-mail para ajuda@clicksign.com.
