import mysql, { format } from 'mysql2';
import dotenv from 'dotenv';

import formatUserStocks from './formatUserStocks.js';
import connectDb from './connectDb.js';

dotenv.config();

async function getUsers() {
    let connection;
    try {
        connection = await connectDb('getUsers.js');
        const q = `SELECT u.id, u.name, u.capital, u.cash, GROUP_CONCAT(CONCAT(s.symbol, ':', s.current_val, ':', s.shares) SEPARATOR ', ') as stocks
                   FROM users u
                   JOIN stocks s on u.id = s.user_id
                   GROUP BY u.id`;

        return new Promise((resolve, reject) => {
            connection.query(q, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                data.sort((a, b) => b.capital - a.capital);
                data = formatUserStocks(data);
                // console.log(data[1].stocks[0])
                resolve(data);
            })
        })
    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    } {
        if (connection) {
            connection.release();
            console.log('INFO : getUsers.js: Database connection manually released.');
        } else {
            console.log('INFO : getUsers.js: Database connection automatically released.');
        }
    }
}

// getUsers();

export default getUsers;