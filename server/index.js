import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

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

app.get("/users", (req, res) => {
    const query = "SELECT * FROM users"
    db.query(query, (err, data) => {
        if (err) {
            return res.json("Failed to fetch users from the database: " + err);
        }
        return res.json(data);
    })
})

app.listen(3001, () => {
    console.log("Hello world! :)");
})