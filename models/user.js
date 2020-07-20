'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Sequelize.Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.User.hasMany(models.Photo);
		}
	}
	User.init(
		{
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		},
	);
	return User;
};

// 'use strict';

// module.exports = (sequelize, DataTypes) => {
// 	const User = sequelize.define(
// 		'User',
// 		{
// 			username: DataTypes.STRING,
// 			email: DataTypes.STRING,
// 			password: DataTypes.STRING,
// 		},
// 		{
// 			charset: 'utf8',
// 			collate: 'utf8_unicode_ci',
// 		},
// 	);

// 	User.associate = function (models) {
// 		models.User.hasMany(models.Photo);
// 	};

// 	return User;
// };
