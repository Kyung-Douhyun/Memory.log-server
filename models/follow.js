'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Follow extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// models.Follow.hasMany(models.User);
			// models.User.belongsTo(models.Follow);
		}
	}
	Follow.init(
		{
			userId: DataTypes.INTEGER,
			followId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Follow',
		},
	);
	return Follow;
};
