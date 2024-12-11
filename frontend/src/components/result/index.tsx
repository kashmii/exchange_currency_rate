import { FC } from 'react';
import './index.css';

type props = {
  resultAmount: string;
  requestedAmount: string;
  base: string;
  target: string;
  exchangeDate: string;
};

const ExchangeResult: FC<props> = ({
  requestedAmount,
  resultAmount,
  base,
  target,
  exchangeDate,
}) => {
  return (
    <div className="result">
      <hr />
      <h3>{exchangeDate + ' '}のレート</h3>
      <div className="result-amount">
        <span className="base-amount">{requestedAmount + ' ' + base} = </span>
        {resultAmount.toLocaleString() + ' ' + target}
      </div>
    </div>
  );
};

export default ExchangeResult;
