const BACKEND_ERRORS = {
  INVALID_CREDENTIALS: {
    message: "Invalid credentials",
    statusCode: 401,
  },
  USER_NOT_FOUND: {
    message: "User not found",
    statusCode: 404,
  },
  USER_ALREADY_EXISTS: {
    message: "User already exists",
    statusCode: 409,
  },
  INVALID_TOKEN: {
    message: "Invalid token",
    statusCode: 401,
  },
  TOKEN_EXPIRED: {
    message: "Token expired",
    statusCode: 401,
  },
  INVALID_REFRESH_TOKEN: {
    message: "Invalid or missing refresh token",
    statusCode: 401,
  },
  INVALID_LOGIN_OR_PASSWORD: {
    message: "Invalid login or password",
    statusCode: 400,
  },
  INVALID_USERNAME: {
    message: "Invalid username",
    statusCode: 400,
  },
  VALIDATION_ERROR: {
    message: "Validation error",
    statusCode: 422,
  },
  UNAUTHORIZED_ERROR: {
    message: "Unauthorized error",
    statusCode: 401,
  },
  USER_ALREADY_ACTIVATED: {
    message: "User already activated",
    statusCode: 409,
  },
  ACTIVATION_LINK_INVALID: {
    message: "Activation link is invalid",
    statusCode: 400,
  },
  USER_NOT_ACTIVATED: {
    message: "User not activated, please check your email",
    statusCode: 403,
  },
  NOT_FOUND: {
    message: "Not found",
    statusCode: 404,
  },
  INTERNAL_SERVER_ERROR: {
    message: "Internal server error",
    statusCode: 500,
  },
  DATABASE_ERROR: {
    message: "Database error",
    statusCode: 500,
  },
  INCORRECT_DATA: {
    message: "Incorrect data",
    statusCode: 400,
  },
};

module.exports = BACKEND_ERRORS;
