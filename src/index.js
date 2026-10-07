/* ============================================================================
   documentos-br — validação e máscara de CPF, CNPJ e CEP. Sem dependência.

   Validação por dígito verificador (não só formato): rejeita número com todos
   os dígitos iguais (00000000000) e confere os DVs. Máscaras aplicam enquanto
   o usuário digita (parciais funcionam).
   ============================================================================ */

export const soDigitos = (v) => String(v ?? '').replace(/\D/g, '');

/** Valida CPF pelo dígito verificador. Aceita com ou sem máscara. */
export function validarCPF(valor) {
  const cpf = soDigitos(valor);
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
  const cnpj = soDigitos(valor);
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  const dv = (base) => {
    const pesos = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = 0; i < base.length; i++) soma += +base[i] * pesos[i];
    const r = soma % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const d1 = dv(cnpj.slice(0, 12));
  const d2 = dv(cnpj.slice(0, 13));
  return d1 === +cnpj[12] && d2 === +cnpj[13];
}

/** Valida o FORMATO do CEP (8 dígitos). Não confere se o CEP existe. */
export function validarCEP(valor) { return soDigitos(valor).length === 8; }

/** Máscara de CPF (000.000.000-00), funciona com entrada parcial. */
export function mascararCPF(valor) {
  return soDigitos(valor).slice(0, 11)
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

/** Máscara de CNPJ (00.000.000/0000-00), funciona com entrada parcial. */
export function mascararCNPJ(valor) {
  return soDigitos(valor).slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

/** Máscara de CEP (00000-000), funciona com entrada parcial. */
export function mascararCEP(valor) {
  return soDigitos(valor).slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2');
}

/** Detecta e valida CPF ou CNPJ pelo tamanho. */
export function validarCpfCnpj(valor) {
  const d = soDigitos(valor);
  if (d.length === 11) return validarCPF(d);
  if (d.length === 14) return validarCNPJ(d);
  return false;
}
