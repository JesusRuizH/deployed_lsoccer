import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: process.env.DB_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT
});


export {pool};