let goals = [];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Return all financial goals
      res.status(200).json(goals);
      break;

    case 'POST':
      // Add a new financial goal
      const { principal, rate, years, timesPerYear, goalName } = req.body;
      if ([principal, rate, years, timesPerYear, goalName].some(v => v == null)) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const amount = principal * Math.pow((1 + rate / timesPerYear), timesPerYear * years);
      const newGoal = {
        id: Date.now().toString(),
        goalName,
        principal,
        rate,
        years,
        timesPerYear,
        amount: parseFloat(amount.toFixed(2))
      };
      goals.push(newGoal);
      res.status(201).json(newGoal);
      break;

    case 'PUT':
      // Update an existing financial goal
      const { id, updates } = req.body;
      const indexToUpdate = goals.findIndex(goal => goal.id === id);
      if (indexToUpdate === -1) {
        return res.status(404).json({ error: 'Goal not found' });
      }
      goals[indexToUpdate] = { ...goals[indexToUpdate], ...updates };
      res.status(200).json(goals[indexToUpdate]);
      break;

    case 'DELETE':
      // Delete a financial goal
      const { goalId } = req.body;
      const indexToDelete = goals.findIndex(goal => goal.id === goalId);
      if (indexToDelete === -1) {
        return res.status(404).json({ error: 'Goal not found' });
      }
      const deletedGoal = goals.splice(indexToDelete, 1)[0];
      res.status(200).json({ message: 'Deleted', goal: deletedGoal });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
