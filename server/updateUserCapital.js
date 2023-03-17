import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

// async function getStockTotals(users) {
//     const q = `SELECT user_id, SUM(shares * current_val) AS stocks_value, users.cash
//                FROM stocks
//                JOIN users ON stocks.user_id = users.id
//                GROUP BY stocks.user_id`;

//     return new Promise((resolve, reject) => {
//         db.query(q, (err, data) => {
//             if (err) {
//                 reject(err);
//             }
//             console.log(`INFO : stock vals retrieved from ${process.env.DB_NAME} database.`);
//             resolve(data);
//         })
//     })
// }

// async function setUserCapital() {
//     const q = `UPDATE users
//                SET capital = cash + (
//                 SELECT SUM(shares * current_val)
//                 FROM stocks
//                 WHERE stocks.user_id = users.id
//                )`;

//     return new Promise((resolve, reject) => {
//         db.query(q, (err, data) => {
//             if (err) {
//                 reject(err);
//             }
//             console.log("succeeded")
//             resolve(data);
//         })
//     })
// }

async function updateUserCapital() {
    try {
        const q = `UPDATE users
        SET capital = cash + (
         SELECT SUM(shares * current_val)
         FROM stocks
         WHERE stocks.user_id = users.id
        )`;

        return new Promise((resolve, reject) => {
            db.query(q, (err, data) => {
                if (err) {
                    reject(err);
                }
                console.log('\x1b[32m%s\x1b[0m', 'SUCCESS', `: User capital successfully updated in ${process.env.DB_NAME} database.`)
                resolve(data);
            })
        })
    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    }
}

// updateUserCapital();

export default updateUserCapital;