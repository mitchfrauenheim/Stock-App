async function getUsers() {
    try {
        const q = "SELECT * FROM users";

        return new Promise((resolve, reject) => {
            db.query(q, (err, data) => {
                if (err) {
                    reject(err);
                }
                data.sort((a, b) => a.capital - b.capital);
                resolve(data);
            })
        })
    } catch (err) {
        err = ": " + String(err);
        console.log('\x1b[31m%s\x1b[0m', 'ERROR', err);
    }
}

export default getUsers;