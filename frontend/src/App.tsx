import '@/App.css';
import ExchangeForm from '@/components/form';
import ExchangeResult from '@/components/result';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState<string>('gbp');
  const [targetCurrency, setTargetCurrency] = useState<string>('jpy');
  const [selectedDate, setSelectedDate] = useState<string>('');
  // 仮の変数
  const [resultAmount, setResultAmount] = useState<number | undefined>(
    undefined
  );

  return (
    <>
      <h1 className="app-title">過去レート計算ツール</h1>
      <ExchangeForm
        amount={amount}
        setAmount={setAmount}
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        targetCurrency={targetCurrency}
        setTargetCurrency={setTargetCurrency}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setResultAmount={setResultAmount}
      />

      {/* TODO: resultAmount があれば表示するようにする */}
      <ExchangeResult
        resultAmount={resultAmount}
        baseCurrency={baseCurrency}
        targetCurrency={targetCurrency}
        exchangeDate={selectedDate}
      />
    </>
  );
}

export default App;
