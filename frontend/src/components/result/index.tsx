import { FC } from 'react';
import './index.css';

type props = {
  resultAmount: string;
  requestedAmount: string;
  baseCurrency: string;
  targetCurrency: string;
  exchangeDate: string;
};

const ExchangeResult: FC<props> = ({
  requestedAmount,
  resultAmount,
  baseCurrency,
  targetCurrency,
  exchangeDate,
}) => {
  return (
    <div className="result">
      <hr />
      <h3>{exchangeDate + ' '}のレート</h3>
      <div className="result-amount">
        <span className="base-amount">
          {requestedAmount + ' ' + baseCurrency} ={' '}
        </span>
        {resultAmount.toLocaleString() + ' ' + targetCurrency}
      </div>
    </div>
  );
};

export default ExchangeResult;
