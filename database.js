const pgp = require('pg-promise')()

const pguser = "postgres"
const pgpassword = "yourpassword"
const pghost = "localhost"
const pgport = "5432"

// Preparing the connection details:
//const cn = 'postgres://username:password@host:port/database';
const connection = `postgres://${pguser}:${pgpassword}@${pghost}:${pgport}/todo_database`

const db = pgp(connection)

module.exports = db