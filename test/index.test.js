import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validarCPF, validarCNPJ, validarCEP, validarCpfCnpj, mascararCPF, mascararCNPJ, mascararCEP } from '../src/index.js';

test('CPF: valida por dígito verificador, com ou sem máscara', () => {
  assert.equal(validarCPF('111.444.777-35'), true);
  assert.equal(validarCPF('11144477735'), true);
  assert.equal(validarCPF('111.444.777-00'), false);
  assert.equal(validarCPF('111111111 11'.replace(' ', '')), false); // todos iguais → inválido
  assert.equal(validarCPF('123'), false);
});

test('CNPJ: valida por dígito verificador', () => {
  assert.equal(validarCNPJ('11.222.333/0001-81'), true);
  assert.equal(validarCNPJ('11222333000181'), true);
  assert.equal(validarCNPJ('11.222.333/0001-00'), false);
  assert.equal(validarCNPJ('00000000000000'), false);
});

test('CEP: valida o formato (8 dígitos)', () => {
  assert.equal(validarCEP('01310-100'), true);
  assert.equal(validarCEP('01310100'), true);
  assert.equal(validarCEP('1310-10'), false);
});

test('detecta CPF ou CNPJ pelo tamanho', () => {
  assert.equal(validarCpfCnpj('111.444.777-35'), true);
  assert.equal(validarCpfCnpj('11.222.333/0001-81'), true);
  assert.equal(validarCpfCnpj('123'), false);
});

test('máscaras funcionam com entrada completa e parcial', () => {
  assert.equal(mascararCPF('11144477735'), '111.444.777-35');
  assert.equal(mascararCPF('1114447'), '111.444.7');
  assert.equal(mascararCNPJ('11222333000181'), '11.222.333/0001-81');
  assert.equal(mascararCEP('01310100'), '01310-100');
  assert.equal(mascararCEP('013'), '013');
});
