import dotenv from 'dotenv';

import connectDb from '../connectDb.js';

dotenv.config();

async function add_users() {

    const users = [
        { name: "Bob Frauenheim", capital: 20000, cash: 5000 },
        { name: "Greg Frauenheim", capital: 20000, cash: 5000 },
        { name: "Sandy Frauenheim", capital: 20000, cash: 5000 },
        { name: "Dan Frauenheim", capital: 20000, cash: 0 },
        { name: "Bill Frauenheim", capital: 20000, cash: 5041.76 },
        { name: "Mitch Frauenheim", capital: 20000, cash: 0 },
    ]
    const placeholders = users.map(() => "(?, ?, ?)").join(", ");
    const q = `INSERT INTO users (\`name\`,\`capital\`,\`cash\`) VALUES ${placeholders}`;
    const values = users.flatMap(user => [user.name, user.capital, user.cash]);
    let connection;

    try {
        connection = await connectDb('add_users.js');

        await new Promise((resolve, reject) => {
            connection.query(q, values, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('\x1b[32m%s\x1b[0m', 'SUCCESS', `Successfully added ${users.length} users to the ${process.env.DB_NAME} database.`);
                resolve(data);
            })

        });
    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    } {
        if (connection) {
            connection.release();
            console.log('INFO : add_users.js: Database connection manually released.');
        } else {
            console.log('INFO : add_users.js: Database connection automatically released.');
        }
    }
}

export default add_users;