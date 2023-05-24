import {
	IServerConfig,
	IDatabaseConfig,
	IConfig
} from '../src/types/interfaces'

export default {
	server: <IServerConfig>{
		port: 3001,
		domain: process.env.DOMAIN || 'http://localhost:3001',
		logDirectory: 'logs'
	},
	database: <IDatabaseConfig>{
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 5432,
		name: process.env.DB_NAME,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS
	}
} as IConfig
