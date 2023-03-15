import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

const q = "INSERT INTO users (`name`,`capital`,`cash`) VALUES (?)"
const values = ["Mitch Frauenheim", 20000, 3000]
db.query(q, [values], (err, data) => {
    if (err) {
        console.log(err)
        return err
    }
    console.log(data)
    return data
})

// import updateStockPrices from "../stocks/updateStockPrices.js";

// updateStockPrices();