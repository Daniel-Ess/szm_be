# Simple HTTP REST API

Steps to run this project:

1. Run `npm i` command.
2. Create PostgreSQL database and user with all privileges. Set environment variables in `.env` file as described below. Steps to create database and user with all privileges are described below.
3. Run `npm start` command.
4. API documentation can be found in `doc` folders.

Steps to create database and user with all privileges on PostgreSQL 15+:
1. CREATE DATABASE szmdb;
2. CREATE USER szmdb WITH PASSWORD 'szmdb';
3. GRANT ALL ON szmdb TO szmdb;
4. ALTER DATABASE szmdb OWNER to szmdb;


### ENV variables

#### NODE_ENV       			| Required    | development / test / production
#### DB_USER           			| Required    | PostgreSQL database username
#### DB_NAME           			| Required    | PostgreSQL database name
#### DB_PASS           			| Required    | PostgreSQL database password
#### DB_HOST           			| Optional    | PostgreSQL database host (default: localhost)
#### DB_PORT           			| Optional    | PostgreSQL database port (default: 5432)
#### DOMAIN           			| Optional    | Domain name for this application. (default: http://localhost:3001)
