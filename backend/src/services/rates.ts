import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const APP_ID = process.env.OPEN_EXCHANGE_RATES_API_KEY;

/**
 * Convert an amount from one currency to another.
 *
 * ### Input:
 * - `base`: `string` - The base currency code.
 * - `amount`: `number` - The amount to convert.
 * - `target`: `string` - The target currency code.
 * - `date`: `string` - The date of the exchange rate.
 *   - format: `YYYY-MM-DD`
 *
 * ### Output:
 * - `convertedAmount`: `number` - The converted amount.
 */
export async function getConvertedAmount(
  base: string,
  amount: number,
  target: string,
  date: string
): Promise<number> {
  const api_url = `https://openexchangerates.org/api/historical/${date}.json`;

  const response = await axios.get(api_url, {
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
