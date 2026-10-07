/* ============================================================================
   documentos-br — validação e máscara de CPF, CNPJ e CEP. Sem dependência.

   Validação por dígito verificador (não só formato): rejeita número com todos
   os dígitos iguais (00000000000) e confere os DVs. Máscaras aplicam enquanto
   o usuário digita (parciais funcionam).
   ============================================================================ */

export const soDigitos = (v) => String(v ?? '').replace(/\D/g, '');
function semMascara(v, tipo) {
  const s = String(v ?? '').trim();
  const formatos = {
    cpf: /^(?:\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/,
    cnpj: /^(?:[A-Za-z0-9]{12}\d{2}|[A-Za-z0-9]{2}\.[A-Za-z0-9]{3}\.[A-Za-z0-9]{3}\/[A-Za-z0-9]{4}-\d{2})$/,
    cep: /^(?:\d{8}|\d{5}-\d{3})$/,
  };
  return formatos[tipo].test(s) ? s.replace(/[.\/\-]/g, '') : '';
}

/** Valida CPF pelo dígito verificador. Aceita com ou sem máscara. */
export function validarCPF(valor) {
  const cpf = semMascara(valor, 'cpf');
  if (!/^\d{11}$/.test(cpf)) return false;
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  const dv = (base, pesoInicial) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) soma += +base[i] * (pesoInicial - i);
    const r = (soma * 10) % 11;
    return r === 10 ? 0 : r;
  };
  const d1 = dv(cpf.slice(0, 9), 10);
  const d2 = dv(cpf.slice(0, 10), 11);
  return d1 === +cpf[9] && d2 === +cpf[10];
}

/** Valida CNPJ pelo dígito verificador. Aceita com ou sem máscara. */
export function validarCNPJ(valor) {
  const cnpj = semMascara(valor, 'cnpj').toUpperCase();
  if (!/^[A-Z0-9]{12}\d{2}$/.test(cnpj) || /^(\d)\1{13}$/.test(cnpj)) return false;
  const dv = (base) => {
    const pesos = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = 0; i < base.length; i++) soma += (base.charCodeAt(i) - 48) * pesos[i];
    const r = soma % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const d1 = dv(cnpj.slice(0, 12));
  const d2 = dv(cnpj.slice(0, 13));
  return d1 === +cnpj[12] && d2 === +cnpj[13];
}

/** Valida o FORMATO do CEP (8 dígitos). Não confere se o CEP existe. */
export function validarCEP(valor) { return /^\d{8}$/.test(semMascara(valor, 'cep')); }

/** Máscara de CPF (000.000.000-00), funciona com entrada parcial. */
export function mascararCPF(valor) {
  return soDigitos(valor).slice(0, 11)
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

/** Máscara de CNPJ (00.000.000/0000-00), funciona com entrada parcial. */
export function mascararCNPJ(valor) {
  const s = String(valor ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 14);
  return s.slice(0, 2) + (s.length > 2 ? '.' + s.slice(2, 5) : '')
    + (s.length > 5 ? '.' + s.slice(5, 8) : '')
    + (s.length > 8 ? '/' + s.slice(8, 12) : '')
    + (s.length > 12 ? '-' + s.slice(12, 14) : '');
}

/** Máscara de CEP (00000-000), funciona com entrada parcial. */
export function mascararCEP(valor) {
  return soDigitos(valor).slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2');
}

/** Detecta e valida CPF ou CNPJ pelo tamanho. */
export function validarCpfCnpj(valor) {
  return validarCPF(valor) || validarCNPJ(valor);
}

/** Normalização para persistência só retorna documento validado, ou null. */
export const normalizarCPF = (v) => validarCPF(v) ? semMascara(v, 'cpf') : null;
export const normalizarCNPJ = (v) => validarCNPJ(v) ? semMascara(v, 'cnpj').toUpperCase() : null;
export const normalizarCEP = (v) => validarCEP(v) ? semMascara(v, 'cep') : null;
