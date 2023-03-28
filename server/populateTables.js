import connectDb from "./connectDb.js";
import add_users from "./startup_scripts/add_users.js";
import add_stocks from "./startup_scripts/add_stocks.js"

async function getRows(connection, table) {
    const q = `SELECT COUNT(*) AS total_rows FROM ${table};`;
    const data = await new Promise((resolve, reject) => {
        connection.query(q, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    });
    return data;
}

async function populateTables() {
    let connection;
    try {
        connection = await connectDb('populateTables.js');

        const userRows = await getRows(connection, 'users');
        if (userRows[0].total_rows == 0) {
            await add_users();
        }

        const stockRows = await getRows(connection, 'stocks');
        if (stockRows[0].total_rows == 0) {
            await add_stocks();
        }

    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    } {
        if (connection) {
            connection.release();
            console.log('INFO : populateTables.js: Database connection manually released.');
        } else {
            console.log('INFO : populateTables.js: Database connection automatically released.');
        }
    }
}

export default populateTables;