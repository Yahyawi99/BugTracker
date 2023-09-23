const progress = (endDate) => {
  const endDateMs = new Date(endDate).getTime();
  const currentDate = new Date().getTime();

  return (currentDate * 100) / endDateMs;
};

export default progress;
