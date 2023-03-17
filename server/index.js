import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

import updateStockPrices from './updateStockPrices.js';
import updateUserCapital from './updateUserCapital.js';
import getUsers from './getUsers.js';

const app = express()

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Ilikepie9!',
    database: 'stock_app'
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

app.listen(3001, () => {
    console.log("Hello world! :)");
})