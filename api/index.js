let goals = [];
let currentId = 1;

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(goals);
  }

  if (req.method === 'POST') {
    const newGoal = { id: currentId++, ...req.body };
    goals.push(newGoal);
    return res.status(201).json(newGoal);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
