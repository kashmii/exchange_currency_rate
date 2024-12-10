import '@/App.css';
import ExchangeForm from '@/components/form';
import ExchangeResult from '@/components/result';
import { useState } from 'react';

function App() {
  const today = new Date();
  const initialDate = today.toISOString().slice(0, 10);

  const [sourceAmount, setSourceAmount] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState<string>('JPY');
  const [targetCurrency, setTargetCurrency] = useState<string>('USD');
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [resultAmount, setResultAmount] = useState<number | undefined>();
  const [requestedAmount, setRequestedAmount] = useState<number | undefined>();

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
        setRequestedAmount={setRequestedAmount}
      />

      {resultAmount && (
        <ExchangeResult
          requestedAmount={requestedAmount}
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
