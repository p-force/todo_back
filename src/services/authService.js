/* eslint-disable class-methods-use-this */
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const { Users } = require("../db/models");
const mailService = require("./mailService");
const tokenService = require("./tokenService");

class AuthService {
  async login(email, password) {
    try {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        throw new Error("Invalid login or password");
      }
      const isPasswordValid = await await bcrypt.compare(
        password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid login or password");
      }
      if (!user.confirmEmail) {
        await mailService.sendActivationMail(
          email,
          `${process.env.API_URL}/auth/activate/${user.activationLink}`
        );

        throw new Error("User not activated, please check your email");
      }
      const userFront = {
        id: user.id,
        email: user.email,
        url: user.activationLink,
      };
      const tokens = await tokenService.generateTokens({ ...userFront });
      await tokenService.saveToken(user, tokens.refreshToken);
      return { ...tokens, userFront };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async register(email, password) {
    try {
      const activationLink = faker.string.uuid();
      const [newUser, createdUser] = await Users.findOrCreate({
        where: { email },
        defaults: {
          email,
          confirmEmail: false,
          password: await bcrypt.hash(password, 10),
          activationLink,
        },
      });
      if (!createdUser) {
        throw new Error("User already exists");
      }
      const userFront = {
        id: newUser.id,
        email: newUser.email,
      };
      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/auth/activate/${activationLink}`
      );
      return { ...userFront };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async activate(activationLink) {
    try {
      const user = await Users.findOne({ where: { activationLink } });
      if (!user) {
        throw new Error("User not found");
      }
      if (user.confirmEmail) {
        // аккаунт уже активирован
        return { alreadyActivated: true };
      }
      const userFront = {
        id: user.id,
        email: user.email,
        password: user.password,
        url: user.activationLink,
      };
      await Users.update(
        { confirmEmail: true },
        { where: { id: user.dataValues.id } }
      );
      const tokens = await tokenService.generateTokens({ ...userFront });
      await tokenService.saveToken(user, tokens.refreshToken);
      return { alreadyActivated: false };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async logout(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error("Invalid refresh token");
      }
      await tokenService.removeToken(refreshToken);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async forgotPassword(email) {
    try {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }
      const forgotPasswordLink = faker.string.uuid();
      await Users.update(
        { forgotPasswordLink },
        { where: { id: user.dataValues.id } }
      );
      await mailService.sendResetPasswordMail(
        email,
        `${process.env.API_URL}/auth/reset-password?token/${forgotPasswordLink}`
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async resetPassword(password, token) {
    try {
      if (!token) {
        throw new Error("Invalid token");
      }
      if (!password) {
        throw new Error("Incorrect data");
      }
      const user = await Users.findOne({
        where: { forgotPasswordLink: token },
      });
      if (!user) {
        throw new Error("User not found");
      }
      await Users.update(
        { password: await bcrypt.hash(password, 10) },
        { where: { id: user.dataValues.id } }
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error("Invalid or missing refresh token");
      }
      const tokens = await tokenService.generateTokens({ refreshToken });
      return tokens;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new AuthService();
