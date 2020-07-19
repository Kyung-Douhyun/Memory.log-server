module.export = {
	"development": {
		"username": "root",
		"password": process.env.PASSWORD,
		"database": "memorylog",
		"host": "127.0.0.1",
		"dialect": "mysql"
	},
	"production": {
		"username": "root",
		"password": process.env.DEPLOY_PASSWORD,
		"database": "database_production",
		"host": "127.0.0.1",
		"dialect": "mysql"
	}
}
;