const formatDate = (date, options) => {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

export default formatDate;
