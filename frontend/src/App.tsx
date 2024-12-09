import '@/App.css';
import ExchangeForm from '@/components/form';
import ExchangeResult from '@/components/result';
import { useState } from 'react';

function App() {
  // useState 変数作ってresultで使う
  const [amount, setAmount] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState<string>('gbp');
  const [targetCurrency, setTargetCurrency] = useState<string>('jpy');

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
      />

      {/* result があれば表示する */}
      <ExchangeResult />
    </>
  );
}

export default App;
