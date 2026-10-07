import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validarCPF, validarCNPJ, validarCEP, mascararCNPJ, validarCpfCnpj } from '../src/index.js';
test('CNPJ alfanumérico com fixture de cálculo, sem cadastro real', () => {
  // Fixture gerada pela regra ASCII-48 módulo 11; não representa usuário.
  assert.equal(validarCNPJ('AB.CDE.FGH/IJKL-80'), true);
  assert.equal(validarCNPJ('ab.cde.fgh/ijkl-80'), true);
  assert.equal(validarCNPJ('AB.CDE.FGH/IJKL-81'), false);
  assert.equal(mascararCNPJ('ABCDEFGHIJKL80'), 'AB.CDE.FGH/IJKL-80');
  assert.equal(validarCpfCnpj('ABCDEFGHIJKL80'), true);
});
test('validação rejeita letras adicionadas aos identificadores numéricos', () => {
  assert.equal(validarCPF('x11144477735'), false);
  assert.equal(validarCEP('x01310100'), false);
  assert.equal(validarCNPJ('!11222333000181'), false);
});
