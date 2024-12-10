import '@/App.css';
import ExchangeForm from '@/components/form';
import ExchangeResult from '@/components/result';
import { useState } from 'react';

function App() {
  const today = new Date();

  const [sourceAmount, setSourceAmount] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState<string>('JPY');
  const [targetCurrency, setTargetCurrency] = useState<string>('USD');
  const [selectedDate, setSelectedDate] = useState<string>(
    today.toISOString().slice(0, 10)
  );
  const [resultAmount, setResultAmount] = useState<number | undefined>(
    undefined
  );

  return (
    <>
      <h1 className="app-title">過去レート計算ツール</h1>
      <ExchangeForm
        sourceAmount={sourceAmount}
        setSourceAmount={setSourceAmount}
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        targetCurrency={targetCurrency}
        setTargetCurrency={setTargetCurrency}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setResultAmount={setResultAmount}
      />

      {resultAmount && (
        <ExchangeResult
          sourceAmount={sourceAmount}
          resultAmount={resultAmount}
          baseCurrency={baseCurrency}
          targetCurrency={targetCurrency}
          exchangeDate={selectedDate}
        />
      )}
    </>
  );
}

export default App;
