import mysql from 'mysql2';
import dotenv from 'dotenv';
import finnhub from 'finnhub';

import connectDb from './connectDb.js';

dotenv.config();

async function getStockSymbols(connection) {
    const q = "SELECT symbol FROM stocks";
    try {
        const data = await new Promise((resolve, reject) => {
            connection.query(q, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(`INFO : Stock codes retrieved from ${process.env.DB_NAME} database.`);
                resolve(data);
            })
        });
        return data;
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', `: ${err}`);
        throw err;
    } finally {
        if (connection) {
            connection.release();
            console.log('INFO : Database connection released.');
        }
    }
}

async function getStockValues(stocks) {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi();

    const quotes = await Promise.all(stocks.map(stock => {
        return new Promise((resolve, reject) => {
            finnhubClient.quote(stock.symbol, (error, data, response) => {
                if (error) {
                    // console.log('\x1b[31m%s\x1b[0m', 'ERROR', `: Error retrieving ${stock.symbol} stock price.`);
                    reject(error);
                    return;
                }
                const stockData = { symbol: stock.symbol, price: data.c }
                resolve(stockData);
            });
        })
    }))

    console.log('INFO : Finnhub API calls succeeded.');
    return quotes;
}

function setStockPrices(connection, stockPrices) {
    const q = `UPDATE stocks SET current_val = CASE symbol
               ${stockPrices.map((stock) => `WHEN '${stock.symbol}' THEN ${stock.price}`).join('\n')}
               END
               WHERE symbol IN (${stockPrices.map((stock) => `'${stock.symbol}'`).join(', ')})`

    return new Promise((resolve, reject) => {
        connection.query(q, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(`INFO : Stock prices updated in ${process.env.DB_NAME} database.`);
            resolve(result);
        })
    })
}

async function updateStockPrices() {
    let connection;
    try {
        connection = await connectDb('updateStockPrices.js');
        // Get all stock abbreviations from database
        const stocks = await getStockSymbols(connection);

        // Get stock current trading values from twelvedata api
        const stockPrices = await getStockValues(stocks);

        // Update stock current trading values in database
        await setStockPrices(connection, stockPrices);
        console.log('\x1b[32m%s\x1b[0m', 'SUCCESS', `: Stock prices successfully updated in ${process.env.DB_NAME} database.`)

    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    } {
        if (connection) {
            connection.release();
            console.log('INFO : updateStockPrices.js: Database connection manually released.');
        } else {
            console.log('INFO : updateStockPrices.js: Database connection automatically released.');
        }
    }
}

// updateStockPrices();

export default updateStockPrices;