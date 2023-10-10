import currency from 'currency.js';
export const Money = (value: number) => currency(value, {symbol: 'R$ ', separator: '', precision: 2});
