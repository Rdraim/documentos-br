# documentos-br

Validação e máscara de **CPF, CNPJ e CEP** para JavaScript. Sem dependência.

Validação de verdade — por **dígito verificador**, não só formato: rejeita
número com todos os dígitos iguais e confere os DVs. As máscaras funcionam com
entrada **parcial** (enquanto o usuário digita).

## Instalação

```bash
npm install documentos-br
```

## Uso

```js
import {
  validarCPF, validarCNPJ, validarCEP, validarCpfCnpj,
  mascararCPF, mascararCNPJ, mascararCEP, soDigitos,
} from 'documentos-br';

validarCPF('111.444.777-35');        // true
validarCPF('111.444.777-00');        // false (DV errado)
validarCNPJ('11.222.333/0001-81');   // true
validarCpfCnpj('111.444.777-35');    // true (detecta pelo tamanho)

mascararCPF('11144477735');          // '111.444.777-35'
mascararCNPJ('11222333000181');      // '11.222.333/0001-81'
mascararCEP('01310100');             // '01310-100'
soDigitos('111.444.777-35');         // '11144477735'
```

Num input controlado (React):

```jsx
<input value={cpf} onChange={(e) => setCpf(mascararCPF(e.target.value))} />
{cpf && !validarCPF(cpf) && <small>CPF inválido</small>}
```

## API

| função | retorno |
|---|---|
| `validarCPF(v)` / `validarCNPJ(v)` | `boolean` (dígito verificador) |
| `validarCpfCnpj(v)` | valida CPF ou CNPJ conforme o tamanho |
| `validarCEP(v)` | `boolean` (formato de 8 dígitos) |
| `mascararCPF` / `mascararCNPJ` / `mascararCEP` | string formatada (parcial ok) |
| `soDigitos(v)` | só os dígitos |

> `validarCEP` confere só o formato — para saber se o CEP existe, consulte um
> serviço de endereço.

## Testes

```bash
npm test
```

## Licença

MIT © Rodrigo Rodrigues
