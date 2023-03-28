import mysql from 'mysql2';
import dotenv from 'dotenv';

import connectDb from './connectDb.js';

dotenv.config();

async function updateUserCapital() {
    let connection;
    try {
        connection = await connectDb('updateUserCapital.js');

        const q = `UPDATE users
        SET capital = cash + (
         SELECT SUM(shares * current_val)
         FROM stocks
         WHERE stocks.user_id = users.id
        )`;

        return new Promise((resolve, reject) => {
            connection.query(q, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('\x1b[32m%s\x1b[0m', 'SUCCESS', `: User capital successfully updated in ${process.env.DB_NAME} database.`)
                resolve(data);
            })
        })
    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    } {
        if (connection) {
            connection.release();
            console.log('INFO : updateUserCapital.js: Database connection manually released.');
        } else {
            console.log('INFO : updateUserCapital.js: Database connection automatically released.');
        }
    }
}

// updateUserCapital();

export default updateUserCapital;