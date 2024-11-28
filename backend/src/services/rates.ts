import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const API_URL = 'https://openexchangerates.org/api/latest.json';
const APP_ID = process.env.OPEN_EXCHANGE_RATES_API_KEY;

export async function getConvertedAmount(
  base: string,
  amount: number,
  target: string
): Promise<number> {
  const response = await axios.get(API_URL, {
    params: { app_id: APP_ID },
  });

  // response の中身は res.json で見れる
  const rates = response.data.rates;
  if (!rates[base] || !rates[target]) {
    throw new Error('Invalid currency code');
  }

  const rate = rates[target] / rates[base];
  return amount * rate;
}
