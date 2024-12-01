import axios from 'axios';
import * as dotenv from 'dotenv';
import { isValidDateFormat } from '../utils/dateUtils';

dotenv.config();

const BASE_URL = 'https://openexchangerates.org/api';
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
  if (!/^[A-Z]{3}$/.test(base) || !/^[A-Z]{3}$/.test(target)) {
    throw new Error(
      'Invalid currency code format. Expected a 3-letter currency code.'
    );
  }

  if (amount <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  if (isValidDateFormat(date) === false) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD.');
  }

  const api_url = `${BASE_URL}/historical/${date}.json`;

  try {
    const response = await axios.get(api_url, {
      params: { app_id: APP_ID },
    });

    // response の中身は res.json で見れる
    const rates = response.data.rates;
    if (!rates[base] || !rates[target]) {
      throw new Error('Invalid currency code');
    }

    const rate = rates[target] / rates[base];
    const convertedAmount = amount * rate;

    // toFixed: 指定した桁数までの数字を四捨五入をして文字列で返す
    return parseFloat(convertedAmount.toFixed(5));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch exchange rates: ${error.message}`);
    }
    throw error;
  }
}
