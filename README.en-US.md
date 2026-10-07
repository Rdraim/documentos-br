# documentos-br

[Brazilian Portuguese](README.md) · [Voluntary support](SUPPORT.en-US.md)

CPF and numeric/alphanumeric CNPJ check digits, plus CEP formatting. No network requests.

## Start here

Requires Git and Node.js 22+ for tests. No runtime dependencies. Download the actual repository rather than an unverified same-name npm package.

```sh
git clone https://github.com/techrodrigo21-ux/documentos-br.git
cd documentos-br
npm test
node tools/check-public-content.mjs
```

These imports work from the cloned repository root. To use the module in another project, install a pinned Git tag (v1.2.0) or copy the module while retaining the MIT license. This documentation does not claim an npm registry release.

```js
import { validarCPF, validarCNPJ, mascararCNPJ, validarCEP } from './src/index.js';
// Mathematical test fixture; not a customer record.
console.log(validarCNPJ('AB.CDE.FGH/IJKL-80')); // true
console.log(mascararCNPJ('ABCDEFGHIJKL80'));
console.log(validarCEP('00000-000')); // format only
```

## API

`validarCPF`, `validarCNPJ`, `validarCpfCnpj`, `validarCEP`; `mascararCPF`, `mascararCNPJ`, `mascararCEP`; `soDigitos`.

Public function and option names remain in Portuguese for compatibility.

## Behavior and limits

CNPJ supports A–Z and 0–9 in the first 12 positions and numeric check digits, using ASCII minus 48 and modulo 11. Lowercase letters are normalized. Validators reject unexpected characters instead of stripping letters to accept invalid CPF/CEP input. Masks are typing helpers. CEP checks only eight digits and does not verify existence. Correct CPF/CNPJ check digits do not establish registration, ownership or identity. Test fixtures are not customer records.

## Maintenance

These standalone modules are inspired by work on Nexus, Rodrigo Rodrigues's independent project. They contain no private database, deployment configuration, logs, credentials or user records. Coordinated maintenance means reviewing related changes in the same release cycle, not automatically copying private source files.

## Security and compatibility

Alphanumeric CNPJ and strict character validation.

[Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Voluntary support](SUPPORT.en-US.md)

MIT © Rodrigo Rodrigues

Official reference: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico


## Practical use — 1.2.0

`normalizarCPF`, `normalizarCNPJ` and `normalizarCEP` return a validated canonical value or `null`. Validation accepts raw or exactly formatted input; typing masks remain tolerant.

Runnable example with synthetic data: `node examples/uso.mjs`.


## ☕ Support this work

If this project helped you, consider buying me a coffee. Any amount is welcome, and sharing your feedback helps too.

[![Support via Pix](assets/support/pix-en-us.svg)](SUPPORT.en-US.md)
