import axios from 'axios';
import s from '@/components/form/index.module.css';
import React, { useEffect, useState } from 'react';

const URL = 'http://localhost:3001/api/convert';

// 通貨データ
// as const とすることでキーも値もリテラル型になる ／ オブジェクトをリテラル型として固定する
const currencies = {
  JPY: '日本円',
  USD: '米ドル',
  EUR: 'ユーロ',
  GBP: '英ポンド',
  CNY: '中国元',
  AUD: '豪ドル',
  KRW: '韓国ウォン',
} as const;

// currencies オブジェクトのキーを表すリテラル型のユニオン型
// ユニオン型： リテラル型と組み合わせて限定的な値を許容できる

type props = {
  today: Date;
  sourceAmount: string;
  setSourceAmount: (sourceAmount: string) => void;
  baseCurrency: string;
  setBaseCurrency: (baseCurrency: string) => void;
  targetCurrency: string;
  setTargetCurrency: (targetCurrency: string) => void;
  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;
  setResultAmount: (resultAmount: number | undefined) => void;
  setExchangeResult: (exchangeResult: ExchangeResultData) => void;
};

const ExchangeForm: React.FC<props> = ({
  today,
  sourceAmount,
  setSourceAmount,
  baseCurrency,
  setBaseCurrency,
  targetCurrency,
  setTargetCurrency,
  selectedDate,
  setSelectedDate,
  setResultAmount,
  setExchangeResult,
}) => {
  const handleConvert = async () => {
    try {
      const response = await axios.post(URL, {
        base: baseCurrency,
        target: targetCurrency,
        amount: sourceAmount,
        date: selectedDate,
      });

      const { base, amount, target, convertedAmount } = response.data;

      setResultAmount(response.data.convertedAmount);
      setExchangeResult({
        requestedAmount: amount,
        resultAmount: convertedAmount,
        base,
        target,
        exchangeDate: selectedDate,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [isOutOfTerm, setIsOutOfTerm] = useState<boolean>(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    const selected = new Date(selectedDate);
    setIsOutOfTerm(selected > today || selected < new Date('1999-01-01'));
  }, [selectedDate, today]);

  const swapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  return (
    <>
      <div className={s.currencyRow}>
        {/* 変換元通貨 */}
        <div>
          <label htmlFor="baseCurrency">From</label>
          <select
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className={s.currencySelect}
          >
            {Object.entries(currencies).map(([key, value]) => (
              <option key={key} value={key}>
                {value} - {key}
              </option>
            ))}
          </select>
        </div>

        {/* 両替アイコン（デザインの簡略化） */}
        <button onClick={swapCurrencies} className={s.swapButton}>
          <span>↔</span>
        </button>

        {/* 変換先通貨 */}
        <div>
          <label htmlFor="targetCurrency">To</label>
          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            className={s.currencySelect}
          >
            {Object.entries(currencies).map(([key, value]) => (
              <option key={key} value={key}>
                {value} - {key}
              </option>
            ))}
          </select>
        </div>

        {/* 金額入力 */}
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            value={sourceAmount}
            onChange={(e) => setSourceAmount(e.target.value)}
            className={s.amountInput}
          />
        </div>
      </div>

      <div className={s.dayAndButtonRow}>
        <div>
          <label htmlFor="date">日付: </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            className={s.dateSelect}
            onChange={handleDateChange}
            required
          />
        </div>

        {/* 変換ボタン */}
        <button
          disabled={isOutOfTerm}
          onClick={handleConvert}
          className={s.convertButton}
          style={{
            backgroundColor: isOutOfTerm ? '#ccc' : '#007bff',
            cursor: isOutOfTerm ? 'not-allowed' : 'pointer',
          }}
        >
          Convert
        </button>
      </div>
      <p
        className="period-notice"
        style={{ color: isOutOfTerm ? 'red' : '#888' }}
      >
        指定可能期間: 1999-01-01 - {today.toISOString().slice(0, 10)}
      </p>
    </>
  );
};

export default ExchangeForm;
