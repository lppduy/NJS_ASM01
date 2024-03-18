const paginate = (array, pageNumber, pageSize) => {
  const start = (pageNumber - 1) * pageSize;
  return array.slice(start, start + pageSize);
};

module.exports = {
  paginate,
};