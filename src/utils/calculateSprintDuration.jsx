function calculateSprintDuration(sprint) {
  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  return (endDate - startDate) / (1000 * 60 * 60 * 24);
}

export default calculateSprintDuration;
