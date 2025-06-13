
import { getGoal, updateGoal, deleteGoal } from './_db';

export default function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'GET') {
    const goal = getGoal(id);
    goal ? res.status(200).json(goal) : res.status(404).end();
  } else if (req.method === 'PUT') {
    const updated = updateGoal(id, req.body);
    updated ? res.status(200).json(updated) : res.status(404).end();
  } else if (req.method === 'DELETE') {
    const success = deleteGoal(id);
    success ? res.status(204).end() : res.status(404).end();
  } else {
    res.status(405).end();
  }
}
