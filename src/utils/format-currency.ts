export const formatCurrency = (lang = "en", transfer = "usd", amount: number | bigint) => {
    return new Intl.NumberFormat(lang, {
      style: 'currency',
      currency: transfer,
      minimumFractionDigits: 0,
    }).format(amount);
}

export const getPrice = async (currency: any, code: string, base: string) => {
  const fromRate = await currency.rates.usd['usd']
  const toRate = Math.ceil(currency.rates.usd[code])
  const result = ((toRate / fromRate) * Number(base)).toFixed()

  return result
}

export const getPriceFastest = async (code: string, base: string) => {
  const api = 'https://currency-rate-exchange-api.onrender.com/usd'

  const response = await fetch(api)
  const currency = await response.json()

  const fromRate = currency.rates.usd['usd']
  const toRate = Math.ceil(currency.rates.usd[code])
  const result = ((toRate / fromRate) * Number(base)).toFixed()

  return result
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${daysOfWeek[dayOfWeek]}, ${months[month]} ${dayOfMonth}, ${year}`;
}