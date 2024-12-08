import React, { useState } from 'react';

// 通貨データ
const currencies = [
  { label: '円', value: 'jpy' },
  { label: 'ドル', value: 'usd' },
  { label: 'ポンド', value: 'gbp' },
  { label: '中国元', value: 'cny' },
  { label: 'ユーロ', value: 'eur' },
  { label: 'ウォン', value: 'krw' },
  { label: '豪ドル', value: 'aud' },
];

// as const とすることでキーも値もリテラル型になる ／ オブジェクトをリテラル型として固定する
// const currencies = {
//   USD: '米ドル',
//   JPY: '日本円',
//   GBP: '英ポンド',
//   CNY: '中国元',
//   EUR: 'ユーロ',
//   KRW: '韓国ウォン',
//   AUD: '豪ドル',
// };

// currencies オブジェクトのキーを表すリテラル型のユニオン型
// ユニオン型： リテラル型と組み合わせて限定的な値を許容できる

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState<string>('gbp');
  const [targetCurrency, setTargetCurrency] = useState<string>('jpy');

  const handleConvert = () => {
    alert(
      `Converting ${amount} from ${baseCurrency.toUpperCase()} to ${targetCurrency.toUpperCase()}`
    );
    // 実際のコンバージョン処理はここで行う
  };

  const swapCurrencies = () => {
    alert('Swapping currencies');
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* 変換元通貨 */}
        <div>
          <label htmlFor="baseCurrency">From</label>
          <select
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            style={{
              padding: '8px',
              fontSize: '16px',
              marginLeft: '5px',
            }}
          >
            {currencies.map((currency) => (
              <option key={currency.value} value={currency.value}>
                {currency.label} - {currency.value.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* 両替アイコン（デザインの簡略化） */}
        <button onClick={swapCurrencies} style={{ margin: '0 10px' }}>
          <span style={{ fontSize: '20px' }}>↔</span>
        </button>

        {/* 変換先通貨 */}
        <div>
          <label htmlFor="targetCurrency">To</label>
          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            style={{
              padding: '8px',
              fontSize: '16px',
              marginLeft: '5px',
            }}
          >
            {currencies.map((currency) => (
              <option key={currency.value} value={currency.value}>
                {currency.label} - {currency.value.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* 金額入力 */}
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            style={{
              padding: '8px',
              fontSize: '16px',
              width: '100px',
              marginLeft: '5px',
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <label htmlFor="date">Choose a date:</label>
          <input
            type="date"
            id="date"
            // value={selectedDate}
            // onChange={handleDateChange}
            style={{
              padding: '8px',
              fontSize: '16px',
              marginLeft: '5px',
            }}
            required
          />
        </div>

        {/* 変換ボタン */}
        <button
          onClick={handleConvert}
          style={{
            padding: '10px 40px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Convert
        </button>
      </div>
    </>
  );
};

export default CurrencyConverter;
