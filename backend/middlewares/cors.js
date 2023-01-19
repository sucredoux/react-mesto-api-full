const allowedCors = [
  'http://sucredoux.nomoredomains.club',
  'http://api.sucredoux.nomoredomains.club',
  'localhost:3000',
  'localhost:3001',
];

const corsHandler = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
  const requestHeaders = req.headers['Access-Control-Request-Headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }

  next();
};

module.exports = corsHandler;
