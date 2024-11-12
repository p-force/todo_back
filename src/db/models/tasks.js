const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Tasks.init({
    title: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};
