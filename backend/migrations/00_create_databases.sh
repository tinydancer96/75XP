#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	DROP database if EXISTS xp75_dev;
	DROP database if EXISTS xp75_dev;
	CREATE DATABASE xp75_dev;
	CREATE DATABASE xp75_test;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "xp75_dev" -f /docker-entrypoint-initdb.d/01_create_tables.sql
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "xp75_test" -f /docker-entrypoint-initdb.d/01_create_tables.sql
