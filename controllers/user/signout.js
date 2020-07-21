const { User } = require('../../models/');
//const redis = require('redis');
const JWTR = require('jwt-redis').default;

module.exports = {
	get: (req, res) => {
		JWTR.destroy(token);
		console.log('destroyed');
	},
};
