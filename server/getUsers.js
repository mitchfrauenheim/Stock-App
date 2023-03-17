import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

async function getUsers() {
    try {
        const q = "SELECT * FROM users";

        return new Promise((resolve, reject) => {
            db.query(q, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                data.sort((a, b) => a.capital - b.capital);
                resolve(data);
            })
        })
    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    }
}

export default getUsers;