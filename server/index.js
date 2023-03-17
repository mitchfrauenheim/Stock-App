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
    await updateStockPrices();
    await updateUserCapital();

    data = await getUsers();
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