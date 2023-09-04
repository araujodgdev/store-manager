const httpStatusMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
  CONFLICT: 409,
};

const mapHTTPStatus = (status) => httpStatusMap[status] || 500;

module.exports = {
  mapHTTPStatus,
};