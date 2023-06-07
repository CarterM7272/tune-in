const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Youtube_accounts extends Model {

}

Youtube_accounts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    youtube_accounts_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'youtube_accounts',
  }
);

module.exports = Youtube_accounts;