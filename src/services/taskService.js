/* eslint-disable class-methods-use-this */
const { Refresh, Tasks } = require("../db/models");

class TaskService {
  async getAll(refreshToken) {
    try {
      const user = await Refresh.findOne({ where: { token: refreshToken } });
      if (!user) throw new Error("Invalid or missing refresh token");

      const tasks = await Tasks.findAll({
        where: { userId: user.userId },
        attributes: ["id", "title", "status", "createdAt"],
        order: [["id", "ASC"]],
      });

      return tasks.map(({ id, title, status, createdAt }) => ({
        id,
        title,
        status,
        createdAt,
      }));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async newTask(refreshToken, title) {
    try {
      const user = await Refresh.findOne({ where: { token: refreshToken } });
      if (!user) {
        throw new Error("Invalid or missing refresh token");
      }
      await Tasks.create({
        title,
        userId: user.userId,
        status: false,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateTask(refreshToken, id, title, status) {
    try {
      const user = await Refresh.findOne({ where: { token: refreshToken } });
      if (!user) throw new Error("Invalid or missing refresh token");

      const task = await Tasks.findOne({ where: { id } });
      if (!task || task.userId !== user.userId) throw new Error("Not found");

      await task.update({
        title: title || task.title,
        status: status || task.status,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteTask(refreshToken, id) {
    try {
      const user = await Refresh.findOne({ where: { token: refreshToken } });
      if (!user) {
        throw new Error("Invalid or missing refresh token");
      }

      const task = await Tasks.findOne({ where: { id, userId: user.userId } });
      if (!task) {
        throw new Error("Not found");
      }

      await task.destroy();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new TaskService();
