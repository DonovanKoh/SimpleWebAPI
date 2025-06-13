
import { getGoals, addGoal } from './_db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(getGoals());
  } else if (req.method === 'POST') {
    const goal = addGoal(req.body);
    res.status(201).json(goal);
  } else {
    res.status(405).end();
  }
}
