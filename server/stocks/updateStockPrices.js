import mysql from 'mysql2';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config()
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

async function getStockSymbols() {
    const q = "SELECT symbol FROM stocks"

    return new Promise((resolve, reject) => {
        db.query(q, (err, data) => {
            if (err) reject(err)
            resolve(data);
        })
    })
}

async function getStockValues(symbols) {
    try {
        let url = 'https://api.twelvedata.com/price?symbol='

        for (let i=0; i < symbols.length; ++i) {
            // Add another string to url for all codes
            if (i > 0) { url = url + "," + symbols[i].symbol; }
            else { url = url + symbols[i].symbol; }
        }
        url = url + "&apikey=" + process.env.TWELVEDATA_API_KEY

        const response = await axios.get(url);
        if (response.data.code != 200) return response.data;
        throw response.data;
    } catch (error) {
        throw error;
    }
}

function updateCurrentVals(stockPrices) {
    const formattedPrices = Object.entries(stockPrices).map(([symbol, {price}]) => ({ 
        symbol,
        price: Number(price)
    }));

    const q = `UPDATE stocks SET current_val = CASE symbol
               ${formattedPrices.map((stock) => `WHEN '${stock.symbol}' THEN ${stock.price}`).join('\n')}
               END
               WHERE symbol IN (${formattedPrices.map((stock) => `'${stock.symbol}'`).join(', ')})`

    return new Promise((resolve, reject) => {
        db.query(q, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function updateStockPrices() {
    try {
        // Get all stock abbreviations from database
        const symbols = await getStockSymbols();

        // Get stock current trading values from twelvedata api
        const stockPrices = await getStockValues(symbols);

        // Update stock current trading values in database
        await updateCurrentVals(stockPrices);

    } catch (err) {
        console.log("ERROR:")
        console.log(err);
    }
}

export default updateStockPrices;