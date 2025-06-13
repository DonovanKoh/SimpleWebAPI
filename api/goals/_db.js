
let goals = [];
let currentId = 1;

export function getGoals() {
  return goals;
}

export function getGoal(id) {
  return goals.find(g => g.id === id);
}

export function addGoal(goal) {
  const newGoal = { id: currentId++, ...goal };
  goals.push(newGoal);
  return newGoal;
}

export function updateGoal(id, updates) {
  const index = goals.findIndex(g => g.id === id);
  if (index === -1) return null;
  goals[index] = { ...goals[index], ...updates };
  return goals[index];
}

export function deleteGoal(id) {
  const index = goals.findIndex(g => g.id === id);
  if (index === -1) return false;
  goals.splice(index, 1);
  return true;
}
