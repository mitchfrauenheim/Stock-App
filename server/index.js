import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

import updateStockPrices from './updateStockPrices.js';
import updateUserCapital from './updateUserCapital.js';
import getUsers from './getUsers.js';

dotenv.config();

const app = express()
const port = process.env.PORT || 3001;

app.use(cors())

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

app.get("/", (req, res) => {
    res.json("Hello this is the backend.");
})

app.get("/users", async (req, res) => {
    try {
        await updateStockPrices();
        await updateUserCapital();
        const data = await getUsers();

        return res.status(200).send(data);
    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
        return res.status(500).send('Server Error')
    }
})

// app.post("/users", (req, res) => {
//     const q = "INSERT INTO users (`name`,`capital`,`cash`) VALUES (?)"
//     const values = ["Mitch Frauenheim", 17000, 3000]
//     db.query(q, [values], (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     })
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})