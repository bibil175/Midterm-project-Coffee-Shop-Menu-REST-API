const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const requireAuth = (req, res, next) => {
  if (req.headers['x-auth-token'] !== 'kopi123') {
    return res.status(401).json({ error: 'Unauthorized: token salah atau tidak ada' });
  }
  next();
};


const notFound = (req, res) => {
  res.status(404).json({ error: `URL ${req.originalUrl} tidak ditemukan` });
};


const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
};

module.exports = { logger, requireAuth, notFound, errorHandler };