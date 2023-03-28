import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import createTables from './createTables.js';
import populateTables from './populateTables.js';
import updateStockPrices from './updateStockPrices.js';
import updateUserCapital from './updateUserCapital.js';
import getUsers from './getUsers.js';

dotenv.config();

async function initializeDB() {
    await createTables();
    await populateTables();
}

initializeDB();

const app = express()
const port = process.env.PORT || 3001;
app.use(cors())

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})