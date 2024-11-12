const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      this.hasOne(models.Refresh, {
        foreignKey: "userId",
      });
      this.hasMany(models.Tasks, {
        foreignKey: "userId",
      });
    }
  }
  Users.init(
    {
      email: DataTypes.STRING,
      confirmEmail: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      activationLink: DataTypes.STRING,
      forgotPasswordLink: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
