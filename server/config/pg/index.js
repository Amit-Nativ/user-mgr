import { Pool } from 'pg';

const CONNECTION_STRING = {
    connectionString: process.env.CONN
};

const pool = new Pool({
    ...CONNECTION_STRING,
    statement_timeout: 4000,
    idleTimeoutMillis: 30000,
})

export default pool;