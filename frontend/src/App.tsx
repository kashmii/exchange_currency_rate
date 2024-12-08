import '@/App.css';
import CurrencyConverter from '@/components/form';

function App() {
  const today = new Date();
  return (
    <>
      <h1 className="app-title">過去レート計算ツール</h1>
      <CurrencyConverter />
      <p className="period-notice">
        指定可能期間: 1999-01-01 〜 {today.toISOString().slice(0, 10)}
      </p>
      {/* result があれば表示する */}
    </>
  );
}

export default App;
