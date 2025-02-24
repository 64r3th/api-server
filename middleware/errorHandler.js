const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Something broke!';
  res.status(status).json({ errorMessage: message });
};

module.exports = errorHandler;