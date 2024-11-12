const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Refresh extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Refresh.init({
    token: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Refresh',
  });
  return Refresh;
};
