module.exports = {
	development: {
		username: 'sdavies',
		password: null,
		database: 'grocery_store_mapper',
		host: '127.0.0.1',
		port: 5432,
		dialect: 'postgres',
		define: {
			underscored: true
		}
	},
	testing: {
		username: 'database_test',
		password: null,
		database: 'database_test',
		host: '127.0.0.1',
		port: 5432,
		dialect: 'postgres',
		define: {
			underscored: true
		}
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		port: 5432,
		dialect: 'postgres',
		ssl: true,
		dialectOptions: {
			ssl: true
		},
		define: {
			underscored: true
		}
	}
};
