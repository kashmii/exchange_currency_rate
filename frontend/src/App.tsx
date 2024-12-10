import '@/App.css';
import ExchangeForm from '@/components/form';
import ExchangeResult from '@/components/result';
import { useState } from 'react';

export type ExchangeResultData = {
  requestedAmount: number;
  resultAmount: number;
  base: string;
  target: string;
  exchangeDate: string;
};

function App() {
  const today = new Date();
  const initialDate = today.toISOString().slice(0, 10);

  const [sourceAmount, setSourceAmount] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState<string>('JPY');
  const [targetCurrency, setTargetCurrency] = useState<string>('USD');
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [resultAmount, setResultAmount] = useState<number | undefined>();

  const [exchangeResult, setExchangeResult] = useState<
    ExchangeResultData | undefined
  >();

  return (
    <>
      <h1 className="app-title">過去レート計算ツール</h1>

      <ExchangeForm
        today={today}
        sourceAmount={sourceAmount}
        setSourceAmount={setSourceAmount}
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        targetCurrency={targetCurrency}
        setTargetCurrency={setTargetCurrency}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setResultAmount={setResultAmount}
        setExchangeResult={setExchangeResult}
      />

      {resultAmount && <ExchangeResult {...exchangeResult} />}
    </>
  );
}

export default App;
