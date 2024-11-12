const BACKEND_ERRORS = require("./errors");

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.errMessage = message;
  }

  // Метод для формирования JSON-ответа с ошибкой
  toResponseJSON() {
    return {
      status: "error",
      statusCode: this.statusCode,
      message: this.errMessage,
    };
  }

  // Универсальный метод для создания ошибки на основе текста сообщения
  static fromBackendError(message) {
    // Ищем ошибку в BACKEND_ERRORS по совпадению текста message
    const errorDetails = Object.values(BACKEND_ERRORS).find(
      (error) => error.message === message
    );

    // Если ошибка найдена, создаем экземпляр ErrorHandler с её данными
    if (errorDetails) {
      return new ErrorHandler(errorDetails.statusCode, errorDetails.message);
    }

    // Если ошибка не найдена, возвращаем ошибку сервера по умолчанию
    return new ErrorHandler(500, "Unknown error occurred");
  }
}

module.exports = ErrorHandler;
