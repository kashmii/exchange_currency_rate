import { FC } from 'react';
import s from '@/components/result/index.module.css';

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
    <div>
      <hr />
      <h3>{exchangeDate + ' '}のレート</h3>
      <div className={s.resultAmount}>
        <span className={s.baseAmount}>{requestedAmount + ' ' + base} = </span>
        {resultAmount.toLocaleString() + ' ' + target}
      </div>
    </div>
  );
};

export default ExchangeResult;
