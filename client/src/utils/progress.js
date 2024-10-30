const progress = (startDate, endDate) => {
  const startDateMs = new Date(startDate).getTime();
  const endDateMs = new Date(endDate).getTime();

  const currentTime = new Date().getTime();

<<<<<<< HEAD
  if (currentTime > endDate) {
=======
  if (currentTime > endDateMs) {
>>>>>>> master
    return 100;
  }

  const totalDuration = endDateMs - startDateMs;
  const elapsedTime = Math.abs(currentTime - startDateMs);

<<<<<<< HEAD
  return Math.floor((elapsedTime / totalDuration) * 100) < 0
    ? 0
    : Math.floor((elapsedTime / totalDuration) * 100);
=======
  return Math.floor((elapsedTime / totalDuration) * 100);
>>>>>>> master
};

export default progress;
