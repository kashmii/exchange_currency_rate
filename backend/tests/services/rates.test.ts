import axios from 'axios';
import { getConvertedAmount } from '../../src/services/rates';
import * as dateUtils from '../../src/utils/dateUtils';

jest.mock('axios'); //モックのテスト
jest.mock('../../src/utils/dateUtils');

const mockedAxios = axios as jest.Mocked<typeof axios>;

// APIモックのテスト
describe('getConvertedAmount', () => {
  const amount = 10;
  const target = 'JPY';
  const date = '2024-01-01';

  // 1. 正常系テスト
  it('リクエストが有効・レスポンスが正常な場合 正しい変換結果を返す', async () => {
    // モックの設定
    (dateUtils.isValidDateFormat as jest.Mock).mockReturnValue(true);

    const base = 'USD';
    const usdToJpyRate = 150;

    mockedAxios.get.mockResolvedValue({
      data: {
        rates: {
          USD: 1,
          JPY: usdToJpyRate,
        },
      },
    });

    const result = await getConvertedAmount(base, amount, target, date);

    expect(result).toBe(usdToJpyRate * amount);
    // API呼び出しが1回行われたことを確認
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('存在しない通貨コードが指定された場合 エラーが発生する', async () => {
    const base = 'UXX';

    mockedAxios.get.mockResolvedValue({
      data: {
        rates: {
          GBP: 0.647269,
          JPY: 120.5625,
          USD: 1,
        },
      },
    });

    await expect(
      getConvertedAmount(base, amount, target, date)
    ).rejects.toThrow('Invalid currency code');
  });

  // エラーハンドリングのテスト 3つ
  it('base, target の文字列が3文字でない場合 正しいエラーを返す', async () => {
    await expect(
      getConvertedAmount('US', 100, 'JPY', '2023-01-01')
    ).rejects.toThrow(
      'Invalid currency code format. Expected a 3-letter currency code.'
    );
    await expect(
      getConvertedAmount('USD', 100, 'JP', '2023-01-01')
    ).rejects.toThrow(
      'Invalid currency code format. Expected a 3-letter currency code.'
    );
  });

  it('amount が0以下の場合 正しいエラーを返す', async () => {
    await expect(
      getConvertedAmount('USD', 0, 'JPY', '2023-01-01')
    ).rejects.toThrow('Amount must be greater than 0');
    await expect(
      getConvertedAmount('USD', -100, 'JPY', '2023-01-01')
    ).rejects.toThrow('Amount must be greater than 0');
  });

  //
  it('isValidDateFormat(date) === false の場合 正しいエラーを返す', async () => {
    (dateUtils.isValidDateFormat as jest.Mock).mockReturnValue(false);

    await expect(getConvertedAmount('USD', 100, 'JPY', '202')).rejects.toThrow(
      'Invalid date format. Expected YYYY-MM-DD.'
    );
  });
});
