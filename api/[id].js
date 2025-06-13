let goals = [];

export default function handler(req, res) {
  const { id } = req.query;
  const goalId = parseInt(id);
  const index = goals.findIndex(g => g.id === goalId);

  if (index === -1) {
    return res.status(404).json({ error: 'Goal not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(goals[index]);
  }

  if (req.method === 'PUT') {
    goals[index] = { id: goalId, ...req.body };
    return res.status(200).json(goals[index]);
  }

  if (req.method === 'DELETE') {
    goals.splice(index, 1);
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
