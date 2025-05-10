const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/financial-goal', (req, res) => {
  const { goalAmount, years, interestRate } = req.body;

  if (!goalAmount || !years || !interestRate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const n = 12; // compounding monthly
  const r = (interestRate / 100) / n;
  const nt = n * years;

  const monthlySavings = goalAmount * r / (Math.pow(1 + r, nt) - 1);

  res.json({
    monthlySavings: parseFloat(monthlySavings.toFixed(2))
  });
});

app.listen(port, () => {
  console.log(`Financial goal API running at http://localhost:${port}`);
});
