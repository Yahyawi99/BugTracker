const progress = (startDate, endDate) => {
  const startDateMs = new Date(startDate).getTime();
  const endDateMs = new Date(endDate).getTime();

  const currentTime = new Date().getTime();

  if (currentTime > endDate) {
    return 100;
  }

  const totalDuration = endDateMs - startDateMs;
  const elapsedTime = currentTime - startDateMs;

  return Math.floor((elapsedTime / totalDuration) * 100) < 0
    ? 0
    : Math.floor((elapsedTime / totalDuration) * 100);
};

export default progress;
