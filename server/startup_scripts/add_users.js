import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

const users = [
    { name: "Bob Frauenheim", capital: 20000, cash: 5000 },
    { name: "Greg Frauenheim", capital: 20000, cash: 5000 },
    { name: "Sandy Frauenheim", capital: 20000, cash: 5000 },
    { name: "Dan Frauenheim", capital: 20000, cash: 0 },
    { name: "Bill Frauenheim", capital: 20000, cash: 0 },
    { name: "Mitch Frauenheim", capital: 20000, cash: 0 },
]

const placeholders = users.map(() => "(?, ?, ?)").join(", ");
const q = `INSERT INTO users (\`name\`,\`capital\`,\`cash\`) VALUES ${placeholders}`;
const values = users.flatMap(user => [user.name, user.capital, user.cash]);
db.query(q, values, (err, data) => {
    if (err) {
        console.log(err)
        return err
    }
    console.log(data)
    return data
})