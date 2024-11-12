/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

const path = require("path");
const authService = require("../services/authService");
const ErrorHandler = require("../exeptions/errorHandler");

console.log(`${path.resolve()}/public/viewError.html`);
const alreadyActive = `${path.resolve()}/public/viewError.html`;
const activated = `${path.resolve()}/public/viewError.html`;

class AuthController {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await authService.register(email, password);
      return res.status(200).json({ ...userData });
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);

      // Если сообщение ошибки не соответствует ни одному в BACKEND_ERRORS,
      // будет возвращена ошибка сервера по умолчанию.
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login(email, password);
      return res.status(200).json({ ...userData });
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }

  async activate(req, res) {
    try {
      const { link } = req.params;
      const resp = await authService.activate(link);
      if (resp.alreadyActivated) {
        res.status(409).sendFile(alreadyActive);
      } else {
        res.status(200).sendFile(activated);
      }
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      return res
        .status(200)
        .json({ message: "Password reset link has been sent to your email" });
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }

  async resetPassword(req, res) {
    try {
      const { password } = req.body;
      const { token } = req.params;
      await authService.resetPassword(password, token);
      return res.status(200);
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const resp = await authService.refresh(refreshToken);
      if (resp.accessToken) {
        res.cookie("accessToken", resp.accessToken);
      }
      if (resp.refreshToken) {
        res.cookie("refreshToken", resp.refreshToken);
      }
      return res.status(200).json({ accessToken: resp.accessToken });
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }
}

module.exports = new AuthController();
