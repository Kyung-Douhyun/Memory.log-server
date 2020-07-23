'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Photo extends Sequelize.Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}
	Photo.init(
		{
			userId: DataTypes.INTEGER,
			filepath: DataTypes.STRING,
			location: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Photo',
		},
	);
	return Photo;
};
