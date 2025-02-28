const progress = (startDate, endDate) => {
  const startDateMs = new Date(startDate).getTime();
  const endDateMs = new Date(endDate).getTime();

  const currentTime = new Date().getTime();

  if (currentTime > endDateMs) {
    return 100;
  }

  const totalDuration = endDateMs - startDateMs;
  const elapsedTime = Math.abs(currentTime - startDateMs);

  return Math.floor((elapsedTime / totalDuration) * 100);
};

export default progress;
