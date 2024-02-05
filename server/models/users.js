'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.registrations, {
        foreignKey: 'users_id'
      }),
        this.hasMany(models.courses, {
          foreignKey: 'users_id'
        }),
        this.belongsTo(models.majors, {
          foreignKey: 'major_id'
        })
    }
  }
  users.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: DataTypes.STRING,
    contact: DataTypes.STRING,
    major_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    is_student: DataTypes.BOOLEAN,
    date_in: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};