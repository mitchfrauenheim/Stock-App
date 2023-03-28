import dotenv from 'dotenv';

import connectDb from './connectDb.js';
// import add_users.js from './startup_scripts/add_users.js'

dotenv.config();


async function addTable(connection, q, tableName) {
    try {
        await new Promise((resolve, reject) => {
            connection.query(q, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(`INFO : Table '${tableName}' created in database ${process.env.DB_NAME}`)
            })
        });
    } catch (err) {
        console.log(`INFO : Table '${tableName}' already exists and was not created.`);
        // throw err;
    }
}

async function createTables() {
    let connection;
    try {
        connection = await connectDb('createTables.js');

        let q = `CREATE TABLE users (
                    id int NOT NULL AUTO_INCREMENT,
                    name varchar(45) NOT NULL,
                    capital decimal(8,2) DEFAULT NULL,
                    cash decimal(10,2) DEFAULT NULL,
                    PRIMARY KEY (id)
                 ) ENGINE='InnoDB' AUTO_INCREMENT=11 DEFAULT CHARSET='utf8mb4' COLLATE='utf8mb4_0900_ai_ci';`;
        await addTable(connection, q, 'users');

        q = `CREATE TABLE stocks (
                id int NOT NULL AUTO_INCREMENT,
                symbol varchar(6) NOT NULL,
                full_name varchar(45) NOT NULL,
                exchange varchar(45) NOT NULL,
                current_val decimal(10,2) DEFAULT NULL,
                purchase_val decimal(10,2) DEFAULT NULL,
                shares int DEFAULT NULL,
                user_id int NOT NULL,
                PRIMARY KEY (id),
                KEY adding_forkey (user_id),
                CONSTRAINT adding_forkey FOREIGN KEY (user_id) REFERENCES users (id)
             ) ENGINE='InnoDB' AUTO_INCREMENT=24 DEFAULT CHARSET='utf8mb4' COLLATE='utf8mb4_0900_ai_ci';`;
        await addTable(connection, q, 'stocks');
    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    } finally {
        if (connection) {
            connection.release();
            console.log('INFO : createTables.js: Database connection manually released.');
        } else {
            console.log('INFO : createTables.js: Database connection automatically released.');
        }
    }
}

export default createTables;