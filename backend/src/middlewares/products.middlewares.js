const { mapHTTPStatus } = require('../utils/mapStatusHTTP');

const nameExists = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(mapHTTPStatus('BAD_REQUEST')).json({ message: '"name" is required' });
  }
  next();
};

const nameHasCorrectLength = async (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(mapHTTPStatus('INVALID_VALUE'))
    .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = {
  nameExists,
  nameHasCorrectLength,
};