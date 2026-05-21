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

### Autenticações (`v3-beta`)

Para criar o componente de autenticação:

```javascript
import Verify from '@clicksign/embedded/v3/verify';

const transaction = new Verify('d973213c-6411-11e8-8df5-7cd1c3e91b23');

transaction.on('loaded', ev => { console.log(ev); })
transaction.on('success', ev => { console.log(ev); })
transaction.on('failed', ev => { console.log(ev); })
transaction.on('error', ev => { console.log(ev); })

transaction.start('container-id');
```

O construtor de `Verify` aceita um segundo parâmetro (`options`) com:

- `locale` (padrão: `'pt-br'`; aceitos: `en-us` | `pt-br` | `es-mx`)
- `custom` (padrão: `null`)

Parâmetros aceitos em `custom`:

- `colors.buttonTextColor`: `string` (cor em HEX, ex: `#ffffff`)
- `colors.buttonBackgroundColor`: `string` (cor em HEX, ex: `#000000`)

Schema de `custom`:

```javascript
{
  colors: {
    buttonTextColor: string, // ex: '#ffffff'
    buttonBackgroundColor: string // ex: '#000000'
  }
}
```

Exemplo com `locale` e `custom`:

```javascript
const transaction = new Verify('d973213c-6411-11e8-8df5-7cd1c3e91b23', {
  locale: 'en-US',
  custom: {
    colors: {
      buttonTextColor: '#ffffff',
      buttonBackgroundColor: '#000000'
    }
  }
});
```

#### Eventos `success` e `failed`

Os eventos `success` e `failed` retornam um JWT (string).

Exemplo do evento `success` (JWT decodificado):

```javascript
{
  authentication: 'Liveness',
  evidences: [
    {
      url: 'http://.../verify-evidences/evidences/2026/02/26/e3da3762-4c50-4b60-9396-c8df15dc4619.png'
    }
  ],
  exp: 1772139169,
  iat: 1772135569,
  is_valid: true,
  transaction: {
    id: '72849611-079a-40e1-b92e-2a89f4148d6a',
    state: 'succeed'
  }
}
```

Exemplo do evento `failed` (JWT decodificado):

```javascript
{
  authentication: 'Liveness',
  evidences: [
    {
      url: 'http://.../verify-evidences/evidences/2026/02/26/e3da3762-4c50-4b60-9396-c8df15dc4619.png'
    }
  ],
  exp: 1772139169,
  iat: 1772135569,
  is_valid: false,
  transaction: {
    id: '72849611-079a-40e1-b92e-2a89f4148d6a',
    state: 'failed'
  }
}
```

#### Evento `error`

O evento `error` retorna detalhes de falha durante a autenticação:

```javascript
{
  code: 'CameraPermissionDenied' | 'LivenessError',
  details: {
    message: string
  }
}
```

Exemplo:

```javascript
{
  code: 'CameraPermissionDenied',
  details: {
    message: 'Usuário negou acesso à câmera'
  }
}
```

Para desmontar o `iframe` da DOM:

```javascript
transaction.unmount();
```

### Click Forms (`v3-beta`)

Para criar o componente de click-form:

```javascript
import ClickForm from '@clicksign/embedded/v3/click-form';

const form = new ClickForm('d973213c-6411-11e8-8df5-7cd1c3e91b23');

form.on('loaded', ev => { console.log(ev); })
form.on('submitted', ev => { console.log(ev); })
form.on('completed', ev => { console.log(ev); })
form.on('error', ev => { console.log(ev); })

form.mount('container-id');
```

Para apontar para um endpoint local:

```javascript
form.endpoint = 'http://localhost:3200';
```

Para desmontar o `iframe` da DOM:

```javascript
form.unmount();
```

## Como contribuir

Instale as dependencias com `pnpm install`.

Builds disponiveis:

- `pnpm run build:v1`
- `pnpm run build:v2`
- `pnpm run build:v3`

## Suporte

Em caso de dúvidas ou problemas, envie um e-mail para ajuda@clicksign.com.
