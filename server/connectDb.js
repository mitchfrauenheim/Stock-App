import mysql from 'mysql2';

async function connectDb(file) {
    const db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(`INFO : ${file}: Database connection established.`);
            resolve(connection);
        })
    })
}

export default connectDb;