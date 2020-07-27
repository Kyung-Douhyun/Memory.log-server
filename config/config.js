module.exports = {
	development: {
		username: 'root',
		password: process.env.PASSWORD,
		database: 'memorylog',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	production: {
		username: 'root',
		password: process.env.DEPLOY_PASSWORD,
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
};

// export PASSWORD=y
// export AWS_ID=AKIAIHBVH33423523LWQ
// export AWS_KEY=dIf2oAEDssHqe5L8vOal74XH/rMECtK7E2KpFEVD
