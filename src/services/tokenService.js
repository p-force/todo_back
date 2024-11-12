/* eslint-disable class-methods-use-this */
const jwt = require("jsonwebtoken");
const { Refresh } = require("../db/models");

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(newUser, refreshToken) {
    const userId = newUser.dataValues.id;

    const [tokenData, created] = await Refresh.findOrCreate({
      where: { userId },
      defaults: { token: refreshToken },
    });

    if (!created) {
      // Обновляем токен, если запись уже существует
      await tokenData.update({ token: refreshToken });
    }

    return tokenData;
  }

  async removeToken(refreshToken) {
    const token = await Refresh.findOne({ where: { token: refreshToken } });
    if (token) {
      await Refresh.destroy({ where: { token: refreshToken } });
    }
  }

  async findToken(refreshToken) {
    const token = await Refresh.findOne({ where: { token: refreshToken } });
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      return userData;
    } catch (err) {
      return null;
    }
  }
}

module.exports = new TokenService();
