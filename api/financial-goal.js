export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { goalAmount, years, interestRate } = req.body;

  if (!goalAmount || !years || !interestRate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const n = 12;
  const r = (interestRate / 100) / n;
  const nt = n * years;

  const monthlySavings = goalAmount * r / (Math.pow(1 + r, nt) - 1);

  res.status(200).json({ monthlySavings: parseFloat(monthlySavings.toFixed(2)) });
}
