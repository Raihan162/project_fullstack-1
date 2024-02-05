'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class majors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.users, {
        foreignKey: 'major_id'
      }),
        this.hasMany(models.courses, {
          foreignKey: 'major_id'
        })
    }
  }
  majors.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'majors',
  });
  return majors;
};