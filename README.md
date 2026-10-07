<p align="right">
  <a href="README.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="README.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="README.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# documentos-br

## Segurança e compatibilidade

CNPJ alfanumérico e validação estrita de caracteres.

CNPJ aceita A–Z e 0–9 nas 12 primeiras posições e dígitos numéricos nos dois verificadores, conforme ASCII menos 48 e módulo 11. Aceita letras minúsculas normalizadas. Validadores rejeitam caracteres inesperados, sem apagar letras para aceitar CPF/CEP inválido. Máscaras são conveniência de digitação. CEP verifica apenas 8 dígitos: não consulta existência. CPF/CNPJ válidos matematicamente não provam cadastro, titularidade ou identidade. Fixtures de teste não são dados de clientes.

Baixe pelo GitHub; não é necessário instalar um pacote homônimo do npm. Para consumir em outro projeto, use uma revisão Git fixada (tag v1.2.0) ou copie o módulo e preserve a licença. Os exemplos abaixo usam importação local após o clone. Node.js 22 ou superior para os testes.

Validação e máscara de **CPF, CNPJ e CEP** para JavaScript. Sem dependência.

Validação de verdade — por **dígito verificador**, não só formato: rejeita
número com todos os dígitos iguais e confere os DVs. As máscaras funcionam com
entrada **parcial** (enquanto o usuário digita).

## Instalação

```bash
git clone https://github.com/techrodrigo21-ux/documentos-br.git
cd documentos-br
npm test
```

## Uso

```js
import {
  validarCPF, validarCNPJ, validarCEP, validarCpfCnpj,
  mascararCPF, mascararCNPJ, mascararCEP, soDigitos,
} from './src/index.js';

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

## Manutenção e apoio

Código independente inspirado em problemas resolvidos no Nexus, projeto de Rodrigo Rodrigues. Não inclui banco, configuração privada, logs, dados de usuários ou credenciais. Evolução coordenada significa revisar mudanças relacionadas no mesmo ciclo; não há cópia automática de arquivos privados.

[Como contribuir](CONTRIBUTING.md) · [Segurança](SECURITY.md)

Referência oficial: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico


## Uso prático — 1.2.0

`normalizarCPF`, `normalizarCNPJ` e `normalizarCEP` retornam valor canônico validado ou `null`. Validação aceita formato bruto ou máscara exata; máscara de digitação continua tolerante.

Exemplo executável com dados sintéticos: `node examples/uso.mjs`.

---

<p align="center">
  <img src="assets/support/banner-pt-br.svg" width="960" alt="Código aberto. Um café faz diferença. Apoie o trabalho de Rodrigo Rodrigues.">
</p>

## ☕ Me pague um café

Este projeto te ajudou a resolver um problema, aprender algo novo ou dar os primeiros passos no desenvolvimento? Se você sentir vontade de apoiar meu trabalho, um café é uma forma carinhosa de agradecer.

Sou **Rodrigo Rodrigues**, criador do **Nexus** e destes projetos de código aberto. Seu apoio me ajuda a dedicar tempo para melhorar o código, escrever exemplos mais claros e continuar compartilhando o que aprendo.

**Contribua com o valor que fizer sentido para você. O apoio é totalmente voluntário — o projeto continua gratuito sob a licença MIT.**

<p>
  <a href="#apoie-com-pix"><img src="assets/support/pix-pt-br.svg" width="190" height="44" alt="Apoiar com Pix"></a>
  <a href="https://github.com/techrodrigo21-ux/documentos-br/issues/new?title=Coment%C3%A1rio%3A%20este%20projeto%20me%20ajudou"><img src="assets/support/comment-pt-br.svg" width="210" height="44" alt="Deixar um comentário"></a>
</p>

### Apoie com Pix

No aplicativo do seu banco, escaneie o QR Code ou copie a chave Pix abaixo. Escolha o valor e confira os dados do destinatário antes de confirmar.

<p align="center">
  <img src="assets/support/pix-qr.png" width="260" alt="QR Code Pix original fornecido por Rodrigo Rodrigues; a chave em texto abaixo é uma alternativa.">
</p>

**Chave Pix**

```text
8875a24e-44d1-4c91-b6bb-62c9f0070955
```

Você também pode apoiar compartilhando o projeto, relatando um problema, melhorando a documentação ou deixando um comentário.

### Seu comentário também faz diferença

[Conte como o projeto te ajudou](https://github.com/techrodrigo21-ux/documentos-br/issues/new?title=Coment%C3%A1rio%3A%20este%20projeto%20me%20ajudou). Vou gostar de saber o que você criou, o que aprendeu e o que poderia ficar mais claro para quem está começando.

O comentário é bem-vindo com ou sem doação. Preserve sua privacidade: não publique comprovantes, dados pessoais, credenciais ou informações de usuários nas Issues.

---

**Obrigado por apoiar meu trabalho e me ajudar a continuar criando e compartilhando. ❤️**
