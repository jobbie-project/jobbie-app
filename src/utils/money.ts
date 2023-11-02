import currency from 'currency.js';
export const Money = (value: number) => currency(value, {symbol: 'R$ ', separator: '', precision: 0});

export const formatNumberToBRL = (event: string, firstRender?: boolean) => {
  event = event.toString();
  const userInput: string = event?.replace(/[^0-9.]/g, '');
  const value = firstRender ? parseFloat(userInput) : parseFloat(userInput) / 100;
  if (userInput === '' || userInput === '0') {
    return 'R$ 0,00';
  } else {
    const formattedNumber: string = `R$ ${value.toFixed(2).replace('.', ',')}`;
    return formattedNumber;
  }
};
