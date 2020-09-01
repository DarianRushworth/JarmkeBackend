module.exports = {
  "development": {
    "url": "postgres://lsxxpsuv:rZ-aEuqCZaVYGQqJrD4uAQ127JuouQGZ@kandula.db.elephantsql.com:5432/lsxxpsuv",
    "dialect": "postgres",
    "operatorsAliases": "0"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "pg"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "pg"
  }
}
