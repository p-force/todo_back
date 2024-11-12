const ErrorHandler = require("../exeptions/errorHandler");
const taskService = require("../services/taskService");

/* eslint-disable class-methods-use-this */
class TaskController {
  async getAll(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        const err = ErrorHandler.fromBackendError("Unauthorized error");
        return res.status(err.statusCode).json(err.toResponseJSON());
      }
      const data = await taskService.getAll(refreshToken);
      return res.json(data);
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }

  async newTask(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { title } = req.body;
      if (!refreshToken) {
        const err = ErrorHandler.fromBackendError("Unauthorized error");
        return res.status(err.statusCode).json(err.toResponseJSON());
      }
      await taskService.newTask(refreshToken, title);
      return res.status(200).json({ message: "Task created successfully" });
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }

  async updateTask(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { id } = req.params;
      const { title, status } = req.body;
      if (!refreshToken) {
        const err = ErrorHandler.fromBackendError("Unauthorized error");
        return res.status(err.statusCode).json(err.toResponseJSON());
      }
      await taskService.updateTask(refreshToken, id, title, status);
      return res.status(200).json({ message: "Task successfully updated" });
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }

  async deleteTask(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { id } = req.params;
      if (!refreshToken) {
        const err = ErrorHandler.fromBackendError("Unauthorized error");
        return res.status(err.statusCode).json(err.toResponseJSON());
      }
      await taskService.deleteTask(refreshToken, id);
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      const err = ErrorHandler.fromBackendError(error.message);
      return res.status(err.statusCode).json(err.toResponseJSON());
    }
  }
}

module.exports = new TaskController();
