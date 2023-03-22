function formatUserStocks(data) {
    const users = data.map(row => {
        const user = { id: row.id, name: row.name, capital: row.capital, cash: row.cash };
        const stocks = row.stocks.split(',').map(stockStr => {
            const [id, current_val, shares] = stockStr.split(':');
            const value = String(Number(current_val) * Number(shares));
            const label = id;
            return { id, label, value };
        });
        stocks.push({ id: 'Cash', label: 'Cash', value: String(row.cash) })
        user.stocks = stocks;
        return user;
    });

    return users;
}

export default formatUserStocks;