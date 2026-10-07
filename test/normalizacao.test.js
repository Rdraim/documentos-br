import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizarCPF, normalizarCNPJ, normalizarCEP, validarCpfCnpj } from '../src/index.js';
test('normaliza para persistência sem transformar lixo em documento válido', () => {
  assert.equal(normalizarCNPJ('ab.cde.fgh/ijkl-80'), 'ABCDEFGHIJKL80');
  assert.equal(normalizarCEP('12345-678'), '12345678');
  for (const v of ['123.45.678', '12345/678', '12345---678', 'x12345678']) assert.equal(normalizarCEP(v), null);
  for (const v of ['ABCD.EFGHIJKL80', 'AB.CDE.FGH/ IJKL-80', 'AB/CDE/FGH/IJKL/80']) {
    assert.equal(normalizarCNPJ(v), null); assert.equal(validarCpfCnpj(v), false);
  }
  assert.equal(normalizarCPF('invalid'), null);
  assert.equal(validarCpfCnpj('ABCDEFGHIJKL80'), true);
});
