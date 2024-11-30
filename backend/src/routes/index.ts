import { Router } from 'express';
import { getConvertedAmount } from '../services/rates';

const router = Router();

// request 時には header に Content-Type: application/json を含めること
router.post('/convert', async (req, res: any) => {
  const { base, amount, target, date } = req.body;
  console.log('req.body', req.body);

  if (!base || !amount || !target) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const convertedAmount = await getConvertedAmount(
      base,
      amount,
      target,
      date
    );
    res.json({ base, amount, target, convertedAmount });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

// POST メソッドはリクエストボディにデータを含めることが一般的
// GET メソッドでは通常、クエリパラメータ（URLに含める形式）を使うべきとされている
