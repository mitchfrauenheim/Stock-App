import dotenv from 'dotenv';

import connectDb from '../connectDb.js';

dotenv.config();

async function add_stocks() {
    const stocks = [
        // Bob
        { symbol: "VOO", full_name: "Vanguard S%P 500", exchange: "NYSEARCA", current_val: 0, purchase_val: 363.86, shares: 14, user_id: 11 },
        { symbol: "AMD", full_name: "Advanced Micro Devices, Inc.", exchange: "NASDAQ", current_val: 0, purchase_val: 70.17, shares: 71, user_id: 11 },
        { symbol: "NVDA", full_name: "NVIDIA Corporation", exchange: "NASDAQ", current_val: 0, purchase_val: 178.39, shares: 28, user_id: 11 },
        // Greg
        { symbol: "ETHE", full_name: "Grayscale Ethereum Trust", exchange: "OTCMKTS", current_val: 0, purchase_val: 8.54, shares: 585, user_id: 12 },
        { symbol: "VTI", full_name: "Vanguard Total Stock Market Index Fund ETF", exchange: "NYSEARCA", current_val: 0, purchase_val: 198.76, shares: 50, user_id: 12 },
        // Grandma
        { symbol: "DECK", full_name: "Decker Outdoor", exchange: "NYSE", current_val: 0, purchase_val: 418.00, shares: 12, user_id: 13 },
        { symbol: "DIS", full_name: "Walt Disney Co", exchange: "NYSE", current_val: 0, purchase_val: 103.48, shares: 48, user_id: 13 },
        { symbol: "F", full_name: "Ford Motor Co", exchange: "NYSE", current_val: 0, purchase_val: 12.40, shares: 403, user_id: 13 },
        // Dan
        { symbol: "GOOGL", full_name: "Alphabet Inc Class A", exchange: "NASDAQ", current_val: 0, purchase_val: 98.00, shares: 51, user_id: 14 },
        { symbol: "PYPL", full_name: "PayPal Holdings Inc", exchange: "NASDAQ", current_val: 0, purchase_val: 79.00, shares: 63, user_id: 14 },
        { symbol: "META", full_name: "Meta Platforms Inc", exchange: "NASDAQ", current_val: 0, purchase_val: 140.00, shares: 36, user_id: 14 },
        { symbol: "INTC", full_name: "Intel Corporation", exchange: "NASDAQ", current_val: 0, purchase_val: 29.22, shares: 171, user_id: 14 },
        // Bill
        { symbol: "NSA", full_name: "National Storage Affiliates Trust", exchange: "NYSE", current_val: 0, purchase_val: 38.36, shares: 130, user_id: 15 },
        { symbol: "CETXP", full_name: "Cemtrex Inc Preferred Shares Series 1", exchange: "NASDAQ", current_val: 0, purchase_val: 0.36, shares: 13736, user_id: 15 },
        { symbol: "LWLG", full_name: "Lightwave Logic Inc", exchange: "NASDAQ", current_val: 0, purchase_val: 5.99, shares: 835, user_id: 15 },
        // Mitch
        { symbol: "TMUS", full_name: "T-Mobile Us Inc", exchange: "NASDAQ", current_val: 0, purchase_val: 144.27, shares: 35, user_id: 16 },
        { symbol: "TSLA", full_name: "Tesla Inc", exchange: "NASDAQ", current_val: 0, purchase_val: 143.75, shares: 35, user_id: 16 },
        { symbol: "C", full_name: "Citigroup Inc", exchange: "NYSE", current_val: 0, purchase_val: 51.98, shares: 96, user_id: 16 },
        { symbol: "SHOP", full_name: "Shopify Inc", exchange: "NYSE", current_val: 0, purchase_val: 44.04, shares: 114, user_id: 16 }
    ]
    const placeholders = stocks.map(() => "(?, ?, ?, ?, ?, ?, ?)").join(", ");
    const q = `INSERT INTO stocks (\`symbol\`,\`full_name\`,\`exchange\`,\`current_val\`,\`purchase_val\`,\`shares\`,\`user_id\`) VALUES ${placeholders}`;
    const values = stocks.flatMap(stock => [stock.symbol, stock.full_name, stock.exchange, stock.current_val, stock.purchase_val, stock.shares, stock.user_id]);
    let connection;

    try {
        connection = await connectDb('add_stocks.js');

        await new Promise((resolve, reject) => {
            connection.query(q, values, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('\x1b[32m%s\x1b[0m', 'SUCCESS', `: Successfully added ${stocks.length} stocks to the ${process.env.DB_NAME} database.`);
                resolve(data);
            })

        });
    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    } {
        if (connection) {
            connection.release();
            console.log('INFO : add_stocks.js: Database connection manually released.');
        } else {
            console.log('INFO : add_stocks.js: Database connection automatically released.');
        }
    }

}

export default add_stocks;